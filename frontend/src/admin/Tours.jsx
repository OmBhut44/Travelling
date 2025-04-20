import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';

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
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="textSecondary">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Content Section */}
      <Box sx={{ 
        padding: '3rem 1.5rem', 
        textAlign: 'center', 
        flexGrow: 1, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Make sure content starts from the top
        alignItems: 'center', // Center the button and other content
      }}>
        {/* Add New Tour Button */}
        <Button 
          variant="contained" 
          color="primary" 
          sx={{
            mb: 4, 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            padding: '10px 20px',
            maxWidth: '250px', // Ensure button width is consistent
            width: '100%', // Allow button to take up full width in smaller screens
          }}
          onClick={() => history("/admin/addTour")}
        >
          Add New Tour
        </Button>
        
        {/* Tours Grid */}
        <Grid container spacing={4} justifyContent="center">
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} key={tour._id}>
              <Card sx={{ 
                boxShadow: 3, 
                borderRadius: 2, 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
              }}>
                <CardMedia 
                  component="img" 
                  height="200" 
                  image={tour.photo} 
                  alt={tour.title} 
                  sx={{
                    objectFit: 'cover',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }} 
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {tour.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {tour.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    ${tour.price}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    sx={{ fontWeight: 'bold' }}
                    onClick={() => history(`/tour/${tour._id}`)} // Navigate to tour details page
                  >
                    View Tour
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ToursListPage;
