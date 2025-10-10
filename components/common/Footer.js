'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  styled,
  Fab,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Home,
  Search,
  Book,
  Person,
  Add,
  Padding,
  FavoriteBorderOutlined,
} from '@mui/icons-material';

import Image from 'next/image';

// Desktop Footer Wrapper
const DesktopFooterWrapper = styled(Box)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
const MobileNavWrapper = styled(Paper)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    zIndex: 1300, // ✅ Above all other content (matches MUI modal zIndex)
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    borderTop: '1px solid rgba(255,255,255,0.2)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    margin: 0,
    paddingBottom: 'env(safe-area-inset-bottom)', // ✅ handles iPhone bottom bar
    WebkitTransform: 'translateZ(0)', // ✅ prevents layout shift on first render
  },
}));

// Custom BottomNavigationAction with active highlight
const StyledBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    color: '#fff',
    '&.Mui-selected': {
      color: theme.palette.error.main,
      fontWeight: 'bold',
    },
  })
);

export default function Footer() {
  const [value, setValue] = useState(0);

  return (
    <>
      {/* 💻 Desktop Footer */}
      <DesktopFooterWrapper
        component="footer"
        sx={{
          backgroundColor: '#000000de',
          color: 'white',
          py: 6,
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Grid container spacing={4}>
          {/* Brand / About */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Image src="/logo-color.png" height={90} width={200} alt="logo" />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Book hotels from top vendors with ease. Experience comfort,
              luxury, and affordability all in one place.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="error"
            >
              Quick Links
            </Typography>
            <Typography
              component={Link}
              href="/about"
              sx={{
                display: 'block',
                mb: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              About Us
            </Typography>
            <Typography
              component={Link}
              href="/contact"
              sx={{
                display: 'block',
                mb: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Contact
            </Typography>
            <Typography
              component={Link}
              href="/contact"
              sx={{
                display: 'block',
                mb: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Help Center
            </Typography>
          </Grid>

          {/* Support */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="error"
            >
              Support
            </Typography>
            <Typography
              component={Link}
              href="/terms-and-condition"
              sx={{
                display: 'block',
                mb: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Terms & Conditions
            </Typography>
            <Typography
              component={Link}
              href="/privacy-policy"
              sx={{
                display: 'block',
                mb: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component={Link}
              href="/cancellation-refund"
              sx={{
                display: 'block',
                mb: 1,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Cancellation & Refund
            </Typography>
          </Grid>

          {/* Social Media */}
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="error"
            >
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://facebook.com">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://youtube.com">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          mt={6}
          pt={3}
          sx={{
            borderTop: '1px solid #444', // ✅ hex instead of rgba
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            © {new Date().getFullYear()} Bookmipg. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#bbb', mt: 1 }}>
            Designed & Developed by{' '}
            <Link
              href="http://nexdev.in/"
              target="_blank"
              style={{
                color: '#FF5252', // ✅ hex highlight
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Nexdev Software Solutions
            </Link>
          </Typography>
        </Box>
      </DesktopFooterWrapper>

      {/* 📱 Mobile Bottom Navigation */}
      <MobileNavWrapper>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{ background: 'transparent' }}
        >
          <StyledBottomNavigationAction
            component={Link}
            href="/"
            label="Home"
            icon={<Home />}
          />
          <StyledBottomNavigationAction
            component={Link}
            href="/search"
            label="Search"
            icon={<Search />}
          />
          <StyledBottomNavigationAction
            component={Link}
            href="/user/wishlist"
            label="Wishlist"
            icon={<FavoriteBorderOutlined />}
          />

          {/* Floating Action Button in center */}
          {/* <Box
            sx={{
              position: 'relative',
              top: -30,
              mx: 2,
            }}
          >
            <Fab
              color="error"
              aria-label="book"
              component={Link}
              href="/book"
              sx={{ width: 60, height: 60, boxShadow: 4 }}
            >
              <Add />
            </Fab>
          </Box> */}

          <StyledBottomNavigationAction
            component={Link}
            href="/user/bookings"
            label="Bookings"
            icon={<Book />}
          />
          <StyledBottomNavigationAction
            component={Link}
            href="/profile"
            label="Profile"
            icon={<Person />}
          />
        </BottomNavigation>
      </MobileNavWrapper>
    </>
  );
}
