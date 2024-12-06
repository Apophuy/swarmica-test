import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from '../api/paths';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath.base,
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInstance: builder.query<any, void>({
      query: () => apiPath.instance,
    }),
    getCategories: builder.query<any, void>({
      query: () => apiPath.categories,
    }),
    getArticles: builder.query<any, void>({
      query: () => apiPath.articles,
    }),
  }),
});

export const { useGetInstanceQuery } = api;
