import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BASE_URL } from '../utils/config';
import Header from './Header';
import Footer from './Footer';
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
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  return (
    <div>
        <Header></Header>
      <Grid container spacing={4} padding={4}>
        {usersData.map((user, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card style={{ backgroundColor: '#f3f3f3' }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Role: {user.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer></Footer>
    </div>
  );
};

export default UsersPage;
