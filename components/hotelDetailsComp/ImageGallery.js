import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

const ImageGallery = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedImage, setSelectedImage] = useState(0);
  const ImageList = [
    data?.hotel_image1?.url,
    data?.hotel_image2?.url,
    data?.hotel_image3?.url,
    data?.hotel_image4?.url,
    data?.hotel_image5?.url,
  ].filter(Boolean);
  return (
    <>
      {/* Image Gallery */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Box
          sx={{
            height: isMobile ? 300 : 500,
            backgroundImage: `url(${ImageList[selectedImage]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        />

        {/* Thumbnail Gallery */}
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 2,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': {
                height: 4,
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#667eea',
                borderRadius: 2,
              },
            }}
          >
            {ImageList.map((image, index) => (
              <Box
                key={index}
                onClick={() => setSelectedImage(index)}
                sx={{
                  width: 80,
                  height: 60,
                  flexShrink: 0,
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: selectedImage === index ? 2 : 0,
                  borderColor: '#667eea',
                  opacity: selectedImage === index ? 1 : 0.7,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ImageGallery;
