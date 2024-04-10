import { createSlice } from "@reduxjs/toolkit";
import { getVoucherThunk } from "./get-voucher.SliceThunk";

export interface InitialState {
  getvoucherData: any[];
  getvoucherloading: boolean;
  getvouchererror: string;
}

export const getVoucherSlice = createSlice({
  name: "getupcomingThunk",
  initialState: {
    getvoucherData: [],
    getvoucherloading: false,
    getvouchererror: "",
  } as InitialState,
  reducers: {
    showAllVoucherData: (state, action) => {
      console.log("upcoming data", state.getvoucherData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVoucherThunk.pending, (state) => {
        state.getvoucherloading = true;
      })
      .addCase(getVoucherThunk.fulfilled, (state, action) => {
        state.getvoucherloading = false;
        state.getvoucherData = action.payload;
        state.getvouchererror = "";
      })
      .addCase(getVoucherThunk.rejected, (state, action) => {
        state.getvoucherloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.getvouchererror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllVoucherData } = getVoucherSlice.actions;
export default getVoucherSlice.reducer;
