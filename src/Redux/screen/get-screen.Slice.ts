import { createSlice } from "@reduxjs/toolkit";
import { UpMovie } from "../../Types/DataTypes";
import { getScreenThunk } from "./get-screen.Thunk";

export interface InitialState {
  getscreenData: any[];
  getscreenloading: boolean;
  getscreenerror: string;
}

export const getScreenSlice = createSlice({
  name: "getScreenThunk",
  initialState: {
    getscreenData: [],
    getscreenloading: false,
    getscreenerror: "",
  } as InitialState,
  reducers: {
    showAllScreenData: (state, action) => {
      console.log("screen data", state.getscreenData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScreenThunk.pending, (state) => {
        state.getscreenloading = true;
      })
      .addCase(getScreenThunk.fulfilled, (state, action) => {
        state.getscreenloading = false;
        state.getscreenData = action.payload;
        state.getscreenerror = ""; // Clear any previous errors
      })
      .addCase(getScreenThunk.rejected, (state, action) => {
        state.getscreenloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.getscreenerror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllScreenData } = getScreenSlice.actions;
export default getScreenSlice.reducer;
