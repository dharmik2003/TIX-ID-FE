// // regular working code----------------------------------------
// import { useParams } from 'react-router-dom';
// import { FiSearch } from "react-icons/fi";
// import { FcFilmReel } from "react-icons/fc";
// import { CiLocationOn } from "react-icons/ci";
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import DateSelector from './Date/DateItems';
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import './MovieDetails.css'
// import { resetMovieBooking, selectTime, setDate, setTheaterData, setdimension,settotal,theaterIndex ,typeIndex } from "../../Redux/MovieBooking/MovieBooking.Slice";
// import { DimensionData,Movie } from "../../Types/DataTypes";

// const MovieDetails = () => {

//   const dispatch = useDispatch()

//   //Fetch API data
//   const {getmovieData, getmovieloading} =  useSelector((state: any) =>  state.getmovies)
//   console.log("Movie Data api: " , getmovieData)
//   const moviesData=getmovieData
//   console.log("defore")
//   //theater
//   const {gettheaterData,gettheaterloading}=useSelector((state:any)=>state.gettheater)
//   console.log("gettheaterData,,,,,,,,",gettheaterData)
//   const theaters=gettheaterData

//   //screen
//   const {getscreenData,getscreenloading,getscreenerror}=useSelector((state:any)=>state.getscreen)
//   const screens=getscreenData;
//     console.log("getscreenData movie details page",screens)

//   //showtime
//   const {getshowtimeData,getshowtimeloading,getshowtimeerror}=useSelector((state:any)=>state.getshowtime)
//   const showtimes=getshowtimeData;
//   console.log("showtime data movie details page",showtimes)
//   console.log("after")


//   //Date Display 

//   const [day, setDay] = useState<string>("");
//   const [dateOfMonth, setDateOfMonth] = useState<number>();
//   const [month, setMonth] = useState<string>("");

//   const handleDateSelect = (date: Date) => {
//       const formattedDay = date.toLocaleDateString('en-US', { weekday: 'long' });
//       const formattedDateOfMonth = date.getDate();
//       const formattedMonth = date.toLocaleDateString('en-US', { month: 'long' });
//       dispatch(setDate(`${formattedDay} ${formattedDateOfMonth} ${formattedMonth}`));
//   }

//   // Filter theater data based on the selected city
//   const [Dimensionname, setDimensionname] = useState<string>("");
//   const [timeformate, settimeformate] = useState<string>("");
//   const [theatername, settheatername] = useState<string>("");


//   const id  = useParams<{ id: string }>(); 
//   const urlId=id.id
//   console.log(urlId)


//   console.log(moviesData)

//   const filteredMovies = moviesData.filter((movie: any) => movie.id == urlId);
//   console.log("filteredMovies",filteredMovies);

//   const { search } = useLocation()
//   console.log(search)

//   //selected Data display moviebookingslice

//   const {selecteddimension,selectedTime,selectedDate,selectedTheater,theater_Index,type_Index} =useSelector((state : any)=>state.movieBooking)
//   console.log("datas from moviesbooking slice",selecteddimension,selectedTime,selectedDate,selectedTheater,theater_Index,type_Index)
//   // console.log(selecteddimension.time)


// //name set in dimension
// useEffect(() => {
//   const dimensionScreens = screens.filter((screen: any) => screen.id === type_Index);
//   console.log("dimensionScreens", dimensionScreens);
//   if (dimensionScreens.length > 0) {
//     setDimensionname(dimensionScreens[0].dimension);
//   }
// }, [type_Index]); // Add screens to the dependency array

// useEffect(() => {
//   const showtime = showtimes.filter((showtime: any) => showtime.id === selectedTime);
//   console.log("showtime", showtime);
//   if (showtime.length > 0) {
//     settimeformate(showtime[0].time); // Assuming `time` is the property you want to set
//   }
// }, [selectedTime]); // Add showtimes to the dependency array

// useEffect(() => {
//   const theatername = theaters.filter((theater: any) => theater.id === theater_Index);
//   console.log("theatername", theatername);
//   if (theatername.length > 0) {
//     settheatername(theatername[0].name); 
//   }
// }, [theater_Index]); // Add showtimes to the dependency array


// // formate time
// function parseTime(timeString:any) {
//   const dateTime = new Date(timeString);

//   // Format hours and minutes with leading zeros
//   const hours = dateTime.getHours().toString().padStart(2, '0');
//   const minutes = dateTime.getMinutes().toString().padStart(2, '0');

//   const formattedTime = `${hours}:${minutes}`;

//   return formattedTime;
// }

// const formattedTime = parseTime(timeformate);
// console.log(formattedTime); // Output: 03:00

// console.log("selectedDimension",Dimensionname)
// console.log("selectedtime",timeformate)
// console.log("selectedtheatername",theatername)

// //searchbar base on city name  : --------------------------------

//   const [selectedCity, setSelectedCity] = useState("Surat");
//   const [uniquetheaterNames, setuniquetheaterNames] = useState<string[]>([]);
//   const [uniqueDimensionNames, setUniqueDimensionNames] = useState<string[]>([]);
//   const [uniquebadgeNames, setuniquebadgeNames] = useState<string[]>([]);
//   // Get unique city names
//   const uniqueCityNames = [ ...new Set(theaters.map((theater: any) => theater.city)) as any];

//   const clearSelectedValues = () => {
//     setSelectedbadge("");
//     setSelectedDimension("");
//   };
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedtheater(e.target.value);
//   };
//   // useEffect(() => {
//   //     const filterdateviseNames = showtimes.filter((showtime:any) => showtime.time === selectedDate);
//   //     console.log("filterdateviseNames",filterdateviseNames)
//   //     const theaterNames = [...new Set(filterdateviseNames.flatMap((theater: any) => theater.name)) as any];
//   //     setuniquetheaterNames(theaterNames);
//   //   }, [theaters, selectedDate]);

//   useEffect(() => {
//       const filtertheaterNames = theaters.filter((theater:any) => theater.city === selectedCity);
//       console.log("filtertheaterNames",filtertheaterNames)
//       const theaterNames = [...new Set(filtertheaterNames.flatMap((theater: any) => theater.name)) as any];
//       setuniquetheaterNames(theaterNames);
//     }, [theaters, selectedCity]);
//   // console.log("uniquetheaterNames--------------",uniquetheaterNames)

//   // Get badge name base on city name  : -------------------------------
//     useEffect(() => {
//       const filteredbadgeNames = theaters.filter((theater:any) => theater.city === selectedCity);
//       console.log(filteredbadgeNames)
//       const badgeNames = [...new Set(filteredbadgeNames.flatMap((theater: any) => theater.badge)) as any];
//       setuniquebadgeNames(badgeNames);
//     }, [theaters, selectedCity]);

//   // Get unique dimention names base on city name : --------------------------------

//     // useEffect(() => {
//     // const filtereddimensionNames = theaters.filter((theater:any) => theater.city === selectedCity);
//     // console.log("filtereddimensionNames",filtereddimensionNames)
//     // const dimensionNames = [...new Set(filtereddimensionNames.flatMap((theater: any,) => screens.map((screen: any) => screen.dimension))) as any];
//     // setUniqueDimensionNames(dimensionNames);
//     // }, [theaters, selectedCity]);

// useEffect(() => {
//   const filtereddimensionNames = theaters.filter((theater:any) => theater.city === selectedCity);
//   console.log("filtereddimensionNames", filtereddimensionNames); // Log filtered theaters
//   const dimensionNames = [...new Set(filtereddimensionNames.flatMap((theater: any) => {
//     const filteredScreens = screens.filter((screen: any) => screen.theater.id === theater.id);
//     console.log("theater ID:", theater.id, "filteredScreens:", filteredScreens);
//     return filteredScreens.map((screen: any) => screen.dimension);
//   }))as any];
//   setUniqueDimensionNames(dimensionNames);
// }, [theaters, screens, selectedCity]);


// // useEffect(()=>{
// //   const screenandtime=showtimes.map
// // },[selectedDate])


//     // console.log("uniqueDimensionNames",uniqueDimensionNames)

//     console.log("uniquetheaterNames",uniquetheaterNames)
//     console.log("uniqueDimensionNames",uniqueDimensionNames)
//     console.log("uniquebadgeNames",uniquebadgeNames)

// //filter data

//     // Filter theater data based on the selected city
//   const [selectedtheater, setSelectedtheater] = useState<string>("");
//   const [selectedbadge, setSelectedbadge] = useState<string>("");
//   const [selectedDimension, setSelectedDimension] = useState<string>("");

// const filteredTheaterData = theaters.filter((theater: any) =>
//   (!selectedCity || theater.city === selectedCity) &&
//   // (!selectedDate || showtimes.time)===selectedDate)&&
// (!selectedtheater || theater.name.toLowerCase().includes(selectedtheater.toLowerCase())) &&
//   (!selectedbadge || theater.badge.includes(selectedbadge)) &&
//   (!selectedDimension || screens.some((screen: any) => screen.dimension === selectedDimension))
// );

// console.log(filteredTheaterData)
// console.log("selectedDimension",selectedDimension)

// //city




// return (
//    <div>
//        <div className='main-con'>
//      <div className='left-con'>
//        <div className='se-container'>
//         <h2 className='se-scheduletitle'>Schedule</h2> 
//         <p className='se-decs'>Select the schedule of the cinema you want to watch</p>
//       </div>
//       {/* Your DateSelector component */}
//       <div className="datepartseaction">
//         {/* <DateSelector onDateSelect={handleDateSelect}/> */}
// <DateSelector onDateSelect={handleDateSelect} />

//       </div>
//       <hr className='hrcsstry'/>

//       {/* Badge dropdown menu */}
//       <div className="locationcity">
//             <div className="locationicon "><CiLocationOn className="fontsizeset" /></div>
//             <div className="loactiondropdown">
//               <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}  className="sizeoodropdown" >
//                 {uniqueCityNames.map((city: string, index: number) => (
//                   <option key={index} value={city}>
//                    {city.charAt(0).toUpperCase() + city.slice(1)}
//                   </option>
//                 ))}
//               </select>              
//             </div>
//       </div>


//       <div className="all-filter-container">
//           {/* searchbar theater menu */}
//           <div className="main-con-div-search">
//               <div className="searchbar-div">
//                   <input
//                   className="searchbar"
//                   type="text"
//                   placeholder="Search..."
//                   // value={selectedtheater} 
//                   onChange={handleSearchChange}
//                 />
//             </div>
//             <div className="searchicon-div">
//                 <FiSearch className="searchicon"/>
//             </div>
//          </div>

//          <div className="threefilter">
//                     <div>
//             <select value={selectedbadge} onChange={(e) => setSelectedbadge(e.target.value)}  className="borderremove dropdown-colorset">
//               <option value="">Badge</option>
//               {uniquebadgeNames.map((city: string, index: number) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <select value={selectedDimension} onChange={(e) => setSelectedDimension(e.target.value)}  className="borderremove dropdown-colorset">
//               <option value="">Dimension</option>
//               {uniqueDimensionNames.map((city: string, index: number) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//         </div>
//           {/* clear button */}
//            <div onClick={clearSelectedValues} className="clearfilter">Clear Filter
//            </div>
//          </div>
//       </div>

//         <div className="main-con-slot">

//     {filteredTheaterData.map((theater: any, index: number) => {
//     // Find all matching screens for the current theater
//     const matchingScreens = screens.filter((screen: any) => screen.theater.id === theater.id);



//   return (
//       <div key={index}>
//         <div className="se-theatername">
//           <div className="se-theater">
//             <div className="filmeicon-div" >
//               <FcFilmReel className="fimeicon"/>
//             </div>
//             <div>
//               <p className="theatername">{theater.name}</p>
//             </div>
//           </div>
//           <div>
//             <p className={theater.badge === 'CGV' ? 'CGV' : theater.badge === 'XXI' ? 'XXI' : theater.badge === 'CINEPOLIS' ? 'CINEPOLIS' : ''}>{theater.badge}</p>
//           </div>
//         </div>
//         <p className="theateraddress">{theater.address}, {theater.city}</p>
//         {matchingScreens.length > 0 ? (
//           <div>
//             {matchingScreens.map((screen: any, screenIndex: number) => (
//               <div key={screenIndex}>
//                 <p>{screen.dimension}</p>
//                 {/* Filter showtimes based on the current screen */}
//               <div className="se-timeslot-div">

// {showtimes
//   .filter((showtime: any) => showtime.screen.id === screen.id)
//   // .sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime())
//   .map((showtime: any, showtimeIndex: number) => {
//     // Extract hours and minutes from the Date object
//     const time = new Date(showtime.time);
//     const hours = time.getHours();
//     const minutes = time.getMinutes();

//     // Construct the time string
//     const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

//     return (
//       <div
//         key={showtimeIndex}
//         className={`timeslot-border ${theater.id === selectedTheater && screen.id === typeIndex && showtime.id === selectedTime ? 'selected' : ''}`}
//         onClick={() => {
//           dispatch(theaterIndex(theater.id));
//           dispatch(selectTime(showtime.id));
//           dispatch(typeIndex(screen.id));
//         }}
//       >
//         {/* Render the constructed time string */}
//         <p className="timenumber">
//           {timeString}
//         </p>
//       </div>
//     );
//   })}



// </div>

//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No screens found for this theater</p>
//         )}
//       </div>
//     );


// ;})}


// </div>









//       </div>

//     <div className='right-con'>
//       <div>
//         {filteredMovies.map((movie: Movie) => (
//          <div className="splitdatatwopart">
//                      <div><img src={movie.image} className='se-movieimg'></img></div>
//                      <div>
//                         <h2 className='se-movietitle'>{movie.name}</h2>
//                      <div className="movie-details">
//                                          <div className="category">
//                                              <ul>
//                                                 <li className="">Tag</li>
//                                                 <li>Duration</li>
//                                                 <li>Director</li>
//                                                 <li>Age Rating</li>
//                                              </ul>
//                                          </div>
//                                         <div className="info">
//                                               <ul>
//                                                 <li> {movie.tag}</li>
//                                                 <li> {movie.duration}</li>
//                                                 <li> {movie.director}</li>
//                                                 <li> {movie.rate}</li>
//                                               </ul>
//                                         </div>
//                     </div>
//                     </div>
//           </div>
//         ))
//       }
//       </div>
//        {/* selected item display */}


//      <div className="rightsidepart00">
//        <div className='se-butcon'>
//        {/* {!selectedDate && !selectedTime && <h2 className='centertext'>Select Date & Time</h2>}
//        {!selectedDate && selectedTime && <h2 className='centertext'>Select Date</h2>}
//       {selectedDate && !selectedTime && <h2 className='centertext'>Select Time</h2> } */}
//        {!selectedDate && !selectedTime && <div className="imageflexset"><h3>Please Select Time And Date</h3><img src="https://github.com/dharmik2003/poster_movie/blob/main/moviepage/datetime.png?raw=true" className="imgclass"/></div>}
//        {!selectedDate && selectedTime &&<div  className="imageflexset"><h2>Please Select Date</h2><img src="https://c.ststat.net/content/sites/KnittingAndStitchingShowSpecial/images/icon-date.png" className="imgclass"/></div>}
//       {selectedDate && !selectedTime && <div  className="imageflexset"><h2>Please Select Time</h2><img src="https://cdn2.iconfinder.com/data/icons/business-office-4/256/Office_Clock-1024.png" className="imgclass"/></div> }
//       {selectedDate && selectedTime && 
//   <div>
//     <h2 className='seatedtheatername'>{theatername}</h2>
//     <p className='selecteddate'>{selectedDate}</p>
//     <div className="dimention-and-date">
//       <p>{Dimensionname}</p>
//       <p>{formattedTime}</p>
//     </div> 
//     <small className='se-but-condition'>*Seat selection can be done after this</small>
//     <div className='se-but-div'>
//       <button className='se-but-booknow'>
//         <Link to={`/movie/${encodeURIComponent(urlId as any)}/sitehomepage`}className="se-Booknow-but">Book Now</Link>
//       </button>
//     </div>
//   </div>
// }

//     </div>
//      </div>

//      </div> 
//      </div>
//    </div>
//   )
// }
// export default MovieDetails;


// // regular working code----------------------------------------
// import { useParams } from 'react-router-dom';
// import { FiSearch } from "react-icons/fi";
// import { FcFilmReel } from "react-icons/fc";
// import { CiLocationOn } from "react-icons/ci";
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import DateSelector from './Date/DateItems';
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import './MovieDetails.css'
// import { resetMovieBooking, selectTime, setDate, setTheaterData, setdimension,settotal,theaterIndex ,typeIndex } from "../../Redux/MovieBooking/MovieBooking.Slice";
// import { DimensionData,Movie } from "../../Types/DataTypes";

// const MovieDetails = () => {

//   const dispatch = useDispatch()

//   //Fetch API data
//   const {getmovieData, getmovieloading} =  useSelector((state: any) =>  state.getmovies)
//   console.log("Movie Data api: " , getmovieData)
//   const moviesData=getmovieData
//   console.log("defore")
//   //theater
//   const {gettheaterData,gettheaterloading}=useSelector((state:any)=>state.gettheater)
//   console.log("gettheaterData,,,,,,,,",gettheaterData)
//   const theaters=gettheaterData

//   //screen
//   const {getscreenData,getscreenloading,getscreenerror}=useSelector((state:any)=>state.getscreen)
//   const screens=getscreenData;
//     console.log("getscreenData movie details page",screens)

//   //showtime
//   const {getshowtimeData,getshowtimeloading,getshowtimeerror}=useSelector((state:any)=>state.getshowtime)
//   const showtimes=getshowtimeData;
//   console.log("showtime data movie details page",showtimes)
//   console.log("after")

//   //seatlabel
//     const {getseatlabelData,getseatlabelloading,getseatlableerror}=useSelector((state:any)=>state.getseatlabel)

//   console.log("getseatlabelData from moviedetails",getseatlabelData)
//   const seatlabels=getseatlabelData


//   //Date Display 

//   const [day, setDay] = useState<string>("");
//   const [dateOfMonth, setDateOfMonth] = useState<number>();
//   const [month, setMonth] = useState<string>("");

//   const handleDateSelect = (date: Date) => {
//       const formattedDay = date.toLocaleDateString('en-US', { weekday: 'long' });
//       const formattedDateOfMonth = date.getDate();
//       const formattedMonth = date.toLocaleDateString('en-US', { month: 'long' });
//       dispatch(setDate(`${formattedDay} ${formattedDateOfMonth} ${formattedMonth}`));
//   }

//   // Filter theater data based on the selected city
//   const [Dimensionname, setDimensionname] = useState<string>("");
//   const [timeformate, settimeformate] = useState<string>("");
//   const [theatername, settheatername] = useState<string>("");


//   const id  = useParams<{ id: string }>(); 
//   const urlId=id.id
//   console.log(urlId)


//   console.log(moviesData)

//   const filteredMovies = moviesData.filter((movie: any) => movie.id == urlId);
//   console.log("filteredMovies",filteredMovies);

//   const { search } = useLocation()
//   console.log(search)

//   //selected Data display moviebookingslice

//   const {selecteddimension,selectedTime,selectedDate,selectedTheater,theater_Index,type_Index} =useSelector((state : any)=>state.movieBooking)
//   console.log("datas from moviesbooking slice",selecteddimension,selectedTime,selectedDate,selectedTheater,theater_Index,type_Index)
//   // console.log(selecteddimension.time)


// //name set in dimension
// useEffect(() => {
//   const dimensionScreens = screens.filter((screen: any) => screen.id === type_Index);
//   console.log("dimensionScreens", dimensionScreens);
//   if (dimensionScreens.length > 0) {
//     setDimensionname(dimensionScreens[0].dimension);
//   }
// }, [type_Index]); // Add screens to the dependency array

// useEffect(() => {
//   const showtime = showtimes.filter((showtime: any) => showtime.id === selectedTime);
//   console.log("showtime", showtime);
//   if (showtime.length > 0) {
//     settimeformate(showtime[0].time); // Assuming `time` is the property you want to set
//   }
// }, [selectedTime]); // Add showtimes to the dependency array

// useEffect(() => {
//   const theatername = theaters.filter((theater: any) => theater.id === theater_Index);
//   console.log("theatername", theatername);
//   if (theatername.length > 0) {
//     settheatername(theatername[0].name); 
//   }
// }, [theater_Index]); // Add showtimes to the dependency array


// // formate time
// function parseTime(timeString:any) {
//   const dateTime = new Date(timeString);

//   // Format hours and minutes with leading zeros
//   const hours = dateTime.getHours().toString().padStart(2, '0');
//   const minutes = dateTime.getMinutes().toString().padStart(2, '0');

//   const formattedTime = `${hours}:${minutes}`;

//   return formattedTime;
// }

// const formattedTime = parseTime(timeformate);
// console.log(formattedTime); // Output: 03:00

// console.log("selectedDimension",Dimensionname)
// console.log("selectedtime",timeformate)
// console.log("selectedtheatername",theatername)

// //searchbar base on city name  : --------------------------------

//   const [selectedCity, setSelectedCity] = useState("Surat");
//   const [uniquetheaterNames, setuniquetheaterNames] = useState<string[]>([]);
//   const [uniqueDimensionNames, setUniqueDimensionNames] = useState<string[]>([]);
//   const [uniquebadgeNames, setuniquebadgeNames] = useState<string[]>([]);
//   // Get unique city names
//   const uniqueCityNames = [ ...new Set(theaters.map((theater: any) => theater.city)) as any];

//   const clearSelectedValues = () => {
//     setSelectedbadge("");
//     setSelectedDimension("");
//   };
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedtheater(e.target.value);
//   };
//   // useEffect(() => {
//   //     const filterdateviseNames = showtimes.filter((showtime:any) => showtime.time === selectedDate);
//   //     console.log("filterdateviseNames",filterdateviseNames)
//   //     const theaterNames = [...new Set(filterdateviseNames.flatMap((theater: any) => theater.name)) as any];
//   //     setuniquetheaterNames(theaterNames);
//   //   }, [theaters, selectedDate]);

//   useEffect(() => {
//       const filtertheaterNames = theaters.filter((theater:any) => theater.city === selectedCity);
//       console.log("filtertheaterNames",filtertheaterNames)
//       const theaterNames = [...new Set(filtertheaterNames.flatMap((theater: any) => theater.name)) as any];
//       setuniquetheaterNames(theaterNames);
//     }, [theaters, selectedCity]);
//   // console.log("uniquetheaterNames--------------",uniquetheaterNames)

//   // Get badge name base on city name  : -------------------------------
//     useEffect(() => {
//       const filteredbadgeNames = theaters.filter((theater:any) => theater.city === selectedCity);
//       console.log(filteredbadgeNames)
//       const badgeNames = [...new Set(filteredbadgeNames.flatMap((theater: any) => theater.badge)) as any];
//       setuniquebadgeNames(badgeNames);
//     }, [theaters, selectedCity]);

//   // Get unique dimention names base on city name : --------------------------------

//     // useEffect(() => {
//     // const filtereddimensionNames = theaters.filter((theater:any) => theater.city === selectedCity);
//     // console.log("filtereddimensionNames",filtereddimensionNames)
//     // const dimensionNames = [...new Set(filtereddimensionNames.flatMap((theater: any,) => screens.map((screen: any) => screen.dimension))) as any];
//     // setUniqueDimensionNames(dimensionNames);
//     // }, [theaters, selectedCity]);

// useEffect(() => {
//   const filtereddimensionNames = theaters.filter((theater:any) => theater.city === selectedCity);
//   console.log("filtereddimensionNames", filtereddimensionNames); // Log filtered theaters
//   const dimensionNames = [...new Set(filtereddimensionNames.flatMap((theater: any) => {
//     const filteredScreens = screens.filter((screen: any) => screen.theater.id === theater.id);
//     console.log("theater ID:", theater.id, "filteredScreens:", filteredScreens);
//     return filteredScreens.map((screen: any) => screen.dimension);
//   }))as any];
//   setUniqueDimensionNames(dimensionNames);
// }, [theaters, screens, selectedCity]);





//     // console.log("uniqueDimensionNames",uniqueDimensionNames)

//     console.log("uniquetheaterNames",uniquetheaterNames)
//     console.log("uniqueDimensionNames",uniqueDimensionNames)
//     console.log("uniquebadgeNames",uniquebadgeNames)

// //filter data

//     // Filter theater data based on the selected city
//   const [selectedtheater, setSelectedtheater] = useState<string>("");
//   const [selectedbadge, setSelectedbadge] = useState<string>("");
//   const [selectedDimension, setSelectedDimension] = useState<string>("");

// const filteredTheaterData = theaters.filter((theater: any) =>
//   (!selectedCity || theater.city === selectedCity) &&
//   // (!selectedDate || showtimes.time)===selectedDate)&&
// (!selectedtheater || theater.name.toLowerCase().includes(selectedtheater.toLowerCase())) &&
//   (!selectedbadge || theater.badge.includes(selectedbadge)) &&
//   (!selectedDimension || screens.some((screen: any) => screen.dimension === selectedDimension))
// );

// console.log(filteredTheaterData)
// console.log("selectedDimension",selectedDimension)

// //city
// console.log("selectedDate",selectedDate)

// useEffect((

// ) => {} ,[selectedDate])

//   return (
//    <div className='mainprocon'>
//       <div className='main-con'>
//       <div className='left-con'>
//         <div className='se-container'>
//           <h2 className='se-scheduletitle'>Schedule</h2> 
//           <p className='se-decs'>Select the schedule of the cinema you want to watch</p>
//         </div>
//         {/* Your DateSelector component */}
//         <div className="datepartseaction">
//           {/* <DateSelector onDateSelect={handleDateSelect}/> */}
//   <DateSelector onDateSelect={handleDateSelect} />

//         </div>
//         <hr className='hrcsstry'/>

//             {/* Badge dropdown menu */}
//         <div className="locationcity">
//               <div className="locationicon "><CiLocationOn className="fontsizeset" /></div>
//               <div className="loactiondropdown">
//                 <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}  className="sizeoodropdown" >
//                   {uniqueCityNames.map((city: string, index: number) => (
//                     <option key={index} value={city}>
//                     {city.charAt(0).toUpperCase() + city.slice(1)}
//                     </option>
//                   ))}
//                 </select>              
//               </div>
//         </div>


//         <div className="all-filter-container">
//             {/* searchbar theater menu */}
//             <div className="main-con-div-search">
//                 <div className="searchbar-div">
//                     <input
//                     className="searchbar"
//                     type="text"
//                     placeholder="Search..."
//                     // value={selectedtheater} 
//                     onChange={handleSearchChange}
//                   />
//               </div>
//               <div className="searchicon-div">
//                   <FiSearch className="searchicon"/>
//               </div>
//           </div>

//           <div className="threefilter">
//                       <div>
//               <select value={selectedbadge} onChange={(e) => setSelectedbadge(e.target.value)}  className="borderremove dropdown-colorset">
//                 <option value="">Badge</option>
//                 {uniquebadgeNames.map((city: string, index: number) => (
//                   <option key={index} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <select value={selectedDimension} onChange={(e) => setSelectedDimension(e.target.value)}  className="borderremove dropdown-colorset">
//                 <option value="">Dimension</option>
//                 {uniqueDimensionNames.map((city: string, index: number) => (
//                   <option key={index} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//           </div>
//             {/* clear button */}
//             <div onClick={clearSelectedValues} className="clearfilter">Clear Filter
//             </div>
//           </div>
//         </div>



//         <div className='theaterscrollbar'>

//           <div className="main-con-slot">
//     {filteredTheaterData.map((theater: any, index: number) => {
//       // Find all matching screens for the current theater
//       const matchingScreens = screens.filter((screen: any) => screen.theater.id === theater.id);

//       return (
//         <div key={index}>
//           <div className="se-theatername">
//             <div className="se-theater">
//               <div className="filmeicon-div" >
//                 <FcFilmReel className="fimeicon"/>
//               </div>
//               <div>
//                 <p className="theatername">{theater.name}</p>
//               </div>
//             </div>
//             <div>
//               <p className={theater.badge === 'CGV' ? 'CGV' : theater.badge === 'XXI' ? 'XXI' : theater.badge === 'CINEPOLIS' ? 'CINEPOLIS' : ''}>{theater.badge}</p>
//             </div>
//           </div>
//           <p className="theateraddress">{theater.address}, {theater.city}</p>
//           {matchingScreens.length > 0 ? (
//             <div>
//               {matchingScreens.map((screen: any, screenIndex: number) => (
//                 <div key={screenIndex}>
//                   <p>{screen.dimension}</p>
//                   {/* Filter showtimes based on the current screen */}
//                 {/* <div className="se-timeslot-div">
//   {showtimes
//     .filter((showtime: any) => showtime.screen.id === screen.id)
//     .sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime())
//     .map((showtime: any, showtimeIndex: number) => (
//       <div
//         key={showtimeIndex}
//         className={`timeslot-border ${theater.id === selectedTheater && screen.id === typeIndex && showtime.id === selectedTime ? 'selected' : ''}`}

//         // className={`timeslot-border ${index === selectedTheater && screen.id === typeIndex && showtime.id === selectedTime ? 'selected' : ''}`}
//         onClick={() => {
//           // Dispatch actions with appropriate payloads
//           dispatch(theaterIndex(theater.id)); // Pass theater ID
//           dispatch(selectTime(showtime.id)); // Pass showtime ID
//           dispatch(typeIndex(screen.id)); // Pass dimension
//           // dispatch(settotal(showtime.price));
//         }}
//       >
//         <p className="timenumber">
//           {new Date(showtime.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         </p>
//       </div>
//     ))}

//   </div> */}
//   {/* <div className="se-timeslot-div">
//     {showtimes
//       .filter((showtime: any) => {
//         // Filter out past showtimes
//         return new Date(showtime.time) > new Date();
//       })
//       .filter((showtime: any) => showtime.screen.id === screen.id)
//       .sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime())
//       .map((showtime: any, showtimeIndex: number) => {
//         const isAllBooked = showtimes
//           .filter((st: any) => st.screen.id === screen.id)
//           .every((st: any) => st.isBooked);

//         // Check if this specific showtime is booked
//         const isBooked = showtime.isBooked;
//         return (<div
//           key={showtimeIndex}
//         className={`timeslot-border ${isAllBooked ? 'housefull' : ''} ${theater.id === selectedTheater && screen.id === typeIndex && showtime.id === selectedTime ? 'selected' : ''}`}
//           onClick={() => {
//             // Dispatch actions with appropriate payloads
//             dispatch(theaterIndex(theater.id)); // Pass theater ID
//             dispatch(selectTime(showtime.id)); // Pass showtime ID
//             dispatch(typeIndex(screen.id)); // Pass dimension
//             // dispatch(settotal(showtime.price));
//           }}
//         >
//           <p className="timenumber">
//             {new Date(showtime.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//           </p>
//         </div>)
//     })}
//   </div> */}
//   {/* <div className="se-timeslot-div">
//     {showtimes
//       // .filter((showtime: any) => {
//       //   // Filter out past showtimes
//       //   return new Date(showtime.time) > new Date();
//       // })
//       .filter((showtime: any) => showtime.screen.id === screen.id)
//       .sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime())
//       .map((showtime: any, showtimeIndex: number) => {
//         // Check if all seats are booked for this screen


//         return (
//           <div
//             key={showtimeIndex}
//             className={`timeslot-border ${isAllBooked ? 'housefull' : ''} ${theater.id === selectedTheater && screen.id === typeIndex && showtime.id === selectedTime ? 'selected' : ''}`}
//             onClick={() => {
//               // Dispatch actions with appropriate payloads
//               dispatch(theaterIndex(theater.id)); // Pass theater ID
//               dispatch(selectTime(showtime.id)); // Pass showtime ID
//               dispatch(typeIndex(screen.id)); // Pass dimension
//               // dispatch(settotal(showtime.price));
//             }}
//           >
//             <p className="timenumber">
//               {new Date(showtime.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//             </p>
//           </div>
//         );
//       })}
//   </div> */}

//   <div className="se-timeslot-div">
//     {showtimes
//       .filter((showtime: any) => {
//         // Filter out past showtimes
//         return new Date(showtime.time) > new Date();
//       })
//       .filter((showtime: any) => showtime.screen.id === screen.id)
//       .sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime())
//       .map((showtime: any, showtimeIndex: number) => {
//         // Check if all seats are booked for this screen
//           // Filter seatlabels for the current showtime
//         const selectedSeats = seatlabels.filter((seatlabel: any) => seatlabel.showTime.id === showtime.id);
//         console.log("selectedSeats",selectedSeats)


//         // Check if all seats for this showtime are booked
//   // const isAllBooked = selectedSeats.length > 0 && selectedSeats.map((seat: any) => seat.every((isBooked: boolean) => isBooked))
//   const isAllBooked = selectedSeats.length > 0 && selectedSeats.every((seat:any) => seat.isbooked);
//   console.log("isAllBooked", isAllBooked);



//         return (
//           <div
//             key={showtimeIndex}
//             className={`timeslot-border ${isAllBooked ? 'housefull' : ''} ${theater.id === selectedTheater && screen.id === typeIndex && showtime.id === selectedTime ? 'selected' : ''}`}
//             onClick={() => {
//               // Dispatch actions with appropriate payloads
//               dispatch(theaterIndex(theater.id)); // Pass theater ID
//               dispatch(selectTime(showtime.id)); // Pass showtime ID
//               dispatch(typeIndex(screen.id)); // Pass dimension
//               // dispatch(settotal(showtime.price));
//             }}
//           >
//             <p className="timenumber">
//               {new Date(showtime.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//             </p>
//           </div>
//         );
//       })}
//   </div>






//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No screens found for this theater</p>
//           )}
//         </div>
//       );
//     })}
//   </div>

//         </div>









//         </div>

//           <div className='stcikyclass'>
//             <div className='right-con'>
//       <div>
//         {filteredMovies.map((movie: Movie) => (
//          <div className="splitdatatwopart">
//                      <div><img src={movie.image} className='se-movieimg'></img></div>
//                      <div>
//                         <h2 className='se-movietitle'>{movie.name}</h2>
//                      <div className="movie-details">
//                                          <div className="category">
//                                              <ul>
//                                                 <li className="">Tag</li>
//                                                 <li>Duration</li>
//                                                 <li>Director</li>
//                                                 <li>Age Rating</li>
//                                              </ul>
//                                          </div>
//                                         <div className="info">
//                                               <ul>
//                                                 <li> {movie.tag}</li>
//                                                 <li> {movie.duration}</li>
//                                                 <li> {movie.director}</li>
//                                                 <li> {movie.rate}</li>
//                                               </ul>
//                                         </div>
//                     </div>
//                     </div>
//           </div>
//         ))
//       }
//       </div>
//        {/* selected item display */}


//      <div className="rightsidepart00">
//        <div className='se-butcon'>
//        {/* {!selectedDate && !selectedTime && <h2 className='centertext'>Select Date & Time</h2>}
//        {!selectedDate && selectedTime && <h2 className='centertext'>Select Date</h2>}
//       {selectedDate && !selectedTime && <h2 className='centertext'>Select Time</h2> } */}
//        {!selectedDate && !selectedTime && <div className="imageflexset"><h3>Please Select Time And Date</h3><img src="https://github.com/dharmik2003/poster_movie/blob/main/moviepage/datetime.png?raw=true" className="imgclass"/></div>}
//        {!selectedDate && selectedTime &&<div  className="imageflexset"><h2>Please Select Date</h2><img src="https://c.ststat.net/content/sites/KnittingAndStitchingShowSpecial/images/icon-date.png" className="imgclass"/></div>}
//       {selectedDate && !selectedTime && <div  className="imageflexset"><h2>Please Select Time</h2><img src="https://cdn2.iconfinder.com/data/icons/business-office-4/256/Office_Clock-1024.png" className="imgclass"/></div> }
//       {selectedDate && selectedTime && 
//   <div>
//     <h2 className='seatedtheatername'>{theatername}</h2>
//     <p className='selecteddate'>{selectedDate}</p>
//     <div className="dimention-and-date">
//       <p>{Dimensionname}</p>
//       <p>{formattedTime}</p>
//     </div> 
//     <small className='se-but-condition'>*Seat selection can be done after this</small>
//     <div className='se-but-div'>
//       <button className='se-but-booknow'>
//         <Link to={`/movie/${encodeURIComponent(urlId as any)}/sitehomepage`}className="se-Booknow-but">Book Now</Link>
//       </button>
//     </div>
//   </div>
// }

//     </div>
//      </div>

//      </div> 

//           </div>


//      </div>

//    </div>
//   )
// }
// export default MovieDetails;




// regular working code----------------------------------------
import { useParams } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { FcFilmReel } from "react-icons/fc";
import { CiLocationOn } from "react-icons/ci";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DateSelector from './Date/DateItems';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './MovieDetails.css'
import { resetMovieBooking, selectTime, setDate,  setTheaterData, setdimension, settotal, settheaterIndex, setscreenIndex, setshowtimeID } from "../../Redux/MovieBooking/MovieBooking.Slice";
import { DimensionData, Movie } from "../../Types/DataTypes";
import Spinner from '../Spinner/Spinner';

const MovieDetails = () => {


  const id = useParams<{ id: string }>();
  const urlId = id.id
  console.log(urlId)

   type Showtime = {
    time: any;
    id: number;
    screen: {
      id: number;
      name: string;
      theater: {
        id: number;
        name: string;
        address: string;
        badge: string;
        city: string;
      };
    };
  };

  type TheaterMap = {
    [theaterId: number]: {
      id: number; // Add id property here
      name: string;
      address: string;
      city: string;
      badge: string;
      screens: {
        [screenId: number]: {
          id: number;
          name: string;
          showtimes: { id: number; time: string }[];
        };
      };
    };
  };



  const dispatch = useDispatch()

  //All API call
  const { selectedMovie, selectedDate, selecteddimension, selectedTime, selectsite, selectedtotal, selectdiscount, selectfinalprice, theater_Index, screen_Index, showtimeID } = useSelector((state: any) => state.movieBooking);


  //movie
  const { getmovieData, getmovieloading } = useSelector((state: any) => state.getmovies)
  console.log("Movie Data api: ", getmovieData)
  const moviesData = getmovieData
  console.log("defore")

  //filter movie shideshow
  const filteredMovies = moviesData.filter((movie: any) => movie.id == urlId);
  console.log("filteredMovies", filteredMovies);

  //theater
  const { gettheaterData, gettheaterloading } = useSelector((state: any) => state.gettheater)
  console.log("gettheaterData,,,,,,,,", gettheaterData)
  const theaters = gettheaterData

  //filter theater base one id
  const filteredTheater = gettheaterData.find((theater: any) => theater.id == theater_Index);
  console.log("filteredTheater===", filteredMovies);

  //screen
  const { getscreenData, getscreenloading, getscreenerror } = useSelector((state: any) => state.getscreen)
  const screens = getscreenData;
  console.log("getscreenData movie details page", screens)


  let filterscreen
  if (screen_Index){
   filterscreen = getscreenData.find((screen: any) => screen.id == screen_Index)
  console.log("filterscreen--", filterscreen.dimension)
  }
  
  //showtime
  const { getshowtimeData, getshowtimeloading, getshowtimeerror } = useSelector((state: any) => state.getshowtime)
  const showtimes = getshowtimeData;
  console.log("showtime data movie details page", showtimes)
  console.log("after")

  //seatlabel
  const { getseatlabelData, getseatlabelloading, getseatlableerror } = useSelector((state: any) => state.getseatlabel)
  console.log("getseatlabelData from moviedetails", getseatlabelData)
  const seatlabels = getseatlabelData


  // const [isoDate, setIsoDate] = useState<Date | null>(null);
  const [isoString, setIsoString] = useState<string>("");


  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  let data = "Surat";

  
  const handleDateSelect =async (date: any) => {
    
    const formattedFirstAvailableDate = date ? formatDate(date) : formatDate(date[0]);
    console.log("selected111", formattedFirstAvailableDate)
    
    setDate(formattedFirstAvailableDate)
    setIsoString(formattedFirstAvailableDate);
  }

  

  const [selectedCity, setSelectedCity] = useState<string>('Surat');
  const [selectedbadge, setSelectedbadge] = useState<string>("");
  const [selectedDimension, setSelectedDimension] = useState<string>("");
  const [selectedtheater, setSelectedtheater] = useState<string>("");

  useEffect(() => {
    console.log("showtimes", showtimes); 
    let filteredShowtimes = showtimes.filter((showtime: any) =>
      showtime.movie.id == urlId && showtime.date == selectedDate && showtime.screen.theater.city === selectedCity 
  );
    console.log("selectedtheater", selectedtheater);
    if (selectedbadge){
      filteredShowtimes = showtimes.filter((showtime: any) =>
        showtime.movie.id == urlId && showtime.date == selectedDate && showtime.screen.theater.city === selectedCity && showtime.screen.theater.badge === selectedbadge )
    }
    
    else if (selectedtheater) {
      let selecttheater = selectedtheater.trim().toLocaleLowerCase();
      console.log("selecttheater", selecttheater)
      filteredShowtimes = showtimes.filter((showtime: any) => {
        if (showtime.screen.theater && showtime.screen.theater.name) {
          let dataname = showtime.screen.theater.name.trim().toLocaleLowerCase();
          console.log("dataname",dataname)
          return (
            showtime.movie.id == urlId &&
            showtime.date == selectedDate &&
            showtime.screen.theater.city === selectedCity &&
            dataname.includes(selecttheater)
          );
        }
        return false; 
      });
    }



    
    else if (selectedDimension){
      filteredShowtimes = showtimes.filter((showtime: any) =>
        showtime.movie.id == urlId && showtime.date == selectedDate && showtime.screen.theater.city === selectedCity && showtime.screen.dimension === selectedDimension)
      
    }

    setShowtimeDetails(filteredShowtimes);
    setfilteredShowtimes(filteredShowtimes);
    console.log("showtimes", showtimes)
    console.log("selectedDate", selectedDate)
    console.log("filteredShowtimes", filteredShowtimes, urlId);

    const screens = filteredShowtimes.map((showtime: any) => {
      const screenData = getscreenData.find((screen: any) => screen.id);
      return screenData;
    });

    console.log("screens", screens)


    const validScreens = screens.filter((screen: any) => screen);
    setScreenDetails(validScreens);
    console.log("validScreens", validScreens)

    const theaterIds = validScreens.map((screen: any) => screen.theater.id);
    const uniqueTheaterIds = [...new Set(theaterIds) as any];

    console.log("uniqueTheaterIds", uniqueTheaterIds)

    const theaterDetailsPromises = uniqueTheaterIds.map(async (theaterId: any) => {
      const theaterData = await fetchTheaterData(theaterId);
      return theaterData;
    });

    Promise.all(theaterDetailsPromises).then((theaters: any) => {
      setTheaterDetails(theaters);
    });

  const movieDetails = getmovieData.find((movie: any) => movie.id === urlId);
    console.log("movieDetails", movieDetails)
    setMovieDetails(movieDetails);
  }, [urlId, getshowtimeData, getscreenData, getmovieData, selectedDate, selectedCity, selectedbadge, selectedtheater, selectedDimension]);


  const [movieDetails, setMovieDetails] = useState(null);
  const [theaterDetails, setTheaterDetails] = useState([]);
  const [screenDetails, setScreenDetails] = useState([]);
  const [showtimeDetails, setShowtimeDetails] = useState([]);
  const [filteredShowtimes, setfilteredShowtimes] = useState([]);

  console.log("theaterDetails", theaterDetails)
  const fetchTheaterData = async (theaterId: any) => {
    return {
      id: theaterId,
    };
  };
  //----------------------------------------.
  // Define types for showtime and theater




  // Get the current time
  const currentTime = new Date();
  const formattedcurrentTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log("currentTime", formattedcurrentTime)
  
  const theaterMap: TheaterMap = {};
  
filteredShowtimes.forEach((showtime: any) => {
  if (!showtime || !showtime.screen || !showtime.screen.theater) return;

  const { id: theaterId, name: theaterName, address, city, badge } = showtime.screen.theater;
  const { id: screenId, dimension: screenName } = showtime.screen;

  console.log("showtime.screen.theater", showtime.screen.theater);
  console.log("showtime.screen", showtime.screen);
  console.log("showtime.screen.dimension", showtime.screen.dimension ); // Log screen dimension
  const showtimeDate = new Date(showtime.date);
  console.log("------------", showtimeDate);

  if (!theaterMap[theaterId]) {
    console.log("showtheaterdetails", { name: theaterName, address, city, badge, screens: {} });
    theaterMap[theaterId] = { id: theaterId, name: theaterName, address, city, badge, screens: {} };
  }

  if (!theaterMap[theaterId].screens[screenId]) {
    console.log("Screen", screenName);
    console.log("screedetails", { name: screenName, showtimes: [] });
    theaterMap[theaterId].screens[screenId] = { id: screenId, name: screenName, showtimes: [] };
  }

  // Push each showtime to the corresponding screen's showtimes array
  theaterMap[theaterId].screens[screenId].showtimes.push({
    id: showtime.id,
    time: showtime.time,

  });
});

//filter city vise

// const uniqueCityNames = [...new Set(theaters.map((theater: any) => theater.city)) as any];
  // Get unique city names from theaters
  const allUniqueCityNames = [...new Set(theaters.map((theater: any) => theater.city)) as any];

  // Ensure "Surat" is always listed first
  const uniqueCityNames = ['Surat', ...allUniqueCityNames.filter(city => city !== 'Surat')];

  // Now 'uniqueCityNames' contains all unique city names with "Surat" listed first

  const [uniquetheaterNames, setuniquetheaterNames] = useState<string[]>([]);
  const [uniqueDimensionNames, setUniqueDimensionNames] = useState<string[]>([]);
  const [uniquebadgeNames, setuniquebadgeNames] = useState<string[]>([]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedtheater(e.target.value);
    console.log("handleSearchChange",e.target.value)
  };
  const clearSelectedValues = () => {
    setSelectedbadge("");
    setSelectedDimension("");
    setSelectedtheater("");
    setSelectedDimension("");
  };


  //searchbar base on city name  : --------------------------------

  useEffect(() => {
    const filtertheaterNames = theaters.filter((theater: any) => theater.city === selectedCity);
    const theaterNames = [...new Set(filtertheaterNames.flatMap((theater: any) => theater.name)) as any];
    setuniquetheaterNames(theaterNames);
  }, [theaters, selectedCity]);
  // console.log("uniquetheaterNames--------------",uniquetheaterNames)

  // Get badge name base on city name  : -------------------------------
  useEffect(() => {
    const filteredbadgeNames = theaters.filter((theater: any) => theater.city === selectedCity);
    const badgeNames = [...new Set(filteredbadgeNames.flatMap((theater: any) => theater.badge)) as any];
    setuniquebadgeNames(badgeNames);
  }, [theaters, selectedCity]);

  // Get unique dimention names base on city name : --------------------------------

  useEffect(() => {
    const filtereddimensionNames = showtimes.filter((showtime: any) => showtime.screen.theater.city === selectedCity && showtime.movie.id == urlId && showtime.date == selectedDate);
    console.log("filtereddimensionNames", filtereddimensionNames)
    const dimensionNames = [...new Set(filtereddimensionNames.flatMap((theater: any) => theater.screen.dimension)) as any];
    console.log("dimensionNames", dimensionNames)
    setUniqueDimensionNames(dimensionNames);
  }, [showtimes, selectedCity]);
  // console.log("uniqueDimensionNames",uniqueDimensionNames)

  console.log("uniquetheaterNames", uniquetheaterNames)
  console.log("uniqueDimensionNames", uniqueDimensionNames)
  console.log("uniquebadgeNames", uniquebadgeNames)



  // const handleTimeSelection = (theaterId:number, screenId:number, selectedTime:any) => {
  //   dispatch(selectTime(selectedTime));
  //   dispatch(theaterIndex(theaterId));
  //   dispatch(typeIndex(screenId));
  // };


  //loading delay in theater data
  // const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // useEffect(() => {
  //   // Simulate loading process
  //   setTimeout(() => {
  //     setIsInitialLoadComplete(true);
  //   }, 2000); // Adjust the delay to match your loading time
  // }, []);


  //showtime id store on slice 

  //showtime
  


  // if (selectedDate && selectedTime) {
  //   console.log("showtimeID-1", selectedDate);
  //   console.log("showtimeID-2", selectedTime);
  //   const showtimeID = showtimes.find((showtime:any) => showtime.date === selectedDate && showtime.time === selectedTime);
  //   dispatch(setshowtimeID(showtimeID.id))
  //   console.log("showtimeID", showtimeID.id);
  // }

  const [loading, setLoading] = useState(true);
  const timeoutId =()=>{ setTimeout(() => {
      console.log('Timeout completed');
      setLoading(false);
  }, 1000);
  }
  useEffect(()=>{
    timeoutId()
  },[])

 return (
    // <div className='mainprocon'>
    <div>
     {
       !loading ? (
      <div className='main-con'>
        <div className='left-con'>
          <div className='se-container'>
            <h2 className='se-scheduletitle'>Schedule</h2>
            <p className='se-decs'>Select the schedule of the cinema you want to watch</p>
          </div>
          <div className="datepartseaction">
           <DateSelector onDateSelect={handleDateSelect}/>
          </div>
          <hr className='hrcsstry' />


         {/* Badge dropdown menu */}
         <div className="locationcity">
           <div className="locationicon "><CiLocationOn className="fontsizeset" /></div>
           <div className="loactiondropdown">
             <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="sizeoodropdown" >
               {uniqueCityNames.map((city: string, index: number) => (
                 <option key={index} value={city}>
                   {city.charAt(0).toUpperCase() + city.slice(1)}
                 </option>
               ))}
             </select>
           </div>
         </div>
         <div className="all-filter-container">
           {/* searchbar theater menu */}
           <div className="main-con-div-search">
             <div className="searchbar-div">
               <input
                 className="searchbar"
                 type="text"
                 placeholder="Search..."
                 // value={selectedtheater} 
                 onChange={handleSearchChange}
               />
             </div>
             <div className="searchicon-div">
               <FiSearch className="searchicon" />
             </div>
           </div>

           <div className="threefilter">
             <div>
               <select value={selectedbadge} onChange={(e) => setSelectedbadge(e.target.value)} className="borderremove dropdown-colorset">
                 <option value="">Badge</option>
                 {uniquebadgeNames.map((city: string, index: number) => (
                   <option key={index} value={city}>
                     {city}
                   </option>
                 ))}
               </select>
             </div>
             <div>
               <select value={selectedDimension} onChange={(e) => setSelectedDimension(e.target.value)} className="borderremove dropdown-colorset">
                 <option value="">Dimension</option>
                 {uniqueDimensionNames.map((city: string, index: number) => (
                   <option key={index} value={city}>
                     {city}
                   </option>
                 ))}
               </select>
             </div>
             {/* clear button */}
             <div onClick={clearSelectedValues} className="clearfilter">Clear Filter
             </div>
           </div>
         </div>

         <div className={`main-con-slot`}>
           {Object.values(theaterMap).map((theater, theaterId) => (
             <div key={theater.name} className="theatername">
               <div className="se-theatername">
                 <div className="se-theater">
                   <div className="filmeicon-div" >
                     <FcFilmReel className="fimeicon" />
                   </div>
                   <div>
                     <p className="theatername">{theater.name}</p>
                   </div>
                 </div>
                 <div className='badgedivtag'>
                   <p className={theater.badge === 'CGV' ? 'CGV textsizeset' : theater.badge === 'XXI' ? 'XXI textsizeset' : theater.badge === 'CINEPOLIS' ? 'CINEPOLIS textsizeset' : ''}>{theater.badge}</p>
                 </div>
               </div>
               <p className="theateraddress">{theater.address}, {theater.city}</p> 
               {/* <h3>{theater.name}</h3>
               <p>{theater.address}, {theater.city}</p>
               <p className={theater.badge === 'CGV' ? 'CGV' : theater.badge === 'XXI' ? 'XXI' : theater.badge === 'CINEPOLIS' ? 'CINEPOLIS' : ''}>{theater.badge}</p> */}
               {Object.values(theater.screens).map((screen, screenId) => {
                console.log("Screen Name:", screen.id); // Add this line to log the screen name
                 console.log("Theater Map:", theaterMap); // Add this line to log the theaterMap
                 console.log("Theater Screens:", theater.screens); // Add this line to log the theater screens
                 return (
                   <div key={screen.name}>
                     <p className="dimentiontitile">{screen.name}</p>
                     <div className="se-timeslot-div">
                       {screen.showtimes.map((showtime) => (
                         <div className={`timeslot-border ${selectedTime === showtime.time && theater.id == theater_Index && screen.id == screen_Index ? 'selected1' : ''}`}
                           onClick={() => {
                          dispatch(selectTime(showtime.time));
                             dispatch(settheaterIndex(theater.id)); // Parse to integer if necessary
                             dispatch(setscreenIndex(screen.id));
                             dispatch(setshowtimeID(showtime.id));
                           }}
                         >
                           <p className="timenumber">{showtime.time.slice(0, -3)}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                 );
               })}
             </div>
           ))}
         </div>

        </div>
       <div className='right-con'>

           {filteredMovies.map((movie: Movie) => (
             <div className="splitdatatwopart">
               <div><img src={movie.image} className='se-movieimg'></img></div>
               <div>
                 <h2 className='se-movietitle'>{movie.name}</h2>
                 <div className="movie-details">
                   <div className="category">
                     <ul>
                       <li className="">Tag</li>
                       <li>Duration</li>
                       <li>Director</li>
                       <li>Age Rating</li>
                     </ul>
                   </div>
                   <div className="info">
                     <ul>
                       <li> {movie.tag}</li>
                       <li> {movie.duration}</li>
                       <li> {movie.director}</li>
                       <li> {movie.rate}</li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>
           ))
           }






         {/* selected item display */}
         <div className="rightsidepart00">
           <div className='se-butcon'>
             {/* {!selectedDate && !selectedTime && <h2 className='centertext'>Select Date & Time</h2>}
       {!selectedDate && selectedTime && <h2 className='centertext'>Select Date</h2>}
      {selectedDate && !selectedTime && <h2 className='centertext'>Select Time</h2> } */}
             {!selectedDate && !selectedTime && <div className="imageflexset"><h3>Please Select Time And Date</h3><img src="https://github.com/dharmik2003/poster_movie/blob/main/moviepage/datetime.png?raw=true" className="imgclass" /></div>}
             {!selectedDate && selectedTime && <div className="imageflexset"><h2>Please Select Date</h2><img src="https://c.ststat.net/content/sites/KnittingAndStitchingShowSpecial/images/icon-date.png" className="imgclass" /></div>}
             {selectedDate && !selectedTime && <div className="imageflexset"><h2>Please Select Time</h2><img src="https://cdn2.iconfinder.com/data/icons/business-office-4/256/Office_Clock-1024.png" className="imgclass" /></div>}
             {selectedDate && selectedTime && screen_Index && theater_Index &&
               <div>
                 <h2 className='seatedtheatername'>{filteredTheater.name}</h2>
                 <p className='selecteddate'>{selectedDate}</p>
                 <div className="dimention-and-date">
                   <p>{filterscreen.dimension}</p>
                   <p>{selectedTime}</p>
                 </div>
                 <small className='se-but-condition'>*Seat selection can be done after this</small>
                 <div className='se-but-div'>
                   <button className='se-but-booknow'>
                     <Link to={`/movie/${encodeURIComponent(urlId as any)}/sitehomepage`} className="se-Booknow-but">Book Now</Link>
                   </button>
                 </div>
               </div>
             }

           </div>
         </div>
       </div> 
         </div>) : (<div className='spinnerclassmoviedetailspage'><Spinner/></div>)}
    </div>
  );

}
export default MovieDetails;
