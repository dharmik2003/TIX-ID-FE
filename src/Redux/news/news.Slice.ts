import { createSlice } from "@reduxjs/toolkit";
import { News } from "../../Types/DataTypes";
import { shownews } from "./news.Thunk";

export interface InitialState {
  newsData: News[];
  newsloading: boolean;
  newserror: string;
}

export const newsSlice = createSlice({
  name: "shownews",
  initialState: {
    newsData: [],
    newsloading: false,
    newserror: "",
  } as InitialState,
  reducers: {
    showAllnewsData: (state, action) => {
      console.log("news data", state.newsData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shownews.pending, (state) => {
        state.newsloading = true;
      })
      .addCase(shownews.fulfilled, (state, action) => {
        state.newsloading = false;
        state.newsData = action.payload;
        state.newserror = "";
      })
      .addCase(shownews.rejected, (state, action) => {
        state.newsloading = false;
        const errorPayload = action.payload as { message?: string }; // Type assertion to define the shape of the payload
        state.newserror = errorPayload.message ?? "Unknown error";
      });
  },
});

export const { showAllnewsData } = newsSlice.actions;
export default newsSlice.reducer;
