import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BASE_URL } from '../utils/config';
import Header from './Header';
import Footer from './Footer';
const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/bookings-data`);
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings data:', error);
        setLoading(false);
      }
    };

    fetchBookingsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Header/>
      <Grid container spacing={4} padding={4}>
        {bookings.map((booking, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card style={{ backgroundColor: '#f3f3f3' }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {booking.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tour: {booking.tourName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer/>
    </div>
  );
};

export default BookingPage;
