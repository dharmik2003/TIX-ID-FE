import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './Poster.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InitialStateMovieData, Movie } from '../../Types/DataTypes';
// import { Movie } from '../MovieBlog/HomeMovieBlog';
import { setMovieData } from '../../Redux/MovieBooking/MovieBooking.Slice';
import { addmyshowThunk } from '../../Redux/myshow/add-myshow.Thunk';
import getCookies from '../../pages/getCookies';
import Spinner from '../Spinner/Spinner';

const Poster = () => {

    //show all data using thunk   //API calling
  const dispatch = useDispatch()
  
  //movie
  const {getmovieData, getmovieloading} =  useSelector((state: any) =>  state.getmovies)
  console.log("Movie Data api: " , getmovieData)
  const moviesData=getmovieData


  // 2 poster dispaly code
  const [startIndex, setStartIndex] = useState(0);
  const moviesPerPage = 2;
  const navigate = useNavigate();




  const handleNext = () => {
    if (startIndex + moviesPerPage < moviesData.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0); 
    }
  };

  const handlePrev = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(moviesData.length - moviesPerPage); 
    }
  };


  // 1 poster dispaly code
  const [startIndex1, setStartIndex1] = useState(0);
  const moviesPerPage1 = 1;
  

  const handleNext1 = () => {
  if (startIndex1 + moviesPerPage1 < moviesData.length) {
    setStartIndex1(startIndex1 + 1);
  } else {
    setStartIndex1(0); 
  }
};

const handlePrev1 = () => {
  if (startIndex1 - 1 >= 0) {
    setStartIndex1(startIndex1 - 1);
  } else {
    setStartIndex1(moviesData.length - moviesPerPage1); 
  }
};


const [movieID,setmovieID]=useState<number>()
const [tokendata,settokendata]=useState<string>("")



const handleClick = (movie: Movie) => {
  setmovieID(movie.id);

  // Usage
  const userDataValue = getCookies('userData');
  let tokenWithoutQuotes = ''; 

  if (userDataValue !== null) {
    tokenWithoutQuotes = userDataValue.replace(/"/g, ''); // Assign value to tokenWithoutQuotes
    console.log("token", tokenWithoutQuotes);
  } else {
    console.error('userDataValue is null');
  }

  console.log("moiveId", movie.id);

  // dispatch<any>(addmyshowThunk({
  //   moiveId: movie.id,
  //   userId: 0,
  //   showtimeId: 0, 
  //   screenId: 0,
  //   voucher: "", 
  //   seats: [], 
  //   token: tokenWithoutQuotes 
  // }));

  dispatch(setMovieData(movie));
  navigate(`/moviepage/${encodeURIComponent(movie.id)}`);
};



  console.log(process.env)


  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);

// Schedule a function to run after 3000 milliseconds (3 seconds)
// const timeoutId =()=>{ setTimeout(() => {
//     console.log('Timeout completed');
//     setLoading(false);
// }, 1000);
// }
// useEffect(()=>{
//   timeoutId()
// },[])



  return (
    <div>
          <div>
            {/* // display 2 poster */}
            <div className='hiddenpart0'>
              <div className="horizontal-scroll-view">
                {<div className="scroll-circle" onClick={handlePrev}><FaChevronLeft /></div>}
                <div className='center-main-con card hiddenpart0'>
                  {moviesData.slice(startIndex, startIndex + moviesPerPage).map((movie: Movie) => (
                    <div className="cartmovie" key={movie.id} onClick={() => handleClick(movie)}>
                      <img src={movie.image} className="abc" alt={movie.title} />
                      {/* {movie.image ? (
                        <img src={movie.image} className="abc" alt={movie.title} />
                      ) : (
                          <div className="abc spinnerposter"><Spinner /> </div>
                      )} */}
                      <h2 className="movietitle">{movie.title}</h2>
                      <div className="premium-type">
                        <p className="prem-1 pad">{process.env.REACT_APP_TYPE1}</p>
                        <p className="prem-2 pad">{process.env.REACT_APP_TYPE2}</p>
                        <p className="prem-3 pad">{process.env.REACT_APP_TYPE3}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {<div className="scroll-circle" onClick={handleNext}><FaChevronRight /></div>}
              </div>
            </div>

            {/* // display 1 poster */}
            <div className='hiddenpart1'>
              <div className="horizontal-scroll-view ">
                {<div className="scroll-circle" onClick={handlePrev1}><FaChevronLeft /></div>}
                <div className='center-main-con card'>
                  {moviesData.slice(startIndex1, startIndex1 + moviesPerPage1).map((movie: Movie) => (
                    <div className="" key={movie.id} onClick={() => handleClick(movie)}>
                      <img src={movie.image} className="abc" alt={movie.name} />
                      {/* {movie.image ? (
                        <img src={movie.image} className="abc" alt={movie.title} />
                      ) : (
                          <div className="abc"><Spinner/> </div>
                      )} */}
                      <h2 className="movietitle">{movie.name}</h2>
                      <div className="premium-type">
                        <div className="prem-1 pad">{process.env.REACT_APP_TYPE1}</div>
                        <div className="prem-2 pad">{process.env.REACT_APP_TYPE2}</div>
                        <div className="prem-3 pad">{process.env.REACT_APP_TYPE3}</div>

                      </div>
                    </div>
                  ))}
                </div>
                {<div className="scroll-circle" onClick={handleNext1}><FaChevronRight /></div>}
              </div>
            </div>
          </div>
       
    </div>
  );
};

export default Poster;
