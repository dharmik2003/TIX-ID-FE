import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './ScrollTop.css';
const ScrollButton = () => {
    const [visible, setVisible] = useState(true)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return (
        <button className='' style={{ transform: visible ? 'scale(1)' : 'scale(0)' }} >
            <FaArrowUp onClick={scrollToTop} className='arrow'
                style={{ transform: visible ? 'scale(1)' : 'scale(0)' }} />
        </button>
    );
}
export default ScrollButton;


// import React, { useState, useEffect } from 'react';
// import { FaArrowUp } from 'react-icons/fa';
// import './ScrollTop.css';

// const ScrollButton = () => {
//     const [visible, setVisible] = useState(true);

//     useEffect(() => {
//         const toggleVisible = () => {
//             const scrolled = document.documentElement.scrollTop;
//             if (scrolled > 300) {
//                 setVisible(true);
//             } else {
//                 setVisible(false);
//             }
//         };

//         window.addEventListener('scroll', toggleVisible);

//         return () => {
//             window.removeEventListener('scroll', toggleVisible);
//         };
//     }, []); // Ensure that the effect runs only once by providing an empty dependency array

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };

//     return (
//         <button className='' style={{ display: visible ? 'block' : 'none' }} onClick={scrollToTop}>
//             <FaArrowUp className='arrow' />
//         </button>
//     );
// };

// export default ScrollButton;
