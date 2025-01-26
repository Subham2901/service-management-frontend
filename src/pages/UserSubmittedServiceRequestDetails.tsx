import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
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
import { useNavigate, useParams } from 'react-router-dom';

const UserSubmittedServiceRequestDetails: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [serviceRequest, setServiceRequest] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceRequestDetails = async () => {
      try {
        const response = await axiosInstance.get(`/service-requests/${id}/details`);
        setServiceRequest(response.data);
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
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <IconButton
            color="primary"
            onClick={() => navigate(-1)}
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
            Service Request Details
          </Typography>
        </Box>

        {/* Service Request Details */}
        {serviceRequest ? (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Task Description:
                </Typography>
                <Typography>{serviceRequest.taskDescription || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Project:
                </Typography>
                <Typography>{serviceRequest.project || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Type:
                </Typography>
                <Typography>{serviceRequest.type || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Agreement Name:
                </Typography>
                <Typography>{serviceRequest.agreementName || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Location:
                </Typography>
                <Typography>{serviceRequest.location || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Location Type:
                </Typography>
                <Typography>{serviceRequest.locationType || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Number of Specialists:
                </Typography>
                <Typography>{serviceRequest.numberOfSpecialists || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Number of Offers:
                </Typography>
                <Typography>{serviceRequest.numberOfOffers || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Amount of Man Days:
                </Typography>
                <Typography>{serviceRequest.amountOfManDays || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Status:
                </Typography>
                <Typography>{serviceRequest.status || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Information for Provider Manager:
                </Typography>
                <Typography>{serviceRequest.informationForProviderManager || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Consumer:
                </Typography>
                <Typography>{serviceRequest.consumer || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Representatives:
                </Typography>
                <ul>
                  {serviceRequest.representatives?.map((rep: string, index: number) => (
                    <li key={index}>{rep}</li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Selected Members:
                </Typography>
                <ul>
                  {serviceRequest.selectedMembers?.map((member: any, index: number) => (
                    <li key={index}>
                      {member.role} ({member.level}) - {member.domainName}, Profiles Needed: {member.numberOfProfilesNeeded || 'N/A'}
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Typography align="center">No details available for this service request.</Typography>
        )}
      </Container>
    </div>
  );
};

export default UserSubmittedServiceRequestDetails;
