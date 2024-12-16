import { createApi } from "@reduxjs/toolkit/query/react";
import { tokenFetchBaseQuery } from "./api";

type Doctor = {
  id: string;
  dob: string;
  gender: string;
  phone: string;
  qualification: string;
  specialization: string;
  licenseNumber: string;
  address: string;
  certificateImage: string;
  profileImage: string;
  isApproved: string;
  DoctorShedule:doctorSheduleList[]
};
export type doctorSheduleList = {
  id: string;
  availableDays: string;
  availableTimeFrom: string;
  availableTimeTo: string;
  doctorId: string;
};

export type BackendError = {
  status: number;
  data: {
    message: string;
  };
};

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    createDoctor: builder.mutation<{ message: string }, FormData>({
      query: (formData) => ({
        url: "/doctor",
        method: "POST",
        body: formData,
      }),
    }),
    getDoctor: builder.query<Doctor, void>({
      query: () => ({
        url: "/doctor",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateDoctorMutation, useGetDoctorQuery } = doctorApi;
