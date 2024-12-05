import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth_token');

  if (pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // Если токена нет и мы не на странице входа, редиректим на вход
  if ((!authToken || !authToken?.value) && pathname !== '/login') {
    request.cookies.delete('auth_token');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если токен есть и мы на странице входа, редиректим на главную
  if (authToken && authToken?.value && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // По идее это должно было работать :)
  // Если токен есть, добавляем его в заголовок
  // if (authToken && authToken?.value) {
  //   request.headers.set('authorization', `Bearer ${authToken.value}`);
  //
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
