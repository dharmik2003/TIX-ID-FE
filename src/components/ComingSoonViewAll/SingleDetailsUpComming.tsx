// search using movie Id ------------------------


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShareButton from '../ShareButton/Sharebutton';
import './SingleDetailsUpComming.css'
import { UpMovie } from '../../Types/DataTypes';
import ScrollButton from '../scrollbar/ScrollButton';
import Spinner from '../Spinner/Spinner';

interface Props {
  movie: UpMovie; 
  poster_movie: UpMovie[];
}

const DetailsUpComming: React.FC<Props> = ({ movie, poster_movie }) => {

  const navigate = useNavigate();
  const handledetails = (selectedMovie: UpMovie) => {
    navigate(`/upcomming/${selectedMovie.id}`, { state: selectedMovie });
  };
  // const [showScroll, setShowScroll] = useState(true);

  // // Function to handle scroll event
  // const checkScrollTop = () => {
  //   if (!showScroll && window.scrollY > 20) {
  //     setShowScroll(true);
  //   } else if (showScroll && window.scrollY <= 20) {
  //     setShowScroll(false);
  //   }
  // };

  // // Add scroll event listener on component mount
  // useEffect(() => {
  //   window.addEventListener('scroll', checkScrollTop);
  //   return () => {
  //     window.removeEventListener('scroll', checkScrollTop);
  //   };
  // }, [showScroll]);

  // // Function to scroll to top
  // const scrollTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };
  
  const [loading, setLoading] = useState(true);
  const timeoutId = () => {
    setTimeout(() => {
      console.log('Timeout completed');
      setLoading(false);
    }, 1000);
  }
  useEffect(() => {
    timeoutId()
  }, [])

  return (
  <div>
      {
        !loading ? (
          
          <div>
            <div className='up-single-main-con'>
              <div className='up-single-movie-details'>
                <div>
                  <h2 className='up-single-title'>{movie.title}</h2>
                  <p className='up-single-date'>Coming Soon...   {movie.date}</p>
                </div>
                <div className='up-single-details'>
                  <div className='up-img-div'>
                    <img src={movie.image} alt={movie.image} className='up-single-img' />
                  </div>
                  <div>
                    <p className='up-single-desc'>{movie.description}</p>
                    <p className='up-single-desc'>{movie.description}</p>
                    <p className='up-single-desc'>{movie.description}</p>
                    <p className='up-single-desc'>{movie.description}</p>
                    <h2 className='up-padd'><ShareButton /></h2>
                  </div>
                </div>
              </div>

            </div>

            <hr />
            <div className='up-other-movie-title'>Other Movies</div>
            <div className="up-other-movies-container">
              {poster_movie.map((posterMovie) => (
                <div key={posterMovie.id} className="up-other-movie" onClick={() => handledetails(posterMovie)}>

                  <img src={posterMovie.image} alt={posterMovie.image} className="up-other-movie-img" />
                  <h3 className="up-other-movie-title moviename1">{posterMovie.title}</h3>
                </div>
              ))}
            </div>

            <ScrollButton />
          </div>
        ): (<div className = 'spinnerclassmoviedetailspage'><Spinner/></div>)
      }
        </div>
  );
}

export default DetailsUpComming;





