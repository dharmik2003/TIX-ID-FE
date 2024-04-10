
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getScreenThunk = createAsyncThunk(
  "getScreenThunk",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/screen/get");
      const upcommaingresult = response.data.payload;
      console.log("get screen payload", upcommaingresult);
      return upcommaingresult;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
















