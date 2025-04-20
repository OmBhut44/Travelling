import React from 'react';
import { Typography } from '@mui/material';

const Footer = () => (
  <footer
    style={{
      backgroundColor: '#1976d2',
      color: 'white',
      padding: '10px 20px',
      position: 'relative', // Removed absolute positioning
      bottom: 0,
      width: '100%',
      textAlign: 'center', // Centered text
    }}
  >
    <Typography variant="body2">
      © 2025 Travel Website. All rights reserved.
    </Typography>
  </footer>
);

export default Footer;
