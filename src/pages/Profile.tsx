import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import Header from '../components/Header';
import ParticlesBackground from '../components/ParticlesBackground';
import axios from '../axiosConfig'; // Import the configured Axios instance
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/auth/me');
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Failed to fetch user information. Please login again.');
        setToken(null);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate, setToken]);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Header />
      <ParticlesBackground id="particles" />
      <Container
        maxWidth="sm"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        {userInfo ? (
          <Box>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 2,
                fontWeight: 'bold',
                color: '#1E2F97',
              }}
            >
              Profile Information
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
              <strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
              <strong>Email:</strong> {userInfo.email}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
              <strong>Role:</strong> {userInfo.role}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
              <strong>Company:</strong> {userInfo.companyName || 'N/A'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ marginTop: 3 }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Loading profile information...
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Profile;
