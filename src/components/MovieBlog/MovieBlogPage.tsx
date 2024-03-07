import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movies from '../../Data/poster_movie';
import MovieDetails from './SingleMovieDetails';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { InitialStateMovieData } from '../../Types/DataTypes';

const MovieDetailsPage = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const { movieName } = useParams<{ movieName: string }>();
  const {moviesData, loading} =  useSelector((state: InitialStateMovieData) =>  state.movies)
  console.log("Movie Data from thunk: " , moviesData)


  // const { movieName } = useParams<{ movieName: string }>(); 
  console.log("-----------",movieName) // Get the movie name from the URL parameters
  const movie = movies.find((movie) => movie.name === movieName); // Find the movie with the matching name
  const otherMovies = movies.filter(movie => movie.name !== movieName);

  return (
    <div>
      <Navbar/>
      {movie ? <MovieDetails movie={movie}  poster_movie={otherMovies}/> : <p>Movie not found</p>}
      <hr/>
      <Footer/>
    </div>
  );
};

export default MovieDetailsPage;
