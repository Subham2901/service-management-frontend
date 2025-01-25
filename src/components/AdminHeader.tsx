import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

const AdminHeader: React.FC = () => {
  const { setToken, user } = useAuth(); // Removed isLoggedIn as it isn't used
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    setToken(null); // Clear token and update context
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#1E2F97',
        zIndex: 20,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/admin/dashboard"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          Group 2b Service Management App
        </Typography>

        {user && (
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Welcome, {user.firstName || 'Admin'}
          </Typography>
        )}

        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/home"
            sx={{
              marginX: 1,
              backgroundColor: isActive('/home') ? '#2E3B8E' : 'transparent',
              ':hover': { backgroundColor: '#2E3B8E', borderRadius: 1 },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/admin/manage-users"
            sx={{
              marginX: 1,
              backgroundColor: isActive('/admin/manage-users') ? '#2E3B8E' : 'transparent',
              ':hover': { backgroundColor: '#2E3B8E', borderRadius: 1 },
            }}
          >
            Manage Users
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/admin/reports"
            sx={{
              marginX: 1,
              backgroundColor: isActive('/admin/reports') ? '#2E3B8E' : 'transparent',
              ':hover': { backgroundColor: '#2E3B8E', borderRadius: 1 },
            }}
          >
            Reports
          </Button>
          <IconButton color="inherit" onClick={handleMenuOpen} aria-label="Account Menu">
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => setLogoutDialogOpen(true)}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default AdminHeader;