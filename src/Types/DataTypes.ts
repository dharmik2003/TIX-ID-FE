// import { PhoneNumber } from "react-phone-number-input";

export interface LoginState {
  phoneNumber: string;
  password: string;
  loginState: boolean;
}
export interface SignUpState {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  SignupState: boolean;
}

/*login or not data pass in home page*/
export interface NavbarProps {
  loginstate: boolean;
  signupstate: boolean;
}

// export interface Details{
// great: {
//       feedback: string;
//       theatername1: {
//         theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };
//       theatername2: {
//         theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };
//       theatername3: {
//         theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };

//     };
//     best: {
//       feedback: string;
//       theatername1: {
//              theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };
//       theatername2: {
//              theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };
//       theatername3: {
//              theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };

//     };
//     good: {
//       feedback: string;
//       theatername1: {
//              theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };
//       theatername2: {
//              theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };
//       theatername3: {
//              theaterid:number;
//         theatername:string;
//         time:string[];
//         ticketprice: number;
//       };

//     };

// }

//poster Movie Date
export interface Movie {
  id: number;
  image: string;
  title: string;
  description: string;
  tag: string;
  like: number;
  duration: string;
  director: string;
  agerating: string;
  releaseDate: string;
  trailer: string;
  key: string;
  rate: string;
}

// Theater Data API Depen...
export interface Theater {
  id: string;
  name: string;
  city: string;
  address: string;
  badge: string;
  // studio: StudioData[];
  dimension: DimensionData[];
}
export type DimensionData = {
  dimensionCategory: string;
  time: string[];
  price: string;
};

export interface State {
  selectedMovie: Movie;
  selectedTheater: Theater;
  selectedDate: string;
  selectedTime: string;
  theater_Index: string;
  type_Index: string;
  selecteddimension: DimensionData;
  selectedtotal: string;
  selectsite: any[];
  selectdiscount: string;
  selectfinalprice: string;
}

//Myticket
export interface Movie {
  id: number;
  name: string;
  image: string;
}
export interface Theater {
  id: string;
  name: string;
  dimensionCategory: string;
  time: string;
  price: number;
}
export interface Date {
  date: string;
}
export interface Time {
  time: string;
}
export interface Seat {
  seat: string[];
}
export interface Dimension {
  dimensionCategory: any;
  Dimension: string[];
}
export interface TicketEntry {
  movie: Movie;
  theater: Theater;
  date: Date;
  time: Time;
  dimension: Dimension;
  seats: Seat[] | null;
  totalPrice: number;
  discount: number;
  finalAmount: number;
  randomnumber: number;
}
export interface MyTicketState {
  tickets: TicketEntry[];
}

//TheaterDataSlice.ts

export interface InitialStateTheater {
  theaterData: TheaterData[];
  theaterloading: boolean;
  error: String;
}

//TheaterData.ts
export type TheaterData = {
  id: string;
  name: string;
  city: string;
  address: string;
  badge: string;
  // studio: StudioData[];
  dimension: DimensionData[];
};

//MOvieSlice.ts

export interface InitialStateMovieData {
  [x: string]: any;
  movies: any;
  moviesData: Movie[];
  loading: boolean;
  error: String;
}
export interface Movie {
  key: string;
  id: number;
  image: string;
  name: string;
  type1: string;
  type2: string;
  type3: string;
  description: string;
  tag: string;
  like: number;
  releaseDate: string;
  imgurl: string;
  trailer: string;
}

export interface Props {
  movie: Movie;
  poster_movie: Movie[];
}

//SignleMovieDetails.tsx

/*UpcomingMovie.ts Data file */
export interface UpMovie {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  tag: string;
  type1: string;
  type2: string;
  type3: string;
}
export interface News {
  id: string;
  title: string;
  image: string;
  trailer: string;
  description: string;
  date: string;
  tag: string;
  like: number;
}
export interface Signup {
  id: string;
  name: string;
  phonenumer: string;
  email: string;
  password: string;
}
