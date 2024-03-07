
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoginState } from '../../Types/DataTypes';

// Define the initial state interface
// export interface LoginState {
//   phoneNumber: string;
//   password: string;
//   loginState: boolean;
// }

// Define the initial state
const initialState: LoginState = {
  phoneNumber: '',
  password: '',
  loginState: false
};

// Create the slice
const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setPhonenumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.loginState = action.payload;
    },
    setloginClean_value:(state)=>{
      state.phoneNumber="";
      state.password=""
    }
  }
});

// Export the actions
export const { setPhonenumber, setPassword, setLoginState, setLogin,setloginClean_value } = LoginSlice.actions;

// Export the reducer
export default LoginSlice.reducer;
