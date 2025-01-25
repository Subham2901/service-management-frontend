import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import axiosInstance from '../axiosConfig';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
  onUpdate: (updatedUser: any) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: user?.role || 'user',
    securityQuestion: user?.securityQuestion || "What's the name of your pet?",
    securityAnswer: user?.securityAnswer || '',
    companyName: user?.companyName || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Filter allowed fields for the payload
      const { firstName, lastName, email, role, securityQuestion, securityAnswer, companyName } =
        formData;
      const payload = { firstName, lastName, email, role, securityQuestion, securityAnswer, companyName };

      const response = await axiosInstance.patch(`/users/${user._id}`, payload);
      onUpdate(response.data); // Trigger parent update
      onClose(); // Close the modal
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit User
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="PM">Project Manager</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>
        <TextField
          select
          label="Security Question"
          name="securityQuestion"
          value={formData.securityQuestion}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="What's the name of your pet?">What's the name of your pet?</MenuItem>
          <MenuItem value="What is your favorite color?">What is your favorite color?</MenuItem>
          <MenuItem value="What is your favorite food?">What is your favorite food?</MenuItem>
        </TextField>
        <TextField
          label="Security Answer"
          name="securityAnswer"
          value={formData.securityAnswer}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={onClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
