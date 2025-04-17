import React from 'react';
import { Typography } from '@mui/material';

const Footer = () => (
  <footer
    style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#1976d2',
      color: 'white',
      padding: '10px 20px',
      zIndex: 1000,
    }}
  >
    <Typography variant="body2" align="center">
      © 2025 Travel Website. All rights reserved.
    </Typography>
  </footer>
);

export default Footer;
