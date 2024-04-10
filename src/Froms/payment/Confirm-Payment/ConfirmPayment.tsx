import React, { useEffect, useState } from 'react';
// import Navbar from '../../../Navbar/Navbar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmPayment.css'
import { IoArrowBack } from "react-icons/io5";
import toast from 'react-hot-toast';
import { setdiscount, resetsetdiscount, setfinalprice, resetMovieBooking, setVoucherID, setmyshowID } from '../../../Redux/MovieBooking/MovieBooking.Slice';
import Navbar from '../../../components/Navbar/Navbar';
import Razorpay from 'razorpay';
import getCookies from '../../../pages/getCookies';
import { addmyshowThunk } from '../../../Redux/myshow/add-myshow.Thunk';


const Con_Pay_HomePage = () => {

  // url value find
  const location = useLocation();
  const url=location.pathname;
  console.log(location.pathname)

  const navigate=useNavigate()

  //date fetch from slice
  const { selectedMovie, selectedDate, selecteddimension, selectedTime, selectedVoucherID,selectsite, selectedtotal, selectdiscount, selectfinalprice, theater_Index, screen_Index, showtimeID } = useSelector((state: any) => state.movieBooking);
  console.log("seletedmovie",selectedMovie)
  console.log("price",selectedtotal)
  const length:number=selectsite.length
  console.log("length:number",length)
  console.log("selectdiscount:", selectdiscount);

  //API calling
  const {getseatlabelData,getseatlabelloading,getseatlableerror}=useSelector((state:any)=>state.getseatlabel)
  console.log("getseatlabelData from seat page",getseatlabelData)
  const seatlabels=getseatlabelData
  //theater
  const {gettheaterData,gettheaterloading}=useSelector((state:any)=>state.gettheater)
  console.log("gettheaterData,,,,,,,,",gettheaterData)
  const theaters=gettheaterData
  //screen
  const {getscreenData,getscreenloading,getscreenerror}=useSelector((state:any)=>state.getscreen)
  const screens=getscreenData;
  //voucher
  const { getvoucherData, getvoucherloading, getvouchererror } = useSelector((state: any) => state.getvoucher)
  console.log("getvoucherData", getvoucherData)

  // promocode & Discount
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState<string>('');
   const [discount, setDiscount] = useState<number | null>(null);
  const [showFinalPrice, setShowFinalPrice] = useState(false);

  //Apply promocode :---
  const applyPromo = () => {
    const PromoCode: string = promoCode;
    console.log("PromoCode", PromoCode); // MOVIE100

    // Initialize the applied discount variable
    let appliedDiscount: number | null = null;
    let appliedDiscountid: number | null = null;

    // Check if the promo code exists & selected total according to apply coupon
    if (getvoucherData) {
      const foundVoucher = getvoucherData.find((voucher: any) => voucher.code === PromoCode);
      if (foundVoucher && selectedtotal > foundVoucher.price) {
        // Set the applied discount
        console.log("foundVoucher.price", foundVoucher.price); // 100
        appliedDiscount = foundVoucher.price;
        appliedDiscountid = foundVoucher.id;
      } else {
        // Handle invalid promo code or total price not meeting the requirement
        if (!foundVoucher) {
          // Show an error for an invalid promo code
          toast.error("Invalid promo code!");
          console.log('Invalid promo code!');
        } else {
          // Show an error for total price not meeting the requirement
          toast.error(`Total Price Must be above ${foundVoucher.price} rs`);
        }
      }
    } else {
      // Handle case where API response is not available
      toast.error("Error: Unable to fetch promo code data from the server");
      console.log("Error: Unable to fetch promo code data from the server");
    }

    // Dispatch the applied discount
    dispatch(setdiscount(appliedDiscount));
    dispatch(setVoucherID(appliedDiscountid));
    // Set the discount state
    setDiscount(appliedDiscount);
  };

      let firstPrice:number = selectedtotal + (3 * length) - (selectdiscount !== null ? selectdiscount : 0);
      dispatch(setfinalprice(firstPrice))
      console.log(firstPrice);
  

   //back page go

   const navigator =useNavigate()
   const gotobackpage=()=>{
     navigator(-1)
   }
   

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

//theater name set base on id
const [theatername, settheatername] = useState<string>("");
useEffect(() => {
  const theatername = theaters.filter((theater: any) => theater.id === theater_Index);
  console.log("theatername", theatername);
  if (theatername.length > 0) {
    settheatername(theatername[0].name); 
  }
}, [theater_Index]); 


//name set in dimension
const [Dimensionname, setDimensionname] = useState<string>("");
  let dimensionScreens
useEffect(() => {
 dimensionScreens = screens.find((screen: any) => screen.id === screen_Index);
  console.log("dimensionScreens", dimensionScreens.dimension);
  
    console.log("forloop")
    setDimensionname(dimensionScreens.dimension);
}, [screen_Index]); // Add screens to the dependency array


  console.log("setDimensionname", Dimensionname)

  const [ razorpayID, setrazorpayID] = useState<string>("")

  // payment 



  interface Razorpay {
    once(event: string, callback: (response: any) => void): void;
    open(): void;
  }

  const Razorpay: Razorpay = {
  once: (event: string, callback: (response: any) => void) => {}, // Placeholder implementation
  open: () => {}, // Placeholder implementation
};

  interface RazorpayConfig {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    handler: (response: any) => void;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    notes: {
      address: string;
    };
    theme: {
      color: string;
    };
  }

  interface RazorpayInstance {
    open(): void;
  }

  const razorpayOptions: RazorpayConfig = {
    key: "",
    amount: selectfinalprice * 100,
    currency: 'INR',
    name: 'dharmik',
    description: 'Ticket',
    image: '/your-logo.png',
    handler: function (response: any) {
      alert(response.razorpay_payment_id);
      setrazorpayID(response.razorpay_payment_id)
    },
    prefill: {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999'
    },
    notes: {
      address: 'Razorpay Corporate Office'
    },
    theme: {
      color: '#F37254'
    }
  };

  const razorpayInstance: RazorpayInstance = {
    open: () => {
      // Implement the logic to open Razorpay payment
    }
  };

  const handlePayment = () => {
    razorpayInstance.open();
  };

  
  // const razorpayInstance = razorpay.create(razorpayOptions);

  // const handlePayment = () => {
  //   razorpayInstance.open();
  // };




  //database inside movie store (add myshow in table)

  const storemovieinmyshow=async()=>{

    try{

      const userDataValues = getCookies('userData');
      console.log("userDataValues", userDataValues)
      let tokenWithoutQuotes
      if (userDataValues !== null) {
        tokenWithoutQuotes = userDataValues.replace(/"/g, '');
        console.log("token", tokenWithoutQuotes)
      } else {
        console.error('userDataValue is null');
      }


      const data = await dispatch<any>(addmyshowThunk({
        moiveId: selectedMovie.id,
        showtimeId: showtimeID,
        screenId:screen_Index,
        voucher: selectedVoucherID,
        seats: selectsite,
        token: tokenWithoutQuotes || ''
      }))

      console.log("dataa", data)
      
      if (data.payload.id){
        dispatch(setmyshowID(data.payload.id))
        navigate(`${url}/PaymentPage`)
      }
      else if (data.payload.response.data.code) {
        toast.error(data.payload.response.data.message)
      }
      

    }catch(error){

    }

  }

  return (
    <div>
      <Navbar/>  
      <div>
         <div><h3 className='backfunction' onClick={gotobackpage}><IoArrowBack/>Back</h3></div>
            {/* <h2>PAYMENT CONFIRMATION</h2>
            <small>Confirm payment for the seats you ordered</small> */}
            <div className='confirm-main-con'>
                <div className='confirm-left'>
                    <h3 className='confirmtitle'>Schedule Details</h3>

                    <p className='alltitle'>Movie Title</p>
                    <h4 className='allans'>{selectedMovie.title}</h4>
                    <hr className='hrcss'/>
                    <p className='alltitle'>Date</p>
                    <h4 className='allans'>{selectedDate}</h4>
                    <hr className='hrcss'/>
                    <div className='datetimepart'>
                      <div>
                        <p className='alltitle mar'>Class</p>
                <h4 className='allans mar'>{theatername}  ({Dimensionname}) </h4>
                      </div>
                     <div className='classtime'>
                       <p className='alltitle mar'>Time</p>
                      <h4 className='allans mar'>{selectedTime}</h4>
                     </div>
                    </div>
                    <hr className='hrcss'/>
                    <p className='alltitle'>Tickets({selectsite.length})</p>
                    <h4 className='allans'>{selectedlabel.join(', ')}</h4>
                    <hr className='hrcss'/>

                </div>
                <div className='confirm-left rightsidepart'>
                  <h1 className='confirmtitle'>Order Summary</h1>
                  <h4 className='margremove'>Transaction Details</h4>
                  <div className='ticketprice '>
                    <p className='mar alltitle'>REGULAR SEAT</p>
              <h3 className='mar'>₹{selectedtotal / length} <span>X</span> {length}</h3>
                  </div>
                  <div className='ticketprice' >
                    <p className='alltitle mar'>SERVICE FEES</p>
                    <h3 className='mar'>₹3 <span>X</span> {length}</h3>
                  </div>
                  <hr className='hrcss center'/>
                <div className='rightsidesecond-part'>
                        <p className='alltitle'>Promos & Vouchers</p>
                       
                        {selectdiscount ? (
                            // If selectdiscount has a value, display its details in a text field
                            <input
                                type='text'
                                value={selectdiscount}
                                disabled
                                className='inputfield'
                            />
                        ) : (
                            // If selectdiscount is null or undefined, allow the user to enter a new promo code
                            <input
                                type='text'
                                placeholder='Enter Promos Code'
                                value={promoCode}
                                className='inputfield'
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                        )}
                        {/* <button onClick={applyPromo} className='applybut'>Apply</button> */}
                            {selectdiscount !== null && selectdiscount > 0 && selectedtotal >100 ? (
                                <button onClick={() => {dispatch(resetsetdiscount())} }  className='applybut'>Remove Promo</button>
                              ) : (
                                <button onClick={applyPromo} className='applybut'>Apply</button>
                            )}
                            {selectdiscount !== null && selectdiscount > 0 &&  selectedtotal > 100 && (
                                <div>
                                    <p className='applydiscount'>Applied {selectdiscount}rs discount!</p>
                                    <div className='ticketprice hightset'>
                                        <p>Discount</p>
                                        <h3>₹ {selectdiscount}</h3>
                                    </div>
                                </div>
                            )}    
                  </div>
                        <hr className='hrcss center'/>
                        <div className='lastpayment-div ticketprice'>
                            <h2 className='totalpay'>Total Pay </h2>
                            <h3>₹ {selectfinalprice}</h3>
                        </div>
                             <div className='but-main-con'>
                                <div className='butnowbutton' onClick={storemovieinmyshow}>
                <div className="buynow" onClick={storemovieinmyshow} >BUY TICKETS</div>
                                  {/* <NavLink to={`${url}/PaymentPage`} className="buynow" >BUY TICKETS</NavLink> */}
                              </div>
              {/* <div className='butnowbutton'> */}
                {/* <button className="buynow" onClick={handlePayment}>Pay with Razorpay</button> */}
              {/* </div> */}
                             </div>
                      </div>
            </div>
      </div>
    </div>
  );
};
export default Con_Pay_HomePage;