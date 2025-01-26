import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams, useNavigate } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';
import Header from '../components/Header';
import axiosInstance from '../axiosConfig';

const ManageRejectedRequest: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [comment, setComment] = useState<string>(''); // State for comment input
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numberOfSpecialists, setNumberOfSpecialists] = useState<number>(0);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axiosInstance.get(`/service-requests/${id}/details`);
        const fetchedData = response.data;

        const amountOfManDays = calculateAmountOfManDays(fetchedData.begin, fetchedData.end);
        const specialists = calculateNumberOfSpecialists(fetchedData.selectedMembers);

        setFormData({ ...fetchedData, amountOfManDays });
        setNumberOfSpecialists(specialists);
      } catch (err) {
        console.error('Failed to fetch request details:', err);
        setError('Failed to load request details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id]);

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

  const calculateNumberOfSpecialists = (members: any[]) => {
    return members.reduce(
      (sum, member) => sum + (member.numberOfProfilesNeeded || 0),
      0
    );
  };

  const cleanPayload = (payload: any) => {
    const allowedFields = [
      'agreementId',
      'taskDescription',
      'type',
      'project',
      'selectedMembers',
      'begin',
      'end',
      'amountOfManDays',
      'location',
      'informationForProviderManager',
      'numberOfSpecialists',
      'numberOfOffers',
      'consumer',
      'representatives',
      'locationType',
      'comment', // Add comment to the payload
    ];

    return Object.keys(payload)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj: { [key: string]: any }, key) => {
        obj[key] = payload[key];
        return obj;
      }, {});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => {
      const updatedFormData = { ...prev, [name]: name === 'numberOfOffers' ? Number(value) : value };

      if (name === 'begin' || name === 'end') {
        updatedFormData.amountOfManDays = calculateAmountOfManDays(
          updatedFormData.begin,
          updatedFormData.end
        );
      }

      return updatedFormData;
    });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitRequest = async () => {
    setIsSubmitting(true);
    try {
      const payload = cleanPayload({ ...formData, comment }); // Include comment in the payload

      await axiosInstance.patch(`/service-requests/${id}/submit`, payload);
      alert('Request resubmitted successfully!');
      navigate('/user-rejected-requests');
    } catch (err) {
      console.error('Failed to resubmit request:', err);
      alert('Failed to resubmit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/user-rejected-requests');
    }
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <ParticlesBackground id="particles" />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header />
        <ParticlesBackground id="particles" />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }
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
      Manage Rejected Request
    </Typography>
    {/* PM's Rejection Comment */}
        {formData?.notifications?.find((note: string) => note.includes('Rejected')) && (
        <Box sx={{ marginBottom: 3, padding: 2, backgroundColor: '#ffe6e6', borderRadius: 2 }}>
          <Typography variant="body1" color="error">
            {formData.notifications
              .filter((note: string) => note.includes('Rejected'))
              .map((note: string) => note.replace(/.*Comment: /, ''))}
          </Typography>
        </Box>
      )}
    <form>
      <Grid container spacing={3}>
        {/* Agreement Name */}
        <Grid item xs={12}>
          <TextField
            label="Agreement Name"
            name="agreementName"
            value={formData?.agreementName || ''}
            fullWidth
            disabled
          />
        </Grid>

        {/* Task Description */}
        <Grid item xs={12}>
          <TextField
            label="Task Description"
            name="taskDescription"
            value={formData?.taskDescription || ''}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>

        {/* Type */}
        <Grid item xs={12}>
          <TextField
            label="Type"
            name="type"
            value={formData?.type || ''}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        {/* Project */}
        <Grid item xs={12}>
          <TextField
            label="Project"
            name="project"
            value={formData?.project || ''}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>

        {/* Location */}
        <Grid item xs={12}>
          <TextField
            label="Location"
            name="location"
            value={formData?.location || ''}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>

        {/* Location Type */}
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Location Type</InputLabel>
            <Select
              name="locationType"
              value={formData?.locationType || ''}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, locationType: e.target.value }))}
              fullWidth
            >
              <MenuItem value="Nearshore">Nearshore</MenuItem>
              <MenuItem value="Farshore">Farshore</MenuItem>
              <MenuItem value="Onshore">Onshore</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Consumer */}
        <Grid item xs={12}>
          <TextField
            label="Consumer"
            name="consumer"
            value={formData?.consumer || ''}
            fullWidth
            disabled
          />
        </Grid>

        {/* Begin Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Begin Date"
            name="begin"
            type="date"
            value={formData?.begin?.split('T')[0] || ''}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
        </Grid>

        {/* End Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date"
            name="end"
            type="date"
            value={formData?.end?.split('T')[0] || ''}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
        </Grid>

        {/* Amount of Man Days */}
        <Grid item xs={12}>
          <TextField
            label="Amount of Man Days"
            name="amountOfManDays"
            value={formData?.amountOfManDays || ''}
            fullWidth
            disabled
          />
        </Grid>

        {/* Total Number of Specialists */}
        <Grid item xs={12}>
          <TextField
            label="Total Number of Specialists"
            name="numberOfSpecialists"
            value={numberOfSpecialists}
            fullWidth
            disabled
          />
        </Grid>

        {/* Number of Offers */}
        <Grid item xs={12}>
          <TextField
            label="Number of Offers"
            name="numberOfOffers"
            type="number"
            value={formData?.numberOfOffers || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Representatives */}
        <Grid item xs={12}>
          <TextField
            label="Representatives (comma-separated)"
            name="representatives"
            value={formData?.representatives?.join(', ') || ''}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                representatives: e.target.value.split(',').map((rep) => rep.trim()),
              }))
            }
            fullWidth
            required
          />
        </Grid>

        {/* Additional Information for Provider Manager */}
        <Grid item xs={12}>
          <TextField
            label="Additional Information for Provider Manager"
            name="informationForProviderManager"
            value={formData?.informationForProviderManager || ''}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        {/* Selected Members */}
        <Grid item xs={12}>
          <Typography variant="h6">Selected Members</Typography>
          {formData?.selectedMembers?.map((member: any, index: number) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{`Member ${index + 1}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <strong>Domain:</strong> {member.domainName || ''}
                </Typography>
                <Typography>
                  <strong>Role:</strong> {member.role || ''}
                </Typography>
                <Typography>
                  <strong>Level:</strong> {member.level || ''}
                </Typography>
                <Typography>
                  <strong>Technology Level:</strong> {member.technologyLevel || ''}
                </Typography>
                <Typography>
                  <strong>Profiles Needed:</strong> {member.numberOfProfilesNeeded || ''}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        {/* Comment for Resubmission */}
        <Grid item xs={12}>
          <TextField
            label="Add Resubmission Comment"
            value={comment}
            onChange={handleCommentChange}
            multiline
            rows={4}
            fullWidth
            required
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmitRequest}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Resubmit'}
        </Button>
      </Box>
    </form>
  </Container>
</div>
  );
};

export default ManageRejectedRequest;