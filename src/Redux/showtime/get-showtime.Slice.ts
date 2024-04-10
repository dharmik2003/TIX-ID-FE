import { createSlice } from "@reduxjs/toolkit";
import { getShowTimeThunk } from "./get-showtime.Thunk";

export interface InitialState {
  getshowtimeData: any[];
  getshowtimeloading: boolean;
  getshowtimeerror: string;
}

export const getshowtimeSlice = createSlice({
  name: "getShowTimeThunk",
  initialState: {
    getshowtimeData: [],
    getshowtimeloading: false,
    getshowtimeerror: "",
  } as InitialState,
  reducers: {
    showAllshowtimeData: (state, action) => {
      console.log("upcoming data", state.getshowtimeData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShowTimeThunk.pending, (state) => {
        state.getshowtimeloading = true;
      })
      .addCase(getShowTimeThunk.fulfilled, (state, action) => {
        state.getshowtimeloading = false;
        state.getshowtimeData = action.payload;
        state.getshowtimeerror = ""; // Clear any previous errors
      })
      .addCase(getShowTimeThunk.rejected, (state, action) => {
        state.getshowtimeloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.getshowtimeerror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllshowtimeData } = getshowtimeSlice.actions;
export default getshowtimeSlice.reducer;
