// import React, { useEffect } from 'react'
// import Navbar from '../Navbar/Navbar'
// import MovieDetails from './MovieDetails'
// import Footer from '../Footer/Footer'

// const MovieHome = () => {
//   useEffect(() => {
//       window.scrollTo(0, 0); 
//       document.title="Movie Schedule"
//     },[])
//   return (
    
//     <div>
//         <Navbar/>
//         <MovieDetails/>
//         <hr/>
//         <Footer/>
//     </div>
//   )
// }

// export default MovieHome




// Update the MovieHome component to fetch movie details based on the id parameter
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import MovieDetails from './MovieDetails';
import Footer from '../Footer/Footer';

const MovieHome = () => {
  const { id } = useParams<{ id: string }>(); // Extract the id parameter from the route
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Movie Schedule";
    // Fetch movie details based on the id here
    // Example: dispatch(fetchMovieDetails(id));
  }, [id]);

  return (
    <div>
      <Navbar/>
      <MovieDetails/>
      <hr/>
      <Footer/>
    </div>
  );
};

export default MovieHome;
