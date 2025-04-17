import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateTourPage = () => {
  const [tourData, setTourData] = useState({
    title: '',
    city: '',
    address: '',
    distance: '',
    photo: '',
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/admin/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tourData),
      });
      const result = await response.json();
      setLoading(false);
      history.push(`/tour/${result._id}`);
    } catch (error) {
      console.error('Error creating tour:', error);
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2} padding={4}>
      <Grid item xs={12}>
        <Typography variant="h4">Create a New Tour</Typography>
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
      <Grid item xs={12} sm={6}>
        <TextField
          label="Distance"
          fullWidth
          name="distance"
          value={tourData.distance}
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
        <TextField
          label="Price"
          fullWidth
          name="price"
          value={tourData.price}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Max Group Size"
          fullWidth
          name="maxGroupSize"
          value={tourData.maxGroupSize}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Image URL"
          fullWidth
          name="photo"
          value={tourData.photo}
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
          {loading ? 'Creating Tour...' : 'Create Tour'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateTourPage;
