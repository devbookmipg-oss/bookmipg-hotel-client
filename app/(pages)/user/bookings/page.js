'use client';

import { useAuth } from '@/context';
import { GetDataList } from '@/utils/ApiFunctions';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import HotelIcon from '@mui/icons-material/Hotel';
import { GetCustomDate } from '@/utils/DateFetcher';
import { Preloader } from '@/components/common';

const Page = () => {
  const router = useRouter();

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
        pb: 10,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: 'linear-gradient(135deg, #4f46e5, #9333ea)',
          background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
          color: 'white',
          textAlign: 'center',
          py: 3,
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
            return (
              <Grid size={{ xs: 12, sm: 6 }} key={booking.id}>
                <Link
                  href={`/user/bookings/${booking.documentId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                      p: 1.5,
                      transition: 'all 0.3s ease',
                      background: '#fff',
                      position: 'relative',
                      '&:hover': {
                        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: 4,
                        background:
                          booking.booking_status === 'Approved'
                            ? '#16a34a'
                            : booking.booking_status === 'Booked'
                            ? '#f59e0b'
                            : '#dc2626',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 1.5 }}>
                      {/* Header */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={0.8}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {GetCustomDate(booking.createdAt)}
                        </Typography>
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
                          sx={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        />
                      </Box>

                      {/* Hotel Name */}
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ color: '#111827', mb: 0.3 }}
                        noWrap
                      >
                        {booking?.hotel?.hotel_name || 'Hotel Name'}
                      </Typography>

                      {/* Address */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.8rem', mb: 1 }}
                      >
                        {booking.hotel.hotel_district},{' '}
                        {booking.hotel.hotel_state}
                      </Typography>

                      {/* Contact */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={0.4}
                        mb={1}
                      >
                        <Box display="flex" alignItems="center" gap={0.8}>
                          <PhoneIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            {booking?.hotel?.hotel_phone || 'N/A'}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.8}>
                          <PhoneIphoneIcon
                            sx={{ fontSize: 16, color: '#6b7280' }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            {booking?.hotel?.hotel_alt_phone || 'N/A'}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.8}>
                          <EmailIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: '0.8rem' }}
                          >
                            {booking?.hotel?.hotel_email || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Booking ID */}
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={0.5}
                        mb={1}
                        sx={{
                          bgcolor: 'rgba(79,70,229,0.05)',
                          borderRadius: 2,
                          p: 0.8,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: '#4f46e5',
                            fontSize: '0.8rem',
                          }}
                        >
                          ID:
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem' }}>
                          BMPGH{booking.booking_id || booking.id || 'N/A'}
                        </Typography>
                      </Box>

                      {/* Dates */}
                      <Grid container spacing={1}>
                        <Grid size={6}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                          >
                            Check-in
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {GetCustomDate(booking.check_in)}
                          </Typography>
                        </Grid>
                        <Grid size={6}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.75rem' }}
                          >
                            Check-out
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {GetCustomDate(booking.check_out)}
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
