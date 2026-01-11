import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // 1. Init Supabase SSR Client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // 2. Fetch User
    const { data: { user } } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname;

    // 3. Protected Routes Logic
    if (!user) {
        if (path.startsWith('/admin')) {
            // Exclude login page to prevent redirect loop
            if (path !== '/admin/login') {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            }
        } else if (path.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    } else {
        // User is logged in
        if (path === '/auth/login' || path === '/auth/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return response
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
