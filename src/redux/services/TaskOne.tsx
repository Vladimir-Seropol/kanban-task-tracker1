import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookies } from '../getCookies/getCookies';

export const TaskOne = createApi({
  reducerPath: 'taskOne',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://trainee-academy.devds.ru/api',
    prepareHeaders: (headers) => {
      const myCookies = getCookies();
      const token = myCookies.auth_token;
      console.log(`token-task`, token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },

    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getTaskOne: builder.query({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTaskOneQuery } = TaskOne;
