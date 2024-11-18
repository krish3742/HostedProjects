import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface searchState {
  input: String;
  genre: String[];
}

const initialState: searchState = {
  input: "",
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
};

export const searchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<String>) => {
      state.input = action.payload;
    },
  },
});

export const { setInput } = searchSlice.actions;

export default searchSlice.reducer;
