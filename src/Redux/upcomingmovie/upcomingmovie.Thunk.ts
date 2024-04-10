

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getupcomingThunk = createAsyncThunk(
  "getupcomingThunk",
  async (_, { rejectWithValue }) => {
    try {
      const up = await axios.get("http://localhost:5001/comingsoon/get");
      const upcoming = up.data.payload;
      console.log("upcoming payload", upcoming);
      return upcoming;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
