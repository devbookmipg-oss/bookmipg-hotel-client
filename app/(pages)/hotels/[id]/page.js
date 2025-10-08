// app/hotel/[id]/page.tsx
'use client';

import React, { use, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
  Divider,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  useMediaQuery,
  Stack,
  AvatarGroup,
  Avatar,
} from '@mui/material';
import {
  Favorite,
  Share,
  LocationOn,
  Wifi,
  Pool,
  FitnessCenter,
  Restaurant,
  Spa,
  LocalParking,
  Pets,
  AcUnit,
  Tv,
  CheckCircleOutline,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
import { GetDataList, GetSingleData } from '@/utils/ApiFunctions';
import { Preloader } from '@/components/common';
import { ImageGallery } from '@/components/hotelDetailsComp';

// Mock data - replace with actual API calls
const hotelData = {
  id: 1,
  name: 'Grand Luxury Resort & Spa',
  rating: 4.8,
  reviewCount: 1247,
  address: '123 Luxury Avenue, Downtown, City 12345',
  description:
    'Experience unparalleled luxury at our 5-star resort featuring world-class amenities, exquisite dining, and breathtaking views. Our commitment to excellence ensures an unforgettable stay for every guest.',
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=600&fit=crop',
  ],
  amenities: [
    { name: 'Free WiFi', icon: <Wifi />, category: 'technology' },
    { name: 'Swimming Pool', icon: <Pool />, category: 'recreation' },
    { name: 'Fitness Center', icon: <FitnessCenter />, category: 'recreation' },
    { name: 'Restaurant', icon: <Restaurant />, category: 'dining' },
    { name: 'Spa', icon: <Spa />, category: 'wellness' },
    {
      name: 'Free Parking',
      icon: <LocalParking />,
      category: 'transportation',
    },
    { name: 'Pet Friendly', icon: <Pets />, category: 'services' },
    { name: 'Air Conditioning', icon: <AcUnit />, category: 'comfort' },
    { name: 'Smart TV', icon: <Tv />, category: 'entertainment' },
  ],
  rooms: [
    {
      id: 1,
      name: 'Deluxe King Room',
      description:
        'Spacious room with king-sized bed, city view, and luxury bathroom with marble finishes and premium toiletries.',
      price: 299,
      image:
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
      features: ['City View', '45 sqm', 'Free Breakfast', 'King Bed'],
      capacity: 2,
    },
    {
      id: 2,
      name: 'Executive Suite',
      description:
        'Luxurious suite with separate living area, work desk, and premium amenities including Nespresso machine.',
      price: 499,
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      features: ['Panoramic View', '75 sqm', 'Executive Lounge', 'Living Area'],
      capacity: 3,
    },
    {
      id: 3,
      name: 'Presidential Suite',
      description:
        'Ultimate luxury experience with private terrace, jacuzzi, and dedicated butler service for personalized attention.',
      price: 899,
      image:
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=300&fit=crop',
      features: ['Private Terrace', '120 sqm', 'Butler Service', 'Jacuzzi'],
      capacity: 4,
    },
  ],
};

export default function HotelDetailsPage({ params }) {
  const { id } = use(params);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedRoom, setSelectedRoom] = useState('');
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const data = GetSingleData({
    endPoint: 'hotels',
    id: id,
  });

  const rooms = GetDataList({
    endPoint: 'room-categories',
  });

  const handleBookingChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minCheckOut = bookingData.checkIn
    ? new Date(bookingData.checkIn)
    : tomorrow;
  minCheckOut.setDate(minCheckOut.getDate() + 1);

  return (
    <>
      {!data || !rooms ? (
        <Preloader />
      ) : (
        <>
          <Box
            sx={{
              bgcolor: '#f8fafc',
              minHeight: '100vh',
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            }}
          >
            <ImageGallery data={data} />

            <Container maxWidth="xl" sx={{ px: isMobile ? 2 : 3 }}>
              <Grid container spacing={4}>
                {/* Main Content */}
                <Grid size={{ xs: 12, md: 8 }}>
                  {/* Hotel Header */}
                  <Box sx={{ mb: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 2,
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? 2 : 0,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant={isMobile ? 'h4' : 'h3'}
                          component="h1"
                          fontWeight="700"
                          sx={{
                            background: '#FF6B6B',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontSize: isMobile ? '2rem' : '2.5rem',
                            lineHeight: 1.2,
                          }}
                        >
                          {data.hotel_name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          <Rating
                            value={hotelData.rating}
                            precision={0.1}
                            readOnly
                          />
                          <Typography variant="body1" color="text.secondary">
                            {hotelData.rating} ({hotelData.reviewCount} reviews)
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton sx={{ color: '#ff6b6b' }}>
                          <Favorite />
                        </IconButton>
                        <IconButton sx={{ color: '#667eea' }}>
                          <Share />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 3,
                      }}
                    >
                      <LocationOn sx={{ color: '#667eea' }} />
                      <Typography variant="body1" color="text.secondary">
                        {data.hotel_address_line1},{data.hotel_district},
                        {data.hotel_country},{data.hotel_pincode}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Amenities */}
                  <Paper
                    sx={{
                      p: 3,
                      mb: 4,
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                            <Typography
                              variant="body2"
                              color="white"
                              fontWeight="500"
                            >
                              {amenity.title}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>

                  {/* About Section */}
                  <Paper
                    sx={{
                      p: 3,
                      mb: 4,
                      borderRadius: 3,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      fontWeight="600"
                    >
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

                  {/* Rooms Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      fontWeight="600"
                      sx={{ mb: 3 }}
                    >
                      Available Rooms
                    </Typography>

                    <Stack spacing={3}>
                      {rooms
                        ?.filter((room) => {
                          return room.hotel_id === id;
                        })
                        ?.map((room) => (
                          <Card
                            key={room.id}
                            sx={{
                              display: 'flex',
                              flexDirection: isMobile ? 'column' : 'row',
                              transition: 'all 0.3s ease',
                              borderRadius: 3,
                              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                              border: '1px solid rgba(0,0,0,0.04)',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                              },
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: isMobile ? '100%' : 300,
                                height: isMobile ? 200 : 250,
                                objectFit: 'cover',
                              }}
                              image={room?.room_image?.url}
                              alt={room?.name}
                            />
                            <CardContent
                              sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                p: 3,
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="h6"
                                  component="h3"
                                  gutterBottom
                                  fontWeight="600"
                                >
                                  {room?.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  paragraph
                                  sx={{ lineHeight: 1.6 }}
                                >
                                  {room?.description}
                                </Typography>

                                <Box
                                  sx={{
                                    display: 'flex',
                                    gap: 1,
                                    flexWrap: 'wrap',
                                    mb: 2,
                                  }}
                                >
                                  {room?.amenities?.map((feature, index) => (
                                    <Chip
                                      key={index}
                                      label={feature?.title}
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        borderColor: '#667eea',
                                        color: '#667eea',
                                        fontWeight: 500,
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: isMobile
                                    ? 'flex-start'
                                    : 'center',
                                  flexDirection: isMobile ? 'column' : 'row',
                                  gap: isMobile ? 2 : 0,
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                      color: '#667eea',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    ₹{room?.total}
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      component="span"
                                      sx={{ ml: 0.5 }}
                                    >
                                      /night
                                    </Typography>
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Sleeps {room?.capacity}
                                  </Typography>
                                </Box>

                                <Button
                                  variant="contained"
                                  size="large"
                                  onClick={() =>
                                    setSelectedRoom(room.id.toString())
                                  }
                                  sx={{
                                    background:
                                      'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: 'none',
                                    '&:hover': {
                                      boxShadow:
                                        '0 4px 12px rgba(255, 107, 107, 0.3)',
                                      background:
                                        'linear-gradient(45deg, #FF8E8E, #6ADBD1)',
                                    },
                                  }}
                                >
                                  Select Room
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        ))}
                    </Stack>
                  </Box>
                </Grid>

                {/* Booking Sidebar - Sticky on desktop, fixed bottom on mobile */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Paper
                      sx={{
                        p: 3,
                        background:
                          'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        borderRadius: isMobile ? '16px 16px 0 0' : 3,
                        boxShadow: isMobile
                          ? 'none'
                          : '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    >
                      {isMobile && (
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 4,
                              bgcolor: 'grey.300',
                              borderRadius: 2,
                              display: 'inline-block',
                              mb: 1,
                            }}
                          />
                          <Typography variant="h6" fontWeight="600">
                            Book Your Stay
                          </Typography>
                        </Box>
                      )}

                      {!isMobile && (
                        <Typography
                          variant="h5"
                          component="h3"
                          gutterBottom
                          fontWeight="600"
                        >
                          Book Your Stay
                        </Typography>
                      )}

                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label="Check-in Date"
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) =>
                            handleBookingChange('checkIn', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            min: new Date().toISOString().split('T')[0],
                          }}
                          size={isMobile ? 'small' : 'medium'}
                        />

                        <TextField
                          fullWidth
                          label="Check-out Date"
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) =>
                            handleBookingChange('checkOut', e.target.value)
                          }
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            min:
                              bookingData.checkIn ||
                              new Date().toISOString().split('T')[0],
                          }}
                          size={isMobile ? 'small' : 'medium'}
                        />

                        <FormControl
                          fullWidth
                          size={isMobile ? 'small' : 'medium'}
                        >
                          <InputLabel>Guests</InputLabel>
                          <Select
                            value={bookingData.guests}
                            label="Guests"
                            onChange={(e) =>
                              handleBookingChange('guests', e.target.value)
                            }
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <MenuItem key={num} value={num}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl
                          fullWidth
                          size={isMobile ? 'small' : 'medium'}
                        >
                          <InputLabel>Select Room</InputLabel>
                          <Select
                            value={selectedRoom}
                            label="Select Room"
                            onChange={(e) => setSelectedRoom(e.target.value)}
                          >
                            {hotelData.rooms.map((room) => (
                              <MenuItem
                                key={room.id}
                                value={room.id.toString()}
                              >
                                {room.name} - ${room.price}/night
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Divider />

                        {/* Price Summary */}
                        <Box>
                          <Typography
                            variant="h6"
                            gutterBottom
                            fontWeight="600"
                          >
                            Price Summary
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2">
                              Room x 3 nights
                            </Typography>
                            <Typography variant="body2">$897</Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2">
                              Taxes & Fees
                            </Typography>
                            <Typography variant="body2">$134.55</Typography>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography variant="h6" fontWeight="600">
                              Total
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight="600"
                              sx={{ color: '#667eea' }}
                            >
                              $1,031.55
                            </Typography>
                          </Box>
                        </Box>

                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={!selectedRoom}
                          sx={{
                            background:
                              'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                            borderRadius: 3,
                            py: isMobile ? 1.5 : 2,
                            fontSize: isMobile ? '1rem' : '1.1rem',
                            fontWeight: '600',
                            textTransform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
                              background:
                                'linear-gradient(45deg, #FF8E8E, #6ADBD1)',
                            },
                            '&:disabled': {
                              background: 'grey.300',
                            },
                          }}
                        >
                          Book Now
                        </Button>

                        {/* Trust Indicators */}
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            🔒 Secure Booking · Free Cancellation
                          </Typography>
                          <AvatarGroup
                            max={4}
                            sx={{ justifyContent: 'center', mb: 1 }}
                          >
                            <Avatar
                              sx={{ width: 24, height: 24, bgcolor: '#667eea' }}
                            >
                              A
                            </Avatar>
                            <Avatar
                              sx={{ width: 24, height: 24, bgcolor: '#4ECDC4' }}
                            >
                              B
                            </Avatar>
                            <Avatar
                              sx={{ width: 24, height: 24, bgcolor: '#FF6B6B' }}
                            >
                              C
                            </Avatar>
                            <Avatar
                              sx={{ width: 24, height: 24, bgcolor: '#764ba2' }}
                            >
                              D
                            </Avatar>
                          </AvatarGroup>
                          <Typography variant="caption" color="text.secondary">
                            Booked by 1247+ guests today
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>

                  {/* Spacer for mobile fixed booking form */}
                  {isMobile && <Box sx={{ height: 400 }} />}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
}
