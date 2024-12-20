/* eslint-disable no-console */
/* eslint-disable import/newline-after-import */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookies } from '../getCookies/getCookies';
export const authUser = createApi({
  reducerPath: 'authUser',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://trainee-academy.devds.ru/api',
    prepareHeaders: (headers) => {
      const myCookies = getCookies();
      const token = myCookies.auth_token;
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
    getUserId: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAuthUserQuery, useGetUserIdQuery } = authUser;
