import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
  TablePagination,
  Container,
  TextField,
  MenuItem,
} from '@mui/material';
import AdminHeader from '../components/AdminHeader';
import EditUserModal from '../components/EditUserModal';
import ParticlesBackground from '../components/ParticlesBackground';
import axiosInstance from '../axiosConfig';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search and filter state
  const [roleFilter, setRoleFilter] = useState('');
  const [firstNameFilter, setFirstNameFilter] = useState(''); // Added state for first name filter
  const [lastNameFilter, setLastNameFilter] = useState(''); // Added state for last name filter
  const [companyFilter, setCompanyFilter] = useState('');

  const navigate = useNavigate();

  const fetchUsers = async (filters: { role?: string; firstName?: string; lastName?: string; company?: string } = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/users', {
        params: filters,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  const handleUserUpdate = (updatedUser: any) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    handleCloseModal();
  };

  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Search and filter handlers
  const handleFilterChange = () => {
    fetchUsers({
      role: roleFilter || undefined,
      firstName: firstNameFilter || undefined, // Include first name filter
      lastName: lastNameFilter || undefined, // Include last name filter
      company: companyFilter || undefined,
    });
  };

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
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <AdminHeader />
      <ParticlesBackground id="particles" />
      <Container
        sx={{
          position: 'relative',
          zIndex: 10,
          padding: 2,
          maxWidth: 'lg',
          height: 'calc(100vh - 64px)', // Fit within the viewport
          overflow: 'hidden', // Prevent main container scrolling
        }}
      >
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </Button>

        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            color: 'white',
            textAlign: 'center',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
          }}
        >
          User Management
        </Typography>

        {/* Filters */}
        <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: 'space-between',
    marginBottom: 2,
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 1,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  }}
>
  <TextField
    label="Role"
    select
    value={roleFilter}
    onChange={(e) => setRoleFilter(e.target.value)}
    fullWidth
    sx={{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 1,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#1e2f97',
        },
        '&:hover fieldset': {
          borderColor: '#1b2786',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1e2f97',
        },
      },
    }}
  >
    <MenuItem value="">All</MenuItem>
    <MenuItem value="admin">Admin</MenuItem>
    <MenuItem value="PM">Project Manager</MenuItem>
    <MenuItem value="user">User</MenuItem>
  </TextField>
  <TextField
    label="First Name"
    value={firstNameFilter}
    onChange={(e) => setFirstNameFilter(e.target.value)}
    fullWidth
    sx={{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 1,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#1e2f97',
        },
        '&:hover fieldset': {
          borderColor: '#1b2786',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1e2f97',
        },
      },
    }}
  />
  <TextField
    label="Last Name"
    value={lastNameFilter}
    onChange={(e) => setLastNameFilter(e.target.value)}
    fullWidth
    sx={{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 1,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#1e2f97',
        },
        '&:hover fieldset': {
          borderColor: '#1b2786',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1e2f97',
        },
      },
    }}
  />
  <TextField
    label="Company"
    value={companyFilter}
    onChange={(e) => setCompanyFilter(e.target.value)}
    fullWidth
    sx={{
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 1,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#1e2f97',
        },
        '&:hover fieldset': {
          borderColor: '#1b2786',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1e2f97',
        },
      },
    }}
  />
  <Button
    variant="contained"
    onClick={handleFilterChange}
    sx={{
      flex: 0.5,
      backgroundColor: '#1e2f97',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#1b2786',
      },
    }}
  >
    Filter
  </Button>
</Box>

        {/* Table */}
        <Paper elevation={3} sx={{ borderRadius: 2, padding: 2 }}>
          <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableRow key={user._id} hover>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.companyName || 'N/A'}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleEditClick(user)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      {openModal && selectedUser && (
        <EditUserModal
          open={openModal}
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default UserManagement;
