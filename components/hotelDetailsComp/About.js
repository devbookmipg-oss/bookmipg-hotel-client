import { Paper, Typography } from '@mui/material';
import React from 'react';

const About = ({ data }) => {
  return (
    <>
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom fontWeight="600">
          About This Hotel
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ lineHeight: 1.6 }}
        >
          {data.about}
        </Typography>
      </Paper>
    </>
  );
};

export default About;
