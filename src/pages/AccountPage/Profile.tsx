import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Profile.css'
import { useNavigate } from 'react-router-dom'
// import { setSignupclearn_value, setsignup } from '../Redux/Slice/SignupSlice'
// import { setLogin, setloginClean_value } from '../Redux/Slice/LoginSlice'
import Navbar from '../../components/Navbar/Navbar'
import { setSignupclearn_value, setsignup } from '../../Redux/Signup/Signup.Slice'
import { setLogin, setloginClean_value } from '../../Redux/Login/Login.Slice'
import Cookies from 'js-cookie'
import { resetLoginState } from '../../Redux/useDetails/useDetails.Slice'

const Profile = () => {

    //fetch data from slice 
     const usenavigate =useNavigate()
     const dispatch = useDispatch()
    //  const {phoneNumber,password}=useSelector((state:any)=>state.login)
    //  const {name,email,phoneNumber,password}=useSelector((state:any)=>state.sign)
    const {id, name, phoneNumber,email, password, isSignup} = useSelector((state: any) => state.userDetails);
    console.log("userDetails profile page", id, name, phoneNumber, password, isSignup);

    const{addmyshowData,addmyshowloading,addmyshowerror} = useSelector((state:any)=>state.addmyshow)
    

    const handleloginonclick=()=>{
        dispatch(resetLoginState())
        Cookies.remove('userData');
        usenavigate('/');  
    }

  return (
    <div>
        <Navbar/>
        <div className='setbg'>
            <div className='mainconprofilepage'>
            <div className='citcle-set'> {name && <div className='fontsetcharacter'>{name.charAt(0).toUpperCase()}</div>}</div>
           <div>
                {name && <div className='fonttextsetprofile'>Name : {name}</div>}
                {email && <div className='fonttextsetprofile'>Email : {email}</div>}
                {phoneNumber && <div className='fonttextsetprofile'>PhoneNumber : {phoneNumber}</div>}
                {password && <div className='fonttextsetprofile'>Password : {password}</div>}
                <div className='profilelogoutbutmaincon'>
                    <div className='profilelogoutbutcss' onClick={handleloginonclick}>Log Out</div>
                </div>
            </div>
        </div>
        </div>
       
        
    </div>
  )
}

export default Profile