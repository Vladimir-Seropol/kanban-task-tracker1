import { GetServerSideProps } from 'next';
import { getTokenFromCookies } from './getTokenUtil';

export const getServerSideToken: GetServerSideProps = async (context) => {
  const token = getTokenFromCookies(context);

  return {
    props: {
      token, // Передаем токен в пропсах
    },
  };
};
