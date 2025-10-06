'use client';

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  InputBase,
  Container,
} from '@mui/material';
import {
  Search,
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  LocationOn,
  Home,
  PersonOutline,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context';
import { useRouter } from 'next/navigation';

// Styled components
const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: '500px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function Header() {
  const { auth, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    router.push(path);
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Image src="/logo-color.png" width={100} height={50} alt="logo" />

            {/* Navigation Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Hotels
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Villas
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Experiences
              </Button>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              flex: 1,
              maxWidth: '500px',
              mx: 4,
            }}
          >
            <SearchBar>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search hotels, destinations..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchBar>
          </Box>

          {/* Action Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Location Button */}
            <Button
              startIcon={<LocationOn />}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                color: 'text.primary',
                borderRadius: '20px',
                px: 2,
              }}
            >
              New York
            </Button>

            {/* Favorite Icon */}
            <IconButton
              onClick={() => {
                if (auth.user) {
                  handleNavigate('/user/favorites');
                } else {
                  handleNavigate('/signin');
                }
              }}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(255,107,107,0.1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Badge badgeContent={auth.user ? 2 : 0} color="error">
                <FavoriteBorder />
              </Badge>
            </IconButton>

            {/* Profile Avatar */}
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {auth.user ? (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '14px',
                  }}
                >
                  {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'grey.400',
                  }}
                >
                  <PersonOutline fontSize="small" />
                </Avatar>
              )}
            </IconButton>

            {/* Menu (depends on auth status) */}

            {auth.user ? (
              <>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleNavigate('/user/profile')}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('/user/bookings')}>
                    My Bookings
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>{' '}
                </Menu>
              </>
            ) : (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleNavigate('/signin')}>
                  Login / Signup
                </MenuItem>{' '}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
