import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookies } from '../getCookies/getCookies';

export const projectUser = createApi({
  reducerPath: 'project',
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
    getProjectApi: builder.query({
      query: (project) => ({
        url: `/${project}`,
        method: 'GET',
      }),
    }),
    getprojectSlug: builder.query({
      query: (slug) => ({
        url: `/project/${slug}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProjectApiQuery, useGetprojectSlugQuery } = projectUser;
