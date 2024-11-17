import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');
  const { pathname } = request.nextUrl;

  // Skip middleware for non-admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === '/admin/login';

  // Verify the JWT token
  const isAuthenticated = adminToken?.value ? verifyToken(adminToken.value) : false;

  // Redirect /admin to /admin/dashboard
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If on login page and authenticated, redirect to dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If not on login page and not authenticated, redirect to login
  if (!isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

// Helper function to verify JWT token
function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
    return true;
  } catch {
    return false;
  }
}

export const config = {
  matcher: '/admin/:path*',
};