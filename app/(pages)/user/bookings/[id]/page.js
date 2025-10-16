// app/booking/[id]/page.jsx
'use client';

import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Rating,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Map,
  Cancel,
  Hotel,
  KingBed,
  Wifi,
  Pool,
  Restaurant,
  FitnessCenter,
  LocalBar,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Create theme inline
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#a3b1f1',
      dark: '#5a6fd8',
    },
    secondary: {
      main: '#764ba2',
      light: '#9a76bb',
      dark: '#593a7a',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          overflow: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          fontWeight: 600,
        },
      },
    },
  },
});

// Styled components for modern design
const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s',
  },
  '&:hover::before': {
    transform: 'translateX(100%)',
  },
}));

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: '24px',
  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255,255,255,0.3)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  },
}));

const HotelImage = styled('div')({
  height: '280px',
  borderRadius: '20px',
  background: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '24px',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(45deg, rgba(255,107,107,0.8), rgba(78,205,196,0.8))',
  },
  '& > span': {
    position: 'relative',
    zIndex: 2,
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
});

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  padding: '8px 16px',
  borderRadius: '15px',
  backgroundColor:
    status === 'confirmed'
      ? 'rgba(76, 175, 80, 0.2)'
      : status === 'pending'
      ? 'rgba(255, 152, 0, 0.2)'
      : 'rgba(244, 67, 54, 0.2)',
  color:
    status === 'confirmed'
      ? '#4caf50'
      : status === 'pending'
      ? '#ff9800'
      : '#f44336',
  border: `2px solid ${
    status === 'confirmed'
      ? '#4caf50'
      : status === 'pending'
      ? '#ff9800'
      : '#f44336'
  }`,
}));

const PriceText = styled(Typography)({
  background: 'linear-gradient(45deg, #FF6B6B, #FF8E53, #FFD166)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
  fontSize: '2.5rem',
});

const DetailRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  '&:last-of-type': {
    borderBottom: 'none',
  },
});

const AmenityChip = styled(Chip)({
  borderRadius: '15px',
  border: '2px solid #667eea',
  color: '#667eea',
  fontWeight: 600,
  padding: '8px 12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#667eea',
    color: 'white',
    transform: 'translateY(-2px)',
  },
});

export default function BookingDetails() {
  // Mock data - replace with actual API data
  const bookingData = {
    id: 'BK123456',
    status: 'confirmed',
    bookingDate: '2024-01-15',
    checkInDate: '2024-02-01',
    checkOutDate: '2024-02-05',
    rooms: 2,
    guests: 4,
    totalPrice: 1200,
    currency: 'USD',
    roomType: 'Deluxe Ocean View',
  };

  const hotelData = {
    name: 'Grand Luxury Resort & Spa',
    address: '123 Paradise Boulevard, Miami Beach, FL 33139',
    phone: '+1 (555) 123-4567',
    mapLink: 'https://maps.google.com/?q=Grand+Luxury+Resort+Miami',
    rating: 4.5,
    reviews: 2847,
    amenities: ['wifi', 'pool', 'spa', 'restaurant', 'gym', 'bar'],
  };

  const handleCancelBooking = () => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      // Handle cancellation logic
      console.log('Booking cancelled');
    }
  };

  const getAmenityIcon = (amenity) => {
    const iconProps = { sx: { fontSize: 18 } };
    switch (amenity) {
      case 'wifi':
        return <Wifi {...iconProps} />;
      case 'pool':
        return <Pool {...iconProps} />;
      case 'spa':
        return <LocalBar {...iconProps} />;
      case 'restaurant':
        return <Restaurant {...iconProps} />;
      case 'gym':
        return <FitnessCenter {...iconProps} />;
      case 'bar':
        return <LocalBar {...iconProps} />;
      default:
        return <Hotel {...iconProps} />;
    }
  };

  const calculateNights = () => {
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          minHeight: '100vh',
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #667eea, #764ba2, #FF6B6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Booking Details
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            Booking ID: <strong>{bookingData.id}</strong>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Hotel Details Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ModernCard>
              <CardContent sx={{ p: 4 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Hotel sx={{ fontSize: 36, color: '#667eea', mr: 2 }} />
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    Hotel Information
                  </Typography>
                </Box>

                <Box mb={4}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: '#2d3748' }}
                  >
                    {hotelData.name}
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    flexWrap="wrap"
                    gap={2}
                  >
                    <Box display="flex" alignItems="center">
                      <Rating
                        value={hotelData.rating}
                        precision={0.5}
                        readOnly
                      />
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        ml={1}
                        fontWeight="600"
                      >
                        {hotelData.rating}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      ({hotelData.reviews.toLocaleString()} reviews)
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="flex-start" mb={3}>
                    <LocationOn sx={{ color: '#FF6B6B', mr: 1, mt: 0.5 }} />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      lineHeight="1.6"
                    >
                      {hotelData.address}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={4}>
                    <Phone sx={{ color: '#4ECDC4', mr: 1 }} />
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontWeight="600"
                    >
                      {hotelData.phone}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<Map />}
                    href={hotelData.mapLink}
                    target="_blank"
                    sx={{
                      borderColor: '#667eea',
                      color: '#667eea',
                      borderRadius: '25px',
                      px: 4,
                      py: 1.5,
                      fontSize: '16px',
                      fontWeight: 'bold',
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: '#5a6fd8',
                        backgroundColor: 'rgba(102, 126, 234, 0.04)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    View on Google Maps
                  </Button>
                </Box>

                <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.1)' }} />

                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                    color="#2d3748"
                  >
                    Hotel Amenities
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1.5}>
                    {hotelData.amenities.map((amenity, index) => (
                      <AmenityChip
                        key={index}
                        icon={getAmenityIcon(amenity)}
                        label={
                          amenity.charAt(0).toUpperCase() + amenity.slice(1)
                        }
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </ModernCard>
          </Grid>

          {/* Booking Details Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <GradientCard>
              <CardContent
                sx={{ p: 4, color: 'white', position: 'relative', zIndex: 2 }}
              >
                <Box display="flex" alignItems="center" mb={4}>
                  <KingBed sx={{ fontSize: 36, mr: 2, color: 'white' }} />
                  <Typography variant="h4" fontWeight="bold">
                    Booking Summary
                  </Typography>
                </Box>

                <Box mb={4}>
                  <DetailRow>
                    <Typography variant="body1" fontWeight="medium">
                      Booking Status:
                    </Typography>
                    <StatusChip
                      label={bookingData.status.toUpperCase()}
                      status={bookingData.status}
                    />
                  </DetailRow>

                  <DetailRow>
                    <Typography variant="body1" fontWeight="medium">
                      Booking Date:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(bookingData.bookingDate).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </Typography>
                  </DetailRow>

                  <DetailRow>
                    <Typography variant="body1" fontWeight="medium">
                      Check-in Date:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(bookingData.checkInDate).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </Typography>
                  </DetailRow>

                  <DetailRow>
                    <Typography variant="body1" fontWeight="medium">
                      Check-out Date:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {new Date(bookingData.checkOutDate).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </Typography>
                  </DetailRow>

                  <DetailRow>
                    <Typography variant="body1" fontWeight="medium">
                      Duration:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {calculateNights()} nights
                    </Typography>
                  </DetailRow>

                  <DetailRow>
                    <Typography variant="body1" fontWeight="medium">
                      Rooms:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {bookingData.rooms} × {bookingData.roomType}
                    </Typography>
                  </DetailRow>

                  <DetailRow>
                    <Typography variant="body1" fontWeight="medium">
                      Guests:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {bookingData.guests}{' '}
                      {bookingData.guests === 1 ? 'Guest' : 'Guests'}
                    </Typography>
                  </DetailRow>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', my: 4 }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Total Price
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Including taxes and fees
                    </Typography>
                  </Box>
                  <PriceText variant="h3" fontWeight="bold">
                    ₹{bookingData.totalPrice}
                  </PriceText>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Cancel />}
                  onClick={handleCancelBooking}
                  fullWidth
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    borderRadius: '20px',
                    py: 2,
                    fontSize: '18px',
                    fontWeight: 'bold',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  Cancel Booking
                </Button>
              </CardContent>
            </GradientCard>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
