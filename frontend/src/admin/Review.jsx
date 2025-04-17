import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BASE_URL } from '../utils/config';
import Header from './Header';
import Footer from './Footer';
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
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Header/>
      <Grid container spacing={4} padding={4}>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card style={{ backgroundColor: '#f3f3f3' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {review.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tour: {review.productId ? review.productId.tourName : 'Unknown Tour'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {review.rating} / 5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Review: {review.reviewText}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            No reviews available.
          </Typography>
        )}
      </Grid>
      <Footer/>
    </div>
  );
};

export default ReviewsPage;
