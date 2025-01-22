import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, CircularProgress } from '@mui/material';
import ParticlesBackground from '../components/ParticlesBackground';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous error

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      setToken(response.data.access_token); // Notify AuthContext
      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Header */}
      <Header />

      {/* Particles Background */}
      <ParticlesBackground id="particles" />

      {/* Login Form */}
      <Container
        maxWidth="sm"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          {/* Title */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginBottom: 2, fontWeight: 'bold', color: 'black' }}
          >
            Log In
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Loading Indicator */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
                disabled={loading}
              >
                Login
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Login;
