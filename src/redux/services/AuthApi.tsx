import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '@/utils/config';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
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
