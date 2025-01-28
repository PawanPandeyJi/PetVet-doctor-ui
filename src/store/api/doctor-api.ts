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
  DoctorShedule: doctorSheduleList[];
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

type AppointmentResponse = {
  id: string;
  userId: string;
  doctorId: string;
  petId: string;
  appointmentDay: string;
  isCanceled: boolean;
  canJoin: boolean;
  isChatEnded: boolean;
  createdAt: string;
  updatedAt: string;
  appointmentOfUserPet: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  appointmentToPet: {
    id: string;
    petName: string;
    age: string;
    breed: string;
    weight: string;
    type: string;
    gender: string;
    color: string;
    image: string;
    isDeleted: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  petImage: string;
};

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["appointment"],
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
    getAppointments: builder.query<AppointmentResponse[], void>({
      query: () => ({
        url: "/doctor/appointments",
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),
    askToJoin: builder.mutation<void, string>({
      query: (id) => ({
        url: `/joinAppointment/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["appointment"],
    }),
    disconnectUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/disconnect/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetDoctorQuery,
  useGetAppointmentsQuery,
  useAskToJoinMutation,
  useDisconnectUserMutation,
} = doctorApi;
