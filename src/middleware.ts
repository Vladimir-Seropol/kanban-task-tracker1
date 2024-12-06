import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const authToken = request.cookies.get('auth_token');

  // Пропуск статических файлов, включая изображения в папке public
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/Logo.png')
  ) {
    return NextResponse.next();
  }

  // Главная страница доступна всем
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Если токена нет и мы не на странице входа, редиректим на вход
  if (!authToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если токен есть и мы на странице входа, редиректим на главную
  if (authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Если токен есть, добавляем его в заголовок
  if (authToken) {
    const response = NextResponse.next();
    response.headers.set('authorization', `Bearer ${authToken}`);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path((?!^$).*)'], // Применяем middleware ко всем маршрутам, кроме корневого
};
