import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => localStorage.getItem("authToken");

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/todos",
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation({
      query: (title) => ({
        url: "/todos",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),

    editTask: builder.mutation({
      query: ({ id, title }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),

    toggleTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}/isCompleted`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (emailPassword) => ({
        url: "/auth/login",
        method: "POST",
        body: emailPassword,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useToggleTaskMutation,
  useDeleteTaskMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = tasksApi;
