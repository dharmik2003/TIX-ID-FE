import { createSlice } from "@reduxjs/toolkit";
import { Signup } from "../../../Types/DataTypes";
import { getSignupThunk } from "./get-signup.Thunk";

export interface InitialState {
  getsignupData: Signup[];
  getsignuploading: boolean;
  getsignuperror: string;
}

export const getsignupSlice = createSlice({
  name: "getsignupData",
  initialState: {
    getsignupData: [],
    getsignuploading: false,
    getsignuperror: "",
  } as InitialState,
  reducers: {
    showAllsignupData: (state, action) => {
      console.log("signup get data", state.getsignupData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSignupThunk.pending, (state) => {
        state.getsignuploading = true;
      })
      .addCase(getSignupThunk.fulfilled, (state, action) => {
        state.getsignuploading = false;
        state.getsignupData = action.payload;
        state.getsignuperror = ""; // Clear any previous errors
      })
      .addCase(getSignupThunk.rejected, (state, action) => {
        state.getsignuploading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.getsignuperror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllsignupData } = getsignupSlice.actions;
export default getsignupSlice.reducer;
