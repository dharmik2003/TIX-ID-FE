import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getTheaterThunk = createAsyncThunk(
  "getTheaterThunk",
  async (args, { rejectWithValue }) => {
    try {
      const response1 = await axios.get("http://localhost:5001/theater/get");
      console.log("bhai theator api maje maro: ", response1.data.payload);
      const datas=response1.data.payload;
      return datas;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
