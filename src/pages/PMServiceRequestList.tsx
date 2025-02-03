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
import PMHeader from '../components/PMHeader';
import { useNavigate } from 'react-router-dom';

const PMServiceRequestList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'auto' }}>
      <PMHeader />
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
            onClick={() => navigate('/pm/dashboard')} // Navigate back to PM dashboard
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
            Service Requests
          </Typography>
        </Box>

        {/* Service Request Cards */}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
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
              onClick={() => navigate('/pm-service-requests')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Submitted Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  View and assign submitted service requests.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Assigned Service Requests */}
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
              onClick={() => navigate('/pm-assigned-requests')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Assigned Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  View and manage service requests assigned to you.
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
              onClick={() => navigate('/pm-approved-requests')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Approved Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  View all service requests approved by you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* PM Evaluation Service Requests - New Tile */}
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
              onClick={() => navigate('/pm-evaluation-sr')} // Navigate to PM Evaluation Service Requests
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  PM Evaluation Service Requests
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  View and evaluate service requests for PM evaluation.
                </Typography>
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
              onClick={() => navigate('/pm-orders')} // Navigate to PM Orders Page
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  PM Orders
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  View all orders created by you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PMServiceRequestList;
