
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Create an unmodified response for the initial client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value)
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 3. Protected Routes Logic
    // User is already fetched above at line 33

    // 3a. Admin Routes Protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return response;
        }

        // Redirect if not logged in
        if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Note: Strict Role check is done in the Page Components/Layout or Admin Login logic
        // Middleware role checks require extra DB calls which we avoid for performance here,
        // unless we used custom claims. We rely on the layout/page to kick non-admins out.
    }

    // 3b. User Dashboard Protection
    if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile')) {
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    // 3c. Auth Page Redirect (If already logged in)
    if (request.nextUrl.pathname.startsWith('/auth/')) {
        if (user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return response
}

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /api/ (api routes if handled separately, but usually we want auth there)
         * But we EXCLUDE static files.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
