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
  MenuItem,
} from '@mui/material';
import {
  Phone,
  Security,
  Refresh,
  ArrowBack,
  Hotel,
  Home,
  PersonOutline,
  Email,
  Cake,
  Wc,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { BASEURL, fetcher } from '@/config/MainApi';
import { setCookie } from 'nookies';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';
import { CreateNewData, GetUserList } from '@/utils/ApiFunctions';

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
  const [accountExist, setAccountExist] = useState(true);

  // new user registration fields
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    gender: '',
  });

  const customers = GetUserList();

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

  const searchUser = () => customers?.find((a) => a.phone == phoneNumber);

  const handleSendOtp = async () => {
    if (!phoneNumber.trim()) return setError('Please enter your phone number');
    if (phoneNumber.length < 10)
      return setError('Please enter a valid phone number');

    // ✅ Dummy test case
    if (phoneNumber === '8888888888') {
      setSuccess('Dummy OTP "000000" generated for testing.');
      setOtpSent(true);
      setOtpTimer(45);
      setCanResendOtp(false);
      return;
    }

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
    //  ✅ Dummy test verification
    if (phoneNumber === '8888888888' && otp === '000000') {
      const dummyUser = {
        id: 1,
        name: 'Demo User',
        phone: '8888888888',
      };
      const result = {
        user: dummyUser,
      };
      setCookie(null, 'user', JSON.stringify(result.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      dispatchAuth({
        type: 'LOGIN_SUCCESS',
        payload: { user: result.user },
      });
      setSuccess('Dummy login successful! Redirecting...');
      setTimeout(() => router.push('/'), 1000);
      return;
    }
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: phoneNumber, otp }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        const user = searchUser();
        if (!user) {
          setAccountExist(false);
          setOtpSent(false);
          setSuccess('');
          setError('');
          return;
        }
        setSuccess('Login successful! Redirecting...');
        const result = {
          user: { id: user.documentId, name: user.name, phone: user.phone },
        };
        setCookie(null, 'user', JSON.stringify(result.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        dispatchAuth({
          type: 'LOGIN_SUCCESS',
          payload: { user: result.user },
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

  const CreateNewAccount = async () => {
    if (!newUser.name.trim()) return setError('Please enter your name');

    setLoading(true);
    setError('');
    try {
      const res = await CreateNewData({
        endPoint: 'online-users',
        payload: {
          data: {
            name: newUser.name,
            email: newUser.email || '',
            gender: newUser.gender || '',
            phone: phoneNumber,
          },
        },
      });

      const data = res.data.data;

      setSuccess('Account created successfully! Logging you in...');
      const result = {
        user: {
          id: data.documentId,
          name: newUser.name,
          phone: phoneNumber,
        },
      };

      setCookie(null, 'user', JSON.stringify(result.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      dispatchAuth({
        type: 'LOGIN_SUCCESS',
        payload: { user: result.user },
      });

      setTimeout(() => router.push('/'), 1200);
    } catch (err) {
      console.error(err);
      setError('Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
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
      {/* Background */}
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
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {success}
              </Alert>
            )}

            {/* Phone number input */}
            {!otpSent && accountExist && (
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
                    sx: { color: 'white' },
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  sx={{ mb: 3 }}
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
            )}

            {/* OTP Section */}
            {otpSent && (
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
                    sx: { color: 'white', letterSpacing: '0.3rem' },
                  }}
                  InputLabelProps={{
                    sx: { color: 'rgba(255,255,255,0.8)' },
                  }}
                  sx={{ mb: 3 }}
                />

                {otpTimer > 0 && (
                  <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                      Resend OTP in {formatTime(otpTimer)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={((45 - otpTimer) / 45) * 100}
                      sx={{ mt: 1, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                )}

                {canResendOtp && (
                  <Button
                    onClick={handleResendOtp}
                    startIcon={<Refresh />}
                    sx={{ color: 'white', mb: 2 }}
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
                        color: '#fff',
                      }}
                    >
                      Change Phone Number
                    </Button>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Create Account Section */}
            {!accountExist && (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                  Create Your Account
                </Typography>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    sx: { color: 'white' },
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    sx: { color: 'white' },
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  type="gender"
                  value={newUser.gender}
                  onChange={(e) =>
                    setNewUser({ ...newUser, gender: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Wc sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    sx: { color: 'white' },
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={CreateNewAccount}
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    borderRadius: 2,
                    fontWeight: 600,
                    background: '#fff',
                    color: 'red',
                    '&:hover': { background: '#f5f5f5' },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Account'}
                </Button>

                <Button
                  fullWidth
                  startIcon={<ArrowBack />}
                  onClick={() => {
                    setAccountExist(true);
                    setOtpSent(false);
                    setError('');
                    setSuccess('');
                  }}
                  sx={{
                    mt: 2,
                    color: 'white',
                    textTransform: 'none',
                  }}
                >
                  Back to Login
                </Button>
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
