import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface Addmyticket {
  token: string ;
}

export const getMyTicketsThunk = createAsyncThunk(
  "getMyTicketsThunk",
  async (addmyticket: Addmyticket, { rejectWithValue }) => {
    const { token } = addmyticket;
    try {
      const response = await axios.get("http://localhost:5001/mytickets/get",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const news = response.data.payload;
      console.log("news payload", news);
      return news;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
