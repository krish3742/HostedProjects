import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errors: null,
  user: null,
};

const AuthSlice = createSlice({
  name: "Authorization",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setLoading, setUser, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
