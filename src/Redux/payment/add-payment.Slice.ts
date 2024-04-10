import { createSlice } from "@reduxjs/toolkit";
import { addPaymentThunk } from "./add-payment.Thunk";

export interface InitialState {
  addpaymentData: any[];
  addpaymentloading: boolean;
  addpaymenterror: string;
}

export const addPaymentSlice = createSlice({
  name: "addPaymentThunk",
  initialState: {
    addpaymentData: [],
    addpaymentloading: false,
    addpaymenterror: "",
  } as InitialState,
  reducers: {
    showAllpaymentData: (state, action) => {
      console.log("myshow data", state.addpaymentData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPaymentThunk.pending, (state) => {
        state.addpaymentloading = true;
      })
      .addCase(addPaymentThunk.fulfilled, (state, action) => {
        state.addpaymentloading = false;
        state.addpaymentData = action.payload;
        state.addpaymenterror = ""; // Clear any previous errors
      })
      .addCase(addPaymentThunk.rejected, (state, action) => {
        state.addpaymentloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.addpaymenterror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllpaymentData } = addPaymentSlice.actions;
export default addPaymentSlice.reducer;
