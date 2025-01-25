import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Paper,
  Container,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ParticlesBackground from '../components/ParticlesBackground';
import PMHeader from '../components/PMHeader';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ApprovedServiceRequests: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const response = await axiosInstance.get('/service-requests/approved');
        setServiceRequests(response.data || []);
      } catch (err) {
        console.error('Failed to fetch approved service requests:', err);
        setError('Failed to load approved service requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApprovedRequests();
    }
  }, [token]);

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
        </Box>
      </Container>
    );
  }

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
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <IconButton
            color="primary"
            onClick={() => navigate('/pm/dashboard')}
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
            Approved Service Requests
          </Typography>
        </Box>

        {serviceRequests.length === 0 ? (
          <Typography align="center">No approved service requests found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: '#1e2f97',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  >
                    Task Description
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: '#1e2f97',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  >
                    Project
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: '#1e2f97',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: '#1e2f97',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceRequests.map((request) => (
                  <TableRow key={request.ServiceRequestId}>
                    <TableCell>{request.taskDescription}</TableCell>
                    <TableCell>{request.project}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          navigate(`/pm-approved-requests/${request.ServiceRequestId}`, {
                            state: { from: '/pm-approved-requests' },
                          })
                        }
                        sx={{ marginRight: 1 }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};

export default ApprovedServiceRequests;
