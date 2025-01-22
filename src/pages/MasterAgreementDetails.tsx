import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';
import Header from '../components/Header';
import ParticlesBackground from '../components/ParticlesBackground';
import externalAxiosInstance from '../externalAxiosConfig';

const MasterAgreementDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgreementDetails = async () => {
      try {
        const response = await externalAxiosInstance.get(
          `/master-agreements/established-agreements/${id}`
        );
        setDetails(response.data);
      } catch (err) {
        setError('Failed to fetch agreement details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAgreementDetails();
    }
  }, [id]);

  const handleCreateServiceRequest = () => {
    if (details.length > 0) {
      navigate('/create-service-request', {
        state: {
          agreementId: id,
          agreementName: `Master Agreement ${id}`,
          rolesAndDomains: details,
        },
      });
    } else {
      alert('No details available to create a service request.');
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Header />
      <ParticlesBackground id="particles" />
      <Container
        sx={{
          position: 'relative',
          zIndex: 10,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 'md',
          marginTop: 5,
          maxHeight: '75vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Master Agreement Details
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
          Go Back
        </Button>
        {details.map((domain: any) => (
          <Box key={domain.domainId} sx={{ marginBottom: 3 }}>
            <Typography variant="h5" sx={{ color: '#1E2F97', marginBottom: 1 }}>
              {domain.domainName}
            </Typography>
            {domain.roleDetails && domain.roleDetails.length > 0 ? (
              domain.roleDetails.map((role: any) => (
                <Box
                  key={role.roleId}
                  sx={{
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    marginBottom: 1,
                    backgroundColor: '#f9f9f9',
                    color: '#000',
                  }}
                >
                  <Typography variant="body1">
                    <strong>Role:</strong> {role.role}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Level:</strong> {role.level}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Technology Level:</strong> {role.technologyLevel}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No roles available for this domain.
              </Typography>
            )}
          </Box>
        ))}
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleCreateServiceRequest}>
            Create Service Request
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default MasterAgreementDetails;
