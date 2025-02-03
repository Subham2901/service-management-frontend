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
  Alert,
  TextField      
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ParticlesBackground from '../../components/ParticlesBackground';
import axiosInstance from '../../axiosConfig';

const UserPMevaluationoffer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const navigate = useNavigate();
  const [serviceRequestStatus, setServiceRequestStatus] = useState<string | null>(null);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosInstance.get(`/offers/${id}`);
        setOffers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load offers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const fetchServiceRequestStatus = async () => {
      try {
        const response = await axiosInstance.get(`/service-requests/${id}`);
        setServiceRequestStatus(response.data.status);
      } catch (err) {
        console.error('Failed to fetch service request status:', err);
      }
    };

    fetchOffers(); // Fetches offers data
    fetchServiceRequestStatus(); // Fetches service request status
}, [id]); // Runs when `id` changes

  



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
  
  const [isSending, setIsSending] = useState(false);

  const handleSendForPmEvaluation = async () => {
    if (!canSendForPmEvaluation() ) return;
    else if(!comment.trim()){
      alert('Please enter a comment before submitting.');
      return;
    }
  
    setIsSending(true); // Disable button immediately
  
    try {
      await axiosInstance.patch(`/offers/${id}/status`, { status: 'PmOfferEvaluation', comment: `Requester: ${comment}` });
  
      setSnackbar({
        open: true,
        message: 'Service request sent for PM evaluation successfully!',
        severity: 'success',
      });
  
      // ✅ Update the status immediately in state
      setServiceRequestStatus("PmOfferEvaluation");
  
      setTimeout(() => {
        navigate(`/user-PMEvaluation-service-requests`);
      }, 1500);
    } catch (err) {
      console.error('Failed to send for PM evaluation:', err);
      setSnackbar({
        open: true,
        message: 'Failed to send for PM evaluation. Please try again.',
        severity: 'error',
      });
  
      setIsSending(false); // Allow retry if request fails
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
        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
  
        <Button
  variant="contained"
  sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
  onClick={handleSendForPmEvaluation}
  disabled={isSending || serviceRequestStatus === 'PmOfferEvaluation'}
>
  {isSending ? 'Processing...' : serviceRequestStatus === 'PmOfferEvaluation' ? 'Sent for PM Evaluation' : 'Send for PM Evaluation'}
</Button>




  <Button
    variant="contained"
    sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
    onClick={() => navigate(`/user-PMEvaluation-service-requests/${id}`)}
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

export default UserPMevaluationoffer;