import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ParticlesBackground from '../components/ParticlesBackground';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const UserServiceRequestList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'auto' }}>
      <Header />
      <ParticlesBackground id="particles" />
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          padding: 4,
          marginTop: 4,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Back Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <IconButton
            color="primary"
            onClick={() => navigate('/dashboard')} // Navigate back to user dashboard
            sx={{
              marginRight: 2,
              backgroundColor: '#1e2f97',
              color: '#fff',
              ':hover': { backgroundColor: '#1b2786' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: '#1e2f97', fontWeight: 'bold' }}>
            My Service Requests
          </Typography>
        </Box>

        {/* Service Request Categories */}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {/* Draft Service Requests */}
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
              onClick={() => navigate('/user-drafts')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Draft Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  View and manage drafts of your service requests.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Submitted Service Requests */}
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
              onClick={() => navigate('/user-submitted-requests')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Submitted Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  Track service requests you've submitted.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Rejected Service Requests */}
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
              onClick={() => navigate('/user-rejected-requests')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Rejected Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  Resubmit rejected service requests.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Approved Service Requests */}
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
              onClick={() => navigate('/user-approved-service-requests')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Approved Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  View all approved service requests.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserServiceRequestList;
