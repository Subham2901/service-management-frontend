import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Button,
  TextField
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ParticlesBackground from '../../components/ParticlesBackground';
import axiosInstance from '../../axiosConfig';

const ViewPMOffer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [comment, setComment] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get(`/offers/selected/${id}`);
        console.log('Fetched offers:', response.data);
        setOffers(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch offers:', err);
        setError('Failed to load offers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [id]);

  const handleUpdateSRStatus = async () => {
    if (!comment.trim()) {
      alert('Please enter a comment before submitting.');
      return;
    }

    setIsUpdating(true);
    try {
      await axiosInstance.patch(`/offers/${id}/status`, { status: 'UserOfferReEvaluation', comment: `PM: ${comment}` });
      alert('Service request status updated to UserOfferReEvaluation');
      navigate('/pm-evaluation-sr');
    } catch (err) {
      alert('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleApproveAndCreateOrder = async () => {
    if (!window.confirm("Are you sure you want to approve the offers and create the order?")) return;
  
    setIsUpdating(true);
    try {
      const response = await axiosInstance.post(`/orders/create/${id}`);
      alert('Service request approved and order created successfully!');
      navigate(`/orders/${response.data.orderId}`);
    } catch (err) {
      alert('Failed to approve and create order. Please try again.');
    } finally {
      setIsUpdating(false);
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
        <Typography variant="h5" gutterBottom>
          Offers for Service Request
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1e2f97', color: '#fff' }} />
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1e2f97', color: '#fff' }}>Provider</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1e2f97', color: '#fff' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1e2f97', color: '#fff' }}>Level</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1e2f97', color: '#fff' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1e2f97', color: '#fff' }}>Cycle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer, index) => {
                console.log('Rendering offer:', offer);
                return <ExpandableRow key={index} offer={offer} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <TextField
            label="Enter Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
                    <Button
            variant="contained"
            sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
            disabled={isUpdating}
            onClick={handleUpdateSRStatus}
          >
            {isUpdating ? 'Updating...' : 'Request User Re-Evaluation'}
          </Button>
        </Box>
        <Box sx={{ marginTop: 4 }}>

          <Button
            variant="contained"
            sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
            onClick={() => navigate(`/Pm-Evaluation-service-requests/${id}`)}
          >
            Back to Details
          </Button>
          <Button
    variant="contained"
    sx={{ backgroundColor: '#198754', ':hover': { backgroundColor: '#157347' } }}
    disabled={isUpdating}
    onClick={handleApproveAndCreateOrder}
  >
    {isUpdating ? 'Processing...' : 'Approve & Create Order'}
  </Button>
        </Box>
      </Container>
    </div>
  );
};

const ExpandableRow: React.FC<{ offer: any }> = ({ offer }) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{offer.providerName || 'No Providers Available'}</TableCell>
        <TableCell>{offer.role || 'N/A'}</TableCell>
        <TableCell>{offer.level || 'N/A'}</TableCell>
        <TableCell>${offer.price ? offer.price.toFixed(2) : 'N/A'}</TableCell>
        <TableCell>{offer.cycle || 'N/A'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="subtitle1" gutterBottom>
                Employee Profiles
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Employee ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offer.employeeProfiles?.map((profile: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{profile.employeeID}</TableCell>
                      <TableCell>{profile.employeeName || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ViewPMOffer;
