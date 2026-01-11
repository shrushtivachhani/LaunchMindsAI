
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // MOCK AUTH CHECK
    const mockSession = request.cookies.get('mock_session')?.value;
    const mockRole = request.cookies.get('mock_user_role')?.value;

    // 1. Admin Route Protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (request.nextUrl.pathname === '/admin/login') return response;

        if (!mockSession || mockRole !== 'admin') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // 2. User Route Protection
    if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile')) {
        if (!mockSession) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    // 3. Auth Page Redirect
    if (request.nextUrl.pathname.startsWith('/auth/')) {
        if (mockSession) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return response;
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
