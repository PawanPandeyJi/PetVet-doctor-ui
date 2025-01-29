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

export const prescriptionApi = createApi({
  reducerPath: "prescriptionApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
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
    }),
  }),
});

export const { useCreatePrescriptionMutation } = prescriptionApi;
