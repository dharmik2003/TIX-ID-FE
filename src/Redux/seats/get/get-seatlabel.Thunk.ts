import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeatlabelThunk = createAsyncThunk(
  "getSeatThunk",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/seatlabel/get");
      const responsedata=response.data.payload
      console.log("Show seat label data",responsedata)
      return responsedata
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
