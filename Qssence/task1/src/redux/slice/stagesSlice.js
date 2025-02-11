import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stages: ["open", "impact_assessment", "approval", "completed"],
  currentStage: "open",
  isModalOpen: false,
};

const storeSlice = createSlice({
  name: "StagesList",
  initialState,
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setCurrentStage: (state, action) => {
      state.currentStage = action.payload;
    },
  },
});

export const { setIsModalOpen, setCurrentStage } = storeSlice.actions;

export default storeSlice.reducer;
