import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
import axiosInstance from '../axiosConfig';

const SubmittedRequests: React.FC = () => {
  const [submittedRequests, setSubmittedRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmittedRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/service-requests'); // Fetch all requests
      const submitted = response.data.submitted || []; // Filter "submitted" requests
      setSubmittedRequests(submitted);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch submitted requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmittedRequests();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#1E2F97',
        }}
      >
        Submitted Service Requests
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Agreement Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedRequests.map((request) => (
                <TableRow key={request.ServiceRequestId}>
                  <TableCell>{request.ServiceRequestId}</TableCell>
                  <TableCell>{request.agreementName}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => console.log('View Details Clicked')}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ ml: 2 }}
                      onClick={() => console.log('Assign to Self Clicked')}
                    >
                      Assign to Self
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ ml: 2 }}
                      onClick={() => console.log('Approve Clicked')}
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SubmittedRequests;
