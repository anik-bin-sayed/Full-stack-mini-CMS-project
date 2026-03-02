import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("EduMaster:isAuthenticated"),
  userRole: localStorage.getItem("EduMaster:userRole") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userRole = action.payload.role;
      localStorage.setItem("EduMaster:userRole", action.payload.role);
    },
    userAuthenticated: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("EduMaster:isAuthenticated", "true");
    },
    logoutUserAuthSlice: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userRole = null;
      localStorage.removeItem("EduMaster:userRole");
      localStorage.removeItem("EduMaster:isAuthenticated");
    },
  },
});

export const { setUser, logoutUserAuthSlice, userAuthenticated } =
  authSlice.actions;
export default authSlice.reducer;
