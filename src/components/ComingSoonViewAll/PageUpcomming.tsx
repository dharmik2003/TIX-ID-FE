// // movie find using movie name -----------------------


// import { useParams } from 'react-router-dom';
// import UpcomingMovies from '../../Data/UpcomingMovies';
// import DetailsUpComming from './SingleDetailsUpComming';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { UpMovie } from '../../Types/DataTypes';
// import { RootState } from '../../Redux/store';

// const PageUpcomming = () => {

//   const {upcomingData, loading, error} = useSelector((state:RootState) => state.upcomingMovie);
//   console.log("upcomming data",upcomingData)
//   console.log("upcomingData-------------",upcomingData)
  


//   const { movieName } = useParams<{ movieName: string }>();
//   const movie = UpcomingMovies.find((movie: UpMovie) => movie.id === movieName);
//   const otherMovies = UpcomingMovies.filter(movie => movie.id !== movieName); 
//  console.log("movie single",movie);
//  console.log("other movie",otherMovies);
//    useEffect(() => {
//     window.scrollTo(0, 0); 
//   }, []);
//   return (
//     <div>
//       <Navbar/>
//       {movie ? <DetailsUpComming movie={movie} poster_movie={otherMovies}/> : <p>Movie not found</p>}
//       <hr/>
//       <Footer/>
//     </div>
//   );
// };

// export default PageUpcomming;


import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import DetailsUpComming from './SingleDetailsUpComming';
import { RootState } from '../../Redux/store';
import { UpMovie } from '../../Types/DataTypes';

const PageUpcomming = () => {
  const dispatch = useDispatch();
  const { movieName } = useParams<{ movieName: string }>();
  const { upcomingData, loading, error } = useSelector((state: RootState) => state.upcomingMovie);

  const movie = upcomingData.find((movie:UpMovie) => movie.id === movieName);
  const otherMovies = upcomingData.filter((movie:UpMovie) => movie.id !== movieName);

  return (
    <div>
      <Navbar />
      {movie ? <DetailsUpComming movie={movie} poster_movie={otherMovies} /> : <p>Movie not found</p>}
      <hr />
      <Footer />
    </div>
  );
};

export default PageUpcomming;
