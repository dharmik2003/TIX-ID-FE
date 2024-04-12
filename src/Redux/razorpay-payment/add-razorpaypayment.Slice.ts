import { createSlice } from "@reduxjs/toolkit";
import { addpaymentThunk } from "./add-razorpaypayment.Thunk";

export interface InitialState {
  addpaymentData: any[];
  addpaymentloading: boolean;
  addpaymenterror: string;
}

export const addPaymentSlice = createSlice({
  name: "addpaymentThunk",
  initialState: {
    addpaymentData: [],
    addpaymentloading: false,
    addpaymenterror: "",
  } as InitialState,
  reducers: {
    showAllPaymentData: (state, action) => {
      console.log("myshow data", state.addpaymentData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addpaymentThunk.pending, (state) => {
        state.addpaymentloading = true;
      })
      .addCase(addpaymentThunk.fulfilled, (state, action) => {
        state.addpaymentloading = false;
        state.addpaymentData = action.payload;
        state.addpaymenterror = ""; // Clear any previous errors
      })
      .addCase(addpaymentThunk.rejected, (state, action) => {
        state.addpaymentloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.addpaymenterror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllPaymentData } = addPaymentSlice.actions;
export default addPaymentSlice.reducer;
