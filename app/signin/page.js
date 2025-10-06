'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Alert,
  CircularProgress,
  LinearProgress,
  InputAdornment,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Phone,
  Security,
  Refresh,
  ArrowBack,
  Hotel,
  Home,
  PersonOutline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { BASEURL, fetcher } from '@/config/MainApi';
import { setCookie } from 'nookies';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { dispatchAuth } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);

  const { data: customers } = useSWR(
    `${BASEURL}/customers?populate=*`,
    fetcher
  );

  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((timer) => {
          if (timer <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const searchUser = () => customers?.find((a) => a.mobile == phoneNumber);

  const handleSendOtp = async () => {
    if (!phoneNumber.trim()) return setError('Please enter your phone number');
    if (phoneNumber.length < 10)
      return setError('Please enter a valid phone number');
    try {
      setLoading(true);
      setError('');
      await fetch(`/api/request-otp?number=${phoneNumber}`);
      setOtpSent(true);
      setOtpTimer(45);
      setCanResendOtp(false);
      setSuccess(`OTP sent to +91 ${phoneNumber}`);
    } catch {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length !== 6)
      return setError('Please enter a valid 6-digit OTP');
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: phoneNumber, otp }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        const user = searchUser();
        if (!user) return setError('Account does not exist. Please register.');
        setSuccess('Login successful! Redirecting...');
        const result = {
          jwt: 'my-token',
          user: { id: user.documentId, name: user.name, phone: user.phone },
        };
        setCookie(null, 'user', JSON.stringify(result.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        dispatchAuth({
          type: 'LOGIN_SUCCESS',
          payload: { token: result.token, user: result.user },
        });
        setTimeout(() => router.push('/'), 1000);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp('');
    await handleSendOtp();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#fafafa',
      }}
    >
      {/* ✨ Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/search-banner.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px) brightness(0.6)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <Card
            sx={{
              borderRadius: 4,
              p: 4,
              background: 'rgba(255, 255, 255, 0.36)',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
              color: 'white',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: 'white',
                  color: '#FF6B6B',
                  width: 64,
                  height: 64,
                  margin: '0 auto 12px',
                  boxShadow: '0 6px 16px rgba(255,107,107,0.5)',
                }}
              >
                <Hotel fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={700}>
                Welcome to Bookmipg Hotel
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, mt: 0.5, fontSize: '0.9rem' }}
              >
                Sign in to book your perfect stay instantly
              </Typography>
            </Box>

            {/* Alerts */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  fontSize: '0.9rem',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1px solid rgba(255,0,0,0.3)',
                }}
              >
                {error}
              </Alert>
            )}
            {success && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  fontSize: '0.9rem',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1px solid rgba(0,255,0,0.3)',
                }}
              >
                {success}
              </Alert>
            )}

            {/* Input sections */}
            {!otpSent ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  autoFocus
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ''))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    sx: { color: 'white', fontSize: '1rem' },
                  }}
                  InputLabelProps={{
                    sx: { color: 'rgba(255,255,255,0.8)' },
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.5)',
                      },
                      '&:hover fieldset': { borderColor: '#fff' },
                    },
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSendOtp}
                  disabled={loading || phoneNumber.length < 10}
                  sx={{
                    py: 1.4,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    background: '#fff',
                    color: 'red',
                    '&:hover': { background: '#f5f5f5' },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Send OTP'
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Enter 6-digit OTP"
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Security sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      color: 'white',
                      fontSize: '1.2rem',
                      letterSpacing: '0.3rem',
                    },
                  }}
                  InputLabelProps={{
                    sx: { color: 'rgba(255,255,255,0.8)' },
                  }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                      '&:hover fieldset': { borderColor: '#fff' },
                    },
                  }}
                />

                {otpTimer > 0 && (
                  <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                      Resend OTP in {formatTime(otpTimer)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={((45 - otpTimer) / 45) * 100}
                      sx={{
                        mt: 1,
                        height: 6,
                        borderRadius: 3,
                        background: 'rgba(255,255,255,0.3)',
                        '& .MuiLinearProgress-bar': { background: '#fff' },
                      }}
                    />
                  </Box>
                )}

                {canResendOtp && (
                  <Button
                    onClick={handleResendOtp}
                    startIcon={<Refresh />}
                    sx={{
                      color: 'white',
                      mb: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Resend OTP
                  </Button>
                )}

                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleVerifyOtp}
                      disabled={loading || otp.length !== 6}
                      sx={{
                        py: 1.4,
                        borderRadius: 2,
                        fontWeight: 600,
                        background: '#fff',
                        color: 'red',
                        '&:hover': { background: '#f5f5f5' },
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        'Verify & Login'
                      )}
                    </Button>
                  </Grid>
                  <Grid size={12}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setOtpTimer(0);
                        setCanResendOtp(false);
                        setError('');
                        setSuccess('');
                      }}
                      startIcon={<ArrowBack />}
                      sx={{
                        py: 1.2,
                        borderRadius: 2,
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: '#fff',
                        '&:hover': { borderColor: '#fff' },
                      }}
                    >
                      Change Phone Number
                    </Button>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Back to Home */}
            <Stack direction="row" justifyContent="center" mt={3}>
              <Button
                startIcon={<Home />}
                onClick={() => router.push('/')}
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Back to Home
              </Button>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}
