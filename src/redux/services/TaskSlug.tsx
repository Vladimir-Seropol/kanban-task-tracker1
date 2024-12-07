import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookies } from '../getCookies/getCookies';

export const TaskSlug = createApi({
  reducerPath: 'taskSlag',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://trainee-academy.devds.ru/api',
    prepareHeaders: (headers) => {
      const myCookies = getCookies();
      const token = myCookies.auth_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTaskAll: builder.query({
      query: (slug) => ({
        url: `/project/${slug}/task`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTaskAllQuery } = TaskSlug;
