import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./features/searchSlice";
import moviesReducer from "./features/moviesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
      movies: moviesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
