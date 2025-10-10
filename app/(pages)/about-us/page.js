// app/about/page.jsx
'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  useMediaQuery,
  alpha,
  Stack,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import {
  Hotel,
  Security,
  SupportAgent,
  Public,
  Star,
  Groups,
  TrendingUp,
  EmojiEvents,
  LocationOn,
  VerifiedUser,
  Payments,
} from '@mui/icons-material';

// Create theme with red color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#e31e25',
      dark: '#c0171d',
      light: '#ff5252',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#2d3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

const AboutPage = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const isSmallMobile = useMediaQuery('(max-width:600px)');

  // Team members data
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      avatar: '/team/sarah.jpg',
      description:
        'Former hospitality executive with 15+ years experience in luxury hotel management',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      avatar: '/team/marcus.jpg',
      description:
        'Tech innovator passionate about creating seamless travel experiences',
    },
    {
      name: 'Aisha Johnson',
      role: 'Head of Partnerships',
      avatar: '/team/aisha.jpg',
      description:
        'Building global hotel networks and strategic alliances since 2012',
    },
  ];

  // Stats data
  const stats = [
    {
      icon: <Hotel sx={{ fontSize: 40 }} />,
      number: '50K+',
      label: 'Hotels Worldwide',
    },
    {
      icon: <Groups sx={{ fontSize: 40 }} />,
      number: '2M+',
      label: 'Happy Travelers',
    },
    {
      icon: <Public sx={{ fontSize: 40 }} />,
      number: '120+',
      label: 'Countries',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      number: '98%',
      label: 'Satisfaction Rate',
    },
  ];

  // Features data
  const features = [
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Bookings',
      description:
        'Bank-level encryption and secure payment processing for worry-free transactions',
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description:
        'Round-the-clock customer service in multiple languages across all time zones',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40 }} />,
      title: 'Verified Reviews',
      description:
        'Authentic guest reviews from verified bookings only - no fake reviews',
    },
    {
      icon: <Payments sx={{ fontSize: 40 }} />,
      title: 'Best Price Guarantee',
      description:
        "Find a lower price? We'll match it plus give you 10% off your booking",
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Global Coverage',
      description:
        'From luxury resorts to budget stays, we have options in every corner of the world',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40 }} />,
      title: 'Award Winning',
      description: 'Recognized as the most innovative travel platform of 2024',
    },
  ];

  // Value propositions
  const values = [
    {
      title: 'Transparency',
      description:
        'No hidden fees, clear pricing, and honest hotel descriptions',
    },
    {
      title: 'Innovation',
      description:
        'Constantly improving our platform with cutting-edge technology',
    },
    {
      title: 'Community',
      description:
        'Building trust between travelers and hotel partners worldwide',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(
              '#e31e25',
              0.95
            )} 0%, ${alpha('#c0171d', 0.95)} 100%), url('/about-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            color: 'white',
            py: { xs: 8, md: 12 },
            position: 'relative',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Chip
                  label="About Bookmipg Hotel"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    mb: 3,
                    fontWeight: 600,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  Redefining Hotel Experiences Worldwide
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.6,
                  }}
                >
                  We connect travelers with exceptional accommodations through
                  our innovative multi-vendor platform, ensuring every stay is
                  memorable and every booking is seamless.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontWeight: 700,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Explore Hotels
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'grey.300',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Partner With Us
                  </Button>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 300, md: 400 },
                    backgroundImage: 'url("/hotel-lobby.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 4,
                    boxShadow: 8,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      right: -20,
                      bottom: -20,
                      border: `3px solid ${alpha('#ffffff', 0.3)}`,
                      borderRadius: 4,
                      zIndex: -1,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Stats Section */}
        <Container
          maxWidth="lg"
          sx={{ py: { xs: 8, md: 10 }, mt: { xs: -4, md: -6 } }}
        >
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 12, md: 3 }} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    border: 'none',
                    boxShadow: 4,
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: 'primary.main',
                        mb: 1,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Our Story Section */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid
              container
              spacing={6}
              alignItems="center"
              direction={isMobile ? 'column-reverse' : 'row'}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 3,
                    height: { xs: 300, md: 400 },
                  }}
                >
                  <Box
                    sx={{
                      background: 'linear-gradient(45deg, #e31e25, #ff5252)',
                      borderRadius: 3,
                      gridRow: 'span 2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                    }}
                  >
                    Bookmipg
                  </Box>
                  <Box
                    sx={{
                      background: 'linear-gradient(45deg, #2d3748, #4a5568)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                    }}
                  >
                    Since 2018
                  </Box>
                  <Box
                    sx={{
                      background: 'linear-gradient(45deg, #c0171d, #e31e25)',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                    }}
                  >
                    Global Reach
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 800,
                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  Our Journey
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    mb: 3,
                    color: 'text.secondary',
                  }}
                >
                  Founded in 2018, Bookmipg Hotel emerged from a simple but
                  powerful vision: to transform how travelers discover and book
                  accommodations worldwide. We noticed the fragmentation in the
                  hotel booking space and set out to create a unified platform
                  that benefits both travelers and hotel partners.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    mb: 4,
                    color: 'text.secondary',
                  }}
                >
                  Today, we&apos;re proud to be one of the fastest-growing
                  multi-vendor hotel booking platforms, trusted by millions of
                  travelers and thousands of hotel partners across 120+
                  countries. Our commitment to innovation, transparency, and
                  exceptional service continues to drive our growth.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {[
                    'Innovation',
                    'Trust',
                    'Quality',
                    'Community',
                    'Excellence',
                    'Transparency',
                  ].map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      variant="filled"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 800,
                mb: 2,
              }}
            >
              Why Travelers Choose Bookmipg
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem',
              }}
            >
              We&apos;re committed to making every aspect of your travel
              experience seamless, secure, and memorable
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                      bgcolor: alpha('#e31e25', 0.02),
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Values Section */}
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              <Grid size={12}>
                <Typography
                  variant="h2"
                  align="center"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 800,
                    mb: 2,
                  }}
                >
                  Our Core Values
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    mb: 8,
                    color: 'text.secondary',
                    maxWidth: 600,
                    mx: 'auto',
                  }}
                >
                  The principles that guide everything we do at Bookmipg Hotel
                </Typography>
              </Grid>
              {values.map((value, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 4,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem',
                        fontWeight: 700,
                        mb: 3,
                        mx: 'auto',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Team Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 800,
              mb: 2,
            }}
          >
            Leadership Team
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 8,
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Meet the passionate professionals dedicated to transforming your
            travel experience
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        border: `4px solid ${alpha('#e31e25', 0.2)}`,
                        bgcolor: 'primary.main',
                        fontSize: '2.5rem',
                      }}
                    >
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Avatar>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      color="primary"
                      sx={{
                        mb: 3,
                        fontWeight: 600,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(
              '#e31e25',
              0.95
            )} 0%, ${alpha('#c0171d', 0.95)} 100%)`,
            color: 'white',
            py: { xs: 8, md: 12 },
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontWeight: 800,
                mb: 3,
              }}
            >
              Ready to Experience Better Hotel Bookings?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: '1.2rem',
              }}
            >
              Join millions of travelers who trust Bookmipg Hotel for their
              accommodations worldwide
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Booking Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'grey.300',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Contact Our Team
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AboutPage;
