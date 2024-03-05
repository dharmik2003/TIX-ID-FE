import React, { useEffect } from 'react'
import './PageNotFound.css'
import Navbar from '../../components/Navbar/Navbar';

const PageNotFound = () => {
  useEffect(() => {
      window.scrollTo(0, 0); 
      document.title="Page Not Found"
    },[])
  return (
    <div>
      <Navbar/>
        <div className='pagenotfound-main'>
            <div className='pagenotfound-divtag'>
                <h1 className='pagenotfound-title'>404</h1>
                <h1 className='pagenotfound-des'>Page Not Found</h1>
            </div>
            <div className='imagediv'>
                 <img src='https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif' className='pagenotfound-video'/>
            </div>
            {/* <img src='https://github.com/dharmik2003/poster_movie/blob/main/7866.png_1200-removebg-preview.png?raw=true' className='pagenotfound-video'/> */}
            
        </div>
       
    </div>
  )
}

export default PageNotFound