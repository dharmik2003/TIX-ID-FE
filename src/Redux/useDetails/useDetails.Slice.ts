import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  id: string;
  name: string;
  email:string;
  phoneNumber: string;
  password: string;
  isSignup: boolean;
}

const initialState: LoginState = {
  id: "",
  name: "",
  email:"",
  phoneNumber: "",
  password: "",
  isSignup: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setNAME: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEMAIL: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPHONENUMBER: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPASSWORD: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setIsLOGIN: (state, action: PayloadAction<boolean>) => {
      state.isSignup = action.payload;
    },
    resetLoginState: () => initialState,
  },
});

export const {
  setID,
  setNAME,
  setPHONENUMBER,
  setPASSWORD,
  setIsLOGIN,
  setEMAIL,
  resetLoginState,
} = userSlice.actions;

export default userSlice.reducer;
