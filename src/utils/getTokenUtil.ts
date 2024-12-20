import { GetServerSidePropsContext } from 'next';

export const getTokenFromCookies = (
  context: GetServerSidePropsContext,
): string | null => {
  return context.req.cookies?.auth_token || null;
};
