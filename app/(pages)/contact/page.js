'use client';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  InputAdornment,
  Alert,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  Person,
  Subject,
  Message,
  SupportAgent,
  WhatsApp,
  Twitter,
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
} from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    bookingReference: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus('success');
    setTimeout(() => setSubmitStatus(null), 5000);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      bookingReference: '',
    });
  };

  const contactMethods = [
    {
      icon: <Phone sx={{ fontSize: 32 }} />,
      title: 'Call Us',
      details: '+91 876 893 0270',
      subtitle: 'Toll-Free Number',
      description: 'Available 24/7 for immediate assistance',
      action: 'Call Now',
      href: 'tel:+91876 8930270',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <Email sx={{ fontSize: 32 }} />,
      title: 'Email Us',
      details: 'info@bookmipg.com',
      subtitle: 'General Inquiries',
      description: 'Response within 2 hours during business hours',
      action: 'Send Email',
      href: 'mailto:info@bookmipg.com',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <LocationOn sx={{ fontSize: 32 }} />,
      title: 'Visit Us',
      details: '3rd floor, Dilipbhim Building',
      subtitle: 'Nandakumar,East Medinipur,WB-721632',
      description: 'Corporate Headquarters',
      action: 'Get Directions',
      href: 'https://maps.google.com/?q=123+Hospitality+Ave+New+York+NY+10001',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section with Gradient */}
      <Box
        textAlign="center"
        mb={6}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          p: 4,
          color: 'white',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
        }}
      >
        <SupportAgent sx={{ fontSize: 48, mb: 0, color: 'white' }} />
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Get In Touch
        </Typography>
        <Typography
          sx={{
            maxWidth: 600,
            mx: 'auto',
            opacity: 0.9,
          }}
        >
          We&apos;re here to help! Reach out to our team for any questions or
          support you need.
        </Typography>
      </Box>

      {/* Quick Contact Cards */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {contactMethods.map((method, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                transition: 'all 0.4s ease',
                background: method.gradient,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'rgba(255,255,255,0.3)',
                },
              }}
              elevation={0}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    fontSize: 40,
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    '& .MuiSvgIcon-root': {
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    },
                  }}
                >
                  {method.icon}
                </Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                >
                  {method.title}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: '1.1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  {method.details}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  {method.subtitle}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    minHeight: 40,
                    opacity: 0.9,
                  }}
                >
                  {method.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Section */}
      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow:
                '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              color="primary"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Send us a Message
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Fill out the form below and we&apos;ll get back to you as soon as
              possible.
            </Typography>

            {submitStatus === 'success' && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  background:
                    'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                ✅ Thank you for your message! We&apos;ll get back to you within
                2 hours.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'white',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'white',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'white',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Booking Reference (Optional)"
                    name="bookingReference"
                    value={formData.bookingReference}
                    onChange={handleChange}
                    placeholder="BKG123456"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'white',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Subject color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'white',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ alignSelf: 'flex-start', mt: 1 }}
                        >
                          <Message color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        background: 'white',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid size={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                    sx={{
                      borderRadius: 3,
                      px: 5,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
                        background:
                          'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Sidebar Information */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            {/* Office Hours */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTime
                  sx={{
                    mr: 1,
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    p: 0.5,
                    color: 'white',
                  }}
                />
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Office Hours
                </Typography>
              </Box>
              <Box sx={{ pl: 1 }}>
                <Typography variant="body2" paragraph sx={{ lineHeight: 1.8 }}>
                  <strong>Customer Support:</strong> 24/7
                  <br />
                  <strong>Sales Department:</strong> Mon-Sat, 9AM-6PM EST
                  <br />
                  <strong>Billing Department:</strong> Mon-Sat, 9AM-6PM EST
                  <br />
                  <strong>Technical Support:</strong> 24/7
                </Typography>
                <Chip
                  label="Always Available"
                  color="success"
                  size="small"
                  sx={{
                    fontWeight: 'bold',
                    background:
                      'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                    color: 'white',
                  }}
                />
              </Box>
            </Paper>

            {/* Emergency Support */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '"🚨"',
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  fontSize: '4rem',
                  opacity: 0.1,
                  transform: 'rotate(15deg)',
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                color="#d32f2f"
              >
                Emergency Support
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ color: '#d32f2f', fontWeight: 'medium' }}
              >
                For urgent issues during your stay:
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="#d32f2f"
                sx={{ fontSize: '1.1rem' }}
              >
                Immediate Assistance: +91 876 893 0270
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#d32f2f', opacity: 0.8, mt: 1 }}
              >
                Available 24/7 for critical situations
              </Typography>
            </Paper>

            {/* Social Media */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                color="primary"
              >
                Follow Us
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ color: 'text.secondary' }}
              >
                Stay updated with latest deals and travel tips
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {[
                  {
                    icon: <Facebook />,
                    label: 'Facebook',
                    color: '#1877F2',
                    url: 'https://www.facebook.com/profile.php?id=100091242189153',
                  },
                  {
                    icon: <Twitter />,
                    label: 'Twitter',
                    color: '#1DA1F2',
                    url: 'https://x.com/bookmipg?t=EuGjmLNzuuBQ2RGVwfkH1Q&s=09',
                  },
                  {
                    icon: <Instagram />,
                    label: 'Instagram',
                    color: '#E4405F',
                    url: 'https://www.instagram.com/bookmipg.official?igsh=MXJkcW9pdjBhemkxag==',
                  },
                  {
                    icon: <YouTube />,
                    label: 'Youtube',
                    color: '#FF0000',
                    url: 'https://youtube.com/@bookmipg?si=UBiBkZUccAZ4_oNd',
                  },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={social.icon}
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        background: social.color,
                        '&:hover': {
                          background: social.color,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 20px ${alpha(social.color, 0.4)}`,
                        },
                        transition: 'all 0.3s ease',
                        fontWeight: 'bold',
                      }}
                    >
                      {social.label}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
