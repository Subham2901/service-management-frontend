import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import ParticlesBackground from '../components/ParticlesBackground';
import Header from '../components/Header';
import axiosInstance from '../axiosConfig'; // Use the configured axios instance
import { SelectChangeEvent } from '@mui/material';

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
    role: 'user', // Default role
    companyName: '',
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
        role: formData.role,
        companyName: formData.companyName || undefined,
      });

      alert('Registration successful!');
      navigate('/login'); // Redirect to login
    } catch (err: any) {
      const message =
        err.response?.data?.message || 'Failed to register. Please try again.';
      setError(message);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflowY: 'scroll', // Allow scrolling for the entire page
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Header />

      {/* Particles Background */}
      <ParticlesBackground id="particles" />

      {/* Registration Form */}
      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          margin: 'auto',
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Box>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginBottom: 2, fontWeight: 'bold', color: 'black' }}
          >
            Register
          </Typography>
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="security-question-label">Security Question</InputLabel>
              <Select
                labelId="security-question-label"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
              >
                <MenuItem value="What's the name of your pet?">What's the name of your pet?</MenuItem>
                <MenuItem value="What is your favorite color?">What is your favorite color?</MenuItem>
                <MenuItem value="What is your favorite food?">What is your favorite food?</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Security Answer"
              name="securityAnswer"
              value={formData.securityAnswer}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required sx={{ marginTop: '16px' }}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="PM">Project Manager</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Registration;
