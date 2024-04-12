import { createSlice } from '@reduxjs/toolkit';
// import { MoviesData, TheaterData } from '../../data';
// interface MovieBookingState {
//   selectedMovie: MoviesData | null;
//   selectedTheater: TheaterData | null;
//   selectedDateTime: Date | null;
// }
export const initialState = {
  selectedMovie: {},
  selectedTheater: {},
  selectedDate: "",
  selectedTime: '',
  theater_Index:0,
  screen_Index:0,
  type_Index:0,
  selecteddimension:{},
  selectedtotal:"",
  selectsite:[],
  selectdiscount: "",
  selectedVoucherID:0,
  selectfinalprice:"",
  showtimeID:0,
  selectedmyshowID:0,
  tractionID:""
};

const MovieBookingSlice = createSlice({
  name: 'movieBooking',
  initialState,
  reducers: {
    setMovieData: (state, action) => {
      console.log("Slice Movie che: ",state.selectedMovie)
      state.selectedMovie = action.payload;
    },
    setTheaterData: (state, action) => {
      state.selectedTheater = action.payload.theater;
    },
    resetMovieBooking: (state) => {
  return {
    ...initialState
  };
},

    selectTime(state, action){
      state.selectedTime = action.payload
    },
    settheaterIndex(state, action){
      state.theater_Index = action.payload
    },
    setscreenIndex(state, action){
      state.screen_Index = action.payload
    },
    setdimension(state,action){
      state.selecteddimension = action.payload;
    },
    setDate(state,action){
      state.selectedDate = action.payload;
    },
    // setDateID(state,action){
    //   state.selectedDateID = action.payload;
    // },
    // setTimeID(state,action){
    //   state.selectedTimeID = action.payload;
    // },
    settotal(state,action){
      state.selectedtotal=action.payload
    },
    setsite(state,action){
      state.selectsite=action.payload
    },
    setdiscount(state,action){
      state.selectdiscount=action.payload
    },
    resetsetdiscount(state){
      state.selectdiscount=""
    },
    setfinalprice(state,action){
      state.selectfinalprice=action.payload
    },
    setshowtimeID(state,action){
      state.showtimeID=action.payload
    },
    setVoucherID(state,action){
      state.selectedVoucherID=action.payload
    },
    setmyshowID(state,action){
      state.selectedmyshowID=action.payload
    },
    settractionID(state,action){
      state.tractionID =action.payload
    },

  },
});
export const { setVoucherID, setMovieData, setmyshowID, settractionID,setTheaterData, resetMovieBooking, selectTime ,settheaterIndex,setscreenIndex,setdimension,setDate,settotal,setsite,setdiscount,resetsetdiscount,setfinalprice,setshowtimeID} = MovieBookingSlice.actions;
export default MovieBookingSlice.reducer;