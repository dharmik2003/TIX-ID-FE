

// 3 movie slice code ------------------------------------------------------- 

import React, { useEffect, useState } from 'react';
// import movies from './../../components/Data/poster_movie';
import './Admovie.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Admovie = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  // const itemsToShow = movies.slice(0, 3);
  // const itemsToShow = movies;

  const handleClick = (movieid: string) => {
    
    navigate(`/movie/${movieid}`);
      
  };


  // data fetch (thunk movieSlice, movieThunk)
    const dispatch = useDispatch()

    // const {moviesData, loading} =  useSelector((state: any) =>  state.movies)
    const { newsData, newsloading } = useSelector((state:any) => state.shownews);
    console.log("newsdata",newsData)
    // useEffect(() => {
    //   dispatch(showMoviesData() as any)
    // },[])

    const itemsToShow = newsData;

    
  return (
    <div >
      <div className="text-before-add">
        <div className="lefttext">
          <div>
            <h3 className="textheader">TIX ID News</h3>
          </div>
          <div>
            <p className='textdescr'>The latest news about the world of cinema for you!</p>
          </div>
        </div>
        <div className="righttext">
          <NavLink to="/movie"><span className="admovieseeall">See All</span></NavLink> 
        </div>
      </div>
<div className="admovie-container">
        {itemsToShow.map((movie:any) => (
          <div className="admovie-card" key={movie.id}
            onClick={() => handleClick(movie.id)}
            >
            <img
              src={movie.image}
              alt={movie.title}
              className="admovie-image"
               // Handle click event
            />
            <div className="admovie-details">
              <div className="admovie-tag">
                <div className='tag-border'>{movie.tag}</div>
              </div>
              <h2 className="admovie-title">{movie.title}</h2>
              <div className="admovie-releasedate">{movie.date}</div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Admovie;
