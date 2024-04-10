import { createSlice } from "@reduxjs/toolkit";
import { News } from "../../Types/DataTypes";
import { getMyTicketsThunk } from "./get-myticket.Thunk";

export interface InitialState {
  getMyticketData: News[];
  getMyticketloading: boolean;
  getMyticketerror: string;
}

export const getmyticketSlice = createSlice({
  name: "getMyTicketsThunk",
  initialState: {
    getMyticketData: [],
    getMyticketloading: false,
    getMyticketerror: "",
  } as InitialState,
  reducers: {
    showAllMyticketsData: (state, action) => {
      console.log("news data", state.getMyticketData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyTicketsThunk.pending, (state) => {
        state.getMyticketloading = true;
      })
      .addCase(getMyTicketsThunk.fulfilled, (state, action) => {
        state.getMyticketloading = false;
        state.getMyticketData = action.payload;
        state.getMyticketerror = "";
      })
      .addCase(getMyTicketsThunk.rejected, (state, action) => {
        state.getMyticketloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.getMyticketerror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllMyticketsData } = getmyticketSlice.actions;
export default getmyticketSlice.reducer;
