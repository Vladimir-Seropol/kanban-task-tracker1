import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const authUser = createApi({
  reducerPath: 'authUser',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://trainee-academy.devds.ru/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log(`token-user`, token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAuthUser: builder.query({
      query: (name) => ({
        url: `/auth/${name}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAuthUserQuery } = authUser;
