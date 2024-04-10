// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// export const addSignupThunk = createAsyncThunk(
//   "addSignupThunk",
//   async (args, { rejectWithValue }) => {
//     try {
//         const { name, phoneNumber, email, password } = userData;
//       const response = await axios.post("http://localhost:5001/auth/signup", {
//         name,
//         phoneNumber,
//         email,
//         password,
//       });
//       const addSignupresult = response.data.payload;
//       console.log("signup payload", addSignupresult);
//       return addSignupresult;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SignupData {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
}

// Define the thunk action creator
export const addSignupThunk = createAsyncThunk(
  "addSignupThunk",
  async (signupData: SignupData, { rejectWithValue }) => {
    const { name, phoneNumber, email, password } = signupData;
    try {
      const response = await axios.post("http://localhost:5001/signup/add", {
        name,
        phoneNumber,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
