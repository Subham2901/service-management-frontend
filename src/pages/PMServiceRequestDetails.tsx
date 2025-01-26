import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ParticlesBackground from '../components/ParticlesBackground';
import PMHeader from '../components/PMHeader';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const PMServiceRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceRequest, setServiceRequest] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceRequestDetails = async () => {
      try {
        const response = await axiosInstance.get(`/service-requests/${id}/details`);
        setServiceRequest(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch service request details:', err);
        setError('Failed to load service request details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token && id) {
      fetchServiceRequestDetails();
    }
  }, [token, id]);

  const handleAssign = async () => {
    try {
      await axiosInstance.patch(`/service-requests/${id}/assign`);
      alert('Service request assigned successfully!');
      navigate('/pm-service-requests'); // Redirect back to the service request list
    } catch (err) {
      console.error('Error assigning service request:', err);
      alert('Failed to assign service request.');
    }
  };

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
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  const pmRejectionComment =
    serviceRequest?.notifications?.find((note: string) => note.startsWith('Rejected by PM')) ||
    'No rejection comment available.';

  const userResubmissionComment =
    serviceRequest?.notifications?.find((note: string) =>
      note.startsWith('User Resubmission Comment')
    ) || 'No resubmission comment available.';

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'auto' }}>
      <PMHeader />
      <ParticlesBackground id="particles" />
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          padding: 4,
          marginTop: 4,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#1e2f97',
            borderBottom: '2px solid #1e2f97',
            paddingBottom: 1,
          }}
        >
          Service Request Details
        </Typography>
        <Paper
          sx={{
            padding: 3,
            marginBottom: 3,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
          }}
        >
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="error" gutterBottom>
              PM Rejection Comment:
            </Typography>
            <Typography>{pmRejectionComment}</Typography>
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              User Resubmission Comment:
            </Typography>
            <Typography>{userResubmissionComment}</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Task Description:</Typography>
              <Typography>{serviceRequest?.taskDescription || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Project:</Typography>
              <Typography>{serviceRequest?.project || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Type:</Typography>
              <Typography>{serviceRequest?.type || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Start Date:</Typography>
              <Typography>{new Date(serviceRequest?.begin).toLocaleDateString() || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">End Date:</Typography>
              <Typography>{new Date(serviceRequest?.end).toLocaleDateString() || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Location:</Typography>
              <Typography>{serviceRequest?.location || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Number of Offers:</Typography>
              <Typography>{serviceRequest?.numberOfOffers || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Number of Specialists:</Typography>
              <Typography>{serviceRequest?.numberOfSpecialists || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Representatives:</Typography>
              <Typography>{serviceRequest?.representatives?.join(', ') || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Additional Information:</Typography>
              <Typography>{serviceRequest?.informationForProviderManager || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: '#1e2f97',
            marginTop: 3,
          }}
        >
          Member Information
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
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
                  Domain Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1e2f97',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1e2f97',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Level
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1e2f97',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Technology Level
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1e2f97',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Profiles Needed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceRequest?.selectedMembers?.map((member: any) => (
                <TableRow
                  key={member.roleId}
                  sx={{
                    ':hover': {
                      backgroundColor: '#f1f1f1',
                    },
                  }}
                >
                  <TableCell>{member.domainName}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.level}</TableCell>
                  <TableCell>{member.technologyLevel}</TableCell>
                  <TableCell>{member.numberOfProfilesNeeded}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1e2f97',
              ':hover': { backgroundColor: '#1b2786' },
              marginRight: 2,
            }}
            onClick={() => navigate('/pm-service-requests')}
          >
            Back to List
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              ':hover': {
                backgroundColor: '#1b2786',
              },
            }}
            onClick={handleAssign}
          >
            Assign to Me
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PMServiceRequestDetails;