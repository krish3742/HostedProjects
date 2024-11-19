import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface moviesState {
  genre: String[];
  moviesData: [];
  moviesLoading: Boolean;
}

const initialState: moviesState = {
  genre: [
    "Action",
    "Adult",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Game-Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ],
  moviesData: [],
  moviesLoading: true,
};

export const moviesSlice = createSlice({
  name: "Random Movie",
  initialState,
  reducers: {
    setMoviesData: (state, action: PayloadAction<any>) => {
      state.moviesData = action.payload;
    },
    setMoviesLoading: (state, action: PayloadAction<any>) => {
      state.moviesLoading = action.payload;
    },
  },
});

export const { setMoviesData, setMoviesLoading } = moviesSlice.actions;

export default moviesSlice.reducer;
