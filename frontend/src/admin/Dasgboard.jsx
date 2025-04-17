import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BASE_URL } from '../utils/config';
import Header from './Header';
import Footer from './Footer';

const TravelDashboard = () => {
  const [data, setData] = useState({ users: 0, bookings: 0, tours: 0, reviews: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/summary`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '60px', paddingBottom: '40px' }}>
      <Header />
      <Grid container spacing={4} padding={4}>
        {/* Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#bbdefb' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Users
              </Typography>
              <Typography variant="h3">{data.users}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bookings Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#c8e6c9' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Bookings
              </Typography>
              <Typography variant="h3">{data.bookings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tours Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#fff9c4' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Tours
              </Typography>
              <Typography variant="h3">{data.tours}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reviews Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: '#ffe0b2' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Reviews
              </Typography>
              <Typography variant="h3">{data.reviews}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default TravelDashboard;
