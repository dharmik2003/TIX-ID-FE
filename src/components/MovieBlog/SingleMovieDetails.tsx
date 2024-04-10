import React, { useEffect, useState } from 'react';
// import './SingleMovieDetails.css';
import { SlLike } from "react-icons/sl";
import './SingleMovieDetails.css'
import { useNavigate } from 'react-router-dom';
import ShareButton from '../ShareButton/Sharebutton';
import { News, Props } from '../../Types/DataTypes';
import Spinner from '../Spinner/Spinner';
// import { Movie, Props } from '../Types/Dependency';

// Define the Movie interface


const MovieDetails: React.FC<Props> = ({ movie,poster_movie }) => {
    const navigate = useNavigate();
    const goToBack = () => {
    window.scrollTo(0, 0); 
    navigate(-1);
  };
  const handledetails = (movie:any) => {
    window.scrollTo(0, 0); 
    navigate(`/movie/${movie.id}`, { state: movie });
  };

const videoId = extractYouTubeId(movie.trailer);
  

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
            <div className='sing-main'>
              <div className='single-main-con'>
                <div className='single-movie-details'>
                  <div className='title-div'>
                    <h2 className='single-title'>{movie.name}</h2>
                    <p className='single-date'>{movie.releaseDate}</p>
                  </div>
                  <div className='img-div'>
                    <img src={movie.image} alt={movie.image} className='single-img' />

                  </div>

                  <div>
                    <h2 className='single-text-desc'>Movie Description :</h2>
                    <p className='single-desc'>{movie.description}</p>
                    <p className='single-desc'>{movie.description}</p>
                    <p className='single-desc'>{movie.description}</p>
                  </div>

                  <ShareButton />

                  <div className='single-trailer'>
                    <h2 className='single-trailer-title'>Trailer : {movie.name}</h2>
                    <iframe
                      className='single-youtube'
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={movie.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>

                  </div>
                  <div className='div-like'>
                    <span className='color-size'><SlLike className='like-but ' />{movie.like}</span>
                  </div>
                </div>


              </div>
            </div>
            <div>
              <hr />
              <div className='single-other-title'>Other Movies</div>
              <div className="other-movies-container">
                {poster_movie.map((posterMovie: any) => (
                  <div key={posterMovie.id} className="other-movie" onClick={() => handledetails(posterMovie)}>
                    <img src={posterMovie.image} alt={posterMovie.name} className="other-movie-img" />
                    <h3 className="other-movie-title">{posterMovie.title}</h3>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ): (<div className = 'spinnerclassmoviedetailspage'><Spinner/></div>)
}
   </div>
  );
};


// Function to extract YouTube video ID from the URL
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
  return match ? match[1] : '';
}

export default MovieDetails;
