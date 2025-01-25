import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import PMHeader from '../components/PMHeader';
import ParticlesBackground from '../components/ParticlesBackground';
import { useNavigate } from 'react-router-dom';
import externalAxiosInstance from '../externalAxiosConfig';

const PMMasterAgreementList: React.FC = () => {
  const [agreements, setAgreements] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMasterAgreements = async () => {
    const url = '/master-agreements/established-agreements';
    setLoading(true);
    setError(null);
    try {
      const response = await externalAxiosInstance.get(url);
      setAgreements(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterAgreements();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <PMHeader />
      <ParticlesBackground id="particles" />
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: 'linear-gradient(to right, #1E90FF, #00BFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            }}
          >
            Master Agreements
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              ':hover': { backgroundColor: '#004ba0' },
            }}
            onClick={fetchMasterAgreements}
          >
            Sync Agreements
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ maxWidth: '1200px' }}>
          {agreements.map((agreement) => (
            <Grid item xs={12} sm={6} md={4} key={agreement.agreementId}>
              <Card
                sx={{
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                  },
                }}
                onClick={() => navigate(`/pm-master-agreements/${agreement.agreementId}`)}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#1E2F97', fontWeight: 'bold' }}
                  >
                    {agreement.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Agreement ID: {agreement.agreementId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Valid From: {new Date(agreement.validFrom).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Valid Until: {new Date(agreement.validUntil).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default PMMasterAgreementList;
