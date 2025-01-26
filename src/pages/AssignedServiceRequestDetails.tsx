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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import ParticlesBackground from '../components/ParticlesBackground';
import PMHeader from '../components/PMHeader';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const AssignedServiceRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceRequest, setServiceRequest] = useState<any>(null);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState<string>('');

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

    if (id) {
      fetchRequestDetails();
    }
  }, [id]);

  const handleDialogOpen = (type: 'approve' | 'reject') => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setComment('');
  };

  const handleSubmit = async () => {
    try {
      if (dialogType === 'approve') {
        await axiosInstance.patch(`/service-requests/${id}/approve`, { comment });
        alert('Service request approved successfully!');
      } else if (dialogType === 'reject') {
        await axiosInstance.patch(`/service-requests/${id}/reject`, { comment });
        alert('Service request rejected.');
      }
      navigate('/pm-assigned-requests');
    } catch (err) {
      console.error(`Error ${dialogType}ing service request:`, err);
      alert(`Failed to ${dialogType} service request.`);
    } finally {
      handleDialogClose();
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
          Assigned Service Request Details
        </Typography>
        <Paper
          sx={{
            padding: 3,
            marginBottom: 3,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
              <Typography>{new Date(serviceRequest?.begin).toLocaleDateString() || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">End Date:</Typography>
              <Typography>{new Date(serviceRequest?.end).toLocaleDateString() || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Amount of Man Days:</Typography>
              <Typography>{serviceRequest?.amountOfManDays || 'N/A'}</Typography>
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
              <Typography variant="h6">Location:</Typography>
              <Typography>{serviceRequest?.location || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Additional Information:</Typography>
              <Typography>{serviceRequest?.informationForProviderManager || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Consumer:</Typography>
              <Typography>{serviceRequest?.consumer || 'N/A'}</Typography>
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
                  Number of Profiles Needed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceRequest?.selectedMembers?.map((member: any) => (
                <TableRow
                  key={member._id}
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
            onClick={() => navigate('/pm-assigned-requests')}
          >
            Back to List
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleDialogOpen('approve')}
            sx={{ marginRight: 2 }}
          >
            Approve
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDialogOpen('reject')}>
            Reject
          </Button>
        </Box>
      </Container>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{dialogType === 'approve' ? 'Approve Request' : 'Reject Request'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a comment to {dialogType === 'approve' ? 'approve' : 'reject'} the service
            request.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            fullWidth
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignedServiceRequestDetails;
