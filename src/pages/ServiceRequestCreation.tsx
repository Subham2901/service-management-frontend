import React, { useState, useEffect } from 'react';
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
  Grid,

} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import ParticlesBackground from '../components/ParticlesBackground';
import Header from '../components/Header';

const ServiceRequestCreation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    agreementId: Number(location.state?.agreementId) || 0,
    taskDescription: '',
    type: 'Single',
    project: '',
    selectedMembers: [
      {
        domainId: '',
        domainName: '',
        roleId: '',
        role: '',
        level: '',
        technologyLevel: '',
        numberOfProfilesNeeded: 1,
      },
    ],
    begin: '',
    end: '',
    amountOfManDays: 0,
    location: '',
    representatives: '',
    locationType: 'Onshore',
    informationForProviderManager: '',
    numberOfOffers: 0,
    consumer: '',
  });

  const [numberOfSpecialists, setNumberOfSpecialists] = useState(1);

  const agreementDetails = location.state?.rolesAndDomains || [];
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
    };
    setFormData((prev) => ({
      ...prev,
      consumer: `${user.firstName} ${user.lastName}`,
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedMembers = [...formData.selectedMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };

    if (field === 'domainId') {
      const selectedDomain = agreementDetails.find(
        (domain: any) => domain.domainId === value
      );
      updatedMembers[index].domainName = selectedDomain?.domainName || '';
      updatedMembers[index].roleId = '';
      updatedMembers[index].role = '';
      updatedMembers[index].level = '';
      updatedMembers[index].technologyLevel = '';
    }

    if (field === 'role') {
      const selectedDomain = agreementDetails.find(
        (domain: any) => domain.domainId === updatedMembers[index].domainId
      );
      const selectedRole = selectedDomain?.roleDetails.find(
        (role: any) => role.role === value
      );
      updatedMembers[index].technologyLevel = selectedRole?.technologyLevel || '';
      updatedMembers[index].roleId = selectedRole?.roleId || '';
      updatedMembers[index].level = selectedRole?.level || '';
    }

    setFormData((prev) => ({ ...prev, selectedMembers: updatedMembers }));
    updateNumberOfSpecialists(updatedMembers);
  };

  const calculateAmountOfManDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let days = 0;
    while (start <= end) {
      const day = start.getDay();
      if (day !== 0 && day !== 6) days++;
      start.setDate(start.getDate() + 1);
    }
    return days;
  };

  const handleTypeChange = (type: string) => {
    if (type === 'Single') {
      setFormData((prev) => ({
        ...prev,
        type,
        selectedMembers: [
          {
            domainId: '',
            domainName: '',
            roleId: '',
            role: '',
            level: '',
            technologyLevel: '',
            numberOfProfilesNeeded: 1,
          },
        ],
      }));
      setNumberOfSpecialists(1);
    } else if (type === 'Multi') {
      setFormData((prev) => ({
        ...prev,
        type,
        selectedMembers: [
          {
            domainId: '',
            domainName: '',
            roleId: '',
            role: '',
            level: '',
            technologyLevel: '',
            numberOfProfilesNeeded: 1,
          },
        ],
      }));
      setNumberOfSpecialists(1);
    } else {
      setFormData((prev) => ({
        ...prev,
        type,
        selectedMembers: [
          {
            domainId: '',
            domainName: '',
            roleId: '',
            role: '',
            level: '',
            technologyLevel: '',
            numberOfProfilesNeeded: 0,
          },
        ],
      }));
      setNumberOfSpecialists(0);
    }
  };

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      selectedMembers: [
        ...prev.selectedMembers,
        {
          domainId: '',
          domainName: '',
          roleId: '',
          role: '',
          level: '',
          technologyLevel: '',
          numberOfProfilesNeeded: 0,
        },
      ],
    }));
  };

  const removeMember = (index: number) => {
    const updatedMembers = formData.selectedMembers.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, selectedMembers: updatedMembers }));
    updateNumberOfSpecialists(updatedMembers);
  };

  const updateNumberOfSpecialists = (members: any[]) => {
    const total = members.reduce(
      (sum, member) => sum + (member.numberOfProfilesNeeded || 0),
      0
    );
    setNumberOfSpecialists(total);
  };

/*   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      representatives: formData.representatives.split(',').map((rep) => rep.trim()),
      amountOfManDays: calculateAmountOfManDays(formData.begin, formData.end),
      numberOfOffers: Number(formData.numberOfOffers),
      numberOfSpecialists,
    };

    if (formData.numberOfOffers > 2) {
      alert('Number of Offers cannot exceed 2.');
      return;
    }

    console.log('Generated Request Body:', preparedData);

    try {
      const response = await axios.post('/service-requests', preparedData);
      console.log('API Response:', response.data);
      alert('Service request created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating service request:', error);
      alert('Failed to create service request.');
    }
  }; */
  const handleSaveAsDraft = async () => {
    const preparedData = {
      ...formData,
      representatives: formData.representatives.split(',').map((rep) => rep.trim()),
      amountOfManDays: calculateAmountOfManDays(formData.begin, formData.end),
      numberOfOffers: Number(formData.numberOfOffers),
      numberOfSpecialists,
    };

    console.log('Saving as draft:', preparedData);

    try {
      const response = await axios.post('/service-requests', {
        ...preparedData,
      });
      console.log('Draft Saved:', response.data);
      alert('Service request saved as draft successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      representatives: formData.representatives.split(',').map((rep) => rep.trim()),
      amountOfManDays: calculateAmountOfManDays(formData.begin, formData.end),
      numberOfOffers: Number(formData.numberOfOffers),
      numberOfSpecialists,
    };

    if (formData.numberOfOffers > 2) {
      alert('Number of Offers cannot exceed 2.');
      return;
    }

    console.log('Directly Submitting Service Request:', preparedData);

    try {
      const response = await axios.post('/service-requests/directsubmit', preparedData);
      console.log('Service Request Submitted:', response.data);
      alert('Service request submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting service request:', error);
      alert('Failed to submit service request.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/dashboard');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <ParticlesBackground id="particles" />

      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          margin: 'auto',
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ marginBottom: 3, fontWeight: 'bold', color: 'black' }}
        >
          Create Service Request
        </Typography>
                <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Task Description"
                name="taskDescription"
                value={formData.taskDescription}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project"
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Team">Team</MenuItem>
                  <MenuItem value="Multi">Multi</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {formData.type === 'Team' && (
              <Grid item xs={12}>
                <Button variant="contained" onClick={addMember} sx={{ marginBottom: 2 }}>
                  Add Member
                </Button>
              </Grid>
            )}
{formData.selectedMembers.map((member, index) => (
  <Box
    key={index}
    sx={{
      marginBottom: 2,
      padding: 1,
      border: '3px solid #ccc',
      borderRadius: 2,
      backgroundColor: '#ffffff',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        maxWidth: '900px', // Restrict the width for better centering
        justifyContent: 'space-between', // Center and align content
      }}
    >
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Domain</InputLabel>
          <Select
            value={member.domainId || ''}
            onChange={(e) => handleMemberChange(index, 'domainId', e.target.value)}
          >
            <MenuItem value="">Select Domain</MenuItem>
            {agreementDetails.map((domain: any) => (
              <MenuItem key={domain.domainId} value={domain.domainId}>
                {domain.domainName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={member.role || ''}
            onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
          >
            <MenuItem value="">Select Role</MenuItem>
            {agreementDetails
              .find((domain: any) => domain.domainId === member.domainId)
              ?.roleDetails.map((role: any) => (
                <MenuItem key={role.roleId} value={role.role}>
                  {role.role} ({role.level})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          label="Technology Level"
          value={member.technologyLevel || ''}
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Profiles Needed"
          type="number"
          value={member.numberOfProfilesNeeded}
          onChange={(e) =>
            handleMemberChange(index, 'numberOfProfilesNeeded', parseInt(e.target.value, 10))
          }
          fullWidth
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={1}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Align to the right
          alignItems: 'center',
        }}
      >
        {formData.type === 'Team' && formData.selectedMembers.length > 1 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => removeMember(index)}
            size="small"
          >
            Remove Member
          </Button>
        )}
      </Grid>
    </Grid>
  </Box>
))}




            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                name="begin"
                type="date"
                value={formData.begin}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: today } }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                name="end"
                type="date"
                value={formData.end}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: formData.begin } }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount of Man Days"
                name="amountOfManDays"
                value={calculateAmountOfManDays(formData.begin, formData.end)}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Number of Specialists"
                name="numberOfSpecialists"
                value={numberOfSpecialists}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Offers"
                name="numberOfOffers"
                type="number"
                value={formData.numberOfOffers}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Representatives (comma-separated)"
                name="representatives"
                value={formData.representatives}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Location Type</InputLabel>
                <Select
                  name="locationType"
                  value={formData.locationType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, locationType: e.target.value }))}
                >
                  <MenuItem value="Nearshore">Nearshore</MenuItem>
                  <MenuItem value="Offshore">Offshore</MenuItem>
                  <MenuItem value="Onshore">Onshore</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Additional Information for Provider Manager"
                name="informationForProviderManager"
                value={formData.informationForProviderManager}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Consumer"
                name="consumer"
                value={formData.consumer}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} container spacing={2} justifyContent="space-between">
  <Grid item xs={12} sm={4}>
    <Button
      onClick={handleSaveAsDraft}
      variant="contained"
      color="secondary"
      fullWidth
    >
      Save as Draft
    </Button>
  </Grid>
  <Grid item xs={12} sm={4}>
    <Button type="submit" variant="contained" color="primary" fullWidth>
      Submit Service Request
    </Button>
  </Grid>
  <Grid item xs={12} sm={4}>
    <Button
      onClick={handleCancel}
      variant="outlined"
      color="error"
      fullWidth
    >
      Cancel
    </Button>
  </Grid>
</Grid>

          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default ServiceRequestCreation;

