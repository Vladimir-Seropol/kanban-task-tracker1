import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

// function getCookie() {
//   return document.cookie.split('; ').reduce((acc, item) => {
//     const [name, value] = item.split('=')
//     acc[name] = value
//     return acc
//   }, {})
// }
export const TaskOne = createApi({
  reducerPath: 'taskOne',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://trainee-academy.devds.ru/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
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
