import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import adPosters from '../../Data/AdPoster'; // Import the advertisement data
import './Advertice.css';

const Advertice = () => {
   const [startIndex, setStartIndex] = useState(0);
  const moviesPerPage = 1;

  const handleNext = () => {
    if (startIndex + moviesPerPage < adPosters.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0); 
    }
  };

  const handlePrev = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(adPosters.length - moviesPerPage); 
    }
  };

  return (
   <div>
     <div className="ad-poster-container">
      <div className="horizontal-scroll-view1" >
       {(
            <div className="scroll-circle-small" onClick={handlePrev}><FaChevronLeft /></div>
        )}
        {adPosters.slice(startIndex, startIndex + moviesPerPage).map((movie) => (
          <div className="" key={movie.id}>
           
              <img src={movie.image} className="main-img" alt={movie.name} />           
            
          </div>
        ))}
        { (
          
            <div className="scroll-circle-small" onClick={handleNext}><FaChevronRight /></div>
          
        )}
      </div>
      
    </div>
   </div>
  );
};

export default Advertice;


// ref={scrollRef}