import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';
import Header from '../components/Header';
import axiosInstance from '../axiosConfig';

const UserApprovedServiceRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [serviceRequest, setServiceRequest] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offersError, setOffersError] = useState<string | null>(null);
  const [memberStatusMessages, setMemberStatusMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [generatingOffers, setGeneratingOffers] = useState<boolean>(false);
  const [canViewOffers, setCanViewOffers] = useState<boolean>(false);

  useEffect(() => {
    const fetchRequestDetails = async () => {
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

    fetchRequestDetails();
  }, [id]);

  // To generate the offers for the service request
  const handleGenerateOffers = async () => {
    setGeneratingOffers(true); // Start loading state
    setOffersError(null); // Clear previous error
    setMemberStatusMessages([]); // Clear previous member status messages
    try {
      const response = await axiosInstance.post('/offers/generate', {
        serviceRequestId: id, // Pass the required service request ID
      });
      console.log('Offers generated successfully:', response.data); // Debug log
      if (response.data.memberStatuses && response.data.memberStatuses.length > 0) {
        const messages = response.data.memberStatuses.map((status: any) => status.message);
        setMemberStatusMessages(messages);
      } else {
        setOffersError(null); // Clear any previous error
        setCanViewOffers(true); // Enable the view offers button
      }
    } catch (err: any) {
      console.error('Failed to generate offers:', err.response?.data || err); // Debug log for errors
      setOffersError(
        err.response?.data?.message || 'Failed to generate offers. Please try again.'
      );
      setCanViewOffers(false); // Disable the view offers button
    } finally {
      setGeneratingOffers(false); // End loading state
    }
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <IconButton
            color="primary"
            onClick={() => navigate('/user-approved-service-requests')}
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
            Approved Service Request Details
          </Typography>
        </Box>
        <Paper sx={{ padding: 4, marginBottom: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6">Agreement Name:</Typography>
              <Typography>{serviceRequest.agreementName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Task Description:</Typography>
              <Typography>{serviceRequest.taskDescription || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Project:</Typography>
              <Typography>{serviceRequest.project || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Type:</Typography>
              <Typography>{serviceRequest.type || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Start Date:</Typography>
              <Typography>{new Date(serviceRequest.begin).toLocaleDateString() || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">End Date:</Typography>
              <Typography>{new Date(serviceRequest.end).toLocaleDateString() || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Location:</Typography>
              <Typography>{serviceRequest.location || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Information for Provider Manager:</Typography>
              <Typography>{serviceRequest.informationForProviderManager || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Number of Specialists:</Typography>
              <Typography>{serviceRequest.numberOfSpecialists || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Number of Offers:</Typography>
              <Typography>{serviceRequest.numberOfOffers || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Consumer:</Typography>
              <Typography>{serviceRequest.consumer || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Cycle Status:</Typography>
              <Typography>{serviceRequest.cycleStatus || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Location Type:</Typography>
              <Typography>{serviceRequest.locationType || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Status:</Typography>
              <Typography>{serviceRequest.status || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Provider Manager ID:</Typography>
              <Typography>{serviceRequest.providerManagerId || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Typography variant="h5" gutterBottom>
          Selected Members
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#1e2f97', color: '#fff', fontWeight: 'bold' }}>Domain Name</TableCell>
                <TableCell sx={{ backgroundColor: '#1e2f97', color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ backgroundColor: '#1e2f97', color: '#fff', fontWeight: 'bold' }}>Level</TableCell>
                <TableCell sx={{ backgroundColor: '#1e2f97', color: '#fff', fontWeight: 'bold' }}>Profiles Needed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceRequest.selectedMembers?.map((member: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{member.domainName}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.level}</TableCell>
                  <TableCell>{member.numberOfProfilesNeeded}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" gutterBottom>
            Notifications
          </Typography>
          {serviceRequest.notifications && serviceRequest.notifications.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#1e2f97', color: '#fff', fontWeight: 'bold' }}>Notification</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceRequest.notifications.map((notification: string, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{notification}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No notifications available.</Typography>
          )}
        </Box>
        {offersError && (
          <Box sx={{ marginTop: 2 }}>
            <Typography color="error">{offersError}</Typography>
          </Box>
        )}
        {memberStatusMessages.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
              Member Status Messages:
            </Typography>
            <ul>
              {memberStatusMessages.map((message, index) => (
                <li key={index}>
                  <Typography>{message}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1e2f97',
              marginRight: 2,
              ':hover': { backgroundColor: '#1b2786' },
            }}
            onClick={() => navigate('/user-approved-service-requests')}
          >
            Back to List
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1e2f97',
              marginRight: 2,
              ':hover': { backgroundColor: '#1b2786' },
            }}
            onClick={handleGenerateOffers}
            disabled={generatingOffers}
          >
            {generatingOffers ? 'Generating Offers...' : 'Generate Offers'}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1e2f97',
              ':hover': { backgroundColor: '#1b2786' },
            }}
            onClick={() => navigate(`/service-requests/${id}/offers`)}
            disabled={!canViewOffers}
          >
            View Offers
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default UserApprovedServiceRequestDetails;
