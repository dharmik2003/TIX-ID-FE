import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import movies from '../../Data/poster_movie';
import MovieDetails from './SingleMovieDetails';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { InitialStateMovieData, News } from '../../Types/DataTypes';

const MovieDetailsPage = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  // const { movieName } = useParams<{ movieName: string }>();
  // const {moviesData, loading} =  useSelector((state: InitialStateMovieData) =>  state.movies)
    const { newsData, newsloading } = useSelector((state:any) => state.shownews);
    console.log("newsdata",newsData)
    // useEffect(() => {
    //   dispatch(showMoviesData() as any)
    // },[])

  const itemsToShow = newsData;
  console.log("Movie Data from thunk: " , newsData)


  const url  = useParams<{ movieid: string }>();
  console.log(url) 
  const id = url.movieid;
  console.log("id", id); 

  const movie = newsData.find((movie:News) => movie.id.toString() === id); 
  console.log("news single api",movie)
  const otherMovies = newsData.filter((movie:News)=> movie.id.toString() !== id);


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
