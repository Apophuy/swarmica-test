import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath } from '../api/paths';

export const articlesApi = createApi({
  reducerPath: 'main',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath.base,
    mode: 'cors',
    // credentials: 'same-origin',
    prepareHeaders: (headers) => {
      headers.set('Content-Security-Policy', `default-src ${apiPath.base}`);
      headers.set('Access-Control-Allow-Origin', apiPath.base);
      // headers.set('Access-Control-Allow-Methods', 'GET');
      // headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      // headers.set('Content-Type', 'application/json');
      // headers.set('Access-Control-Allow-Credentials', 'true');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (url) => ({
        url,
      }),
    }),
  }),
});

export const { useGetDataQuery } = articlesApi;
