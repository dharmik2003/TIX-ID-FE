import { createSlice } from '@reduxjs/toolkit';
// import { MoviesData, TheaterData } from '../../data';
// interface MovieBookingState {
//   selectedMovie: MoviesData | null;
//   selectedTheater: TheaterData | null;
//   selectedDateTime: Date | null;
// }
const initialState = {
  selectedMovie: {},
  selectedTheater: {},
  selectedDate: "",
  selectedTime: '',
  theater_Index:'',
  type_Index:'',
  selecteddimension:{},
  selectedtotal:"",
  selectsite:[],
  selectdiscount: "",
  selectfinalprice:""
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
    theaterIndex(state, action){
      state.theater_Index = action.payload
    },
    typeIndex(state, action){
      state.type_Index = action.payload
    },
    setdimension(state,action){
      state.selecteddimension = action.payload;
    },
    setDate(state,action){
      state.selectedDate = action.payload;
    },
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

  },
});
export const { setMovieData, setTheaterData, resetMovieBooking, selectTime ,theaterIndex,typeIndex,setdimension,setDate,settotal,setsite,setdiscount,resetsetdiscount,setfinalprice} = MovieBookingSlice.actions;
export default MovieBookingSlice.reducer;