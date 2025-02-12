import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  token: null,
};

const AuthSlice = createSlice({
  name: "Authorization",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setLoading, setToken, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
