import { createSlice } from "@reduxjs/toolkit";
import { addSignupThunk } from "./add-signup.Thunk";
import { Signup } from "../../../Types/DataTypes";

export interface InitialState {
  addsignupData: Signup[];
  addsignuploading: boolean;
  addsignuperror: string;
}

export const addsignupSlice = createSlice({
  name: "addsignupData",
  initialState: {
    addsignupData: [],
    addsignuploading: false,
    addsignuperror: "",
  } as InitialState,
  reducers: {
    showAllsignupData: (state, action) => {
      console.log("sign post data", state.addsignupData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSignupThunk.pending, (state) => {
        state.addsignuploading = true;
      })
      .addCase(addSignupThunk.fulfilled, (state, action) => {
        state.addsignuploading = false;
        state.addsignupData = action.payload;
        state.addsignuperror = ""; // Clear any previous errors
      })
      .addCase(addSignupThunk.rejected, (state, action) => {
        state.addsignuploading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.addsignuperror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllsignupData } = addsignupSlice.actions;
export default addsignupSlice.reducer;
