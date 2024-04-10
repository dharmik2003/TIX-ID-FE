// // BookingPDFDocument.tsx

// import React from 'react';
// import { Document, Page, Text } from '@react-pdf/renderer';
// import { CastAny } from '@reduxjs/toolkit/dist/tsHelpers';

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export interface BookingData {
  movieTitle: string;
  seats: number;
  myTicketId:any
  myShow:any;
  paymentHistory:any
  // Add other necessary data properties
}


// Define styles
const styles = StyleSheet.create({
  movieTitle: {
    
    textAlign: 'center',
    marginBottom: 60,
  },
  boldText: {
    fontSize: 15,
    color: 'rgba(26, 44, 80, 1)',
  },
  output: {
    fontSize: 14,
    color: 'rgba(242, 196, 111, 1)',
  },
  marginleft: {
    marginLeft:25
  },
});

const BookingPDFDocument: React.FC<{ data?: BookingData }> = ({ data }) => {
  if (!data || !data.myTicketId || !data.myShow) {
    // If data or its properties are not provided, return a message indicating that the data is unavailable
    return (
      <Document>
        <Page size="A4">
          <Text>Data is unavailable</Text>
        </Page>
      </Document>
    );
  }

  // Convert selectedSeats array to string
  const selectedSeatsString = data.myShow.selectedSeats.join(', ');

  // Function to preload the image from URL and convert it to base64
  const loadImage = async (url:any) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  };

  // Function to render the PDF
  const renderPDF = async (data:any) => {
    // Load the image and convert it to base64
    const imageUrl = "https://github.com/dharmik2003/poster_movie/blob/main/Navbar/tix%20id%201.png?raw=true";
    const imageData = await loadImage(imageUrl);
  }
  return (
    <Document>
      <Page size="A4">


        {/* <div style={{ textAlign: 'center', marginBottom: '60px', fontSize: "20px", width:"80px" , height:"15px" }}>
          <img src="https://github.com/dharmik2003/poster_movie/blob/main/Navbar/tix%20id%201.png?raw=true" style={{ display: 'block', margin: '0 auto' }} />
        </div> */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: '60px' }}>
          <Image src={imageData} />
        </View> */}

        <Text style={{ ...styles.boldText, textAlign: 'center', marginBottom: '20px', marginTop: '20px', fontSize: 20, }}>{data.myTicketId.title}</Text>


        <Text style={{ ...styles.marginleft, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Theater: </Text>
          <Text style={styles.output }>{data.myTicketId.theater}</Text>
        </Text>
        <Text style={{ ...styles.marginleft, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Date: </Text>
          <Text style={styles.output }>{data.myTicketId.date}</Text>
        </Text>
        <Text style={{ ...styles.marginleft, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Time: </Text>
          <Text style={styles.output }>{data.myTicketId.time}</Text>
        </Text>
        <Text style={{ ...styles.marginleft, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Screen: </Text>
          <Text style={styles.output }>{data.myTicketId.screen}</Text>
        </Text>
        <Text style={{ ...styles.marginleft, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Seats: </Text>
          <Text style={styles.output}>{selectedSeatsString}</Text>
        </Text>
        <Text style={{ ...styles.marginleft, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Payment Id: </Text>
          <Text style={styles.output}>{data.paymentHistory.transactionId}</Text>
        </Text>

        <View style={{ ...styles.marginleft, ...styles.boldText, marginBottom: '2px' }}>
          <Text style={styles.boldText}>REGULAR SEATS:<Text style={styles.output}> {data.myShow.seatPrice}</Text></Text>
        </View>
        <View style={{ ...styles.marginleft, ...styles.boldText, marginBottom: '2px' }}>
          <Text style={styles.boldText}>SERVICE FEES: <Text style={styles.output}>3 x {data.myShow.totalSeats}</Text></Text>
        </View>
        <View style={{ ...styles.marginleft, ...styles.boldText, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Discount: <Text style={styles.output}>-{data?.myShow.voucherAmount ? data.myShow.voucherAmount : 0}</Text></Text>
        </View>
        <View style={{ ...styles.marginleft, ...styles.boldText, marginBottom: '2px' }}>
          <Text style={styles.boldText}>Final Amount:<Text style={styles.output}>₹{data.myShow.finalPrice}</Text></Text>
        </View>
      </Page>
    </Document>
  );
};

export default BookingPDFDocument;
