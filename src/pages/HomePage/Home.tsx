import React, { useState,useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Poster from '../../components/MoviesPoster/Poster'
import Advertice from '../../components/Advertisment/Advertice'
import Admovie from '../../components/NewsMovies/Admovie'
import SuggestedMovie from '../../components/ComingSoonMovies/SuggestedMovie'
// import { RootState } from '../Redux/store/store';
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store'



const Home = () => {

  useEffect(()=>{
    document.title="Home | MovieFlix"
  },[])

  const {name,phoneNumber,email,password,SignupState} = useSelector((state: RootState) =>state.sign);

  

  return (
    <div>
        <Navbar/> 
        <Poster/>
        <Advertice/>
        <Admovie/>
        <SuggestedMovie/>
        <Footer/>
    </div>
  )
}
export default Home







  // const { phoneNumber, password } = useSelector((state: RootState) => state.login);
  // const name = localStorage.getItem("name");
  // const phonenumber = localStorage.getItem("phoneNumber");
  // const passwordd = localStorage.getItem("password");
  // const email = localStorage.getItem("email");
  // console.log(phonenumber + " " + passwordd);