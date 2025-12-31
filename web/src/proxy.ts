import { NextRequest, NextResponse } from 'next/server';

import { AUTH_TOKEN_KEY } from '@/const';

const protectedRoutes = ['/admin', '/nastaveni', '/novy-recept'];
const protectedPatterns = [/^\/recept\/[^/]+\/upravit$/];

const authRoutes = ['/prihlaseni'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const path = request.nextUrl.pathname;

  const isProtectedRoute =
    protectedRoutes.some((route) => path.startsWith(route)) ||
    protectedPatterns.some((pattern) => pattern.test(path));

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/prihlaseni', request.url);
    loginUrl.searchParams.set('u', path);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/nastaveni/:path*',
    '/novy-recept/:path*',
    '/recept/:slug/upravit',
    '/prihlaseni/:path*',
  ],
};
