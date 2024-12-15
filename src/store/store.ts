import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/auth-api";
import authReducer from "./feature/auth/authSlice";
import { doctorApi } from "./api/doctor-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(doctorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
