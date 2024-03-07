// import { configureStore } from "@reduxjs/toolkit";
// import LoginSlice from "../Slice/LoginSlice";
// import SignupSlice from "../Slice/SignupSlice";

// export const store=configureStore({

//     reducer:{
//         login:LoginSlice,
//         sign:SignupSlice
//     }
// })

// export type RootState = ReturnType<typeof store.getState>;

// export default store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import LoginSlice from './Login/Login.Slice';
import SignupSlice from './Signup/Signup.Slice';
import MovieSlice from './Movie/Movie.Slice';
import  TheaterDataSlice  from './TheaterData/TheaterData.Slice';
import UpcommaingSlice from './UpcomingMovies/Upcommaing.Slice';
import MovieBookingSlice from './MovieBooking/MovieBooking.Slice';
import MyTicketSlice from './Myticket/MyTicket.Slice';

const rootReducer = combineReducers({
  login: LoginSlice,
  sign: SignupSlice,
  movies: MovieSlice,
  theator: TheaterDataSlice,
  upcomingMovie: UpcommaingSlice,
  movieBooking:MovieBookingSlice,
  myTicket:MyTicketSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;






