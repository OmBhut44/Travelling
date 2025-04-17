import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTourPage = () => {
  const { tourId } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const fetchTourData = async () => {
      const response = await fetch(`http://localhost:5000/admin/tours/${tourId}`);
      const data = await response.json();
      setTourData(data);
      setLoading(false);
    };

    fetchTourData();
  }, [tourId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/admin/tours/${tourId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourData),
      });
      const updatedTour = await response.json();
      setLoading(false);
      history.push(`/tour/${updatedTour._id}`);
    } catch (error) {
      console.error('Error updating tour:', error);
      setLoading(false);
    }
  };

  if (loading || !tourData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} padding={4}>
      <Grid item xs={12}>
        <Typography variant="h4">Update Tour</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Title"
          fullWidth
          name="title"
          value={tourData.title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="City"
          fullWidth
          name="city"
          value={tourData.city}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Address"
          fullWidth
          name="address"
          value={tourData.address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          fullWidth
          name="desc"
          value={tourData.desc}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Updating Tour...' : 'Update Tour'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UpdateTourPage;
