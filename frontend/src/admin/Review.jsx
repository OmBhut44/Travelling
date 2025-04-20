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
import StarIcon from '@mui/icons-material/Star';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/reviews-data`);
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews data:', error);
        setLoading(false);
      }
    };

    fetchReviewsData();
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
          Customer Reviews
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="reviews table">
            <TableHead sx={{ backgroundColor: '#0072ff' }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Username</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Tour</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Rating</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Review</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Striped rows
                      '&:hover': { backgroundColor: '#f0f0f0' }, // Hover effect
                    }}
                  >
                    <TableCell align="center">{review.username}</TableCell>
                    <TableCell align="center">{review.productId ? review.productId.tourName : 'Unknown Tour'}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={`${review.rating} stars`} arrow>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          {[...Array(5)].map((_, index) => (
                            <StarIcon key={index} sx={{ color: index < review.rating ? '#FFD700' : '#ddd', fontSize: 20 }} />
                          ))}
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">{review.reviewText}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="h6" color="textSecondary">
                      No reviews available.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* <Footer sx={{ position: 'relative', bottom: 0, width: '100%' }} /> */}
    </div>
  );
};

export default ReviewsPage;
