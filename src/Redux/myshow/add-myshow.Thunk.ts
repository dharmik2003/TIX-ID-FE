import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AddMyshow {
  // userId: number
  moiveId: number;
  showtimeId: number ;
  screenId: number ;
  voucher: number ;
  seats: number[] ;
  token: string ;
}

export const addmyshowThunk = createAsyncThunk(
  "addmyshowThunk",
  async (addmyshow: AddMyshow, { rejectWithValue }) => {
    const { moiveId, showtimeId, screenId, voucher, seats, token } =
      addmyshow;
    try {
      const response = await axios.post(
        "http://localhost:5001/myshow/addmyshow",
        {
          movieId: moiveId,
          showtimeId:showtimeId,
          ScreenId:screenId,
          voucher:voucher,
          Seats:seats,
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
