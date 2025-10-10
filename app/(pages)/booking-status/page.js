'use client';

import { Box, Typography, Button, Paper, Container, Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HomeIcon from '@mui/icons-material/Home';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { GetCustomDate } from '@/utils/DateFetcher';

const MainFunction = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const bookingId = searchParams.get('bookingId');
  const bookingDate = searchParams.get('bookingDate');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const currentStatus = searchParams.get('currentStatus');

  const isSuccess = status === 'success';
  const isFailed = status === 'failed';
  const isPending = !isSuccess && !isFailed;

  // dynamic icon and colors
  const iconProps = isSuccess
    ? {
        icon: (
          <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#2e7d32' }} />
        ),
        color: '#43a047',
      }
    : isFailed
    ? {
        icon: <ErrorOutlineIcon sx={{ fontSize: 80, color: '#c62828' }} />,
        color: '#e53935',
      }
    : {
        icon: <PendingActionsIcon sx={{ fontSize: 80, color: '#f9a825' }} />,
        color: '#fbc02d',
      };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        py: 4,
        px: 2,
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        elevation={5}
        sx={{
          borderRadius: 4,
          p: 4,
          textAlign: 'center',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Top Icon */}
        <Box mb={2}>{iconProps.icon}</Box>

        {/* Status Heading */}
        <Typography
          variant="h5"
          fontWeight={700}
          color={iconProps.color}
          gutterBottom
        >
          {isSuccess
            ? 'Booking Confirmed!'
            : isFailed
            ? 'Booking Failed'
            : 'Booking Pending Approval'}
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" color="text.secondary" mb={3}>
          {isSuccess
            ? 'Your booking has been successfully placed.'
            : isFailed
            ? 'Unfortunately, your booking could not be completed. Please try again.'
            : 'Your booking request has been received and is awaiting confirmation.'}
        </Typography>

        {/* Booking Details Card */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.9)',
            border: `2px solid ${iconProps.color}40`,
            mb: 3,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color={iconProps.color}
            gutterBottom
          >
            Booking Details
          </Typography>

          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="body2" color="text.secondary">
                Booking ID
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {`BMPGOB${bookingId}` || '--'}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {currentStatus || '--'}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body2" color="text.secondary">
                Check-In
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {GetCustomDate(checkIn) || '--'}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="body2" color="text.secondary">
                Check-Out
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {GetCustomDate(checkOut) || '--'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Booking Date
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {GetCustomDate(bookingDate)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Buttons */}
        <Grid container spacing={2} justifyContent="center">
          <Grid size={6}>
            <Button
              component={Link}
              href="/"
              fullWidth
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{
                background: 'linear-gradient(90deg, #43a047, #2e7d32)',
                py: 1.2,
                borderRadius: 3,
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(90deg, #388e3c, #1b5e20)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              Home
            </Button>
          </Grid>
          <Grid size={6}>
            <Button
              component={Link}
              href="/user/bookings"
              fullWidth
              variant="outlined"
              startIcon={<BookOnlineIcon />}
              sx={{
                borderColor: iconProps.color,
                color: iconProps.color,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 600,
                '&:hover': {
                  background: `${iconProps.color}10`,
                  transform: 'scale(1.03)',
                },
              }}
            >
              My Bookings
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainFunction />
    </Suspense>
  );
};

export default Page;
