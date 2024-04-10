import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface getticket {
  token: string ;
  ticketid:number;
}

export const getTicketsThunk = createAsyncThunk(
  "getMyTicketsThunk",

  async (addticket: getticket, { rejectWithValue }) => {
    const { token,ticketid } = addticket;
    try {
      const response = await axios.post("http://localhost:5001/tickets/get",
      {
          myticketid:ticketid
      },
      {
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
