import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import AdminHeader from '../components/AdminHeader';
import ParticlesBackground from '../components/ParticlesBackground';
import bannerImage from '../assets/images/Banner.jpg'; // Reuse the same banner image
import { useAuth } from '../context/AuthContext'; // Use AuthContext for token and user info

const AdminDashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch admin details
        const adminResponse = await axiosInstance.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminInfo(adminResponse.data);

        // Fetch user count
        const userResponse = await axiosInstance.get('/users');
        setUserCount(userResponse.data.length);
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading) {
    return (
      <Container>
        <AdminHeader />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <AdminHeader />
      <ParticlesBackground id="particles" />
      <Container
        sx={{
          position: 'relative',
          zIndex: 10,
          padding: 4,
          backgroundColor: '#f3f4f6', // Updated background color
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 'lg',
          marginTop: 5,
          overflowY: 'auto',
        }}
      >
        {/* Banner Section */}
        <Box
          sx={{
            position: 'relative',
            marginBottom: 4,
            textAlign: 'center',
          }}
        >
          <img
            src={bannerImage}
            alt="Admin Dashboard Banner"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              Welcome, {adminInfo?.firstName || 'Admin'}!
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
              Manage your platform efficiently from here.
            </Typography>
          </Box>
        </Box>

        {/* Dashboard Tiles */}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: '#1e2f97',
                color: '#fff',
                ':hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: '#1b2786',
                },
              }}
              onClick={() => navigate('/admin/manage-users')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Manage Users
                </Typography>
                <Typography variant="body2">
                  {userCount} Registered Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                cursor: 'pointer',
                backgroundColor: '#1e2f97',
                color: '#fff',
                ':hover': {
                  boxShadow: 6,
                  transform: 'scale(1.05)',
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: '#1b2786',
                },
              }}
              onClick={() => navigate('/admin/reports')}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reports
                </Typography>
                <Typography variant="body2">
                  View analytics and reports.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
