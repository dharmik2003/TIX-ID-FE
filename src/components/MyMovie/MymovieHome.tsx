import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './MymovieHome.css'
import Navbar from '../Navbar/Navbar';
import { SlLocationPin } from "react-icons/sl";
import { RootState } from '../../Redux/store';
import getCookies from '../../pages/getCookies';
import { getMyTicketsThunk } from '../../Redux/Mytickets/get-myticket.Thunk';
import Spinner from '../Spinner/Spinner';

const MymovieHome = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    // const tickets = useSelector((state:RootState)=>state.myTicket.tickets)
    // console.log("tickets",tickets);

    const [isloading,setloaging]=useState(true);


    const [tickets, settickets] =useState<any>([])

const fetchData = async () => {
            try {
                const userDataValues = getCookies('userData');
                let tokenWithoutQuotes;
                if (userDataValues !== null) {
                    tokenWithoutQuotes = userDataValues.replace(/"/g, '');
                } else {
                    console.error('userDataValue is null');
                    return; // Exit early if userDataValues is null
                }

                const data = await dispatch<any>(getMyTicketsThunk({
                    token: tokenWithoutQuotes || ''
                }));
                // tickets = data.payload
                
                if (data.payload){
                    settickets(data.payload)
                    setloaging(false)
                }
                console.log("mytickets",data.payload)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
// fetchData();


    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(timer); 
    }, []);

    console.log("tickets", tickets)

    useEffect(() => {
      window.scrollTo(0, 0); 
      document.title="My Movie"
    },[])
  return (
       
    <div >
        {/* <h3 onClick={()=>navigate( '/')}>Home</h3> */}
        <Navbar/>
        <div className='mamovie-main-div'>
          {
            !isloading?(


                          <div className='mymovies'>
                              <h1 className='mytitle'>My Ticket</h1>
                              <p className='moviedesc'>List of tickets and transactions you have made</p>
                              <div>
                              {tickets.length === 0 ? (
                                  <p className='emptyticket'>Please buy a ticket.</p>
                              ) : (
                                  tickets.map((ticket: any, index: number) => (
                                      <div key={index}>
                                          <Link to={`/MymovieHome/${ticket.id}`}>
                                              <div className='main-details'>
                                                  <div className='my-div-img'>
                                                      <img src={ticket.image} className='my-img' />
                                                  </div>
                                                  <div className='moviedetails-right'>
                                                      <h2 className='blackcolor moviename '>{ticket.title}</h2>
                                                      <p className='blackcolor textsize'><span>{ticket.date}</span>    |  <span className='textsize'>{ticket.time}</span></p>
                                                      <p><SlLocationPin className='lightcolor textsize' /> <span className='lightcolor textsize'>{ticket.theater}</span>  ( <span className='blackcolor textsize'>{ticket.screen}</span> )</p>
                                                      {/* <p  className='blackcolor'>Total Price: {ticket.totalPrice}</p> */}
                                                  </div>
                                                  {/* <p>Seats: {ticket.seats.join(', ')}</p> */}
                                              </div>
                                          </Link>
                                          {index !== tickets.length - 1 && <hr />}

                                      </div>
                                  )))}
                              </div>
                              <hr />
                          </div>

            ):(
                          <div className='spinnerclassset'><Spinner /></div>
            )
          }
        </div>
    </div>
  )
}

export default MymovieHome

