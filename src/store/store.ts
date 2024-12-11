import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/auth-api";
import authReducer from "./feature/auth/authSlice";
import { petApi } from "./api/pet-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(petApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
