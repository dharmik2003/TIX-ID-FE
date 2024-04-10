import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getVoucherThunk = createAsyncThunk(
  "getVoucherThunk",
  async (_, { rejectWithValue }) => {
    try {
      const up = await axios.get("http://localhost:5001/voucher/getvoucher");
      const voucher = up.data.payload;
      console.log("getVoucherThunk payload", voucher);
      return voucher;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
