import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Makepayment {
  myshowId: number;
  token: string ;
}

export const addpaymentThunk = createAsyncThunk(
  "addpaymentThunk",
  async (makepayment: Makepayment, { rejectWithValue }) => {
    const { myshowId, token } =
      makepayment;
    try {
      const response = await axios.post(
        "http://localhost:5001/razorpay/payment",
        {
          myshowid: myshowId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const mushowresult = response.data.payload;
      console.log("myshow payload", mushowresult);
      return mushowresult;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
