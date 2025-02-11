import { configureStore } from "@reduxjs/toolkit";
import stagesReducer from "./slice/stagesSlice";
import menuReducer from "./slice/menuSlice";

const store = configureStore({
  reducer: {
    stages: stagesReducer,
    menu: menuReducer,
  },
});

export default store;
