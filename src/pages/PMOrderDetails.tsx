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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ParticlesBackground from '../components/ParticlesBackground';
import PMHeader from '../components/PMHeader';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const PMOrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/orders/specific-detail/${id}`);
        setOrder(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetails();
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
        {/* Back Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
            onClick={() => navigate('/pm-orders')}
          >
            Back to Orders
          </Button>
        </Box>

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
          Order Details
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
              <Typography variant="h6">Order ID:</Typography>
              <Typography>{order?._id || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Service Request ID:</Typography>
              <Typography>{order?.serviceRequestId || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Project:</Typography>
              <Typography>{order?.project || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Total Price:</Typography>
              <Typography>${order?.totalPrice.toFixed(2) || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Status:</Typography>
              <Typography>{order?.status || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Additional Information:</Typography>
              <Typography>{order?.informationForProviderManager || 'N/A'}</Typography>
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
          Approved Offers
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
                  Provider
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
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1e2f97',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  Employees
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order?.approvedOffers?.map((offer: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{offer.providerName}</TableCell>
                  <TableCell>{offer.role}</TableCell>
                  <TableCell>{offer.level}</TableCell>
                  <TableCell>${offer.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {offer.employeeProfiles.map((emp: any) => (
                      <Typography key={emp.employeeID}>
                        {emp.employeeName} (ID: {emp.employeeID})
                      </Typography>
                    ))}
                  </TableCell>
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
            }}
            onClick={() => navigate('/pm-orders')}
          >
            Back to Orders
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PMOrderDetails;
