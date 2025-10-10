'use client';
import { Box } from '@mui/material';

const Preloader = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div class="loader"></div>
      </Box>
    </>
  );
};

export default Preloader;
