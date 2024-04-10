import React, { useEffect, useState } from 'react';
// import UpcomingMovies from '../Data/UpcomingMovies';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './HomeUpcommingPage.css'
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { UpMovie } from '../../Types/DataTypes';
import Spinner from '../Spinner/Spinner';

const HomeUpcommingPage = () => {

  const { upcomingData, upcomingloading } = useSelector((state: RootState) => state.getupcomingMovie);
  console.log("upcomming data",upcomingData)

  console.log('welcometohomeupcommingpage')
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };
    useEffect(() => {
      window.scrollTo(0, 0); 
      document.title="Upcoming Movie"
    },[])

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
    <Navbar/>
    <div>
        {
          !loading ? (
            <div>
              <div className='blog-poster-movie-main-con Upmoviepart1'>
                <div>
                  {upcomingData.map((movie: UpMovie, index: number) => (
                    <div key={index} className='blog-one-con2'>
                      {index % 2 === 0 ? ( // Alternate display pattern based on index
                        <NavLink to={`/upcomming/${encodeURIComponent(movie.id)}`} className='left-side'>
                          <div className='blog-img2'>
                            <img src={movie.image} alt={movie.image} className='blogimage2' />
                          </div>
                          <div className='blog-details2'>
                            <span className='blog-tag2'>{movie.tag}</span>
                            <h2 className='blog-title2'>{movie.title}</h2>
                            <p className='descptag'><span className='blog-rele-date2'>Description :  </span><span className='blog-desc2'>{movie.description.slice(0, 398)}...</span></p>
                            <p className='blogdateptag'><span className='blog-date2'>{movie.date}</span></p>
                            <div className="premium-type postions">
                              <div className="prem-1 pad">{movie.type1}</div>
                              <div className="prem-2 pad">{movie.type2}</div>
                              <div className="prem-3 pad">{movie.type3}</div>
                            </div>
                          </div>
                        </NavLink>
                      ) : (
                        <>
                          <div className='blog-details2'>
                            <span className='blog-tag2'>{movie.tag}</span>
                            <h2 className='blog-title2'>{movie.title}</h2>
                            <p className='descptag'><span className='blog-rele-date2'>Description :  </span><span className='blog-desc2'>{movie.description.slice(0, 398)}...</span></p>
                            <p className='blogdateptag'><span className='blog-date2'>{movie.date}</span></p>
                            <div className="premium-type postions">
                              <div className="prem-1 pad">{movie.type1}</div>
                              <div className="prem-2 pad">{movie.type2}</div>
                              <div className="prem-3 pad">{movie.type3}</div>
                            </div>
                          </div>
                          <NavLink to={`/upcomming/${encodeURIComponent(movie.id)}`} className='blog-img2'>
                            <img src={movie.image} alt={movie.image} className='blogimage2' />
                          </NavLink>
                        </>
                      )}
                    </div>
                  ))}




                </div>
              </div>
              <div className='Upmoviepart2'>
                {upcomingData.map((movie: UpMovie, index: number) => (
                  <div key={index} className='blog-one-con2 vertical'>
                    <NavLink to={`/upcomming/${encodeURIComponent(movie.id)}`} className='left-side vertical'>
                      <div className='blog-img2'>
                        <img src={movie.image} alt={movie.image} className='blogimage2' />
                      </div>
                      <div className='blog-details2'>
                        <span className='blog-tag2 underline_none'>{movie.tag}</span>
                        <h2 className='blog-title2 underline_none'>{movie.title}</h2>
                        <p className='description2 '><span className='blog-rele-date2 underline_none'>Description :  </span><span className='blog-desc2 underline_none'>{movie.description.slice(0, 300)}...</span></p>
                        <p className='releasedate2'><span className='blog-date2 underline_none'>{movie.date}</span></p>
                        <div className="premium-type postions">
                          <div className="prem-1 pad underline_none">{movie.type1}</div>
                          <div className="prem-2 pad underline_none">{movie.type2}</div>
                          <div className="prem-3 pad underline_none">{movie.type3}</div>
                        </div>
                      </div>
                    </NavLink>

                 
                  </div>

                ))}
              </div>
            </div>
          ):(<div className = 'spinnerclassmoviedetailspage'><Spinner/></div>)
        }
    </div>
      <hr />
    <Footer/>
   </div>
  );
}

export default HomeUpcommingPage;
