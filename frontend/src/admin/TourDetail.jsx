import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { BASE_URL } from '../utils/config';

const TourDetailsPage = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/tours/${tourId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        navigate('/tours'); // Navigate to the tours list after deletion
      } else {
        console.error('Failed to delete tour:', result.message);
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/tours/${tourId}`);
        const data = await response.json();
        setTour(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tour details:', error);
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [tourId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <Card>
      <CardMedia component="img" height="300" image={tour.photo} alt={tour.title} />
      <CardContent>
        <Typography variant="h5">{tour.title}</Typography>
        <Typography variant="h6">{tour.city}</Typography>
        <Typography variant="body2" color="text.secondary">
          {tour.desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${tour.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Max Group Size: {tour.maxGroupSize}
        </Typography>
        <Button
          onClick={() => navigate(`/edit-tour/${tour._id}`)}
          variant="outlined"
          color="primary"
        >
          Edit Tour
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          style={{ marginLeft: '10px' }}
        >
          Delete Tour
        </Button>
      </CardContent>
    </Card>
  );
};

export default TourDetailsPage;
