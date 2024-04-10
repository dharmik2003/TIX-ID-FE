import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './TransactionDetailPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BookingPDFDocument from '../../components/Pdf/BookingPDFDocument'
import { PDFDownloadLink } from '@react-pdf/renderer';
import { RootState } from '../../Redux/store';
import { getTicketsThunk } from '../../Redux/tickets/get-ticket.Thunk';
import getCookies from '../getCookies';
import Spinner from '../../components/Spinner/Spinner';

const TransactionDetailPage = () => {
    const tickets = useSelector((state:RootState)=>state.myTicket.tickets)
    console.log("tickets",tickets);
    const [data, setData] = useState<any>();
    const location = useLocation();
    console.log("location",location)
    const parthname = parseInt(location.pathname.split("/").at(-1) || "0", 10); // Convert to number

    console.log("randomnumber",parthname);
    const dispatch = useDispatch();

    console.log("after useEffect")

    const length = data?.seats ? data.seats.length : 0;

     const [isLoading, setIsLoading] = useState(true);


    const [datas, setdatas] = useState<any>([]);


    const fetchticketdata = async () => {
        try {
            const userDataValues = getCookies('userData');
            console.log("userDataValues", userDataValues)
            let tokenWithoutQuotes;

            if (userDataValues !== null) {
                tokenWithoutQuotes = userDataValues.replace(/"/g, '');
                console.log("token", tokenWithoutQuotes)
            } else {
                console.error('userDataValue is null');
            }

            const response = await dispatch<any>(getTicketsThunk({ ticketid: parthname || 0, token: tokenWithoutQuotes || "" }));

            if (response.success || response.payload.id) {
                setdatas(response.payload);
                console.log("responsedata", response.payload);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching ticket data:", error);
        }
    }

    // useEffect(() => {
    //     fetchticketdata();
    // }, [parthname]); 


    useEffect(() => {
        const timer = setTimeout(() => {
            fetchticketdata();
        }, 1000); // Fetch data after 3 seconds

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [parthname]);

    // pdf generate code

const handleDownloadPDF = () => {
    const pdfData = BookingPDFDocument(datas);
    console.log('PDF generated:', pdfData);
  };

useEffect(() => {
      window.scrollTo(0, 0); 
      document.title="Ticket"
    },[])


    console.log("datas",datas)

  return (
    <div>
       <div>
            <Navbar/>
              <div className='trx-main'>
                  <div  className='trx-main-con'>

                   {/* <div className='trx-head'>
                Transaction Details
                  </div> */}
                  {/* MAIN CONTENT  */}
                      {!isLoading ?(
                        

<div>
                              <div className='trx-head'>
                                  Transaction Details
                              </div>
                          <div className='trx-first'>
                              <div className='trx-up'>
                                  <p className='movie-hrading'>{datas.myTicketId.title}</p>
                                  <div className='trx-divide-three-part'>
                                      <div className='trx-part1'>
                                          <div className='flex flex-col my-4'>
                                              <p className='trx-small-text'>Location</p>
                                              <p className='trx-ans-text'>{datas.myTicketId.theater}</p>
                                          </div>
                                          <div className='trx-date-time'>
                                              <div>
                                                  <p className='trx-small-text'>Date</p>
                                                  <p className='trx-ans-text'>{datas.myTicketId.date}</p>
                                              </div>
                                              <div>
                                                  <p className='trx-small-text'>Time</p>
                                                  <p className='trx-ans-text'>{datas.myTicketId.time}</p>
                                              </div>
                                          </div>
                                      </div>
                                      <div className='trx-div-hr'>
                                          <hr className='trx-hr' />
                                      </div>
                                      <div className='trx-part-2'>
                                          <div className='my-4'>
                                              <p className='trx-small-text'>Class</p>
                                              <p className='trx-ans-text'>{datas.myTicketId.screen}</p>                                     

                                          </div>
                                          <div>
                                              <p className='trx-small-text'>Badge</p>
                                              <p className='trx-ans-text'>Studio - 1</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className='trx-second'>
                                  <div className='trx-second-inside'>
                                      <div className='trx-second-leftsidepart'>
                                          <div className='paddingremove'>TRX ID </div>
                                          <div className=' colors texts'>Seats </div>
                                      </div>
                                      <div className='trx-second-leftsidepart '>
                                          <div className='font-medium text-lg'>{datas.paymentHistory.transactionId}</div>
                                          <div className='seats-div'>
                                              {
                                              datas.myShow.selectedSeats.map((chair:any) => (
                                              <div className='siteeach colors texts'>{chair}</div>
                                          ))
                                      }
                                          </div>
                                      </div>
                                  </div>
                                 
                                  <div className='trx-download-div'>
                                     
                                          <PDFDownloadLink document={<BookingPDFDocument data={datas} />} fileName="movie_booking.pdf">
                                              {({ blob, url, loading, error }) =>
                                                  loading ? 'Generating PDF...' : <img src={`https://github.com/dharmik2003/poster_movie/blob/main/Payment/Download%20Icon.png?raw=true`} className="down-img" />
                                              }
                                          </PDFDownloadLink>


                                  </div>
                              </div>
                          </div>
                  {/* BILL SECTION  */}
                      <div className='bill-section'>
                          <h3 className='trx-details-part'>Purchase Details</h3>
                          <div className='font-normal text-lg my-4'>
                              <div className='trx-details'>
                                  <div>
                                      <p className='trx-head-text'>REGULAR SEATS</p>
                                      <p className='trx-head-text'>SERVICE FEES</p>
                                      <p className='trx-head-text'>Discount</p>
                                  </div>
                                  <div className='trx-details-right'>
                                      <p className='marginremove'>  <span className='trx-proper'>{datas.myShow.seatPrice}</span> x <span className='boldtext trx-proper'>{datas.myShow.totalSeats}</span> </p>
                                      <p className='marginremove'> <span className='trx-proper'>3</span> x <span className='boldtext trx-proper'>{datas.myShow.totalSeats}</span></p>
                                      <p className='marginremove'><span className='trx-proper boldtext'>-{datas?.myShow.voucherAmount ? datas.myShow.voucherAmount : 0}</span></p>
                                  </div>
                              </div>
                              <hr className='w-full my-4' />
                              <div className='trx-amounts'>
                                  <div className='trx-head-text'>Final Amount</div>
                                  <div><span className='boldtext'>{datas.myShow.finalPrice} RS</span></div>
                              </div>
                          </div>
                      </div>
</div>
                      ) : (<div className='spinnerclassset'><Spinner /></div>
                      )}
              </div>
              </div>
              
            {/* <Footer/> */}
        </div>
    </div>
  )
}

export default TransactionDetailPage
