import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader';
import ParticlesBackground from '../components/ParticlesBackground';
import axios from '../axiosConfig'; // Import the configured Axios instance
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [editing, setEditing] = useState(false); // To track edit mode
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false); // To track save operation
  const navigate = useNavigate();
  const { setToken, user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/auth/me');
        setUserInfo(response.data);
        setCompanyName(response.data.companyName || ''); // Set initial company name
      } catch (error) {
        console.error('Error fetching user info:', error);
        alert('Failed to fetch user information. Please login again.');
        setToken(null);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate, setToken]);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };



  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`/users/${userInfo._id}`, {
        companyName,
      });
      setUserInfo(response.data); // Update user info with the new data
      setEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating company name:', error);
      alert('Failed to update company name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user?.role === 'admin'; // Check if the user is an admin

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Render AdminHeader for admins, otherwise render Header */}
      {isAdmin ? <AdminHeader /> : <Header />}
      <ParticlesBackground id="particles" />
      <Container
        maxWidth="sm"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        {userInfo ? (
          <Box>
            <Typography
              variant="h5"
              sx={{
                marginBottom: 2,
                fontWeight: 'bold',
                color: '#1E2F97',
              }}
            >
              Profile Information
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
              <strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
              <strong>Email:</strong> {userInfo.email}
            </Typography>
            <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
              <strong>Role:</strong> {userInfo.role}
            </Typography>

            {/* Editable Company Name */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
                <strong>Company:</strong>
              </Typography>
              {editing ? (
                <TextField
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  fullWidth
                  disabled={loading}
                />
              ) : (
                <Typography variant="body1" sx={{ color: 'black', marginBottom: 1 }}>
                  {companyName || 'N/A'}
                </Typography>
              )}
            </Box>

            {/* Edit and Save Buttons */}
            {editing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={loading}
                sx={{ marginRight: 2 }}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setEditing(true)}
                sx={{ marginRight: 2 }}
              >
                Edit
              </Button>
            )}

            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Loading profile information...
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default Profile;
