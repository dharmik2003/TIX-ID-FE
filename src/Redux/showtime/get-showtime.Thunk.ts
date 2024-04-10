import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getShowTimeThunk = createAsyncThunk(
  "getShowTimeThunk",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/showtime/get");
      const upcommaingresult = response.data.payload;
      console.log("Show time thunk payload", upcommaingresult);
      return upcommaingresult;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
















