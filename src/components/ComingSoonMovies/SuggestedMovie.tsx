//dynamic data ----------------------------------------------------
import React, { useEffect } from 'react'; 
import { NavLink } from 'react-router-dom';
import './SuggestedMovie.css';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { UpMovie } from '../../Types/DataTypes';
import Spinner from '../Spinner/Spinner';

const SuggestedMovie = () => {

  //direct json file data
  // const suggestedMovies: upMovie[] = UpcomingMovies
  // console.log("suggestedMovies",suggestedMovies)

  const navigate = useNavigate(); 

  //url
  const handleClick = (movieid: string) => {
    navigate(`/upcomming/${movieid}`);
    console.log(movieid) // Navigate to the movie details page
  };

  //API fetch Data 
  const dispatch = useDispatch()
  console.log("sdfupduhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
  const { upcomingData, upcomingloading, upcomingerror } = useSelector((state: any) => state.getupcomingMovie);
  console.log(upcomingData ,"this is upcommain data file")
  const suggestedMovies=upcomingData;
  console.log("suggestedMovies",suggestedMovies)

  if (upcomingloading) {
    return <Spinner />;
  }
    return (
    <div>
      <div className="text-before-add1">
        <div className="lefttext1">
          <div>
            <h3 className="textheader11 newclass">TIX ID News</h3>
          </div>
          <div>
            <p className='textdescr1'>The latest news about the world of cinema for you!</p>
          </div>
        </div>
        <div className="righttext1">
            <NavLink to="/upcomming"><span className='seeallsug'>See All</span></NavLink> 
        </div>
      </div>

      <div className="suggested-container">
        {suggestedMovies.map((movie: UpMovie) => (
          <div
            className="suggested-card"
            key={movie.id}
            onClick={() => handleClick(movie.id)} 
          >
           <div className="suggested-image-container">
              {/* <img src={movie.image} className="suggested-image" alt="Description"/> */}
              {movie.image ? (
                <img src={movie.image} className="suggested-image" alt={movie.title} />
              ) : (
                  <div className="suggested-image spinnerposter"><Spinner /> </div>
              )}
            </div>

            <div className="suggested-details">
              <div className='suggested-details-part'>
                <div className="suggested-tag">
                  <div className='suggested-border'>{movie.tag}</div>
                </div>
                <h2 className="suggested-title">{movie.title}</h2>
                <div className="suggested-releasedate">{movie.date}</div>
              </div>
              <div className="sug-premium-type">
                <div className="prem-1 pad">{movie.type1}</div>
                <div className="prem-2 pad">{movie.type2}</div>
                <div className="prem-3 pad">{movie.type3}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr/>
    </div>
  );
//json api return 
  // return (
  //   <div>
  //     <div className="text-before-add1">
  //       <div className="lefttext1">
  //         <div>
  //           <h3 className="textheader11 newclass">TIX ID News</h3>
  //         </div>
  //         <div>
  //           <p className='textdescr1'>The latest news about the world of cinema for you!</p>
  //         </div>
  //       </div>
  //       <div className="righttext1">
  //         <NavLink to="/upcomming"><span className='seeallsug'>See All</span></NavLink> 
  //       </div>
  //     </div>

  //     <div className="suggested-container">
  //       {suggestedMovies.map((movie: UpMovie) => (
  //         <div
  //           className="suggested-card"
  //           key={movie.id}
  //           onClick={() => handleClick(movie.id)} // Pass movie name to handleClick
  //         >
  //          <div className="suggested-image-container">
  //             <img src={movie.image} className="suggested-image" alt="Description"/>
  //           </div>

  //           <div className="suggested-details">
  //             <div className='suggested-details-part'>
  //               <div className="suggested-tag">
  //                 <div className='suggested-border'>{movie.tag}</div>
  //               </div>
  //               <h2 className="suggested-title">{movie.name}</h2>
  //               <div className="suggested-releasedate">{movie.releaseDate}</div>
  //             </div>
  //             <div className="sug-premium-type">
  //               <div className="prem-1 pad">{movie.type1}</div>
  //               <div className="prem-2 pad">{movie.type2}</div>
  //               <div className="prem-3 pad">{movie.type3}</div>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <hr/>
  //   </div>
  // );
};

export default SuggestedMovie;

//-----------------------------------------------------------------------
// import React, { useEffect } from 'react'; 
// import { NavLink } from 'react-router-dom';
// import './SuggestedMovie.css';
// import { useNavigate } from 'react-router-dom'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { UpMovie } from '../../Types/DataTypes';

// const SuggestedMovie = () => {
//   const navigate = useNavigate(); 

//   const dispatch = useDispatch();
//   const { upcomingData, upcomingloading, error } = useSelector((state: any) => state.upcomingMovie);
//   console.log(upcomingData, "this is upcoming data from file");

//   // Handle loading state
//   if (upcomingloading) {
//     return <div>Loading...</div>;
//   }

//   // Handle error state
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Handle case when upcomingData is undefined or null
//   if (!upcomingData) {
//     return <div>No data available</div>;
//   }

//   const handleClick = (movieid: string) => {
//     navigate(`/upcomming/${movieid}`);
//     console.log(movieid) // Navigate to the movie details page
//   };

//   return (
//     <div>

//     </div>
//     // <div>
//     //   <div className="text-before-add1">
//     //     <div className="lefttext1">
//     //       <div>
//     //         <h3 className="textheader11 newclass">TIX ID News</h3>
//     //       </div>
//     //       <div>
//     //         <p className='textdescr1'>The latest news about the world of cinema for you!</p>
//     //       </div>
//     //     </div>
//     //     <div className="righttext1">
//     //       <NavLink to="/upcomming"><span className='seeallsug'>See All</span></NavLink> 
//     //     </div>
//     //   </div>

//     //   <div className="suggested-container">
//     //     {upcomingData.map((movie: UpMovie) => (
//     //       <div
//     //         className="suggested-card"
//     //         key={movie.id}
//     //         onClick={() => handleClick(movie.id)}
//     //       >
//     //        <div className="suggested-image-container">
//     //           <img src={movie.image} className="suggested-image" alt="Description"/>
//     //         </div>

//     //         <div className="suggested-details">
//     //           <div className='suggested-details-part'>
//     //             <div className="suggested-tag">
//     //               <div className='suggested-border'>{movie.tag}</div>
//     //             </div>
//     //             <h2 className="suggested-title">{movie.name}</h2>
//     //             <div className="suggested-releasedate">{movie.releaseDate}</div>
//     //           </div>
//     //           <div className="sug-premium-type">
//     //             <div className="prem-1 pad">{movie.type1}</div>
//     //             <div className="prem-2 pad">{movie.type2}</div>
//     //             <div className="prem-3 pad">{movie.type3}</div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     //   <hr/>
//     // </div>
//   );
// };

// export default SuggestedMovie;
