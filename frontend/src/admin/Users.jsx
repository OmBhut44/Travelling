import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Tooltip,
} from '@mui/material';
import { BASE_URL } from '../utils/config';
import Header from './Header';
import Footer from './Footer';
import { AdminPanelSettings, Person } from '@mui/icons-material';

const UsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/users-data`);
        const data = await response.json();
        setUsersData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users data:', error);
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f4f4f4',
        }}
      >
        <CircularProgress size={60} sx={{ color: '#0072ff' }} />
      </Box>
    ); // Stylish loading spinner
  }

  return (
    <div>
      <Header />
      <Box sx={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9', minHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', marginBottom: '2rem' }}>
          Users Information
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: 2, overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead sx={{ backgroundColor: '#0072ff', color: '#fff' }}>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#fff' }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user, index) => (
                <TableRow
                  key={user.email}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Striped rows
                    '&:hover': {
                      backgroundColor: '#f0f0f0', // Hover effect
                    },
                  }}
                >
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={user.role === 'Admin' ? 'Administrator' : 'User'}>
                      <Avatar
                        sx={{
                          bgcolor: user.role === 'Admin' ? '#0072ff' : '#f50057',
                          width: 24,
                          height: 24,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      >
                        {user.role === 'Admin' ? <AdminPanelSettings sx={{ fontSize: 18 }} /> : <Person sx={{ fontSize: 18 }} />}
                      </Avatar>
                    </Tooltip>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: user.role === 'Admin' ? '#0072ff' : '#f50057' }}>
                      {user.role}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer sx={{ position: 'relative', bottom: 0, width: '100%' }} />
    </div>
  );
};

export default UsersPage;
