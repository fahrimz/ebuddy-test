import React from 'react';
import { Box, Paper } from '@mui/material';
import Typography from '../atoms/Typography';
import { User } from '@ebuddy/entities';

interface UserDataDisplayProps {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const UserDataDisplay: React.FC<UserDataDisplayProps> = ({ user, loading, error }) => {
  if (loading) {
    return <Typography variant="body1">Loading user data...</Typography>;
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography variant="body1">No user data available.</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>User Information</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1"><strong>Name:</strong> {user.name.length > 0 ? user.name : "N/A"}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
        <Typography variant="body1"><strong>Ratings:</strong> {user.totalAverageWeightRatings}</Typography>
        <Typography variant="body1"><strong>Rents:</strong> {user.numberOfRents}</Typography>
        <Typography variant="body1"><strong>Last Active:</strong> {new Date(user.recentlyActive * 1000).toLocaleString()}</Typography>
      </Box>
    </Paper>
  );
};

export default UserDataDisplay;
