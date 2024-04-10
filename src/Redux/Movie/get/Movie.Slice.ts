import { createSlice } from "@reduxjs/toolkit";
import { getmovieThunk } from "./Movie.Thunk";


export interface InitialStateMovieData {
  getmovieData: any[];
  getmovieloading: boolean;
  getmovieerror: String;
}

export const MoviesSlice = createSlice({
  name: "movies",
  initialState: {
    getmovieData: [],
    getmovieloading: false,
    getmovieerror: "",
  } as InitialStateMovieData,
  reducers: {
    showAllData: (state, action) => {
      console.log("state.moviesData", state.getmovieData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getmovieThunk.pending, (state) => {
        state.getmovieloading = true;
      })
      .addCase(getmovieThunk.fulfilled, (state, action) => {
        state.getmovieloading = false;
        state.getmovieData = action.payload;
      })
      .addCase(getmovieThunk.rejected, (state, action) => {
        state.getmovieloading = false;
        state.getmovieerror = action.payload as string;
      });
  },
});
export const { showAllData } = MoviesSlice.actions;
export default MoviesSlice.reducer;
