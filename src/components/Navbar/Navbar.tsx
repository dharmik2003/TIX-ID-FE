import React, { Profiler, useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMdClose, IoMdMenu, IoMdNotificationsOutline } from "react-icons/io";
import { useSelector,useDispatch } from 'react-redux';
import Profile from '../../pages/AccountPage/Profile';
import { setsignup } from '../../Redux/Signup/Signup.Slice';
import { setLogin } from '../../Redux/Login/Login.Slice';
import { RootState } from '../../Redux/store';
import { resetMovieBooking } from '../../Redux/MovieBooking/MovieBooking.Slice';
import { resetLoginState, setIsLOGIN } from '../../Redux/useDetails/useDetails.Slice';
import Cookies from 'js-cookie';


const Navbar= () => {
    const usenavigate=useNavigate()

const handleLoginClick = () => {
    usenavigate('/login');
  };

const dispatch = useDispatch();


//cookies not there then false set
useEffect(() => {
    if (!Cookies.get('userData')) {
        dispatch(setIsLOGIN(false));
    }
}, [Cookies]);


/*fetch value*/
// const loginState = useSelector((state: RootState) => state.login.loginState);
const signupState = useSelector((state: RootState) => state.sign.SignupState);
const loginState = useSelector((state: RootState) => state.sign.SignupState);

    console.log('Login State:', loginState);
    console.log('Signup State:', signupState);

/*fetch name */
const loginname = useSelector((state: RootState) => state.login.name);
const signupname = useSelector((state: RootState) => state.sign.name);
;

// Inside your component
const {id, name, phoneNumber, password, isSignup} = useSelector((state: any) => state.userDetails);
console.log("userDetails navbar", id, name, phoneNumber, password, isSignup);

console.log('Login :', loginname);
    console.log('Signup :', signupname);
//   useEffect(() => {
//     console.log('Login State:', loginState);
//     console.log('Signup State:', signupState);
//   }, [loginState, signupState]);

 const [showSidebar, setShowSidebar] = useState(false);
  const handleToggleSidebar = () => {
    console.log({showSidebar})
        if(showSidebar){
            setShowSidebar(false)
        }
        setShowSidebar(!showSidebar);
    };

    const navigate=useNavigate()
 const handleNavLinkClick = () => {
    navigate("/")
    dispatch(resetMovieBooking());
    
  };
  const toggleHamburger = () => {

        const humburger = document.querySelector('.humburger') as HTMLElement | null;
        if (humburger) {
            humburger.classList.toggle('open');
        }
    };
    return (

        <div>
            <div className="navbar">
                <div className="leftpartnav" onClick={handleNavLinkClick}>
                    <img src="https://github.com/dharmik2003/poster_movie/blob/main/Navbar/tix%20id%201.png?raw=true" />
                </div>

                <div className="rightpartnav">
                    <div className="nav-text">
                        <NavLink to="/" onClick={handleNavLinkClick}>Home</NavLink>
                    </div>
                    <div className="nav-text second">
                        <NavLink to="/MymovieHome">My Ticket</NavLink>
                    </div>
                    <div className="nav-text third">
                        <NavLink to="/movie">TIX ID News</NavLink>
                    </div>
                    <div className="navicon nav-text">
                        <NavLink to=""><IoMdNotificationsOutline className='notifIcon' /></NavLink>
                    </div>
                    {isSignup?(
                                <div className='home-nav-Login-but' onClick={()=>{usenavigate('/profile')}}>
                                    <h4 className='home-nav-login-text'> {name && name.toUpperCase()}</h4>
                                </div>
                            ) : (
                        <div className='signuploginpage'>
                            <div className='humburderlogincss'>
                                <div className='home-nav-Login-but' onClick={()=>{usenavigate('/signup');}}>
                                    <h4 className='home-nav-login-text'>Sign Up</h4>
                                </div>
                            </div>
                            <div className='humburderlogincss'>
                                <div className='home-nav-Login-but' onClick={handleLoginClick}>
                                    <h4 className='home-nav-login-text'>Log In</h4>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
                
                 <div className='humburger '  onClick={toggleHamburger}>
                    <div className="navicon nav-text" onClick={handleToggleSidebar}>
                        {showSidebar ? <IoMdClose className="colortextset" onClick={handleToggleSidebar} /> : <IoMdMenu className='menuicon' />}
                    </div>
                      <div className='hurgar'>  
                                          {showSidebar && (
                            <div className="">
                                <div className="sidebar-content">
                                    {/* <div className="close-button" onClick={handleToggleSidebar}>
                                    <IoMdClose />
                                    </div> */}
                                    <div className="nav-text">
                                        <NavLink to="/" onClick={() => { handleNavLinkClick(); setShowSidebar(false); }} className="colortextset">Home</NavLink>
                                    </div>
                                    <div className="nav-text second">
                                        <NavLink to="/MymovieHome" className="colortextset" onClick={()=>setShowSidebar(false)}>My Ticket</NavLink>
                                    </div>
                                    <div className="nav-text third">
                                        <NavLink to="/movie " className="colortextset" onClick={()=>setShowSidebar(false)}>TIX ID News</NavLink>
                                    </div>
                                    {/* {isSignup ? (
                                        <div className='login-signup-buton'>
                                            {isSignup ? (
                                            <div className='home-nav-Login-but' onClick={()=>{usenavigate('/profile')}}>
                                                <h4 className='home-nav-login-text'> {name && name.charAt(0).toUpperCase()}</h4>
                                            </div>
                                        ) : (
                                            <div className='home-nav-Login-but'  onClick={()=>{usenavigate('/profile')}}>
                                                <h4 className='home-nav-login-text'> {name && name.charAt(0).toUpperCase()}</h4>
                                            </div>
                                        )}
                                                                </div>
                                                            ) :
                                                             (
                                                                <div className='home-nav-Login-but loginheightset' onClick={handleLoginClick}>
                                                                    <h4 className='home-nav-login-text'>Log In</h4>
                                                                </div>
                                                            )} */}

                                                            
                                        <div className='login-signup-buton'>
                                            {isSignup ? (
                                            <div className='home-nav-Login-but' onClick={()=>{usenavigate('/profile')}}>
                                                <h4 className='home-nav-login-text'> {name && name.charAt(0).toUpperCase()}</h4>
                                            </div>
                                        ) :
                                                             (
                                                                <div className='home-nav-Login-but loginheightset' onClick={handleLoginClick}>
                                                                    <h4 className='home-nav-login-text'>Log In</h4>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                          
                      </div>
                </div>   
                                          )}</div>
            </div>
            </div>
            
        </div>
    
  )
}

export default Navbar
