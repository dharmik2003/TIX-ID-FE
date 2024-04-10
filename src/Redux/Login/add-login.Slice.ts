import { createSlice } from "@reduxjs/toolkit";
import { addLoginThunk } from "./add-login.Thunk";

export interface InitialStateMovieData {
  loginData: any[];
  loginloading: boolean;
  loginerror: String;
}

export const addloginSlice = createSlice({
  name: "movies",
  initialState: {
    loginData: [],
    loginloading: false,
    loginerror: "",
  } as InitialStateMovieData,
  reducers: {
    showAllData: (state, action) => {
      console.log("state.loginData", state.loginData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLoginThunk.pending, (state) => {
        state.loginloading = true;
      })
      .addCase(addLoginThunk.fulfilled, (state, action) => {
        state.loginloading = false;
        state.loginData = action.payload;
      })
      .addCase(addLoginThunk.rejected, (state, action) => {
        state.loginloading = false;
        state.loginerror = action.payload as string;
      });
  },
});
export const { showAllData } = addloginSlice.actions;
export default addloginSlice.reducer;
