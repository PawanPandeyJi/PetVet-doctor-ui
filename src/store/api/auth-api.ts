import { createApi } from "@reduxjs/toolkit/query/react";
import { tokenFetchBaseQuery } from "./api";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginUser = {
  email: string;
  password: string;
};


export type BackendError = {
  status: number;
  data: {
    message: string;
  };
};

type CreateUser = {
  message: string;
  token?: string;
};

type LoggedUserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000/api/auth",
  }),
  endpoints: (builder) => ({
    createUsers: builder.mutation<CreateUser, User>({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),
    loginUsers: builder.mutation<CreateUser, LoginUser>({
      query: (loginUser) => ({
        url: "/login",
        method: "POST",
        body: loginUser,
      }),
    }),
    loginUserData: builder.query<LoggedUserData, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateUsersMutation, useLoginUsersMutation, useLoginUserDataQuery } = userApi;
