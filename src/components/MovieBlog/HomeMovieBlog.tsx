import React, { useEffect, useState } from 'react';
import './HomeMovieBlog.css';
import { SlLike } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { showMoviesData } from '../../Redux/Movie/Movie.Thunk';
import { Movie } from '../../Types/DataTypes';

// export interface Movie {
//   key: string;
//   id: number;
//   image: string;
//   name: string;
//   type1: string;
//   type2: string;
//   type3: string;
//   description: string;
//   tag: string;
//   like: number;
//   releaseDate: string;
//   imgurl:string;
//   trailer: string;
// }

const MovieBlog = () => {

    useEffect(()=>{
    document.title="MovieBlog"
  },[])
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  console.log("filterMOvie array",filteredMovies)

  // data fetch (thunk, movieSlice, movieThunk)

    const dispatch = useDispatch()
    const {moviesData, loading} =  useSelector((state: any) =>  state.movies)
    console.log("Movie Data from thunk: " , moviesData)
    useEffect(() => {
      dispatch(showMoviesData() as any)
    },[])

    const movies = moviesData;

  /*onclick filter data store setfilteredMovies */
  const handleKeywordClick = (keyword: string) => {
    const filteredMovies = movies.filter((movie:any) =>
      movie.tag === keyword ? true : false
    );
    setFilteredMovies(filteredMovies);
    setSelectedKeyword(keyword);
  };

  /*filter value clear*/
  const clearFilter = () => {
    setFilteredMovies([]);
    setSelectedKeyword('');
    setSearchInput('');
  };

  //search using tag
  useEffect(() => {
    window.scrollTo(0, 0);
    const tagsSet = new Set(movies.map((movie: any) => movie.tag));
    setUniqueTags(Array.from(tagsSet) as any);
  }, [movies]);

  /*goto home page */
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };

  /*search bar logic*/
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    const filteredMovies = movies.filter((movie: any) =>
      movie.name.toLowerCase().includes(inputValue)
    );
    setFilteredMovies(filteredMovies);
  };

  return (
    <div>
      <Navbar/>
      <div className='filter-header-main'>
        <div>
          <h2 className='home-title-all'>TIX ID News</h2>
        </div>
        <div className='home-desc-all'>The latest news about the world of cinema for you!</div>
        <div className='input-search-main'>
          <input 
            type='text'
            className='searchbar-movie'
            name='search'
            value={searchInput}
            onChange={handleSearchInput}
            placeholder='Search by movie name...'
          />
        </div>
        <div className='home-keyword-show'>
          {uniqueTags.map((tag, index) => (
            <div
              key={index}
              className={`${selectedKeyword === tag ? ' selectedd' : ''}`}
              onClick={() => handleKeywordClick(tag)}
            >
              <span
                className={`each1-keyword ${selectedKeyword === tag ? 'selected' : ''}`}
                onClick={() => handleKeywordClick(tag)}
              >
                {tag}
              </span>
            </div>
          ))}
          <div>
            {selectedKeyword && (
              <div onClick={clearFilter}>
                <span className="each1-keyword">Clear Filter</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className='blog-poster-movie-main-con1 part1'>
          {(filteredMovies.length > 0 ? filteredMovies : movies).map((movie: any, index: number) => (
            <div key={index} className="blog-one-con1">
              {index % 2 === 0 ? (
                <NavLink to={`/movie/${movie.name}`} className="left-side">
                  <div className="blog-img1">
                    <img src={movie.imgurl} alt={movie.name} className='movieblogimg' />
                  </div>
                  <div className="blog-details1">
                    <span className="blog-tag1">{movie.tag}</span>
                    <div className="bloghead1">
                      <h2 className="blog-title1">{movie.name}</h2>
                      
                    </div>
                    <p className='moviedesc1'>
                       <span className="blog-desc1">{movie.description.slice(0, 300)}...</span>
                    </p>
                    <p className="blog-like-icon-count1">
                      <SlLike className="blog-like-icon1" />
                      <span className="blog-like-count1"> {movie.like}</span>
                    </p>
                    <p className='movierelase1'>
                      <span className="blog-date1">{movie.releaseDate}</span>
                    </p>
                    <div className="premium-type postions">
                      <div className="prem-1 pad">{movie.type1}</div>
                      <div className="prem-2 pad">{movie.type2}</div>
                      <div className="prem-3 pad">{movie.type3}</div>
                    </div>
                  </div>
                </NavLink>
              ) : (
                <>
                  <div className='rightside1'>
                    <div className="blog-details1">
                    <span className="blog-tag1">{movie.tag}</span>
                    <div className="bloghead1">
                      <h2 className="blog-title1">{movie.name}</h2>
                      
                    </div>
                    <p className='moviedesc1'>
                      <span className="blog-desc1">{movie.description.slice(0, 300)}...</span>
                    </p>
                    <p className="blog-like-icon-count1">
                      <SlLike className="blog-like-icon1" />
                      <span className="blog-like-count1"> {movie.like}</span>
                    </p>
                    <p  className='movierelase1'>
                      <span className="blog-date1">{movie.releaseDate}</span>
                    </p>
                    <div className="premium-type postions">
                      <div className="prem-1 pad">{movie.type1}</div>
                      <div className="prem-2 pad">{movie.type2}</div>
                      <div className="prem-3 pad">{movie.type3}</div>
                    </div>
                  </div>
                  </div>
                  <NavLink to={`/movie/${movie.name}`} className="blog-img1">
                    <img src={movie.imgurl} alt={movie.name} className='movieblogimg' />
                  </NavLink>
                </>
              )}
            </div>
          ))}
        </div>
        <div className='blog-poster-movie-main-con1 part2'>
          {(filteredMovies.length > 0 ? filteredMovies : movies).map((movie: any, index: number) => (
            <div key={index} className="blog-one-con1 ">
              
                <NavLink to={`/movie/${movie.name}`} className="left-side allpart">
                  <div className="blog-img1">
                    <img src={movie.imgurl} alt={movie.name}  className='movieblogimg' />
                  </div>
                  <div className="blog-details1">
                    <span className="blog-tag1 underline_none">{movie.tag}</span>
                    <div className="bloghead1">
                      <h2 className="blog-title1 underline_none">{movie.name}</h2>
                      
                    </div>
                    <p className='moviedesc1'>
                       <span className="blog-desc1 underline_none">{movie.description.slice(0, 200)}...</span>
                    </p>
                    <p className="blog-like-icon-count1">
                      <SlLike className="blog-like-icon1" />
                      <span className="blog-like-count1 underline_none"> {movie.like}</span>
                    </p>
                    <p className='movierelase1'>
                      <span className="blog-date1 underline_none">{movie.releaseDate}</span>
                    </p>
                    <div className="premium-type postions1">
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
      <hr/>
      <Footer/>
    </div>
  );
};
export default MovieBlog;
