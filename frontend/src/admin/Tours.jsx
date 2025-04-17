import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../utils/config';
import Header from './Header';
import Footer from './Footer';

const ToursListPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();


  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/tours`);
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={4} padding={4}>
      {tours.map((tour) => (
        <Grid item xs={12} sm={6} md={3} key={tour._id}>
          <Card>
            <CardMedia component="img" height="140" image={tour.photo} alt={tour.title} />
            <CardContent>
              <Typography variant="h6">{tour.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {tour.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${tour.price}
              </Typography>
              <Button onClick={() => history(`/admin/tour/${tour._id}`)} variant="outlined">
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ToursListPage;
