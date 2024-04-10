import { createSlice } from "@reduxjs/toolkit";
import { getSeatlabelThunk } from "./get-seatlabel.Thunk";

export interface InitialState {
  getseatlabelData: any[];
  getseatlabelloading: boolean;
  getseatlableerror: string;
}

export const getSeatlabelSlice = createSlice({
  name: "getSeatThunk",
  initialState: {
    getseatlabelData: [],
    getseatlabelloading: false,
    getseatlableerror: "",
  } as InitialState,
  reducers: {
    showAllseatlabelData: (state, action) => {
      console.log("seatlabeldata", state.getseatlabelData);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getSeatlabelThunk.pending, (state) => {
      state.getseatlabelloading = true;
    })
    .addCase(getSeatlabelThunk.fulfilled, (state, action) => {
        state.getseatlabelloading = false;
        state.getseatlabelData = action.payload;
        state.getseatlableerror = ""; 
      })
      .addCase(getSeatlabelThunk.rejected, (state, action) => {
        state.getseatlabelloading = false;
        const errorPayload = action.payload as { message?: string }; 
        state.getseatlableerror = errorPayload.message ?? "Unknown error";
      });
    }
});

export const { showAllseatlabelData } = getSeatlabelSlice.actions;
export default getSeatlabelSlice.reducer;