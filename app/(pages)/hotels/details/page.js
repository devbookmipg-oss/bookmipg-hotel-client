// app/hotel/[id]/page.tsx
'use client';

import React, { Suspense, use, useState } from 'react';
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
  CircularProgress,
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
  FavoriteBorder,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
import {
  CreateNewData,
  GetDataList,
  GetSingleData,
  UpdateData,
} from '@/utils/ApiFunctions';
import { Preloader } from '@/components/common';
import {
  ImageGallery,
  About,
  Amenities,
  HotelHeader,
  CustomerReviews,
} from '@/components/hotelDetailsComp';
import { calculateReviewStats } from '@/utils/CalculateRating';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context';
import { ErrorToast, SuccessToast } from '@/utils/GenerateToast';
import { getIndiaDate } from '@/utils/DateFetcher';

// Mock data - replace with actual API calls

const HotelDetailsPage = () => {
  const { auth } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const checkin = searchParams.get('checkin') || getIndiaDate(0);
  const checkout = searchParams.get('checkout') || getIndiaDate(1);
  const adults = searchParams.get('adults') || 1;
  const children = searchParams.get('children') || 0;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [bookingData, setBookingData] = useState({
    checkIn: checkin || getIndiaDate(0),
    checkOut: checkout || getIndiaDate(1),
    adults: parseInt(adults, 10),
    children: parseInt(children, 10),
  });

  const data = GetSingleData({
    endPoint: 'hotels',
    id: id,
  });

  const rooms = GetDataList({
    endPoint: 'room-categories',
  });

  const reviews = GetDataList({
    endPoint: 'reviews',
  });

  const myReviews = reviews?.filter((item) => {
    return item?.hotel_id === id;
  });

  const handleBookingChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const isFav = data?.online_users?.some(
    (u) => u.documentId === auth?.user?.id
  );
  const toggleFavorite = async () => {
    try {
      let newFavList = data?.online_users?.map((u) => u.documentId) || [];

      if (isFav) newFavList = newFavList.filter((id) => id !== auth.user.id);
      else newFavList.push(auth.user.id);

      await UpdateData({
        auth,
        endPoint: 'hotels',
        id: id,
        payload: { data: { online_users: newFavList } },
      });
      SuccessToast(isFav ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (err) {
      console.error(`error toggleFav: ${err}`);
      ErrorToast('Something went wrong');
    }
  };

  const handleRoomSelect = (room) => {
    let updatedRooms = [...selectedRooms];
    if (updatedRooms.includes(room)) {
      updatedRooms = updatedRooms.filter((r) => r !== room);
    } else {
      updatedRooms.push(room);
    }
    setSelectedRooms(updatedRooms);
  };

  const totalPrice = selectedRooms.reduce(
    (total, room) => total + room.total,
    0
  );

  const noOfNights = () => {
    const inDate = new Date(bookingData.checkIn);
    const outDate = new Date(bookingData.checkOut);
    const diffTime = Math.abs(outDate - inDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const handleBooking = async () => {
    if (!auth?.user) {
      router.push('/signin');
      return;
    }

    if (selectedRooms.length === 0) {
      ErrorToast('Please select at least one room');
      return;
    }

    const { checkIn, checkOut } = bookingData;
    const today = new Date().setHours(0, 0, 0, 0);
    const checkInDate = new Date(checkIn).setHours(0, 0, 0, 0);
    const checkOutDate = new Date(checkOut).setHours(0, 0, 0, 0);

    // 🛑 Validate date selection
    if (!checkIn || !checkOut) {
      ErrorToast('Please select both check-in and check-out dates');
      return;
    }

    // 🛑 Validate that check-in is not in the past
    if (checkInDate < today) {
      ErrorToast('Check-in date cannot be in the past');
      return;
    }

    // 🛑 Validate that check-out is after check-in
    if (checkOutDate <= checkInDate) {
      ErrorToast('Check-out date must be after the check-in date');
      return;
    }

    try {
      setLoading(true);
      const res = await CreateNewData({
        endPoint: 'online-bookings',
        payload: {
          data: {
            online_user: auth.user.id,
            hotel: id,
            room_categories: selectedRooms.map((r) => r.documentId),
            adults: bookingData.adults,
            childs: bookingData.children,
            check_in: bookingData.checkIn,
            check_out: bookingData.checkOut,
            booking_status: 'Pending Approval',
            nights: noOfNights(),
            mop: 'Pay at Counter',
          },
        },
      });

      const result = await res.data.data;

      if (result) {
        router.push(
          `/booking-status?status=success&bookingId=${result.id}&bookingDate=${result.createdAt}&checkIn=${result.check_in}&checkOut=${result.check_out}&currentStatus=${result.booking_status}`
        );
      } else {
        ErrorToast('Booking failed, please try again');
      }
    } catch (error) {
      console.error(error);
      router.push(`/booking-status?status=failed`);
    }
  };

  return (
    <>
      {!data || !rooms || !reviews ? (
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

            <Container maxWidth="xl" sx={{ px: isMobile ? 2 : 3, mb: 10 }}>
              <Grid container spacing={4}>
                {/* Main Content */}
                <Grid size={{ xs: 12, md: 8 }}>
                  {/* Hotel Header */}
                  <HotelHeader
                    data={data}
                    toggleFavorite={toggleFavorite}
                    isMobile={isMobile}
                    isFav={isFav}
                    myReviews={myReviews}
                  />

                  {/* Amenities */}
                  <Amenities data={data} />

                  {/* About Section */}
                  <About data={data} />

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
                        ?.map((room) => {
                          const selected = selectedRooms.includes(room);
                          return (
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
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                    sx={{ lineHeight: 1.6 }}
                                  >
                                    Adults: {room?.max_adults} | Children:{' '}
                                    {room?.max_child}
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
                                    variant={
                                      selected ? 'contained' : 'outlined'
                                    }
                                    startIcon={
                                      selected ? <CheckCircleOutline /> : null
                                    }
                                    color="error"
                                    size="large"
                                    onClick={() => handleRoomSelect(room)}
                                    sx={{
                                      borderRadius: 3,
                                      px: 4,
                                      py: 1,
                                      fontWeight: 600,
                                      textTransform: 'none',
                                      fontSize: '1rem',
                                      boxShadow: 'none',
                                    }}
                                  >
                                    {selected ? 'Selected' : 'Select Room'}
                                  </Button>
                                </Box>
                              </CardContent>
                            </Card>
                          );
                        })}
                    </Stack>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Paper
                      sx={{
                        p: 3,
                        background:
                          'linear-gradient(135deg, #ffffffff , #fff4f4ff)',
                        borderRadius: 3,
                        border: '5px solid red',
                        boxShadow: isMobile
                          ? 'none'
                          : '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    >
                      {loading ? (
                        <>
                          <Box
                            sx={{
                              minHeight: 470,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <CircularProgress size={100} color="error" />
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              sx={{ mt: 2 }}
                            >
                              Processing your booking...
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Please do not refresh or navigate away from this
                              page.
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <>
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

                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 1 }}>
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
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 1 }}>
                              <TextField
                                fullWidth
                                label="Check-out Date"
                                type="date"
                                value={bookingData.checkOut}
                                onChange={(e) =>
                                  handleBookingChange(
                                    'checkOut',
                                    e.target.value
                                  )
                                }
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                  min:
                                    bookingData.checkIn ||
                                    new Date().toISOString().split('T')[0],
                                }}
                                size={isMobile ? 'small' : 'medium'}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 1 }}>
                              <TextField
                                fullWidth
                                label="Adults"
                                type="number"
                                value={bookingData.adults}
                                onChange={(e) =>
                                  handleBookingChange('adults', e.target.value)
                                }
                                size={isMobile ? 'small' : 'medium'}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }} sx={{ mt: 1 }}>
                              <TextField
                                fullWidth
                                label="Children"
                                type="number"
                                value={bookingData.children}
                                onChange={(e) =>
                                  handleBookingChange(
                                    'children',
                                    e.target.value
                                  )
                                }
                                size={isMobile ? 'small' : 'medium'}
                              />
                            </Grid>
                            <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
                              <Divider />
                            </Grid>
                            <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
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
                                    Room x {noOfNights()} nights
                                  </Typography>
                                  <Typography variant="body2">
                                    ₹{totalPrice}
                                  </Typography>
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
                                    ₹ {totalPrice * noOfNights()}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>

                            <Button
                              variant="contained"
                              size="large"
                              fullWidth
                              onClick={handleBooking}
                              disabled={selectedRooms.length === 0}
                              sx={{
                                background: 'red',
                                borderRadius: 3,
                                py: isMobile ? 1.5 : 2,
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                fontWeight: '600',
                                textTransform: 'none',
                                boxShadow: 'none',

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
                                🔒 Secure Booking · Easy Cancellation
                              </Typography>
                            </Box>
                          </Grid>
                        </>
                      )}
                    </Paper>
                  </Box>
                  <CustomerReviews
                    myReviews={myReviews}
                    auth={auth}
                    hotelId={id}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

const Page = () => {
  return (
    <Suspense>
      <HotelDetailsPage />
    </Suspense>
  );
};
export default Page;
