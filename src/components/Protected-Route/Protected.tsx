import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';

const Protected = ({children}:any) => {

  const {isSignup} = useSelector((state: any) => state.userDetails);

    const navigate=useNavigate()

      if(!isSignup){
         return <Navigate to= "/login" />;
    }
    else{
      return children;
    }

}


export default Protected
