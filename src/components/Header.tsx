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

const Header: React.FC = () => {
  const { isLoggedIn, setToken } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle dropdown menu open/close
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout functionality
  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    setToken(null); // Clear token and update context
    navigate('/login');
  };

  // Helper function to check if the current path is active
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
        {/* App Title */}
        <Typography
          variant="h6"
          component={Link}
          to={isLoggedIn ? '/dashboard' : '/'}
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          Group 2b Service Management App
        </Typography>

        {/* Navigation Links */}
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
          {!isLoggedIn ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{
                  marginX: 1,
                  backgroundColor: isActive('/register') ? '#2E3B8E' : 'transparent',
                  ':hover': { backgroundColor: '#2E3B8E', borderRadius: 1 },
                }}
              >
                Register
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  marginX: 1,
                  backgroundColor: isActive('/login') ? '#2E3B8E' : 'transparent',
                  ':hover': { backgroundColor: '#2E3B8E', borderRadius: 1 },
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{
                  marginX: 1,
                  backgroundColor: isActive('/dashboard') ? '#2E3B8E' : 'transparent',
                  ':hover': { backgroundColor: '#2E3B8E', borderRadius: 1 },
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/master-agreements"
                sx={{
                  marginX: 1,
                  backgroundColor: isActive('/master-agreements') ? '#2E3B8E' : 'transparent',
                  ':hover': { backgroundColor: '#2E3B8E', borderRadius: 1 },
                }}
              >
                Master Agreements
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
            </>
          )}
        </Box>
      </Toolbar>

      {/* Logout Confirmation Dialog */}
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

export default Header;
