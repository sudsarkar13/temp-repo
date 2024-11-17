import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes and public assets
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }

  // Handle login page access
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token');
    if (!token) {
      return NextResponse.next();
    }

    try {
      verify(token.value, JWT_SECRET);
      // If token is valid, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch {
      // If token is invalid, clear it
      const response = NextResponse.next();
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      verify(token.value, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}; 