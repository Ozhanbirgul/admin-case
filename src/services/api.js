import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      headers.set("x-api-key", import.meta.env.VITE_API_KEY);
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("token");
      if (token && endpoint !== "login") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getProducts: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/products?page=${page}&limit=${limit}`,
    }),

    getCategoriesTree: builder.query({
      query: () => "/product-categories/tree",
    }),

    getUsers: builder.query({
      query: () => "/users",
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetCategoriesTreeQuery,
  useGetUsersQuery,
  useDeleteProductMutation, 
} = api;