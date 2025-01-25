import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  CircularProgress,
} from '@mui/material';
import ParticlesBackground from '../components/ParticlesBackground';
import PMHeader from '../components/PMHeader';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import bannerImage from '../assets/images/Banner.jpg';

const PMDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token, user: authUser } = useAuth();

  useEffect(() => {
    if (authUser?.role !== 'PM') {
      navigate('/unauthorized'); // Redirect if not PM
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/auth/me');
        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      navigate('/login');
    }
  }, [token, navigate, authUser]);

  if (loading) {
    return (
      <Container>
        <PMHeader />
        <ParticlesBackground id="particles" />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <PMHeader />
        <ParticlesBackground id="particles" />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <PMHeader />
      <ParticlesBackground id="particles" />
      <Container
        sx={{
          position: 'relative',
          zIndex: 10,
          padding: 4,
          backgroundColor: '#f3f4f6',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 'lg',
          marginTop: 5,
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            marginBottom: 4,
            textAlign: 'center',
          }}
        >
          <img
            src={bannerImage}
            alt="Dashboard Banner"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              Welcome, {user?.firstName || 'PM'}!
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
              Here’s a quick overview of your account.
            </Typography>
          </Box>
        </Box>

        {/* Dashboard Tiles */}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: '#1e2f97',
                color: '#fff',
                ':hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: '#1b2786',
                },
              }}
              onClick={() => navigate('/pm-master-agreements')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  PM Master Agreements
                </Typography>
                <Typography variant="body2">View all Master Agreements.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: '#1e2f97',
                color: '#fff',
                ':hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: '#1b2786',
                },
              }}
              onClick={() => navigate('/pm-service-request-list')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  PM Service Requests
                </Typography>
                <Typography variant="body2">View and manage service requests.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: '#1e2f97',
                color: '#fff',
                ':hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: '#1b2786',
                },
              }}
              onClick={() => navigate('/profile')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile
                </Typography>
                <Typography variant="body2">View and update your profile details.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PMDashboard;
