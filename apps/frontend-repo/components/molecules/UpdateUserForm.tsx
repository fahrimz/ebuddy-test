import React, { useState } from 'react';
import { Box, TextField, Paper } from '@mui/material';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import { UpdateStatus } from '../atoms/UpdateButton';
import { User } from '@ebuddy/entities'

interface UpdateUserFormProps {
  user: User | null;
  updateStatus: UpdateStatus;
  updateError: string | null;
  onSubmit: (userData: Partial<User>) => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ 
  user, 
  updateStatus, 
  updateError, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || '',
    email: user?.email || '',
    totalAverageWeightRatings: user?.totalAverageWeightRatings || 0,
    numberOfRents: user?.numberOfRents || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'name' || name === 'email' ? value : Number(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Update User Information</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Average Ratings"
          name="totalAverageWeightRatings"
          type="number"
          value={formData.totalAverageWeightRatings}
          onChange={handleChange}
          margin="normal"
          inputProps={{ step: 0.1 }}
        />
        <TextField
          fullWidth
          label="Number of Rents"
          name="numberOfRents"
          type="number"
          value={formData.numberOfRents}
          onChange={handleChange}
          margin="normal"
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={updateStatus === 'loading'}
          sx={{ mt: 2 }}
        >
          {updateStatus === 'loading' ? 'Updating...' : 'Update User'}
        </Button>
        {updateStatus === 'succeeded' && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            User updated successfully!
          </Typography>
        )}
        {updateStatus === 'failed' && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {updateError}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default UpdateUserForm;
