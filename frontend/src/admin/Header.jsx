import React from 'react';
import { Typography, Toolbar, AppBar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      style={{ top: 0, width: '100%', backgroundColor: '#1976d2', zIndex: 1000, height: '40px',
       }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', marginTop:'-10px'}}>
        <Typography variant="h6">Travel Dashboard</Typography>
        <div>
          <Button color="inherit" onClick={() => navigate('/admin')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/admin/users')}>Users</Button>
          <Button color="inherit" onClick={() => navigate('/admin/bookings')}>Bookings</Button>
          <Button color="inherit" onClick={() => navigate('/admin/reviews')}>Reviews</Button>
          <Button color="inherit" onClick={() => navigate('/admin/tours')}>Tours</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
