import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface loginData {
  phonenumber: string;
  password: string;
}
export const addLoginThunk = createAsyncThunk(
  "postLoginThunk",
  async (loginData:loginData, { rejectWithValue }) => {
        const { phonenumber, password } = loginData;
    try {
      const response = await axios.post("http://localhost:5001/login/add", {
        phoneNumber: phonenumber,
        password:password,
      });
      console.log("login post data", response.data.payload);
      return response.data.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
