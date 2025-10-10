import { Box, Grid, Paper, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const Amenities = ({ data }) => {
  return (
    <>
      {' '}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          fontWeight="600"
          color="white"
        >
          Amenities
        </Typography>
        <Grid container spacing={2}>
          {data?.amenities?.map((amenity, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box sx={{ color: 'white' }}>
                  <CheckCircleOutline />
                </Box>
                <Typography variant="body2" color="white" fontWeight="500">
                  {amenity.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Amenities;
