import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './Poster.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InitialStateMovieData, Movie } from '../../Types/DataTypes';
// import { Movie } from '../MovieBlog/HomeMovieBlog';
import { setMovieData } from '../../Redux/Slice/MovieBookingSlice';

const Poster = () => {


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


  //show all data using thunk
  const dispatch = useDispatch()
  
  const {moviesData, loading} =  useSelector((state: InitialStateMovieData) =>  state.movies)
  console.log("Movie Data from thunk: " , moviesData)

  //secelted movie Store in Movie slice
  const handleClick = (movie:Movie) => {
    dispatch(setMovieData(movie)); 
    navigate(`/moviepage/?id=${encodeURIComponent(movie.id)}`);
    // dispatch(resetMovieBooking())
  };

  return (
    <div>
      {/* // display 2 poster */}
      <div className='hiddenpart0'>
        <div className="horizontal-scroll-view">
        {<div className="scroll-circle" onClick={handlePrev}><FaChevronLeft /></div>}
        <div className='center-main-con card hiddenpart0'>
          {moviesData.slice(startIndex, startIndex + moviesPerPage).map((movie: Movie) => (
            <div className="" key={movie.id} onClick={() => handleClick(movie)}> 
              <img src={movie.image} className="abc" alt={movie.name} />
              <h2 className="movietitle">{movie.name}</h2>
              <div className="premium-type">
                <div className="prem-1 pad">{movie.type1}</div>
                <div className="prem-2 pad">{movie.type2}</div>
                <div className="prem-3 pad">{movie.type3}</div>
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
              <h2 className="movietitle">{movie.name}</h2>
              <div className="premium-type">
                <div className="prem-1 pad">{movie.type1}</div>
                <div className="prem-2 pad">{movie.type2}</div>
                <div className="prem-3 pad">{movie.type3}</div>
              </div>
            </div>
          ))}
        </div>
        {<div className="scroll-circle" onClick={handleNext1}><FaChevronRight /></div>}
      </div>
     </div>
    </div>
  );
};

export default Poster;
