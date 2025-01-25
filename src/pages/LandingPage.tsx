import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AdminHeader from '../components/AdminHeader'; // Import the AdminHeader
import Header from '../components/Header';
import universityImage from '../assets/images/University.jpg'; // Ensure the correct path
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate(user?.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Conditionally render the header based on the user's role */}
      {isLoggedIn && user?.role === 'admin' ? <AdminHeader /> : <Header />}

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)', // Adjusting height to exclude Header
          width: '100%',
        }}
      >
        {/* Top Section with University Image */}
        <Box
          sx={{
            flex: 0.7,
            backgroundImage: `url(${universityImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: { xs: 2, sm: 4 },
              borderRadius: 2,
              textAlign: 'center',
              width: { xs: '90%', sm: '70%', md: '50%' },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Welcome to Group 2b Service Management App
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'white',
                marginTop: 2,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
              }}
            >
              Streamline service request management with seamless collaboration.
            </Typography>
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            flex: 0.3,
            backgroundColor: '#1e2f97',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: 2, sm: 4 },
          }}
        >
          <Button
            aria-label="Get started with the service management app"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              paddingX: 4,
              borderRadius: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
