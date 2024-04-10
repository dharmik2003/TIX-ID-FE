import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LoginSlice from "./Login/Login.Slice";
import SignupSlice from "./Signup/Signup.Slice";
import MovieSlice from "./Movie/get/Movie.Slice";
import TheaterDataSlice from "./TheaterData/TheaterData.Slice";
import MovieBookingSlice from "./MovieBooking/MovieBooking.Slice";
import MyTicketSlice from "./Myticket/MyTicket.Slice";
import newsSlice from "./news/news.Slice";
import addSignupSlice from "./Signup/add/add-signup.Slice";
import getsignupSlice from "./Signup/get/get-signup.Slice";
import getScreenSlice from "./screen/get-screen.Slice";
import getShowtimeSlice from "./showtime/get-showtime.Slice";
import  getupcomingSlice  from "./upcomingmovie/upcomingmovie.Slice";
import  getTheaterDataSlice  from "./theater/get/get.theater.Slice";
import getSeatlabelSlice from "./seats/get/get-seatlabel.Slice";
import  addloginSlice  from "./Login/add-login.Slice";
import  userSlice  from "./useDetails/useDetails.Slice";
import addMyshowSlice from "./myshow/add-myshow.Slice";
import getVoucherSlice from "./Voucher/get-voucher.Slice";
import addPaymentSlice from "./payment/add-payment.Slice";

const rootReducer = combineReducers({
  login: LoginSlice,
  sign: SignupSlice,
  getmovies: MovieSlice,
  theator: TheaterDataSlice,
  // upcoming: upcomingSlice,
  movieBooking: MovieBookingSlice,
  myTicket: MyTicketSlice,
  shownews: newsSlice,
  addsignup: addSignupSlice,
  getsignup: getsignupSlice,
  getscreen: getScreenSlice,
  getshowtime: getShowtimeSlice,
  gettheater: getTheaterDataSlice,
  getseatlabel: getSeatlabelSlice,
  addlogin: addloginSlice,
  userDetails: userSlice,
  addmyshow:addMyshowSlice,
  addpayment:addPaymentSlice,


  getvoucher:getVoucherSlice,
  getupcomingMovie:getupcomingSlice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
