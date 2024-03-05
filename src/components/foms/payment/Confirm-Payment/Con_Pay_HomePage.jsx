import React, { useEffect } from 'react';
import Navbar from '../../../Navbar/Navbar';
import ConfirmPayment from './ConfirmPayment'

const Con_Pay_HomePage = () => {
  useEffect(() => {
      window.scrollTo(0, 0); 
      document.title="Tickets Details"
    },[])
  return (
    <div>
      {/* <Navbar /> */}
      <ConfirmPayment/>      
    </div>
  );
};

export default Con_Pay_HomePage;
