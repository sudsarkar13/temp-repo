import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    const token = request.cookies.get('admin_token');
    if (token) {
      try {
        verify(token.value, process.env.JWT_SECRET!);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (error) {
        const response = NextResponse.next();
        response.cookies.delete('admin_token');
        return response;
      }
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token');

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      verify(token.value, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
} 