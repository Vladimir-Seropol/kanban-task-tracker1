import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const authToken = request.cookies.get('auth_token');

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('/images/') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.gif')
  ) {
    return NextResponse.next();
  }

  // Главная страница доступна всем
  if (pathname === '/') {
    return NextResponse.next();
  }

  if (!authToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (authToken) {
    const response = NextResponse.next();
    response.headers.set('Authorization', `Bearer ${authToken.value}`);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path((?!^$).*)'],
};
