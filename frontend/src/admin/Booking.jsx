import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Tooltip,
} from '@mui/material';
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
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={60} sx={{ color: '#0072ff' }} />
      </Box>
    );
  }

  return (
    <div>
      {/* <Header /> */}
      <Box sx={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
          All Bookings
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="bookings table">
            <TableHead sx={{ backgroundColor: '#0072ff' }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Full Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Phone</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Guests</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Tour</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Booking Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow
                  key={booking.userEmail}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Striped rows
                    '&:hover': { backgroundColor: '#f0f0f0' }, // Hover effect
                  }}
                >
                  <TableCell align="center">{booking.fullName}</TableCell>
                  <TableCell align="center">{booking.userEmail}</TableCell>
                  <TableCell align="center">{booking.phone}</TableCell>
                  <TableCell align="center">{booking.guestSize}</TableCell>
                  <TableCell align="center">{booking.tourName}</TableCell>
                  <TableCell align="center">{new Date(booking.bookAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Footer sx={{ position: 'relative', bottom: 0, width: '100%' }} /> */}
    </div>
  );
};

export default BookingPage;
