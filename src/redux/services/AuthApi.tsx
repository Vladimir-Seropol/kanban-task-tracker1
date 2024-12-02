import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://trainee-academy.devds.ru/api',
  }),
  tagTypes: ['Token'],
  endpoints: (builder) => ({
    tokenApi: builder.mutation({
      query: (cred) => ({
        url: '/auth/token',
        method: 'POST',
        body: cred,
      }),
      invalidatesTags: ['Token'],
    }),
  }),
});

export const { useTokenApiMutation } = authApi;
