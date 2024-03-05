import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';

const Protected = ({children}:any) => {
    const {loginState}=useSelector((state:any)=>state.login);
    const {SignupState}=useSelector((state:any)=>state.sign);
    console.log("private route login",loginState);
    console.log("private route signup",SignupState);

    const navigate=useNavigate()

      if(!loginState  && !SignupState){
         return <Navigate to= "/login" />;
    }
    else{
      return children;
    }

}


export default Protected
