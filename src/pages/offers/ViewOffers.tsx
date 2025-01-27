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
      console.log('Offer selected successfully:', response.data);

      // Update the selected offer's status in the state
      setOffers((prevOffers) =>
        prevOffers.map((o) =>
          o._id === offer._id ? { ...o, status: 'Selected' } : o
        )
      );
    } catch (err) {
      console.error('Failed to select offer:', err);
      alert('Failed to select the offer. Please try again.');
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
        <Box sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
            onClick={handleUpdateCycleAndFetchOffers}
          >
            Generate Offers for Cycle 2
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: 2, backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
            onClick={() => navigate(`/user-approved-service-requests/${id}`)}
          >
            Back to Details
          </Button>
        </Box>
      </Container>
    </div>
  );
};

const ExpandableRow: React.FC<{ offer: any; handleSelectOffer: (offer: any) => void }> = ({ offer, handleSelectOffer }) => {
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
        <TableCell>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1e2f97', ':hover': { backgroundColor: '#1b2786' } }}
            onClick={() => handleSelectOffer(offer)}
            disabled={offer.status === 'Selected' || !offer.providerName || offer.providerName === 'No Providers Available'}
          >
            {offer.status === 'Selected' ? 'Selected' : 'Select'}
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