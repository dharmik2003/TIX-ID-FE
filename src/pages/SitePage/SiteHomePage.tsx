import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SitePage from './SitePage'
import Footer from '../../components/Footer/Footer'

const SiteHomePage = () => {
  useEffect(() => {
      window.scrollTo(0, 0); 
      document.title="Site Selection"
    },[])
  return (
    <div>
        <Navbar/>
        <SitePage/>
        <hr/>
        <Footer/>
    </div>
  )
}

export default SiteHomePage