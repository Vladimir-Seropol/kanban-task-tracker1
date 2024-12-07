import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../utils/config';
import { RootState } from '../store';

export interface UserResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,

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
    tokenApi: builder.mutation<UserResponse, LoginRequest>({
      query: (cred) => ({
        url: '/auth/token',
        method: 'POST',
        body: cred,
      }),
    }),
  }),
});

export const { useTokenApiMutation } = authApi;
