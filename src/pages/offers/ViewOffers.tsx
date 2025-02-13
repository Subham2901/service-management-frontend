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
  Button,
  IconButton,
  Collapse,
  Snackbar,
  Alert      
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ParticlesBackground from '../../components/ParticlesBackground';
import axiosInstance from '../../axiosConfig';

const ViewOffers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get(`/offers/${id}`);
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

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const canSendForPmEvaluation = () => {
    if (offers.length === 0) return false;
  
    // Track selected offers for members who have offers
    const selectedOffersByMember = new Map();
    const availableOffersByMember = new Map();
  
    offers.forEach((offer) => {
      const key = `${offer.domainId}-${offer.role}`;
  
      // Track available offers for each member
      if (offer.providerName) {
        availableOffersByMember.set(key, true);
      }
  
      // Track selected offers for each member
      if (offer.status === 'Selected') {
        selectedOffersByMember.set(key, true);
      }
    });
  
    // ✅ At least one selected offer must exist
    const atLeastOneSelected = selectedOffersByMember.size > 0;
  
    // ✅ Every member who has offers must have at least one selected
    const allMembersWithOffersHaveSelection = [...availableOffersByMember.keys()].every((key) =>
      selectedOffersByMember.has(key)
    );
  
    return atLeastOneSelected && allMembersWithOffersHaveSelection;
  };
  
  const handleSendForPmEvaluation = async () => {
    if (!canSendForPmEvaluation()) return;
  
    try {
      await axiosInstance.patch(`/offers/${id}/send-for-pm-evaluation`);
      
      setSnackbar({
        open: true,
        message: 'Service request sent for PM evaluation successfully!',
        severity: 'success',
      });
  
      // Navigate to user-approved-service-requests after a short delay
      setTimeout(() => {
        navigate(`/user-approved-service-requests`);
      }, 1500); // Delay to allow Snackbar to show success message
  
    } catch (err) {
      console.error('Failed to send for PM evaluation:', err);
      setSnackbar({
        open: true,
        message: 'Failed to send for PM evaluation. Please try again.',
        severity: 'error',
      });
    }
  };
  

  const handleUpdateCycleAndFetchOffers = async () => {
    setLoading(true); // Show a loading spinner
    try {
      // Step 1: Update cycleStatus to Cycle2
      await axiosInstance.patch(`/offers/${id}/cycle-status`, {
        cycleStatus: 'Cycle2',
      });

      // Step 2: Generate offers for the updated cycle
      await axiosInstance.post('/offers/generate', { serviceRequestId: id });

      // Step 3: Fetch updated offers
      const response = await axiosInstance.get(`/offers/${id}`);
      setOffers(response.data); // Update offers state
      setError(null);
    } catch (err) {
      console.error('Failed to update cycle and fetch offers:', err);
      setError('Failed to update cycle and fetch new offers. Please try again.');
    } finally {
      setLoading(false); // Hide the loading spinner
    }
  };

  const handleSelectOffer = async (offer: any) => {
    try {
      const response = await axiosInstance.post('/offers/select', { offerId: offer._id });
  
      console.log(`Offer status updated:`, response.data);
  
      // Update UI state to reflect new status
      setOffers((prevOffers) =>
        prevOffers.map((o) =>
          o._id === offer._id ? { ...o, status: response.data.offer.status } : o
        )
      );
    } catch (err) {
      console.error(`Failed to update offer status:`, err);
      alert(`Failed to update the offer. Please try again.`);
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
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#1e2f97', color: '#fff' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {offers.map((offer, index) => (
                <ExpandableRow key={index} offer={offer} handleSelectOffer={handleSelectOffer} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
  <Button
    variant="contained"
    sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
    onClick={handleUpdateCycleAndFetchOffers}
  >
    Generate Offers for Cycle 2
  </Button>
  
  <Button
    variant="contained"
    sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
    onClick={handleSendForPmEvaluation}
    disabled={!canSendForPmEvaluation()}
  >
    Send for PM Evaluation
  </Button>

  <Button
    variant="contained"
    sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
    onClick={() => navigate(`/user-approved-service-requests/${id}`)}
  >
    Back to Details
  </Button>
</Box>
<Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
  <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
    {snackbar.message}
  </Alert>
</Snackbar>

      </Container>
    </div>
  );
};

const ExpandableRow: React.FC<{ offer: any; handleSelectOffer: (offer: any) => void }> = ({ offer, handleSelectOffer }) => {
  const [open, setOpen] = useState(false);
  const isDisabled = !offer.providerName || offer.providerName === 'No Providers Available';

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
        <TableCell>
          <Button
  variant="contained"
  sx={{ backgroundColor: offer.status === 'Selected' ? '#d32f2f' : '#1e2f97', 
        ':hover': { backgroundColor: offer.status === 'Selected' ? '#b71c1c' : '#1b2786' } }}
  onClick={() => handleSelectOffer(offer)}
  disabled={isDisabled}
>
  {offer.status === 'Selected' ? 'Deselect' : 'Select'}
</Button>

        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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

export default ViewOffers;