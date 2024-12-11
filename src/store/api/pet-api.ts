import { createApi } from "@reduxjs/toolkit/query/react";
import { tokenFetchBaseQuery } from "./api";

type Pet = {
  id: string;
  petName: string;
  age: string;
  breed: string;
  weight: string;
  type: string;
  gender: string;
  color: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type BackendError = {
  status: number;
  data: {
    message: string;
  };
};

type CreatePet = {
  message: string;
  token?: string;
};

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user",
  }),
  tagTypes: ["pet"],
  endpoints: (builder) => ({
    createPets: builder.mutation<CreatePet, FormData>({
      query: (formData) => ({
        url: "/pet",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["pet"],
    }),
    getPets: builder.query<Pet[], void>({
      query: () => ({
        url: "/pet",
        method: "GET",
      }),
      providesTags: ["pet"],
    }),
    deletePet: builder.mutation<void, string>({
      query: (id) => ({
        url: `/pet/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["pet"],
    }),
  }),
});

export const { useCreatePetsMutation, useGetPetsQuery, useDeletePetMutation } = petApi;
