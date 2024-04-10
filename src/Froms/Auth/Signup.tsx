import React, { useEffect, useState } from 'react';
import './Signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { RootState } from '../../Redux/store';
import { setname, setPhonenumber, setemail, setPassword ,setsignup } from '../../Redux/Signup/Signup.Slice';
import { addSignupThunk } from '../../Redux/Signup/add/add-signup.Thunk';
import { getSignupThunk } from '../../Redux/Signup/get/get-signup.Thunk';
import { setEMAIL, setID, setIsLOGIN, setNAME, setPASSWORD, setPHONENUMBER } from '../../Redux/useDetails/useDetails.Slice';
import { CookiesUsers } from './auth-types';
import Cookies from 'js-cookie';


const Signup = () => {
    const dispatch = useDispatch();
    const [Signup, setSignup] = useState(true);
    const [name, setname] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const usenavigate = useNavigate();
    // const { name, phoneNumber, email, password } = useSelector((state: RootState) => state.sign);
//  const [userData, setUserData] = useState({
//     name: "",
//     phoneNumber: "",
//     email: "",
//     password: ""
//   });
    const handlesetnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(setname(e.target.value));
        // setUserData({ ...userData, name: e.target.value });
        
        setname(e.target.value)
    };

    const handlesetPhonenumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(setPhonenumber(e.target.value));
        //  setUserData({ ...userData, phoneNumber: e.target.value });
setphoneNumber(e.target.value)
    };
    const handlesetemailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(setemail(e.target.value));
        //  setUserData({ ...userData, email: e.target.value });
        setemail(e.target.value)
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(setPassword(e.target.value));
        // setUserData({ ...userData, password: e.target.value });
        setpassword(e.target.value)
    };

    const navigate=useNavigate()

// const handleSignup1Click =async () => {
//   if (name === '' || phoneNumber === '' || email === '' || password === '') {
//     toast.error('All fields are required');
//   } else {
//     if(password.length >= 8 && password.length <= 12){
//      dispatch(setsignup(true));
      
//      try {
//         await dispatch<any>(addSignupThunk({ name, phoneNumber, email, password }));
//         toast.success("data store on database")  
//         navigate("/")
//       } catch (error) {
//         // Handle any errors here
//         console.error('Signup failed:', error);
//         toast.error('Signup failed. Please try again.');
//       }
//     } else {
//       toast.error('Password length must be between 8 and 12 characters');
//     }
//   }  
// };

const handleSignup1Click = async () => {
  if (name === '' || phoneNumber === '' || email === '' || password === '') {
    toast.error('All fields are required');
    return;
  }


    else{
         // If user does not exist, proceed with signup
    if (password.length >= 8 && password.length <= 12) {
      dispatch(setsignup(true));
     try{
      const signupdata=await dispatch<any>(addSignupThunk({ name, phoneNumber, email, password }));
      console.log("signupdata",signupdata)
      if(signupdata.payload.success){
         dispatch(setID(signupdata.payload.id));
            dispatch(setNAME(signupdata.payload.name));
            dispatch(setEMAIL(signupdata.payload.email));
            dispatch(setPHONENUMBER(signupdata.payload.phoneNumber));
            dispatch(setPASSWORD(signupdata.payload.password));
            dispatch(setIsLOGIN(true));
            
        // const userData:CookiesUsers = {
        //     token: signupdata.payload.token,
        // };

        // const userDataString = JSON.stringify(userData);

        // // Set the entire user data object as a cookie
        // Cookies.set('userData', userDataString);
    
        navigate("/login")
        toast.success("Signup successfully!");
      }
     }
     catch(error){
        toast.error("Sign up Error, Again try Sign Up ")
     }
      
    } else {
      toast.error('Password length must be between 8 and 12 characters');
    }

    }


};

    // back sign-1 to 2
    const handleSignupClick = async() => {

        if (name === '' || phoneNumber === '') {
            toast.error('All fields are required');
        }
        else{
            if (!/^\d+$/.test(phoneNumber)) {
                toast.error('Phone number must contain only digits');
            }

            if (phoneNumber.length === 10) {
                  try {
                        const response = await dispatch<any>(getSignupThunk());
                        const userData = response.payload;

                        // Check if the user's phone number already exists in the database
                        const userExists = userData.some((user:any) => user.phoneNumber === phoneNumber);
                        console.log(useEffect)

                        if (userExists) {
                        toast.success("Phone number already exists! Please Login");
                        navigate("/login")      
                        }
                        else{
                            dispatch(setPhonenumber(phoneNumber));
                            setSignup(false);

                        }
                                    
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        toast.error('An error occurred. Please try again.');
                    }
                
            } 
            else {
                toast.error('Phone number must be 10 digits');
            }
        }
        
    };

    // show password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // goto back page page 2 page 1 singup page
    const handleGoBack = () => {
        setSignup(true)
    }

    //go to login page
    const gotobacklogin = () => {
        usenavigate(-1)
    };

    useEffect(()=>{
    document.title="Sign Up"
    },[])

    return (
        <div className='sign-up-main-con'>
            <div className='maincontainerfullpage'>
            
                <div className={Signup ? 'visibleSignup': 'hiddenSignup '}>
                    <div className='place'>
                        {/* Signup content */}
                    <img src='https://github.com/dharmik2003/poster_movie/blob/main/login/Signup.png?raw=true' className='photu' />
                    <div className='main-cont'>
                        <div onClick={gotobacklogin} className="Signup-go-to-back">
                            <div><IoArrowBack className='back-icon' /></div>
                            <h3 className='text-login'>Log In</h3>
                        </div>
                        <div className='signup-details'>
                            <div className='details-split'>
                                <h2 className='sign-heading'>Sign Up</h2>
                                <div className='padding-each-con'>
                                    <label className='Sign-input-text-heading'>Full Name</label><br />
                                    <div className='signup-phone-main-con-inside color'>
                                        <input
                                            onChange={handlesetnameChange}
                                            className='textfield-box'
                                            value={name}
                                            placeholder='Enter Full Name' />
                                    </div>
                                </div>
                                <div className="padding-each-con">
                                    <div className='Sign-input-text-heading'>Phone Number</div>
                                    <div className='signup-phone-main-con-inside color'>
                                        <div className='thisiscountycode'>+91</div>|
                                        <input
                                            className='textfield-box'
                                            name="phoneNumber"
                                            value={phoneNumber}
                                            onChange={handlesetPhonenumberChange}
                                            placeholder='Enter Mobile Number'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button onClick={handleSignupClick} className='signup-but'><h3>Sign Up Now</h3></button>
                                </div>
                            </div>
                            <div className='copytrighttext'>
                                2021 TIX ID - PT Nusantara Elang Sejahtera.
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
           
                <div className={!Signup ? 'visibleSignup ': 'hiddenSignup'}>
                    <div className='place'>
                        {/* Signup content */}
                    <img src='https://github.com/dharmik2003/poster_movie/blob/main/login/Signup.png?raw=true' className='photu' />
                    <div className='main-cont'>
                        <div onClick={handleGoBack} className="Signup-go-to-back">
                            <div><IoArrowBack className='back-icon' /></div>
                            <h3 className='text-login'>Log In</h3>
                        </div>
                        <div className='signup-details'>
                            <div className='details-split'>
                                <h2 className='sign-heading'>Sign Up</h2>
                                <div className='padding-each-con'>
                                    <label className='Sign-input-text-heading'>Enter Email</label><br />
                                    <div className='signup-phone-main-con-inside color'>
                                        <input
                                            type='email'
                                            value={email}
                                            onChange={handlesetemailChange}
                                            className='textfield-box'
                                            placeholder='Enter Email Id' />
                                    </div>
                                </div>
                                <div className="">
                                    <div className='Sign-input-text-heading'>Password</div>
                                    <div className='signup-phone-main-con-inside color eyeset'>
                                        <input
                                            className='textfield-box'
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            value={password}
                                            onChange={handlePasswordChange}
                                            placeholder='Enter Password'
                                        />
                                        {showPassword ? (
                                            // off eye
                                            <FaRegEyeSlash onClick={togglePasswordVisibility} className="sign-eye-icon" /> // Assign class name for the eye icon
                                        ) : (
                                            <IoEyeOutline onClick={togglePasswordVisibility} className="sign-eye-icon" /> // Assign class name for the eye icon
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div onClick={handleSignup1Click}><h3 className='signup-but'>Sign Up</h3></div>
                                </div>
                                <div>
                                    <small className='small-text-2'>*Dengan mendaftar saya menyetujui kebijakan dari TIX ID</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
          
        </div>
        </div>
    );
}
export default Signup;
