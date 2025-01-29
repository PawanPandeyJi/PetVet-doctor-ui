import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/auth-api";
import authReducer from "./feature/auth/authSlice";
import { doctorApi } from "./api/doctor-api";
import { chatApi } from "./api/chat.ts";
import { prescriptionApi } from "./api/prescription-api.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [prescriptionApi.reducerPath]: prescriptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(doctorApi.middleware).concat(chatApi.middleware).concat(prescriptionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
