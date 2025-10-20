'use client';

import React, { use, useEffect, useState } from 'react';
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
  Email,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useAuth } from '@/context';
import { GetSingleData } from '@/utils/ApiFunctions';
import { Preloader } from '@/components/common';
import Link from 'next/link';
import { GetCustomDate } from '@/utils/DateFetcher';

// ====== STYLED COMPONENTS ======
const GradientCard = styled(Card)({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: 24,
  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
  position: 'relative',
  overflow: 'hidden',
});

const ModernCard = styled(Card)({
  borderRadius: 24,
  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255,255,255,0.3)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.4s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  },
});

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  padding: '8px 16px',
  borderRadius: '15px',
  backgroundColor:
    status === 'Confirmed'
      ? 'rgba(76, 175, 80, 0.2)'
      : status === 'Pending Approval'
      ? 'rgba(255, 152, 0, 0.2)'
      : 'rgba(244, 67, 54, 0.2)',
  color:
    status === 'Confirmed'
      ? '#4caf50'
      : status === 'Pending Approval'
      ? '#ff9800'
      : '#f44336',
  border: `2px solid ${
    status === 'Confirmed'
      ? '#4caf50'
      : status === 'Pending Approval'
      ? '#ff9800'
      : '#f44336'
  }`,
}));

const PriceText = styled(Typography)({
  background: 'linear-gradient(45deg, #FF6B6B, #FF8E53, #FFD166)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  fontSize: '2rem',
});

const DetailRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  '&:last-of-type': { borderBottom: 'none' },
});

const AmenityChip = styled(Chip)({
  borderRadius: 15,
  border: '2px solid #667eea',
  color: '#667eea',
  fontWeight: 600,
  padding: '8px 12px',
});

// ====== MAIN COMPONENT ======
const BookingDetails = ({ params }) => {
  const param = use(params);
  const { id } = param;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Auth check (do not modify)
  useEffect(() => {
    const { user } = parseCookies();
    if (!user) router.push('/signin');
    else setIsLoading(false);
  }, [router]);

  const data = GetSingleData({
    endPoint: 'online-bookings',
    id: id,
  });
  console.log(data);

  if (isLoading || !data) return <Preloader />;

  const booking = data;
  const hotel = booking.hotel || {};
  const user = booking.online_user || {};
  const rooms = booking.room_categories || [];

  const calculateTotal = () =>
    rooms.reduce((acc, room) => acc + (room.total || 0), 0);

  const handleCancelBooking = () => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      console.log('Booking cancelled');
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
      {/* HEADER */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
          color: 'white',
          textAlign: 'center',
          py: 3,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Booking Details
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Booking ID: <strong>{booking.documentId}</strong>
        </Typography>
      </Box>

      {/* CONTENT */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Hotel Info */}
          <Grid size={{ xs: 12, md: 8 }}>
            <ModernCard>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Hotel sx={{ fontSize: 32, color: '#667eea', mr: 1.5 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {hotel.hotel_name || 'Hotel Details'}
                  </Typography>
                </Box>

                <Typography variant="body1" mb={1}>
                  📍 {hotel.hotel_address_line1}, {hotel.hotel_address_line2},{' '}
                  {hotel.hotel_state}
                </Typography>

                <Typography variant="body1" mb={1}>
                  📞 {hotel.hotel_mobile}
                </Typography>

                <Typography variant="body1" mb={1}>
                  📧 {hotel.hotel_email}
                </Typography>
                <Link
                  href={hotel.google_map_link || '#'}
                  target="_blank"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body1" mb={3}>
                    🌏 Google Map Link
                  </Typography>
                </Link>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Guest Information
                </Typography>
                <Typography variant="body1" mb={1}>
                  👤 {user.name}
                </Typography>
                <Typography variant="body1" mb={1}>
                  📞 {user.phone}
                </Typography>
                <Typography variant="body1" mb={2}>
                  ✉️ {user.email || 'N/A'}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Room Details
                </Typography>
                {rooms.map((room, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border: '1px solid rgba(0,0,0,0.1)',
                      bgcolor: 'rgba(102,126,234,0.05)',
                    }}
                  >
                    <Typography fontWeight="bold">
                      {room.name} — {room.bed_type}
                    </Typography>
                    <Typography variant="body2">
                      Tariff: ₹{room.tariff} | GST: {room.gst}% | Total: ₹
                      {room.total}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Max Adults: {room.max_adults} | Max Adults:{' '}
                      {room.max_child}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </ModernCard>
          </Grid>

          {/* Booking Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <GradientCard>
              <CardContent sx={{ p: 3, color: 'white' }}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Booking Summary
                </Typography>

                <DetailRow>
                  <Typography>Booking Status:</Typography>
                  <StatusChip
                    label={booking.booking_status}
                    status={booking.booking_status}
                  />
                </DetailRow>

                <DetailRow>
                  <Typography>Check-In:</Typography>
                  <Typography>{GetCustomDate(booking.check_in)}</Typography>
                </DetailRow>

                <DetailRow>
                  <Typography>Check-Out:</Typography>
                  <Typography>{GetCustomDate(booking.check_out)}</Typography>
                </DetailRow>

                <DetailRow>
                  <Typography>Guests:</Typography>
                  <Typography>
                    {booking.adults} Adults, {booking.childs} Children
                  </Typography>
                </DetailRow>

                <DetailRow>
                  <Typography>Payment:</Typography>
                  <Typography>{booking.mop}</Typography>
                </DetailRow>

                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />

                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="h6">Total Amount</Typography>
                  <PriceText variant="h4">₹{calculateTotal()}</PriceText>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Cancel />}
                  onClick={handleCancelBooking}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    borderRadius: '20px',
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      transform: 'translateY(-2px)',
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
    </Box>
  );
};

export default BookingDetails;
