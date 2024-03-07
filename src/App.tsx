// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Home from './components/Home/Home'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './components/login/Login';
// import SignUp from './components/signup/SignUp';
// import MovieHome from './components/MoviePage/MovieHome';
// import SiteHomePage from './components/SitePage/SiteHomePage';
// import Con_Pay_HomePage from './components/Confirm-Payment/Con_Pay_HomePage';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path='/' element={<Home />}/>
//         <Route path='/login' element={<Login />}/>
//         <Route path='/signup' element={<SignUp />}/>
//         <Route path='/moviepage' element={<MovieHome />}/>
//         <Route path='/sitepage' element={<SiteHomePage />}/>
//         <Route path='/confirm_payment' element={<Con_Pay_HomePage />}/>
//         {/* <Route path='/movieblog' element={}/> */}
       
//         <Route path="*" element={<h1>Page not found</h1>}/>
//       </Routes>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home/Home';
// import Login from './components/login/Login';
// import SignUp from './components/signup/SignUp';
// import MovieHome from './components/MoviePage/MovieHome';
// import SiteHomePage from './components/SitePage/SiteHomePage';
// import Con_Pay_HomePage from './components/Confirm-Payment/Con_Pay_HomePage';
// // import MovieDetailsPage from './../src/components/MovieBlog/MovieDetailsPage'; // Import the MovieDetailsPage

// function App() {
//   return (
//     <div className="App">

//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<SignUp />} />
//           <Route path='/moviepage' element={<MovieHome />} />
//           <Route path='/sitepage' element={<SiteHomePage />} />
//           <Route path='/confirm_payment' element={<Con_Pay_HomePage />} />
//           {/* <Route path='/movie/:id' element={<MovieDetailsPage />} /> */}
//           <Route path="*" element={<h1>Page not found</h1>} />
//         </Routes>

//     </div>
//   );
// }

// export default App;



import MovieDetailsPage from './components/MovieBlog/MovieBlogPage'; // Import the MovieDetailsPage
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
// import Login from './components/foms/Auth/Login';
// import Signup from './components/foms/Auth/Signup';
import SiteHomePage from './pages/SitePage/SiteHomePage';
// import Con_Pay_HomePage from './components/foms/payment/Confirm-Payment/Con_Pay_HomePage';
import MovieBlog from './components/MovieBlog/HomeMovieBlog';
import PageUpcomming from './components/ComingSoonViewAll/PageUpcomming';
import HomeUpcommingPage from './components/ComingSoonViewAll/HomeUpcommingPage';
import { useDispatch } from 'react-redux';
// import PaymentPage from './components/foms/payment/DonePayment/PaymentPage';
import MymovieHome from './components/MyMovie/MymovieHome';
import TransactionDetailPage from './pages/TransactionDetailPage/TransactionDetailPage';
import Profile from './pages/AccountPage/Profile';
import Protected from './components/Protected-Route/Protected';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import './App.css'
import { showMoviesData } from './Redux/Movie/Movie.Thunk';
import { showTheaterData } from './Redux/TheaterData/TheaterData.Thunk';
import { showUpcomaingData } from './Redux/UpcomingMovies/Upcommaing.Thunk';
import MovieHome from './components/MovieSchedule/MovieHome';
import Login from './Froms/Auth/Login';
import Signup from './Froms/Auth/Signup';
import Con_Pay_HomePage from './Froms/payment/Confirm-Payment/ConfirmPayment';
import PaymentPage from './Froms/payment/DonePayment/PaymentPage';

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showMoviesData() as any)
    dispatch(showTheaterData() as any);
    // dispatch(showMoviesData() as any);
    dispatch(showUpcomaingData() as any);

  });


  return (
    <div className="App container">
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/moviepage' element={<Protected><MovieHome /></Protected>} />
          <Route path='/movie/:id/sitehomepage' element={<SiteHomePage />} />
          <Route path="/movie/:id/sitehomepage/confirm_payment" element={<Con_Pay_HomePage />} />
          <Route path="/movie/:id/sitehomepage/confirm_payment/PaymentPage" element={<PaymentPage />} />
          <Route path='/movie' element={<Protected><MovieBlog/></Protected>} />
          <Route path='/upcomming' element={<Protected><HomeUpcommingPage/></Protected>} /> 
          <Route path='/movie/:movieName' element={<Protected><MovieDetailsPage /></Protected>} />
          <Route path='/upcomming/:movieName' element={<Protected><PageUpcomming /></Protected>} />
          <Route path="/MymovieHome" element={<Protected><MymovieHome /></Protected>} />
          <Route path="/MymovieHome/:ramdonnumber" element={<TransactionDetailPage/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<PageNotFound/>} />


          {/* <Protected>
            <Route path='/movie' element={<MovieBlog/>} />
            <Route path='/upcomming' element={<HomeUpcommingPage/>} /> 
          </Protected> */}
        </Routes>

    </div>
  );
}

export default App;
