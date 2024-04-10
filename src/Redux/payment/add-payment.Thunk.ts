import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Addpayment {
  // userId: number
  myshowid: number;
  token: string ;
}

export const addPaymentThunk = createAsyncThunk(
  "addPaymentThunk",
  async (addpayment: Addpayment, { rejectWithValue }) => {
    const { myshowid, token } =
      addpayment;
    try {
      const response = await axios.post(
        "http://localhost:5001/payment/addpayment",
        {
          myshowId: myshowid,
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
