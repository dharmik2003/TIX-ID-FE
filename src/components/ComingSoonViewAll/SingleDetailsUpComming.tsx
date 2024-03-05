// search using movie Id ------------------------


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShareButton from '../ShareButton/Sharebutton';
import './SingleDetailsUpComming.css'
import { UpMovie } from '../../Types/DataTypes';

interface Props {
  movie: UpMovie; 
  poster_movie: UpMovie[];
}

const DetailsUpComming: React.FC<Props> = ({ movie, poster_movie }) => {

  const navigate = useNavigate();
   
  const handledetails = (selectedMovie: UpMovie) => {
    
    navigate(`/upcomming/${selectedMovie.id.toLowerCase()}`, { state: selectedMovie });
  };
  
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  

  return (
    <div>
      <div className='up-single-main-con'>
        <div  className='up-single-movie-details'>
          <div>
            <h2 className='up-single-title'>{movie.name}</h2>
            <p  className='up-single-date'>Coming Soon...   {movie.releaseDate}</p>
          </div>
          <div className='up-single-details'>
            <div className='up-img-div'>
              <img src={movie.image} alt={movie.name}  className='up-single-img'/>
            </div>
            <div>
              <p className='up-single-desc'>{movie.description}</p>
              <p className='up-single-desc'>{movie.description}</p>
              <p className='up-single-desc'>{movie.description}</p>
              <p className='up-single-desc'>{movie.description}</p>
              <h2 className='up-padd'><ShareButton/></h2>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className='up-other-movie-title'>Other Movies</div>
      <div className="up-other-movies-container">
        {poster_movie.map((posterMovie) => (
          <div key={posterMovie.id} className="up-other-movie" onClick={() => handledetails(posterMovie)}>
            <img src={posterMovie.image} alt={posterMovie.name} className="up-other-movie-img" />
            <h3 className="up-other-movie-title moviename1">{posterMovie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsUpComming;
