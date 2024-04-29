import React, { useEffect, useState } from 'react';
import './SitePage.css';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-hot-toast'
import { TicketEntry } from '../../Types/DataTypes';
import { selectTime, setTheaterData, setdimension, setsite, settotal, setshowtimeID } from '../../Redux/MovieBooking/MovieBooking.Slice';
import Spinner from '../../components/Spinner/Spinner';

const SitePage: React.FC = () => {

  const { selecteddimension, selectedTime, selectedDate, selectedTheater, selectedtotal, selectsite, selectedSeat, screen_Index, selectedTimeID, showtimeID, selectedMovie } =useSelector((state : any)=>state.movieBooking)
  console.log("datas from moviesbooking slice",selecteddimension,selectedTime,selectedDate,selectedTheater,selectedtotal,selectsite, selectedSeat)

  //API calling (seatlabel)
  const dispatch = useDispatch();
  const {getseatlabelData,getseatlabelloading,getseatlableerror}=useSelector((state:any)=>state.getseatlabel)
  console.log("getseatlabelData from seat page",getseatlabelData)
  const seatlabels=getseatlabelData
  //API calling showtime for price
  const {getshowtimeData,getshowtimeloading,getshowtimeerror}=useSelector((state:any)=>state.getshowtime)
  const showtimes=getshowtimeData;


 const [filterSeatLabel, setFilterSeatLabel] = useState([]);
 console.log("filterSeatLabel",filterSeatLabel)

  const [perseatprice, setperseatprice]=useState<any>(0)

  useEffect(() => {
    console.log("selectedDate", selectedDate)
    console.log("selectedTime", selectedTime)
    console.log("seatlabels", seatlabels)
    const filterseatlabel = seatlabels.filter((seatlabel: any) => seatlabel.showTime.date == selectedDate && seatlabel.showTime.time == selectedTime && seatlabel.screen == screen_Index);
    console.log("filterseatlabel", filterseatlabel)

    const perseatdata=showtimes.find((showtime:any)=>showtime.id==showtimeID) 
    setperseatprice(perseatdata.price)
    console.log("perseatprice", perseatprice)
    // Find all unique row and column values
    const rowSet = new Set(filterseatlabel.map((seatlabel: any) => seatlabel.row));
    const colSet = new Set(filterseatlabel.map((seatlabel: any) => seatlabel.col));

    // Convert sets to arrays for easier manipulation
    const rowArray: any = Array.from(rowSet);
    const colArray: any = Array.from(colSet);

    // Find the highest row and column numbers
    const maxRow = Math.max(...rowArray);
    const maxCol = Math.max(...colArray);

    // Remove the highest row and column numbers
    const filteredRowArray = rowArray.filter((row: any) => row !== maxRow);
    const filteredColArray = colArray.filter((col: any) => col !== maxCol);

    // Set the state with the filtered row and column values
    setRows(maxRow);
    setColumns(maxCol);
    
    setFilterSeatLabel(filterseatlabel); 

    console.log("filterseatlabel", filterseatlabel)
  }, [selectedDate,selectedTime]);
//here [selecttime] remove then filter proper execute  



const [rows, setRows] = useState<number>();
const [columns, setColumns] = useState<number>();

useEffect(() => {
 
}, []); // empty dependency array to run only once

console.log("Rows:", rows);
console.log("Columns:", columns);

  //displace seat base on dimension

  
  const {tickets} =useSelector((state:any)=>state.myTicket)
  console.log("ticket",tickets)

  const ticketDetails: [string, string, string][] = [];

  // Loop through each ticket and extract required details
  tickets.forEach((ticket: TicketEntry) => {
    const details:any = [
      ticket.time,
      ticket.dimension.dimensionCategory,
      ticket.date,
    ];
    ticketDetails.push(details);
  });

  console.log('Ticket Details:', ticketDetails);



  //url value find
  const location = useLocation();
  const url=location.pathname;
  console.log(location.pathname)
  


  
  // const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0)

 

const handleSeatClick = (seat: string) => {

  const hellojiisBooked = showtimes.some((showtime: any) => showtime.id === seat && !showtime.isbook);
  console.log("hellojiisBooked",hellojiisBooked)
  if (selectsite.includes(seat)) {
    // If the seat is already selected, remove it from the selected seats
    const updatedSeats = selectsite.filter((s: string) => s !== seat);
    dispatch(setsite(updatedSeats));
  } else if (selectsite.length < 5) {
    // If the seat is not selected and the maximum number of seats is not reached, add it to the selected seats
    const updatedSeats = [...selectsite, seat];
    dispatch(setsite(updatedSeats));
  } else {
    // If the maximum number of seats is reached, remove the first selected seat and add the new one
    const updatedSeats = [...selectsite.slice(1), seat];
    dispatch(setsite(updatedSeats));
  }
};


// on submit button press

const navigator=useNavigate()

const checksiteseleted=()=>{
 if (selectsite) {
    if (selectsite.length === 0) {
        // If no seats are selected
        toast.error(`Please Select Seat!`);
        
    } else {
      toast.success("The seat has been selected");
      navigator(`${url}/confirm_payment`);
        // selectsite.forEach((id: any) => {
        //     const isBooked = showtimes.some((showtime: any) => showtime.id === id && showtime.isbook);
        //     console.log("isBooked",isBooked)
        //     if (!isBooked) {
        //         toast.success(`Showtime with ID ${id} is not booked.`);
        //     } else {
        //         toast.error(`Showtime with ID ${id} is booked.`);
        //     }
        // });
    }
}

}



// const isSeatSelected = (seat: string) => {
//     return selectsite.includes(seat);
// };


const filtershowtimeprice=showtimes.find((showtime:any)=>showtime.id===showtimeID)
console.log("filtershowtimeprice",filtershowtimeprice)

  // Calculate total price based on the number of selected seats and price per seat
  const calculateTotalPrice = () => {
    const pricePerSeat:number = filtershowtimeprice.price ?? 0;
    console.log(" ",pricePerSeat)
    console.log(selectsite.length)

    const totalPrice = selectsite.length * pricePerSeat;
    console.log("totalPrice",totalPrice)
    return totalPrice;
  };
// const calculateTotalPrice = () => {
//   let pricePerSeat = filtershowtimeprice.price 
//   console.log("pricePerSeat", pricePerSeat);
//   console.log("selectsite.length", selectsite.length);

//   const totalPrice = isNaN(pricePerSeat) ? 0 : selectsite.length * pricePerSeat; // Check if pricePerSeat is NaN
//   console.log("totalPrice", totalPrice);
//   return totalPrice;
// };

  // Update total price whenever selected seats change
  React.useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    console.log("newTotalPrice",newTotalPrice)
    setTotalPrice(newTotalPrice);
  }, [selectsite]);


  dispatch(settotal(totalPrice))
  // dispatch(setsite(selectedSeats))

  /*time selected */
  const [selectedValue, setSelectedValue] = useState<number>();
   const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = parseInt(event.target.value);
     console.log("selectedOption", selectedOption)
    setSelectedValue(selectedOption);
    setTotalPrice(0)
    dispatch(setsite([]))
     dispatch(setshowtimeID(selectedOption));

     const showtimefindid = showtimes.find((showtime: any) => showtime.id == selectedOption)
     console.log("showtimefindid", showtimefindid.time)
     dispatch(selectTime(showtimefindid.time))
  };


  // useEffect(()=>{
  //   const showtimefindid = showtimes.filter((showtime: any) => showtime.id == selectedTimeID)
  //   console.log("showtimefindid", showtimefindid)
  //   dispatch(selectTime(showtimefindid.time))
  // }, [showtimeID])
// Assuming you have a `showtimes` array containing objects with `screenId` property

// Filter showtimes based on the specified screenId
// Assuming showtimes is an array containing showtime objects
console.log("showtimes",showtimes)
  const showtimesForScreen = showtimes.filter((showtime: any) => showtime.screen.id === screen_Index && showtime.date == selectedDate && showtime.movie.id == selectedMovie.id)
  console.log("showtimesForScreen", showtimesForScreen)



//seatlabel set base on id
const [selectedlabel, setselectedlabel] = useState<string[]>([]);

useEffect(() => {
  if (selectsite && selectsite.length > 0) {
    console.log("selectsite ---------------------------")
    const tempLabels: string[] = [];
    selectsite.forEach((element: any) => {
      const showlabeldata = seatlabels.filter((seatlabel: any) => seatlabel.id == element);
      if (showlabeldata.length > 0) {
        console.log("showlabel", showlabeldata)
        showlabeldata.forEach((label: any) => {
          tempLabels.push(label.seatlabel);
        });
      }
    });
    
    console.log("tempLabels", tempLabels)
    setselectedlabel(tempLabels);
  }
}, [selectsite]); 



console.log("selectsite",selectsite)


//refersh page every second
// function reloadPageEveryThreeSeconds(): void {
//     setInterval(() => {
//         window.location.reload();
//     }, 1000); // 3000 milliseconds = 3 seconds
// }

// // Call the function to start reloading the page every 3 seconds
// reloadPageEveryThreeSeconds();



//toggel infinite loop
// const [toggel,settoggel]=useState(false)

// const toggle = () => {
//   settoggel(!toggel);
// }

// useEffect(()=>{
//   toggle();
// }, [toggel]);

  const [loading, setLoading] = useState(true);
  const timeoutId = () => {
    setTimeout(() => {
      console.log('Timeout completed');
      setLoading(false);
    }, 1000);
  }
  useEffect(() => {
    timeoutId()
  }, [])


  return (
    <div>
      {
        !loading ? (
          <div>
            <div >
              <div className='sitepage-heading'>
                <div><h2 className='sitepage-h-h'>SELECT A SEAT</h2></div>
                <div><p className='sitepage-h-p'>Choose the seat you will occupy during the film screening</p></div>
              </div>
            </div>
            <div className='selecttime'>

              <select value={selectedValue} onChange={handleDropdownChange} className='selectt'>
                {showtimesForScreen.map((showtime: any, index: number) => (
                  <option key={index} value={showtime.id as number} selected={selectedTimeID === showtime.id} className='each-time-box'>
                    {/* Format the time for display */}
                    {showtime.time}
                    {/* {new Date(showtime.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                  </option>
                ))}
              </select>



            </div>

            <div className="site-page">
              {/* <div className="movie-screen">
          <h2>Movie Screen</h2>
        </div> */}

              <div>
                {/* <select value={selectedValue} onChange={handleDropdownChange}>
        {options.map((option:string, index:number) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select> */}

              </div>


              {/* //seat code        */}
              {/* <div className="seat-map" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: '5px' }}>
  {filterSeatLabel.map((seatData: any, index: number) => (
    <div
      key={index}
      className={`seat ${seatData.isbooked ? 'booked' : ''}`}
      onClick={() => handleSeatClick(seatData.id)}
      style={{ gridRow: seatData.row, gridColumn: seatData.col }}
    >
      {seatData.seatlabel}
    </div>
  ))}
</div> */}

              <div className='perseatpriceinsitepage'>₹{perseatprice}</div>
              <div className="seat-map" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: '5px' }}>
                {filterSeatLabel.map((seatData: any, index: number) => (
                  <div
                    key={index}
                    className={`seat ${seatData.isbooked ? 'booked' : ''} ${selectsite.includes(seatData.id) ? 'selected' : ''}`}
                    onClick={() => handleSeatClick(seatData.id)}
                    style={{ gridRow: seatData.row, gridColumn: seatData.col }}
                  >
                    {seatData.seatlabel}
                  </div>
                ))}
              </div>



            </div>

            <div className='sitepage-main-screen'>
              <div className='sitepage-layout-text'>
                <h2>Cinema Screen Here</h2>
              </div>
            </div>

            <div className='totalprice-button-section'>
              <div className='totalprice-sets'>
                <div className='totalprice'>
                  <div className='total'><h4 className='marginremove'>Total : </h4></div>
                  <div className='totalprice '><h3 className='marginremove'>₹{selectedtotal}</h3></div>
                </div>

              </div>
              <div className='seatsection'>
                <div className='total'><h4 className='marginremove'>Total Sets : </h4> </div>
                <div className='totalprice'><h3 className='marginremove'>{selectsite.length > 0 ? selectedlabel : 'NaN'} </h3></div>
                {/* <div className='totalprice'><h3 className='marginremove'>{selectsite.length > 0 ? selectsite : 'NaN'} </h3></div> */}
              </div>

              <div className='button-book'>
                {/* <div  >Kembali</div> */}
                <div onClick={() => navigator(-1)} className='but but-1'>Back</div>
                {/* <NavLink to={""} className='but but-2'>CONFIRMATION</NavLink> */}
                {/* <NavLink to={`${url}/confirm_payment`} onClick={checksiteseleted} className='but but-1'>CONFIRMATION</NavLink> */}
                <div onClick={checksiteseleted} className='but but-1'>CONFIRMATION</div>

              </div>
            </div>
          </div>
        ) : (<div className='spinnerclassmoviedetailspage'><Spinner /></div>)
      }
    </div>
  );
};
export default SitePage;
