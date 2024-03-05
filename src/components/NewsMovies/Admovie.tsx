

// 3 movie slice code ------------------------------------------------------- 

import React, { useEffect, useState } from 'react';
// import movies from './../../components/Data/poster_movie';
import './Admovie.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showMoviesData } from '../../Redux/Thunk/MovieThunk';


const Admovie = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  // const itemsToShow = movies.slice(0, 3);
  // const itemsToShow = movies;

  const handleClick = (movieName: string) => {
    
    navigate(`/movie/${movieName}`);
      
  };


  // data fetch (thunk movieSlice, movieThunk)
    const dispatch = useDispatch()

    const {moviesData, loading} =  useSelector((state: any) =>  state.movies)
    console.log("Movie Data from thunk: " , moviesData)
    useEffect(() => {
      dispatch(showMoviesData() as any)
    },[])

    const itemsToShow = moviesData;

    
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
            onClick={() => handleClick(movie.name)}
            >
            <img
              src={movie.imgurl}
              alt={movie.name}
              className="admovie-image"
               // Handle click event
            />
            <div className="admovie-details">
              <div className="admovie-tag">
                <div className='tag-border'>{movie.tag}</div>
              </div>
              <h2 className="admovie-title">{movie.name}</h2>
              <div className="admovie-releasedate">{movie.releaseDate}</div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Admovie;
