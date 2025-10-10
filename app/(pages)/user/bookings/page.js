'use client';

import { useAuth } from '@/context';
import { GetDataList } from '@/utils/ApiFunctions';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  useTheme,
} from '@mui/material';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GetCustomDate } from '@/utils/DateFetcher';
import { Preloader } from '@/components/common';

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const { auth } = useAuth();
  const userId = auth?.user?.id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { user } = parseCookies();
    if (!user) {
      router.push('/signin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const data = GetDataList({
    endPoint: 'online-bookings',
  });

  const filteredData = data?.filter(
    (item) => item?.online_user?.documentId === userId
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70vh"
        sx={{
          bgcolor: 'background.default',
          textAlign: 'center',
        }}
      >
        <HotelIcon sx={{ fontSize: 50, mb: 2, color: 'text.secondary' }} />
        <Typography color="text.secondary">No bookings found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        pb: 4,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: 'linear-gradient(135deg, #4f46e5, #9333ea)',
          background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
          color: 'white',
          textAlign: 'center',
          py: 5,
          borderBottomLeftRadius: { xs: 30, md: 50 },
          borderBottomRightRadius: { xs: 30, md: 50 },
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="700"
          sx={{
            letterSpacing: 0.5,
            mb: 1,
          }}
        >
          My Bookings
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          View and manage your stays
        </Typography>
      </Box>

      {/* BOOKINGS LIST */}
      <Box
        sx={{
          mt: 5,
          px: { xs: 2, sm: 3 },
          mx: 'auto',
        }}
      >
        <Grid container spacing={2}>
          {filteredData.map((booking) => {
            const statusColor =
              booking.status === 'confirmed'
                ? 'success'
                : booking.status === 'pending'
                ? 'warning'
                : 'error';

            return (
              <Grid size={{ xs: 12, sm: 6 }} key={booking.id}>
                <Link
                  href={`/user/bookings/${booking.documentId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                      p: 1,
                      transition: 'all 0.3s ease',
                      background: `linear-gradient(145deg, #ffffff, #f8fafc)`,
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 6,
                        background:
                          booking.booking_status === 'Approved'
                            ? 'green'
                            : booking.booking_status === 'Booked'
                            ? 'orange'
                            : 'red',
                      },
                    }}
                  >
                    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                      {/* Top Row */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Box display="flex" alignItems="center" gap={0.8}>
                          <CalendarTodayIcon
                            sx={{ fontSize: 16, color: 'text.secondary' }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {GetCustomDate(booking.createdAt)}
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label={booking.booking_status || 'Pending'}
                          color={
                            booking.booking_status === 'Approved'
                              ? 'success'
                              : booking.booking_status === 'Booked'
                              ? 'warning'
                              : 'error'
                          }
                          variant="filled"
                          sx={{
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        />
                      </Box>

                      {/* Hotel Info */}
                      <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                        <HotelIcon sx={{ color: '#4f46e5' }} />
                        <Typography
                          variant="subtitle1"
                          fontWeight="600"
                          sx={{ color: 'text.primary' }}
                        >
                          {booking?.hotel?.hotel_name || 'Hotel Name'}
                        </Typography>
                      </Box>

                      {/* Address */}
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        gap={1}
                        mb={1.5}
                      >
                        <LocationOnIcon
                          sx={{
                            fontSize: 18,
                            color: 'text.secondary',
                            mt: 0.3,
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.3 }}
                        >
                          {booking.hotel.hotel_address_line1},{' '}
                          {booking.hotel.hotel_address_line2},{' '}
                          {booking.hotel.hotel_district},{' '}
                          {booking.hotel.hotel_state}
                        </Typography>
                      </Box>

                      {/* Booking ID */}
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={1.5}
                        sx={{
                          bgcolor: 'rgba(99,102,241,0.1)',
                          borderRadius: 2,
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: '#4f46e5',
                            letterSpacing: 0.5,
                          }}
                        >
                          Booking ID:
                        </Typography>
                        <Typography>
                          BMPGH{booking.booking_id || booking.id || 'N/A'}
                        </Typography>
                      </Box>

                      {/* Dates */}
                      <Grid container spacing={1}>
                        <Grid size={6}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <AccessTimeIcon
                              sx={{ fontSize: 18, color: 'text.secondary' }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>{GetCustomDate(booking.check_in)}</strong>
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Check-in
                          </Typography>
                        </Grid>

                        <Grid size={6}>
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <CheckCircleIcon
                              sx={{ fontSize: 18, color: 'text.secondary' }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              <strong>
                                {GetCustomDate(booking.check_out)}
                              </strong>
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Check-out
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Page;
