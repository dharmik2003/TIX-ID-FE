import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSignupThunk = createAsyncThunk(
  "getSignupThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5001/signup/get");
      console.log("signup get data", response.data.payload);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
