// // // movie find using movie name -----------------------


// // import { useParams } from 'react-router-dom';
// // import UpcomingMovies from '../../Data/UpcomingMovies';
// // import DetailsUpComming from './SingleDetailsUpComming';
// // import Navbar from '../Navbar/Navbar';
// // import Footer from '../Footer/Footer';
// // import React, { useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { UpMovie } from '../../Types/DataTypes';
// // import { RootState } from '../../Redux/store';

// // const PageUpcomming = () => {

// //   const {upcomingData, loading, error} = useSelector((state:RootState) => state.upcomingMovie);
// //   console.log("upcomming data",upcomingData)
// //   console.log("upcomingData-------------",upcomingData)
  


// //   const { movieName } = useParams<{ movieName: string }>();
// //   const movie = UpcomingMovies.find((movie: UpMovie) => movie.id === movieName);
// //   const otherMovies = UpcomingMovies.filter(movie => movie.id !== movieName); 
// //  console.log("movie single",movie);
// //  console.log("other movie",otherMovies);
// //    useEffect(() => {
// //     window.scrollTo(0, 0); 
// //   }, []);
// //   return (
// //     <div>
// //       <Navbar/>
// //       {movie ? <DetailsUpComming movie={movie} poster_movie={otherMovies}/> : <p>Movie not found</p>}
// //       <hr/>
// //       <Footer/>
// //     </div>
// //   );
// // };

// // export default PageUpcomming;


// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import Navbar from '../Navbar/Navbar';
// import Footer from '../Footer/Footer';
// import DetailsUpComming from './SingleDetailsUpComming';
// import { RootState } from '../../Redux/store';
// import { UpMovie } from '../../Types/DataTypes';

// const PageUpcomming = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const paramsid:number=params.id
//   console.log(params.id)

//   const movieid = parseInt(paramsid);
//   const { upcomingData, loading, error } = useSelector((state: RootState) => state.upcomingMovie);

//   console.log("upcoming from single movie page",upcomingData)
//   // const paramid=parseInt(movieid)
//   console.log(movieid)
//   const movie = upcomingData.find((movie:any) =>movie.id===movieid);
//   console.log("movie",movie)
//   const otherMovies = upcomingData.filter((movie:any) => movie.id !== movieid);
//   console.log("otherMovies",otherMovies)
//   return (
//     <div>
//       <Navbar />
//       {movie ? <DetailsUpComming movie={movie} poster_movie={otherMovies} /> : <p>Movie not found</p>}
//       <hr />
//       <Footer />
//     </div>
//   );
// };

// export default PageUpcomming;


import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import DetailsUpComming from './SingleDetailsUpComming';
import { RootState } from '../../Redux/store';
import { UpMovie } from '../../Types/DataTypes';

const PageUpcomming = () => {
  const dispatch = useDispatch();
  
  // const [searchParams] = useSearchParams();
  // const urlId = searchParams.get('movieid');
  // console.log("urlId", urlId);

  const urlId  = useParams<{ movieName: string }>(); 
  const id = urlId.movieName;
  console.log("id", id); 

  const { upcomingData, upcomingloading, upcomingerror } = useSelector((state: RootState) => state.getupcomingMovie);

  console.log("upcoming from single movie page", upcomingData);

  // Find the movie with the matching ID
  const movie = upcomingData.find((movie: UpMovie) => movie.id.toString() === id);

  console.log("movie", movie);

  // Filter out the movie with the matching ID
  const otherMovies = upcomingData.filter((movie: UpMovie) => movie.id.toString() !== id);

  console.log("otherMovies", otherMovies);

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
