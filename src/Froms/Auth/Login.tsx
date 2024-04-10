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
import { RootState } from '../../Redux/store';
import { setPhonenumber, setPassword ,setLogin } from '../../Redux/Login/Login.Slice';
import Cookies from 'js-cookie';
import { addLoginThunk } from '../../Redux/Login/add-login.Thunk';
import { setEMAIL, setID, setIsLOGIN, setNAME, setPASSWORD, setPHONENUMBER } from '../../Redux/useDetails/useDetails.Slice';
import { CookiesUsers } from './auth-types';


const Login = () => {
  const dispatch = useDispatch();
  const usenavigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phonenumber, setphonenumber] = useState("");
  const [password, setpassword] = useState("");
  
  // const { phoneNumber, password } = useSelector((state: RootState) => state.login);
  const navigate=useNavigate()
  //API calling
  const loginData=useSelector( (state :any)=>state.addlogin)
  console.log("signupdata from login page",loginData)
  const userData=loginData;

  //set PhoneNumber
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
      dispatch(setPhonenumber(phoneNumber));
      setphonenumber(phoneNumber)
  };

  //set password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setpassword(password)
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
//   const handleSubmit =async () => {
   

//   if (phonenumber === '' || password === '') {
//     toast.error('All fields are required');
//   }
//   else{
//      if (!/^\d+$/.test(phonenumber)) {
//       toast.error('Phone number must contain only digits');
//     }

//     if (phonenumber.length === 10) {
//         try{
        
//           const data=await dispatch<any>(addLoginThunk({ phonenumber, password }));
//           console.log("data login ",data)
//           if(data.payload){
//             console.log(password,phonenumber)  
//             navigate("/")
//             toast.success("Login successfully!");
//           }
          
//         }catch(error){
//           toast.error("Login error!");
//         }

//     } else {
//       toast.error('Phone number must be 10 digits');
//     }
//   }
// };

const handleSubmit = async () => {
  if (phonenumber === '' || password === '') {
    toast.error('All fields are required');
  } else {
    if (!/^\d+$/.test(phonenumber)) {
      toast.error('Phone number must contain only digits');
    } else if (phonenumber.length !== 10) {
      toast.error('Phone number must be 10 digits');
    } else {
      try {
        const data = await dispatch<any>(addLoginThunk({ phonenumber, password }));
        console.log("data login ", data);
        if (data.payload.id) {
          // Login successful
          dispatch(setID(data.payload.id));
    dispatch(setNAME(data.payload.name));
    dispatch(setEMAIL(data.payload.email));
    dispatch(setPHONENUMBER(data.payload.phoneNumber));
    dispatch(setPASSWORD(data.payload.password));
    dispatch(setIsLOGIN(true));
    // const userData:CookiesUsers = {
    //         token: data.payload.token,
    //     };
    console.log("token is",data.payload.token,)

        const userDataString = JSON.stringify(data.payload.token,);

        // Set the entire user data object as a cookie
        Cookies.set('userData', userDataString); 
          navigate("/");
          toast.success("Login successfully!");
        } 
        else if(data.payload.response.data.message){
          toast.error(data.payload.response.data.message);
        }
        else {
          // Login failed
          toast.error(data.message || "Login error!");
        }
      } catch (error) {
        // Error occurred during login
        console.error("Login error:", error);
        toast.error("Login error!");
      }
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
      <div className='login-main-con1' >
      
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
                        value={phonenumber} 
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
