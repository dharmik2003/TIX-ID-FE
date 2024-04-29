import React, { useEffect, useState } from 'react';
// import Navbar from '../../../Navbar/Navbar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmPayment.css'
import { IoArrowBack } from "react-icons/io5";
import toast from 'react-hot-toast';
import { setdiscount, resetsetdiscount, setfinalprice, resetMovieBooking, setVoucherID, setmyshowID, settractionID } from '../../../Redux/MovieBooking/MovieBooking.Slice';
import Navbar from '../../../components/Navbar/Navbar';
import Razorpay from 'razorpay';
import getCookies from '../../../pages/getCookies';
import { addmyshowThunk } from '../../../Redux/myshow/add-myshow.Thunk';
import { addpaymentThunk } from '../../../Redux/razorpay-payment/add-razorpaypayment.Thunk';
import Spinner from '../../../components/Spinner/Spinner';


const Con_Pay_HomePage = () => {

  // url value find
  const location = useLocation();
  const url=location.pathname;
  console.log(location.pathname)

  const navigate=useNavigate()

  //date fetch from slice
  const { selectedMovie, selectedDate, selecteddimension, selectedTime, selectedmyshowID, selectedVoucherID,selectsite, selectedtotal, selectdiscount, selectfinalprice, theater_Index, screen_Index, showtimeID } = useSelector((state: any) => state.movieBooking);
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
  const [selectedVoucher, setSelectedVoucher] = useState('');

  // const applyPromo = () => {
  useEffect(() => { 
    const PromoCode: string = selectedVoucher;
    // const PromoCode: string = promoCode;
    console.log("PromoCode", PromoCode); // MOVIE100

    // Initialize the applied discount variable
    let appliedDiscount: number | null = null;
    let appliedDiscountid: number | null = null;

    // Check if the promo code exists & selected total according to apply coupon
    if (getvoucherData) {
      const foundVoucher = getvoucherData.find((voucher: any) => voucher.code === PromoCode);
      if (foundVoucher && selectfinalprice > foundVoucher.price) {
        // Set the applied discount
        console.log("foundVoucher.price", foundVoucher.price); // 100
        appliedDiscount = foundVoucher.price;
        appliedDiscountid = foundVoucher.id;
      } else {
        // Handle invalid promo code or total price not meeting the requirement
        if (!foundVoucher) {
          // Show an error for an invalid promo code
          // toast.error("Invalid promo code!");
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
  }, [selectedVoucher])
  // };

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
  const [loading, setLoading] = useState(false);

  const storemovieinmyshow=async()=>{

    try{

      setLoading(true);

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
        try{
          console.log("selectedmyshowID", data.payload.id)
          const paymentresponce = await dispatch<any>(addpaymentThunk({ myshowId: data.payload.id, token: tokenWithoutQuotes || ''}))
          console.log("paymentresponce", paymentresponce)
          
          if (paymentresponce.payload.paymenturl){
            // const"https://rzp.io/i/aq45fyhLjn"
            setLoading(false);
            dispatch(settractionID(paymentresponce.payload.paymentID))
            window.location.href = paymentresponce.payload.paymenturl

          }
          // navigate(`${url}/PaymentPage`)          
        }catch(error){

        } 
        
      }
      else if (data.payload.response.data.code) {
        toast.error(data.payload.response.data.message)
      }
      

    }catch(error){

    }

  }




  // Function to handle voucher selection
  const handleVoucherSelect = (voucherCode: string) => {
    setSelectedVoucher(voucherCode);
  };

  const removevoucher=()=>{
    setSelectedVoucher('');
    const dropdown = document.getElementById("voucher-dropdown") as HTMLSelectElement | null; // Assuming you have an id on your select element
    if (dropdown) {
      dropdown.value = ""; 
    }
  }

  return (
    <div>
      <Navbar/>  
      {
        !loading ?(
          <div>
            <div><h3 className='backfunction' onClick={gotobackpage}><IoArrowBack />Back</h3></div>
            {/* <h2>PAYMENT CONFIRMATION</h2>
            <small>Confirm payment for the seats you ordered</small> */}
            <div className='confirm-main-con'>
              <div className='confirm-left'>
                <h3 className='confirmtitle'>Schedule Details</h3>

                <p className='alltitle'>Movie Title</p>
                <h4 className='allans'>{selectedMovie.title}</h4>
                <hr className='hrcss' />
                <p className='alltitle'>Date</p>
                <h4 className='allans'>{selectedDate}</h4>
                <hr className='hrcss' />
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
                <hr className='hrcss' />
                <p className='alltitle'>Tickets({selectsite.length})</p>
                <h4 className='allans'>{selectedlabel.join(', ')}</h4>
                <hr className='hrcss' />

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
                <hr className='hrcss center' />
                {/* <div className='rightsidesecond-part'>
                  <p className='alltitle'>Promos & Vouchers</p>
                  <div>
                    {selectdiscount ? (
                      <input
                        type='text'
                        value={selectdiscount}
                        disabled
                        className='inputfield'
                      />
                    ) : (
                      <input
                        type='text'
                        placeholder='Enter Promos Code'
                        value={promoCode}
                        className='inputfield'
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                    )}
                    {selectdiscount !== null && selectdiscount > 0 && selectfinalprice > 100 ? (
                      <button onClick={() => { dispatch(resetsetdiscount()) }} className='applybut'>Remove Promo</button>
                    ) : (
                      <button onClick={applyPromo} className='applybut'>Apply</button>
                    )}
                    {selectdiscount !== null && selectdiscount > 0 && selectfinalprice > 100 && (
                      <div>
                        <p className='applydiscount'>Applied {selectdiscount}rs discount!</p>
                        <div className='ticketprice hightset'>
                          <p>Discount</p>
                          <h3>₹ {selectdiscount}</h3>
                        </div>
                      </div>
                    )}













                  </div>
                 
                </div> */}





                <div className='rightsidesecond-part'>
                  <p className='alltitle'>Promos & Vouchers</p>

                  <div className='flexsetvoucher'>
                    <div>
                      <select value={selectedVoucher} onChange={(e) => handleVoucherSelect(e.target.value)}>
                        <option value="">Select Voucher</option>
                        {/* Map over voucher data to create dropdown options */}
                        {getvoucherData.map((voucher: any) => (
                          <option key={voucher.code} value={voucher.code}>
                            {/* Format voucher description with big and small font */}
                            <div className="voucher-description">
                              <div className="big-font">{`Save ${voucher.price}rs`}</div>
                              {/* <br /> */}
                              {/* <div className="small-font">{`if total amount above ${voucher.price}rs`}</div> */}
                            </div>
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='removevoucherbutton'>
                      {selectedVoucher && <div className='applybut1' onClick={removevoucher}>Remove Promo</div>}
                    </div>
                  
                  </div>
                  {selectdiscount !== null && (
                    <div>
                      <p className='applydiscount'>Applied {selectdiscount}rs discount!</p>
                      <div className='ticketprice hightset'>
                        <p>Discount</p>
                        <h3>₹ {selectdiscount}</h3>
                      </div>
                    </div>
                  )}
                </div>
                <hr className='hrcss center' />
                <div className='lastpayment-div ticketprice'>
                  <h2 className='totalpay'>Total Pay </h2>
                  <h3>₹ {selectfinalprice}</h3>
                </div>
                <div className='but-main-con' onClick={storemovieinmyshow} >
                  <div className='butnowbutton'>
                    <div className="buynow">BUY TICKETS</div>
                    {/* <NavLink to={`${url}/PaymentPage`} className="buynow" >BUY TICKETS</NavLink> */}
                  </div>
                  {/* <div className='butnowbutton'> */}
                  {/* <button className="buynow" onClick={handlePayment}>Pay with Razorpay</button> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        ) : (<div className='spinnerinpaymentpage'><Spinner /></div>)
      }
    </div>
  );
};
export default Con_Pay_HomePage;