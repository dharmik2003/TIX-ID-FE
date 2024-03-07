import React, { useEffect, useState } from 'react';
// import Navbar from '../../../Navbar/Navbar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmPayment.css'
import { IoArrowBack } from "react-icons/io5";
import toast from 'react-hot-toast';
import { setdiscount,resetsetdiscount, setfinalprice, resetMovieBooking } from '../../../Redux/MovieBooking/MovieBooking.Slice';
import Navbar from '../../../components/Navbar/Navbar';

const Con_Pay_HomePage = () => {

  // url value find
  const location = useLocation();
  const url=location.pathname;
  console.log(location.pathname)

  //date fetch from slice
  const {selectedMovie, selectedDate, selecteddimension, selectedTime, selectsite,selectedtotal,selectdiscount ,selectfinalprice} = useSelector((state: any) => state.movieBooking);
  console.log("seletedmovie",selectedMovie)
  console.log("price",selectedtotal)
  const length:number=selectsite.length
  console.log("length:number",length)
  console.log("selectdiscount:", selectdiscount);



  // promocode & Discount
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState<string>('');
   const [discount, setDiscount] = useState<number | null>(null);
  const [showFinalPrice, setShowFinalPrice] = useState(false);
  // const applyPromo = () => {

  //   // if(selectedtotal >100 && selectedtotal <200){
  //     const upperCasePromoCode = promoCode.toUpperCase(); 

  //     let appliedDiscount: number | null = null;
  //     switch (upperCasePromoCode) {
  //       case 'MOVIE100': if(selectedtotal >100){appliedDiscount = 100;}else{toast.error("Total Price Must be above 100 rs")}break;
  //       case 'MOVIE200': if(selectedtotal >200){appliedDiscount = 200;}else{toast.error("Total Price Must be above 200 rs") }break;
          
  //       default:
  //         alert("Invalid promo code!")
  //         console.log('Invalid promo code!');
  //         break;
  //     }
  //     dispatch(setdiscount(appliedDiscount));
  //     setDiscount(appliedDiscount); 
  //   // }
  //   // else{
  //   //   toast.error("Total Price Must be above 100 rs")
  //   // }    
  // };

  //Apply promocode :---
  const applyPromo = () => {

    const upperCasePromoCode: string = promoCode.toUpperCase(); 
    console.log("upperCasePromoCode",upperCasePromoCode) // MOVIE100

    const promoCodeMap: { [key: string] : number} = {
        'MOVIE100': 100,
        'MOVIE200': 200,
    };

    // Initialize the applied discount variable
    let appliedDiscount: number | null = null;

    // Check if the promo code exists & selected total acoding apply coupon
    if (upperCasePromoCode in promoCodeMap && selectedtotal > promoCodeMap[upperCasePromoCode]) {
        // Set the applied discount
        console.log("promoCodeMap[upperCasePromoCode]",promoCodeMap[upperCasePromoCode]) //100
        appliedDiscount = promoCodeMap[upperCasePromoCode];

    } else {
        // Handle invalid promo code or total price not meeting the requirement
        if (!(upperCasePromoCode in promoCodeMap)) {
            // Show an error for an invalid promo code
            toast.error("Invalid promo code!");
            console.log('Invalid promo code!');
        } else {
            // Show an error for total price not meeting the requirement
            toast.error(`Total Price Must be above ${promoCodeMap[upperCasePromoCode]} rs`);
        }
    }

    // Dispatch the applied discount
    dispatch(setdiscount(appliedDiscount));
    // Set the discount state
    setDiscount(appliedDiscount);

};


  //Tax value defined

      let firstPrice:number = selectedtotal + (3 * length) - (selectdiscount !== null ? selectdiscount : 0);
      dispatch(setfinalprice(firstPrice))
      console.log(firstPrice);
  

   //back page go

   const navigator =useNavigate()
   const gotobackpage=()=>{
     navigator(-1)
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
                    <h4 className='allans'>{selectedMovie.name}</h4>
                    <hr className='hrcss'/>
                    <p className='alltitle'>Date</p>
                    <h4 className='allans'>{selectedDate}</h4>
                    <hr className='hrcss'/>
                    <div className='datetimepart'>
                      <div>
                        <p className='alltitle mar'>Class</p>
                        <h4 className='allans mar'>{selecteddimension.dimensionCategory}</h4>
                      </div>
                     <div className='classtime'>
                       <p className='alltitle mar'>Time</p>
                      <h4 className='allans mar'>{selectedTime}</h4>
                     </div>
                    </div>
                    <hr className='hrcss'/>
                    <p className='alltitle'>Tickets({selectsite.length})</p>
                    <h4 className='allans'>{selectsite.join(', ')}</h4>
                    <hr className='hrcss'/>

                </div>
                <div className='confirm-left rightsidepart'>
                  <h1 className='confirmtitle'>Order Summary</h1>
                  <h4 className='margremove'>Transaction Details</h4>
                  <div className='ticketprice '>
                    <p className='mar alltitle'>REGULAR SEAT</p>
                    <h3 className='mar'>₹{selecteddimension.price} <span>X</span> {length}</h3>
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
                                <div className='butnowbutton'>
                                  <NavLink to={`${url}/PaymentPage`} className="buynow" >BUY TICKETS</NavLink>
                              </div>
                             </div>
                      </div>
            </div>
      </div>
    </div>
  );
};
export default Con_Pay_HomePage;