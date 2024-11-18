import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// Define public routes that don't require authentication
const publicRoutes = ['/admin/login', '/admin/setup'];

// Create a TextEncoder instance
const encoder = new TextEncoder();

// Convert secret to Uint8Array
const secret = encoder.encode(process.env.JWT_SECRET || 'fallback_secret');

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for non-admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Special handling for admin setup
  if (pathname === '/admin/setup') {
    try {
      // Check if admin exists by making an API call
      const baseUrl = request.nextUrl.origin;
      const response = await fetch(`${baseUrl}/api/admin/check`);
      const data = await response.json();

      if (data.hasAdmin) {
        console.log('Admin exists, checking token...');
        const adminToken = request.cookies.get('admin_token');
        if (!adminToken?.value || !(await verifyToken(adminToken.value))) {
          console.log('No valid token, redirecting to login');
          return NextResponse.redirect(new URL('/admin/login', request.url));
        }
      } else {
        console.log('No admin exists, allowing setup access');
      }
      return NextResponse.next();
    } catch (error) {
      console.error('Error checking admin existence:', error);
      return NextResponse.next(); // Allow access to setup page if check fails
    }
  }

  // Check if it's a public route
  if (publicRoutes.includes(pathname)) {
    // If already authenticated, redirect to dashboard
    const adminToken = request.cookies.get('admin_token');
    if (adminToken?.value && (await verifyToken(adminToken.value))) {
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
    if (tempToken?.value && (await verifyToken(tempToken.value, true))) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // For all other admin routes, require full authentication
  if (!adminToken?.value || !(await verifyToken(adminToken.value))) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    
    // Clear any existing tokens
    response.cookies.delete('admin_token');
    response.cookies.delete('temp_token');
    
    return response;
  }

  try {
    // Verify and decode the token
    const { payload } = await jose.jwtVerify(adminToken.value, secret);

    // Check if token is about to expire (within 1 hour)
    const expirationTime = payload.exp ? payload.exp * 1000 : 0;
    const oneHour = 60 * 60 * 1000;
    
    if (expirationTime - Date.now() < oneHour) {
      // Token is about to expire, refresh it
      const response = NextResponse.next();
      
      const newToken = await new jose.SignJWT({ 
        id: payload.id, 
        email: payload.email 
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(secret);

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
async function verifyToken(token: string, isTempToken: boolean = false): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    
    // For temp tokens, verify it's the correct type
    if (isTempToken && payload.type !== '2fa_pending') {
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