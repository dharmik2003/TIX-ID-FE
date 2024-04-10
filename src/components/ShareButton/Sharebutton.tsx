// ShareButton.tsx
import React from 'react';

import './ShareButton.css';
import { FaSquareFacebook, FaInstagram,FaTwitter } from "react-icons/fa6";

const ShareButton = () => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Share this article',
        url: window.location.href
      });
      console.log('Shared successfully');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="share-button-container">
      <div className='sharebutton-title'>Share this article</div>
      <div className="icon-container" >
        <FaInstagram className="icon" onClick={handleShare} />
        <FaTwitter className="icon" onClick={handleShare}/>
        <FaSquareFacebook className="icon" onClick={handleShare}/>
      </div>
    </div>
  );
};

export default ShareButton;


