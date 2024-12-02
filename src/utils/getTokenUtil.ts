import { GetServerSidePropsContext } from 'next';

// Функция для получения токена из cookies
export const getTokenFromCookies = (
  context: GetServerSidePropsContext,
): string | null => {
  return context.req.cookies?.auth_token || null;
};
