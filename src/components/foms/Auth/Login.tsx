import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import './Login.css';
import Signup from './Signup';
import { Route } from 'react-router-dom';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';
import toast from 'react-hot-toast';
import e from 'express';
import { setPhonenumber, setPassword ,setLogin } from '../../../Redux/Slice/LoginSlice';
import { RootState } from '../../../Redux/store';


const Login = () => {
  const dispatch = useDispatch();
  const usenavigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { phoneNumber, password,  } = useSelector((state: RootState) => state.login);

  //set PhoneNumber
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
      dispatch(setPhonenumber(phoneNumber));
  };

  //set password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    dispatch(setPassword(password));
  };

  //Show Password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // NaviGate SignUp Page
  const handleSignupClick = () => {
    usenavigate('/signup')
  };

  //onSubmit Function
  const handleSubmit = () => {
   

  if (phoneNumber === '' || password === '') {
    toast.error('All fields are required');
  }
  else{
     if (!/^\d+$/.test(phoneNumber)) {
      toast.error('Phone number must contain only digits');
    }

    if (phoneNumber.length === 10) {
      if(password.length >=8 && password.length<=12){
      dispatch(setPhonenumber(phoneNumber));
      dispatch(setLogin(true)); // Assuming setLogin is a Redux action to set login status
      usenavigate('/');
      }
      else{
        toast.error('Password length must be between 8 and 12 characters');
        
      }
    } else {
      toast.error('Phone number must be 10 digits');
    }
  }
};

  //Goto Home Button
  const gotobackhome = () => {
        usenavigate('/')
    };

  //Set Title
  useEffect(()=>{
    document.title="Login"
  },[])

  return (
    // <div>
      <div className='login-main-con1'>
        {/* <img src='https://github.com/dharmik2003/poster_movie/blob/main/login/Picture.png?raw=true' className='login-bg-img' alt='Background' /> */}
    
        <div onClick={gotobackhome} className="login-go-to-back1 spacecenterset">
             
               <div><IoArrowBack className='homeicon1' /></div>
              <div><h3 className='homebutton1'>Home</h3></div>

        </div>
     
          <div className='logindetailmaincon'>
            <div className='login-details1 spacecenterset'>
           
            <div className='cononnnn'>
               <div><h2 className='login-heading'>Log In To TIX ID</h2></div>

             
                <div className='allcomponents' >
                {/* phone number */}
               <div className="Phone_main-con">
                  <div className='input-head-color'>Phone Number</div>
                    <div className='phone-main-con-inside color'>
                      <div className='fontsizeseteach'>+91</div>|
                      <input
                      className='textfield-box1'
                      type='text'
                        name="phoneNumber"
                        value={phoneNumber} 
                        onChange={handlePhoneNumberChange} 
                        placeholder='Enter Mobile Number'
                      />
                    </div>
                  </div>
              
                
                  <div className='Phone_main-con '>

                      <div className="password-input-container ">
                          <div className='input-head-color'>Password</div>
                          <div className='phone-main-con-inside '>
                            <input
                          className='textfield-box1'
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={password} 
                            onChange={handlePasswordChange}
                            placeholder='Enter Password'
                              />
                              {showPassword ? (
                                // off eye
                                  <FaRegEyeSlash onClick={togglePasswordVisibility} className="eye-icon" /> // Assign class name for the eye icon
                                ) : (
                                  <IoEyeOutline onClick={togglePasswordVisibility} className="eye-icon" /> // Assign class name for the eye icon
                                )}

                          </div>
                      </div>
                
                </div>
               
                 <div className='login-all-but'>
                 
                    <button onClick={handleSubmit} className='login-but-sub login-but-1'>Login Now</button>
                    <p className='dont'>Don't have an account yet? </p>
                    <button onClick={handleSignupClick} className='login-but-sub login-but-2 '>Sign up now</button>
                 </div>
                </div>
            </div>
            <div className='text-bottom'>
              <p>2021 TIX ID - PT Nusantara Elang Sejahtera.</p>
            </div>
         
          </div>

           </div> 
        </div>

  );
}

export default Login;
