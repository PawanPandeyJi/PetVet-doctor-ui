import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
};

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
