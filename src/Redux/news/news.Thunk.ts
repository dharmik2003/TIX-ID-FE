

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const shownews = createAsyncThunk(
  "shownews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/news/get");
      const news = response.data.payload;
      console.log("news payload", news);
      return news;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
