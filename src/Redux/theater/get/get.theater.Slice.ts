import { createSlice } from "@reduxjs/toolkit";
import { getTheaterThunk } from "./get-theater.Thunk";


export const getTheaterDataSlice = createSlice({
  name: "getTheaterThunk",
  initialState: {
    gettheaterData: [] as any,
    gettheaterloading: false,
    getthratererror: "",
  },
  reducers: {
    showAllTheTheatersData: (state, action) => {
      console.log("TheaterData", state.gettheaterData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTheaterThunk.pending, (state) => {
        state.gettheaterloading = true;
      })
      // showTheaterData from thunk
      .addCase(getTheaterThunk.fulfilled, (state, action) => {
        state.gettheaterloading = false;
        state.gettheaterData = action.payload;
      })
      .addCase(getTheaterThunk.rejected, (state, action) => {
        state.gettheaterloading = false;
        state.getthratererror = action.payload as string;
      });
  },
});

export const { showAllTheTheatersData } = getTheaterDataSlice.actions;
export default getTheaterDataSlice.reducer;
