import { createSlice } from "@reduxjs/toolkit";
import { News } from "../../Types/DataTypes";
import { getTicketsThunk } from "./get-ticket.Thunk";

export interface InitialState {
  getticketData: News[];
  getticketloading: boolean;
  getticketerror: string;
}

export const getticketSlice = createSlice({
  name: "getMyTicketsThunk",
  initialState: {
    getticketData: [],
    getticketloading: false,
    getticketerror: "",
  } as InitialState,
  reducers: {
    showAllticketsData: (state, action) => {
      console.log("news data", state.getticketData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsThunk.pending, (state) => {
        state.getticketloading = true;
      })
      .addCase(getTicketsThunk.fulfilled, (state, action) => {
        state.getticketloading = false;
        state.getticketData = action.payload;
        state.getticketerror = "";
      })
      .addCase(getTicketsThunk.rejected, (state, action) => {
        state.getticketloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.getticketerror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllticketsData } = getticketSlice.actions;
export default getticketSlice.reducer;
