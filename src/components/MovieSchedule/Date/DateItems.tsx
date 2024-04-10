// import React, { useState, useEffect, useRef } from 'react';
// import Slider from 'react-slick';
// import './DateItems.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { setDate } from '../../../Redux/MovieBooking/MovieBooking.Slice';

// interface DateSelectorProps {
//     onDateSelect: (date: Date) => void;
// }

// const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//     };

//     const {getshowtimeData,getshowtimeloading,getshowtimeerror}=useSelector((state:any)=>state.getshowtime)
//                 const datesData=getshowtimeData;
//                 console.log("showtime data datepage page",datesData)
//                 console.log("after")

//     const slider = useRef<Slider>(null);
//     const [datesOfMonth, setDatesOfMonth] = useState<{ date: Date; day: string }[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);


//     const dispatch = useDispatch()
//     useEffect(() => {
//     const fetchDatesFromAPI = async () => {
//         try {
//             const dates = datesData.map((dateObj: any) => {
//                 console.log('dateObj.time:', dateObj.time);
//                 const date = new Date(dateObj.time);
//                 console.log(date);
//                 const dayOfMonth = date.getDate();
//                 const month = date.toLocaleDateString('en-US', { month: 'short' });
//                 const formattedDate = `${dayOfMonth} ${month}`;
//                 const day = date.toLocaleDateString('en-US', { weekday: 'short' });
//                 console.log(formattedDate);
//                 return { date: formattedDate, day: day };
//             });
//             setDatesOfMonth(dates);
//         } catch (error) {
//             console.error('Error fetching dates:', error);
//         }
//     };

//     fetchDatesFromAPI();
// }, []);




// const handleDateClick = (date: Date) => {
//     setSelectedDate(date);
//     onDateSelect(date);
//     console.log('Selected date:', date); // Log selected date to the console
// };

// return (
//     <div className='maincondate'>
//         <div className="semidiv">
//             <div {...settings} className='sliderpart'>
//                 {datesOfMonth
//                     .filter((dateObj, index, self) => 
//                         index === self.findIndex((t) => (
//                             t.date === dateObj.date && t.day === dateObj.day
//                         ))
//                     )
//                     .map((dateObj, index) => {
//                         const date = new Date(dateObj.date);
//                         const dayOfMonth = date.getDate();
//                         const month = date.toLocaleDateString('en-US', { month: 'short' });
//                         const formattedDate = `${dayOfMonth} ${month}`;

//                         return (
//                             <div
//                                 key={index}
//                                 className={`eachdate ${dateObj.date === selectedDate ? 'selected' : ''}`}
//                                 onClick={() => handleDateClick(new Date(dateObj.date))}
//                             >
//                                 <div className='monthdate'>
//                                     {formattedDate}
//                                 </div>
//                                 <div className='dateday'>
//                                     {dateObj.day}
//                                 </div>
//                             </div>
//                         );
//                     })}
//             </div>
//         </div>
//     </div>
// );

                
// };

// export default DateSelector;




//date compare with current date----------------------
// import React, { useState, useEffect, useRef } from 'react';
// import Slider from 'react-slick';
// import './DateItems.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { setDate } from '../../../Redux/MovieBooking/MovieBooking.Slice';
// import { useParams } from 'react-router-dom';

// interface DateSelectorProps {
//     onDateSelect: (date: Date) => void;
// }

// const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//     };

//     const { getshowtimeData, getshowtimeloading, getshowtimeerror } = useSelector((state: any) => state.getshowtime);
//     // const datesData = getshowtimeData;
//     const showtimes = getshowtimeData;
//     // console.log("showtime data datepage page", datesData);
//     console.log("after");



//     const id  = useParams<{ id: string }>(); 
//     const urlId=id.id
//     console.log(urlId)

//     const [datesData, setdatesData] = useState([]);

//     useEffect(() => {
//     const filteredShowtimes = showtimes.filter((showtime: any) => showtime.movie.id == urlId);
//     setdatesData(filteredShowtimes);
//     },[urlId])

//     const slider = useRef<Slider>(null);
//     const [datesOfMonth, setDatesOfMonth] = useState<{ date: Date; day: string }[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//     const dispatch = useDispatch();

//     useEffect(() => {
//     const fetchDatesFromAPI = async () => {
//         try {
//             const uniqueDates = new Set();
//             const dates = datesData.reduce((uniqueDatesArr: any[], dateObj: any) => {
//                 const date = new Date(dateObj.time);
//                 const day = date.toLocaleDateString('en-US', { weekday: 'short' });
//                 const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
//                 const dateKey = formattedDate + day;
//                 if (!uniqueDates.has(dateKey)) {
//                     uniqueDates.add(dateKey);
//                     uniqueDatesArr.push({ date: date, day: day });
//                 }
//                 return uniqueDatesArr;
//             }, []);
//             setDatesOfMonth(dates);

//             // Handle selecting the first available date
//             // if (dates.length > 0) {
//             //     const currentDate = new Date();
//             //     const firstAvailableDate = dates.find((dateObj: any) => dateObj.date >= currentDate)?.date;
//             //     setSelectedDate(firstAvailableDate);
//             //     onDateSelect(firstAvailableDate); // Call onDateSelect to pass the selected date to the parent component
//             //     dispatch(setDate(firstAvailableDate)); // Dispatch the selected date to Redux store
//             // }
//             if (dates.length > 0) {
//                 const currentDate = new Date();
//                 const firstAvailableDateObj = dates.find((dateObj: any) => new Date(dateObj.date) >= currentDate);
//                 if (firstAvailableDateObj) {
//                     const dateString = firstAvailableDateObj.date.split('T')[0]; // Split to get the date part only
//                     const [year, month, day] = dateString.split('-'); // Split the date string by '-' to get year, month, and day
//                     const firstAvailableDate = new Date(Number(year), Number(month) - 1, Number(day)); // Month is zero-based in JavaScript Date constructor
//                     console.log("dateString----",dateString)
//                     setSelectedDate(firstAvailableDate);
//                     onDateSelect(firstAvailableDate); 
//                     dispatch(setDate(firstAvailableDate));
//                 }
//             }

//         } catch (error) {
//             // Handle errors
//         }
//     };

//     fetchDatesFromAPI();
// }, [datesData, dispatch, onDateSelect]);



//     // useEffect(() => {
//     //     const fetchDatesFromAPI = async () => {
//     //         try {
//     //             const uniqueDates = new Set();
//     //             const dates = datesData.reduce((uniqueDatesArr: any[], dateObj: any) => {
//     //                 const date = new Date(dateObj.time);
//     //                 const day = date.toLocaleDateString('en-US', { weekday: 'short' });
//     //                 const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
//     //                 const dateKey = formattedDate + day;
//     //                 if (!uniqueDates.has(dateKey)) {
//     //                     uniqueDates.add(dateKey);
//     //                     uniqueDatesArr.push({ date: date, day: day });
//     //                 }
//     //                 return uniqueDatesArr;
//     //             }, []);
//     //             setDatesOfMonth(dates);

//     //             //error avse ahiya current date select kar vama
//     //             //  if (dates.length > 0) {
//     //             //         const currentDate = new Date();
//     //             //         const firstAvailableDate = dates.find((dateObj:any) => dateObj.date >= currentDate)?.date;
//     //             //         setSelectedDate(firstAvailableDate)
//     //             //         dispatch(setDate(firstAvailableDate))
//     //             // }
//     //         } catch (error) {
//     //         }
//     //     };

//     //     fetchDatesFromAPI();
//     // },[]);

//     const handleDateClick = (date: Date) => {
//         // console.log("----------------date",date)
//         // const datadate = date.split('T');
//         // console.log("datadate",datadate)
//         setSelectedDate(date);
//         onDateSelect(date);
//         dispatch(setDate(selectedDate));
//         console.log('Selected', date); // Log selected date to the console
//     };

//     // const handleDateClick = (date: Date) => {
//     //     console.log("----------------date", date);
//     //     const dateString = date.toISOString(); // Convert Date object to string
//     //     console.log("dateString", dateString[0]);
//     //     const datadate = dateString.split('T');
        
//     //     console.log("datadate", datadate);
//     //     // setSelectedDate(date);
//     //     // onDateSelect(date);
//     //     dispatch(setDate(dateString));
//     //     console.log('Selected', dateString); // Log selected date to the console
//     // };

// console.log("selectedDate",selectedDate);
//     return (
//         <div className='maincondate'>
//             <div className="semidiv">
//                 <div {...settings} className='sliderpart'>
//                     {datesOfMonth
//                         .filter(dateObj => dateObj.date >= new Date()) 
                        
//                         .map((dateObj, index) => {
//                             const dayOfMonth = dateObj.date.getDate();
//                             const month = dateObj.date.toLocaleDateString('en-US', { month: 'short' });
//                             const formattedDate = `${dayOfMonth} ${month}`;
                            

//                             return (
//                                 <div
//                                     key={index}
//                                     className={`eachdate ${dateObj.date === selectedDate ? 'selected' : ''}`}
//                                     onClick={() => handleDateClick(dateObj.date)} 
//                                 >
//                                     <div className='monthdate'>
//                                         {formattedDate}
//                                     </div>
//                                     <div className='monthdate'>
//                                         {dateObj.day}
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DateSelector;


//date and time split

import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import './DateItems.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../Redux/MovieBooking/MovieBooking.Slice';
import { useParams } from 'react-router-dom';

interface DateSelectorProps {
    onDateSelect: (date: Date) => void;
    // selectedCity: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    const { getshowtimeData } = useSelector((state: any) => state.getshowtime);
    const showtimes = getshowtimeData;
    const id = useParams<{ id: string }>();
    const urlId = id.id
    const [datesData, setdatesData] = useState([]);

    useEffect(() => {
        const filteredShowtimes = showtimes.filter((showtime: any) => showtime.movie.id == urlId  );
        setdatesData(filteredShowtimes);
    }, [urlId])

    // && showtime.screen.theater.city == data 
    const slider = useRef<Slider>(null);
    const [datesOfMonth, setDatesOfMonth] = useState<{ date: Date; day: string }[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dateselectedclass, setdateselectedclass] = useState<string>("");

    const dispatch = useDispatch();

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchDatesFromAPI = async () => {
            try {
                const uniqueDatesSet = new Set(datesData.map((dateObj: any) => dateObj.date));
                const dates = Array.from(uniqueDatesSet).map(date => new Date(date));
                const formattedDates = dates.map(date => ({
                    date,
                    day: '' // You can set the day as an empty string initially
                }));
                setDatesOfMonth(formattedDates);

                

                // Handle selecting the first available date
                // if (formattedDates.length > 0) {
                //     const currentDate = new Date();
                //     currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

                //     const firstAvailableDate = formattedDates.find((dateObj: { date: Date }) => dateObj.date >= currentDate)?.date;
                //     const formattedFirstAvailableDate = firstAvailableDate ? formatDate(firstAvailableDate) : formatDate(formattedDates[0].date);
                //     console.log("formattedFirstAvailableDate", formattedFirstAvailableDate)
                //     setSelectedDate(new Date(formattedFirstAvailableDate));
                //     onDateSelect(new Date(formattedFirstAvailableDate));
                //     dispatch(setDate(formattedFirstAvailableDate));
                //     setdateselectedclass(formattedFirstAvailableDate)
                // }
               



            } catch (error) {
                // Handle errors
            }
        };

        fetchDatesFromAPI();
    }, [datesData, dispatch, onDateSelect, showtimes]);

    const handleDateClick = (date: Date) => {
        const formattedFirstAvailableDate = date ? formatDate(date) : "No Dates Available";
        console.log("handleDateClick", formattedFirstAvailableDate)
        setSelectedDate(new Date(formattedFirstAvailableDate));
        onDateSelect(new Date (formattedFirstAvailableDate));
        setdateselectedclass(formattedFirstAvailableDate)
        dispatch(setDate(formattedFirstAvailableDate));
        console.log('Selected', date);
    };

    console.log("setdateselectedclass", dateselectedclass)
    const currentdate = new Date()
    currentdate.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
    console.log("currentdate", currentdate.setHours(0, 0, 0, 0))
    return (
        <div className='maincondate'>
            <div className="semidiv">
                <div {...settings} className='sliderpart'>
                    {datesOfMonth
                        .filter(dateObj => dateObj.date >= currentdate)
                        .map((dateObj, index) => {
                            const dayOfMonth = dateObj.date.getDate();
                            const month = dateObj.date.toLocaleDateString('en-US', { month: 'short' });
                            const dayOfWeek = dateObj.date.toLocaleDateString('en-US', { weekday: 'short' });

                            // Format the date as "3 Feb Mon"
                            const formattedDate = `${dayOfMonth} ${month} ${dayOfWeek}`;

                            return (
                                <div
                                    key={index}
                                    className={`eachdate ${formatDate(dateObj.date) === dateselectedclass ? 'selected' : ''}`}
                                    onClick={() => handleDateClick(dateObj.date)}
                                >
                                    <div className='monthdate'>
                                        {formattedDate}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default DateSelector;


// import React, { useState, useEffect, useRef } from 'react';
// import Slider from 'react-slick';
// import './DateItems.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { setDate } from '../../../Redux/MovieBooking/MovieBooking.Slice';
// import { useParams } from 'react-router-dom';

// interface DateSelectorProps {
//     onDateSelect: (date: Date) => void;
// }

// const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//     };

//     const { getshowtimeData, getshowtimeloading, getshowtimeerror } = useSelector((state: any) => state.getshowtime);
//     // const datesData = getshowtimeData;
//     const showtimes = getshowtimeData;
//     // console.log("showtime data datepage page", datesData);
//     console.log("after");



//     const id  = useParams<{ id: string }>(); 
//     const urlId=id.id
//     console.log(urlId)

//     const [datesData, setdatesData] = useState([]);

//     useEffect(() => {
//     const filteredShowtimes = showtimes.filter((showtime: any) => showtime.movie.id == urlId);
//     console.log("filteredShowtimes",filteredShowtimes)
//     setdatesData(filteredShowtimes);
//     },[urlId])

//     const slider = useRef<Slider>(null);
//     const [datesOfMonth, setDatesOfMonth] = useState<{ date: Date; day: string }[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchDatesFromAPI = async () => {
//             try {
//                 // Convert the datesData array to a Set to remove duplicates
//                 const uniqueDatesSet = new Set(datesData.map((dateObj: any) => dateObj.date));

//                 // Convert the Set back to an array
//                 const dates = Array.from(uniqueDatesSet);
//                 console.log("uniqueDatesSet",uniqueDatesSet)

//                 setDatesOfMonth(dates);

//                 // Handle selecting the first available date
//                 if (dates.length > 0) {
//                     const currentDate = new Date();
//                     const firstAvailableDate = dates.find((date: string) => new Date(date) >= currentDate);
//                     setSelectedDate(firstAvailableDate);
//                     onDateSelect(firstAvailableDate); // Call onDateSelect to pass the selected date to the parent component
//                     dispatch(setDate(firstAvailableDate)); // Dispatch the selected date to Redux store
//                 }
//             } catch (error) {
//                 // Handle errors
//             }
//         };

//         fetchDatesFromAPI();
//     }, [datesData, dispatch, onDateSelect, showtimes]);


//     const handleDateClick = (date: Date) => {
//         setSelectedDate(date);
//         onDateSelect(date);
//         dispatch(setDate(selectedDate));
//         console.log('Selected', date); 
//     };

// console.log("selectedDate",selectedDate);
//     console.log("datesOfMonth", datesOfMonth);
//     return (
//         <div className='maincondate'>
//             <div className="semidiv">
//                 <div {...settings} className='sliderpart'>
//                     {datesOfMonth
//                         .filter(dateObj => dateObj.date >= new Date())
//                         .map((dateObj, index) => {
//                             console.log("dateobj",dateObj)

//                             const dayOfMonth = dateObj.date.getDate();
//                             const month = dateObj.date.toLocaleDateString('en-US', { month: 'short' });
//                             const dayOfWeek = dateObj.date.toLocaleDateString('en-US', { weekday: 'short' });

//                             // Format the date as "3 Feb Mon"
//                             const formattedDate = `${dayOfMonth} ${month} ${dayOfWeek}`;

//                             return (
//                                 <div
//                                     key={index}
//                                     className={`eachdate ${dateObj.date === selectedDate ? 'selected' : ''}`}
//                                     onClick={() => handleDateClick(dateObj.date)}
//                                 >
//                                     <div className='monthdate'>
//                                         {formattedDate}
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DateSelector;
