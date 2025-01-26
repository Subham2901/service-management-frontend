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
import Header from '../components/Header';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserRejectedServiceRequestList: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [rejectedRequests, setRejectedRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRejectedRequests = async () => {
      try {
        const response = await axiosInstance.get('/service-requests/user-requests/rejected');
        setRejectedRequests(response.data);
      } catch (err) {
        console.error('Failed to fetch rejected service requests:', err);
        setError('Failed to load rejected service requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRejectedRequests();
    }
  }, [token]);

  if (loading) {
    return (
      <Container>
        <Header />
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
        <Header />
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
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <IconButton
            color="primary"
            onClick={() => navigate('/service-requests')}
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
            Rejected Service Requests
          </Typography>
        </Box>

        {rejectedRequests.length === 0 ? (
          <Typography align="center">No rejected service requests found.</Typography>
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
                    Rejection Comments
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
                {rejectedRequests.map((request) => (
                  <TableRow key={request.ServiceRequestId}>
                    <TableCell>{request.taskDescription || 'N/A'}</TableCell>
                    <TableCell>{request.project || 'N/A'}</TableCell>
                    <TableCell>
                 {request.notifications
                    .filter((note: string) => note.includes('Rejected'))
                     .map((note: string, index: number) => {
                     const match = note.match(/Comment: (.*)/);
                     const comment = match ? match[1] : 'No comment provided';
                    return (
                    <Typography key={index}>{comment}</Typography>
                    );
                     })}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/rejected-requests/${request.ServiceRequestId}`)}
                        sx={{ marginRight: 1 }}
                      >
                        View
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

export default UserRejectedServiceRequestList;
