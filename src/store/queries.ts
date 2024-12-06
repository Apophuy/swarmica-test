import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from '../api/paths';
import { TArticleReply, TCategoriesReply, TInstanceReply } from '../api/replies';
import { TArticlesRequest, TCategoriesRequest } from '../api/requests';

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
    getInstance: builder.query<TInstanceReply, void>({
      query: () => apiPath.instance,
    }),
    getCategories: builder.query<TCategoriesReply, TCategoriesRequest>({
      query: ({ limit = 100, offset, ordering, public: isPublic }) => ({
        url: apiPath.categories,
        params: { limit, offset, ordering, public: isPublic },
      }),
    }),
    getArticles: builder.query<TArticleReply, TArticlesRequest>({
      query: (params) => ({
        url: apiPath.articles,
        params,
      }),
    }),
  }),
});

export const { useGetInstanceQuery, useGetCategoriesQuery, useGetArticlesQuery } = api;
