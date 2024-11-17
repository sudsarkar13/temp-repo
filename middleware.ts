import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Define public routes that don't require authentication
const publicRoutes = ['/admin/login', '/admin/setup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for non-admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Check if it's a public route
  if (publicRoutes.includes(pathname)) {
    // If already authenticated, redirect to dashboard
    const adminToken = request.cookies.get('admin_token');
    if (adminToken?.value && verifyToken(adminToken.value)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Redirect /admin to /admin/dashboard
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Get tokens
  const adminToken = request.cookies.get('admin_token');
  const tempToken = request.cookies.get('temp_token');

  // Handle 2FA verification page
  if (pathname === '/admin/verify-2fa') {
    // Allow access only with temp token
    if (tempToken?.value && verifyToken(tempToken.value, true)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // For all other admin routes, require full authentication
  if (!adminToken?.value || !verifyToken(adminToken.value)) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    
    // Clear any existing tokens
    response.cookies.delete('admin_token');
    response.cookies.delete('temp_token');
    
    return response;
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(adminToken.value, process.env.JWT_SECRET || "fallback_secret") as jwt.JwtPayload;

    // Check if token is about to expire (within 1 hour)
    const expirationTime = decoded.exp ? decoded.exp * 1000 : 0;
    const oneHour = 60 * 60 * 1000;
    
    if (expirationTime - Date.now() < oneHour) {
      // Token is about to expire, refresh it
      const response = NextResponse.next();
      
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: '1d' }
      );

      response.cookies.set({
        name: 'admin_token',
        value: newToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.next();
  } catch (error) {
    // Token is invalid
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_token');
    return response;
  }
}

// Helper function to verify JWT token
function verifyToken(token: string, isTempToken: boolean = false): boolean {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as jwt.JwtPayload;
    
    // For temp tokens, verify it's the correct type
    if (isTempToken && decoded.type !== '2fa_pending') {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

export const config = {
  matcher: '/admin/:path*',
};