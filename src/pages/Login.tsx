import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import ParticlesBackground from '../components/ParticlesBackground';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

  const { setToken, setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/login', { email, password });
      setToken(response.data.access_token);

      const userDetails = await axiosInstance.get('/auth/me', {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });
      setUser(userDetails.data);

      // Redirect based on role
      if (userDetails.data.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setResetError(null);
      setResetSuccess(null);
      await axiosInstance.post('/users/reset-password', {
        email: resetEmail,
        securityAnswer,
        newPassword,
      });
      setResetSuccess('Password reset successfully! You can now log in with your new password.');
      setResetDialogOpen(false);
    } catch (error) {
      console.error('Reset Password Error:', error);
      setResetError('Failed to reset password. Please check your details.');
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
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginBottom: 2, fontWeight: 'bold', color: 'black' }}
          >
            Log In
          </Typography>

          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

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

          <Button
            variant="text"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={() => setResetDialogOpen(true)}
          >
            Forgot Password?
          </Button>
        </Box>
      </Container>

      {/* Reset Password Dialog */}
      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email, security answer, and a new password to reset your password.
          </DialogContentText>
          {resetError && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {resetError}
            </Typography>
          )}
          {resetSuccess && (
            <Typography variant="body2" color="success" sx={{ marginBottom: 2 }}>
              {resetSuccess}
            </Typography>
          )}
          <TextField
            label="Email"
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Security Answer"
            type="text"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResetPassword} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
