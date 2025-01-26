import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Grid,
  Button,
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

const ApprovedServiceRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceRequest, setServiceRequest] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axiosInstance.get(`/service-requests/${id}/details`);
        setServiceRequest(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load service request details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

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
          <Button variant="contained" color="primary" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

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
          Approved Service Request Details
        </Typography>
        <Paper sx={{ padding: 3, marginBottom: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Agreement ID:</Typography>
              <Typography>{serviceRequest?.agreementId || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Agreement Name:</Typography>
              <Typography>{serviceRequest?.agreementName || 'N/A'}</Typography>
            </Grid>
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
              <Typography>
                {serviceRequest?.begin ? new Date(serviceRequest?.begin).toLocaleDateString() : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">End Date:</Typography>
              <Typography>
                {serviceRequest?.end ? new Date(serviceRequest?.end).toLocaleDateString() : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Man Days:</Typography>
              <Typography>{serviceRequest?.amountOfManDays || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Location:</Typography>
              <Typography>{serviceRequest?.location || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Information for Provider Manager:</Typography>
              <Typography>{serviceRequest?.informationForProviderManager || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Number of Specialists:</Typography>
              <Typography>{serviceRequest?.numberOfSpecialists || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Number of Offers:</Typography>
              <Typography>{serviceRequest?.numberOfOffers || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Consumer:</Typography>
              <Typography>{serviceRequest?.consumer || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Location Type:</Typography>
              <Typography>{serviceRequest?.locationType || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Status:</Typography>
              <Typography>{serviceRequest?.status || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Provider Manager ID:</Typography>
              <Typography>{serviceRequest?.providerManagerId || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Cycle Status:</Typography>
              <Typography>{serviceRequest?.cycleStatus || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Created By:</Typography>
              <Typography>{serviceRequest?.createdBy || 'N/A'}</Typography>
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
              {serviceRequest?.selectedMembers?.length > 0 ? (
                serviceRequest.selectedMembers.map((member: any) => (
                  <TableRow key={member._id}>
                    <TableCell>{member.domainName || 'N/A'}</TableCell>
                    <TableCell>{member.role || 'N/A'}</TableCell>
                    <TableCell>{member.level || 'N/A'}</TableCell>
                    <TableCell>{member.technologyLevel || 'N/A'}</TableCell>
                    <TableCell>{member.numberOfProfilesNeeded || 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No member information available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: '#1e2f97',
            marginTop: 3,
          }}
        >
          Notifications
        </Typography>
        <Paper sx={{ padding: 3, marginTop: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {serviceRequest?.notifications?.length > 0 ? (
                <ul>
                  {serviceRequest.notifications.map((notification: string, index: number) => (
                    <li key={index}>{notification}</li>
                  ))}
                </ul>
              ) : (
                <Typography>No notifications available.</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1e2f97',
              ':hover': { backgroundColor: '#1b2786' },
            }}
            onClick={() => navigate('/pm-approved-requests')}
          >
            Back to List
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default ApprovedServiceRequestDetails;
