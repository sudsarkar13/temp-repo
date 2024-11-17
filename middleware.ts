import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');
  const { pathname } = request.nextUrl;

  // If trying to access admin pages
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      // If already authenticated, redirect to dashboard
      if (adminToken?.value === process.env.CURRENT_ADMIN_TOKEN) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // For all other admin routes, check authentication
    if (!adminToken?.value || adminToken.value !== process.env.CURRENT_ADMIN_TOKEN) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Redirect /admin to /admin/dashboard
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};