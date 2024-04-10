import { createSlice } from "@reduxjs/toolkit";
import { addmyshowThunk } from "./add-myshow.Thunk";

export interface InitialState {
  addmyshowData: any[];
  addmyshowloading: boolean;
  addmyshowerror: string;
}

export const addMyshowSlice = createSlice({
  name: "addmyshowThunk",
  initialState: {
    addmyshowData: [],
    addmyshowloading: false,
    addmyshowerror: "",
  } as InitialState,
  reducers: {
    showAllshowtimeData: (state, action) => {
      console.log("myshow data", state.addmyshowData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addmyshowThunk.pending, (state) => {
        state.addmyshowloading = true;
      })
      .addCase(addmyshowThunk.fulfilled, (state, action) => {
        state.addmyshowloading = false;
        state.addmyshowData = action.payload;
        state.addmyshowerror = ""; // Clear any previous errors
      })
      .addCase(addmyshowThunk.rejected, (state, action) => {
        state.addmyshowloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.addmyshowerror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllshowtimeData } = addMyshowSlice.actions;
export default addMyshowSlice.reducer;
