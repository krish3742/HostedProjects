import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: "",
};

const storeSlice = createSlice({
  name: "ActiveMenu",
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = storeSlice.actions;

export default storeSlice.reducer;
