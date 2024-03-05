import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import MovieDetails from './MovieDetails'
import Footer from '../Footer/Footer'

const MovieHome = () => {
  useEffect(() => {
      window.scrollTo(0, 0); 
      document.title="Movie Schedule"
    },[])
  return (
    
    <div>
        <Navbar/>
        <MovieDetails/>
        <hr/>
        <Footer/>
    </div>
  )
}

export default MovieHome