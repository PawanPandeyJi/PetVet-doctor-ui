import { createApi } from "@reduxjs/toolkit/query/react";
import { tokenFetchBaseQuery } from "./api";

type PrescriptionRequest = {
  diagnosis: string;
  remarks: string;
  appointmentId: string;
};

type MedicineRequest = {
  drugName: string;
  doseTime: string;
  frequency: string;
  dose: string;
  drugForm: string;
  duration: string;
};

type MedicineResponse = {
  drugName: string;
  doseTime: string;
  frequency: string;
  dose: string;
  drugForm: string;
  duration: string;
};

type PrescriptionResponse = {
  id: string;
  diagnosis: string;
  remarks: string;
  appointmentId: string;
  createdAt: string;
  medicineOfPrescription: MedicineResponse[];
};

export const prescriptionApi = createApi({
  reducerPath: "prescriptionApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["prescription"],
  endpoints: (builder) => ({
    createPrescription: builder.mutation<
      void,
      { remarksOrDiagnosis: PrescriptionRequest; medicines: MedicineRequest[] }
    >({
      query: ({ remarksOrDiagnosis, medicines }) => ({
        url: "/prescription",
        method: "POST",
        body: { ...remarksOrDiagnosis, medicines },
      }),
      invalidatesTags: ["prescription"],
    }),
    getPrescriptions: builder.query<PrescriptionResponse[], void>({
      query: () => ({
        url: "/prescription",
        method: "GET",
      }),
      providesTags: ["prescription"],
    }),
  }),
});

export const { useCreatePrescriptionMutation, useGetPrescriptionsQuery } = prescriptionApi;
