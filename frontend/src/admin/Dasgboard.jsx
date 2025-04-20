import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ExploreIcon from '@mui/icons-material/Explore';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { BASE_URL } from '../utils/config';
import Header from './Header';
import Footer from './Footer';

const iconStyle = {
  fontSize: 70,
  mb: 2,
  transition: 'transform 0.3s ease',
};

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

  const cardData = [
    {
      title: 'Users',
      count: data.users,
      icon: <PeopleAltIcon sx={{ ...iconStyle, color: '#fff', '&:hover': { transform: 'scale(1.2)' } }} />,
      gradient: 'linear-gradient(to right, #00c6ff, #0072ff)',
    },
    {
      title: 'Bookings',
      count: data.bookings,
      icon: <FlightTakeoffIcon sx={{ ...iconStyle, color: '#fff', '&:hover': { transform: 'scale(1.2)' } }} />,
      gradient: 'linear-gradient(to right, #f7971e, #ffd200)',
    },
    {
      title: 'Tours',
      count: data.tours,
      icon: <ExploreIcon sx={{ ...iconStyle, color: '#fff', '&:hover': { transform: 'scale(1.2)' } }} />,
      gradient: 'linear-gradient(to right, #a1ffce, #faffd1)',
    },
    {
      title: 'Reviews',
      count: data.reviews,
      icon: <RateReviewIcon sx={{ ...iconStyle, color: '#fff', '&:hover': { transform: 'scale(1.2)' } }} />,
      gradient: 'linear-gradient(to right, #ffecd2, #fcb69f)',
    },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        pt: 8,
        pb: 6,
        backgroundColor: '#f4f4f4', // Soft gray background
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* <Header /> */}

      <Container>
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: '#333',
            fontWeight: 'bold',
            mb: 5,
            textShadow: '2px 2px 6px rgba(0,0,0,0.2)',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          ✈️ Travel Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {cardData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  background: item.gradient,
                  color: '#fff',
                  borderRadius: 8,
                  p: 3,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(5px)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  {item.icon}
                  <Typography variant="h6" sx={{ letterSpacing: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {item.count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* <Footer /> */}
    </Box>
  );
};

export default TravelDashboard;
