import { createSlice } from "@reduxjs/toolkit";
import { getupcomingThunk } from "./upcomingmovie.Thunk";

export interface InitialState {
  upcomingData: any[];
  upcomingloading: boolean;
  upcomingerror: string;
}

export const getupcomingSlice = createSlice({
  name: "getupcomingThunk",
  initialState: {
    upcomingData: [],
    upcomingloading: false,
    upcomingerror: "",
  } as InitialState,
  reducers: {
    showAllupcomingData: (state, action) => {
      console.log("upcoming data", state.upcomingData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getupcomingThunk.pending, (state) => {
        state.upcomingloading = true;
      })
      .addCase(getupcomingThunk.fulfilled, (state, action) => {
        state.upcomingloading = false;
        state.upcomingData = action.payload;
        state.upcomingerror = "";
      })
      .addCase(getupcomingThunk.rejected, (state, action) => {
        state.upcomingloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.upcomingerror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllupcomingData } = getupcomingSlice.actions;
export default getupcomingSlice.reducer;
