'use client';
import {
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
  Popover,
  Chip,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  LocationOn,
  CalendarToday,
  Person,
  MyLocation,
  TrendingUp,
  Hotel,
  Villa,
  Apartment,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function SearchBarComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests, 0 Children',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    setSearchData((prev) => ({
      ...prev,
      guests: `${adults} ${adults === 1 ? 'Adult' : 'Adults'}, ${children} ${
        children === 1 ? 'Child' : 'Children'
      }`,
    }));
  }, [adults, children]);

  const handleFieldClick = (field, event) => {
    setActiveField(field);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveField(null);
  };

  const open = Boolean(anchorEl);

  const popularLocations = [
    { name: 'New York, USA', type: 'City', icon: '🏙️' },
    { name: 'Bali, Indonesia', type: 'Beach', icon: '🏖️' },
    { name: 'Paris, France', type: 'Romantic', icon: '💖' },
    { name: 'Tokyo, Japan', type: 'City', icon: '🗼' },
    { name: 'Dubai, UAE', type: 'Luxury', icon: '⭐' },
    { name: 'London, UK', type: 'City', icon: '🇬🇧' },
  ];

  const propertyTypes = [
    { name: 'Hotels', icon: <Hotel />, count: '2.4M+' },
    { name: 'Villas', icon: <Villa />, count: '450K+' },
    { name: 'Resorts', icon: '🏨', count: '180K+' },
    { name: 'Apartments', icon: <Apartment />, count: '1.2M+' },
  ];

  const quickDates = [
    { label: 'This Weekend', value: 'weekend' },
    { label: 'Next Week', value: 'next_week' },
    { label: 'Next Month', value: 'next_month' },
    { label: 'Flexible Dates', value: 'flexible' },
  ];

  const renderPopoverContent = () => {
    switch (activeField) {
      case 'location':
        return (
          <Box sx={{ p: 2, width: isMobile ? 280 : 350 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🌍 Where do you want to go?
            </Typography>

            {/* Current Location */}
            <Box
              onClick={() => {
                setSearchData({ ...searchData, location: 'Current Location' });
                handleClose();
              }}
              sx={{
                p: 2,
                cursor: 'pointer',
                borderRadius: 2,
                bgcolor: 'primary.light',
                color: 'primary.main',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 'bold',
              }}
            >
              <MyLocation />
              Use current location
            </Box>

            {/* Popular Destinations */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{ mt: 2 }}
            >
              Trending Destinations
            </Typography>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}
            >
              {popularLocations.map((location, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setSearchData({ ...searchData, location: location.name });
                    handleClose();
                  }}
                  sx={{
                    p: 1.5,
                    cursor: 'pointer',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 0.5 }}>
                    {location.icon}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {location.name.split(',')[0]}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {location.type}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'dates':
        return (
          <Box sx={{ p: 2, width: isMobile ? 300 : 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              📅 Select Dates
            </Typography>

            {/* Quick Date Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Quick selection
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {quickDates.map((date, index) => (
                  <Chip
                    key={index}
                    label={date.label}
                    variant="outlined"
                    onClick={() => {
                      // Handle quick date selection
                      handleClose();
                    }}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Box>

            {/* Date Pickers */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                label="Check-in"
                type="date"
                fullWidth
                value={searchData.checkIn}
                onChange={(e) =>
                  setSearchData({ ...searchData, checkIn: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                label="Check-out"
                type="date"
                fullWidth
                value={searchData.checkOut}
                onChange={(e) =>
                  setSearchData({ ...searchData, checkOut: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleClose}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Apply Dates
            </Button>
          </Box>
        );

      case 'guests':
        return (
          <Box sx={{ p: 2, width: isMobile ? 280 : 320 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              👥 Guests & Rooms
            </Typography>

            {/* Adults Counter */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor: 'grey.50',
              }}
            >
              <Box>
                <Typography fontWeight="bold">Adults</Typography>
                <Typography variant="body2" color="text.secondary">
                  Age 13+
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  disabled={adults <= 1}
                  sx={{
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  -
                </IconButton>
                <Typography
                  fontWeight="bold"
                  sx={{ minWidth: 20, textAlign: 'center' }}
                >
                  {adults}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setAdults(adults + 1)}
                  sx={{
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  +
                </IconButton>
              </Box>
            </Box>

            {/* Children Counter */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 2,
                bgcolor: 'grey.50',
              }}
            >
              <Box>
                <Typography fontWeight="bold">Children</Typography>
                <Typography variant="body2" color="text.secondary">
                  Age 0-12
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  disabled={children <= 0}
                  sx={{
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  -
                </IconButton>
                <Typography
                  fontWeight="bold"
                  sx={{ minWidth: 20, textAlign: 'center' }}
                >
                  {children}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setChildren(children + 1)}
                  sx={{
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  +
                </IconButton>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleClose}
              sx={{
                mt: 3,
                borderRadius: 2,
                py: 1.5,
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Apply
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: isMobile ? 400 : 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1,
        }}
      />

      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite alternate',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!isMobile && (
          <>
            {/* Main Title */}
            <Fade in timeout={800}>
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                color="white"
                gutterBottom
                sx={{
                  textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  mb: 1,
                }}
              >
                Discover Your Perfect Escape
              </Typography>
            </Fade>

            {/* Subtitle */}
            <Fade in timeout={1000}>
              <Typography
                variant="h6"
                textAlign="center"
                color="rgba(255,255,255,0.9)"
                gutterBottom
                sx={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  mb: 4,
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                Find amazing deals on hotels, resorts, and vacation rentals
                worldwide
              </Typography>
            </Fade>
          </>
        )}

        {/* Search Card */}
        <Fade in timeout={1200}>
          <Paper
            elevation={8}
            sx={{
              p: isMobile ? 2 : 3,
              width: isMobile ? '90%' : '80%',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Search Form */}
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 3,
                bgcolor: '#ffffff96',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 1 : 0,
              }}
            >
              {/* Location Field */}
              <Box
                sx={{
                  flex: isMobile ? 'auto' : 1,
                  p: 1,
                  cursor: 'pointer',
                  borderRight: isMobile ? 'none' : '1px solid',
                  borderBottom: isMobile ? '1px solid' : 'none',
                  borderColor: 'divider',
                  width: isMobile ? '100%' : 'auto',
                  borderRadius: isMobile ? 2 : 0,
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
                onClick={(e) => handleFieldClick('location', e)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <LocationOn sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="12px"
                    fontWeight="medium"
                  >
                    LOCATION
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  noWrap
                  sx={{
                    color: searchData.location
                      ? 'text.primary'
                      : 'text.secondary',
                  }}
                >
                  {searchData.location || 'Where are you going?'}
                </Typography>
              </Box>

              {/* Dates Field */}
              <Box
                sx={{
                  flex: isMobile ? 'auto' : 1,
                  p: 1,
                  cursor: 'pointer',
                  borderRight: isMobile ? 'none' : '1px solid',
                  borderBottom: isMobile ? '1px solid' : 'none',
                  borderColor: 'divider',
                  width: isMobile ? '100%' : 'auto',
                  borderRadius: isMobile ? 2 : 0,
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
                onClick={(e) => handleFieldClick('dates', e)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <CalendarToday sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="12px"
                    fontWeight="medium"
                  >
                    DATES
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  noWrap
                  sx={{
                    color: searchData.checkIn
                      ? 'text.primary'
                      : 'text.secondary',
                  }}
                >
                  {searchData.checkIn && searchData.checkOut
                    ? `${searchData.checkIn} - ${searchData.checkOut}`
                    : 'Add dates'}
                </Typography>
              </Box>

              {/* Guests Field */}
              <Box
                sx={{
                  flex: isMobile ? 'auto' : 0.8,
                  p: 1,
                  cursor: 'pointer',
                  width: isMobile ? '100%' : 'auto',
                  borderBottom: isMobile ? '1px solid' : 'none',
                  borderColor: 'divider',
                  borderRadius: isMobile ? 2 : 0,
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
                onClick={(e) => handleFieldClick('guests', e)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Person sx={{ fontSize: 20, color: 'primary.main' }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="12px"
                    fontWeight="medium"
                  >
                    GUESTS
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium" noWrap>
                  {searchData.guests}
                </Typography>
              </Box>

              {/* Search Button */}
              <Button
                variant="contained"
                sx={{
                  minWidth: 'auto',
                  width: isMobile ? '100%' : 56,
                  height: isMobile ? 48 : 56,
                  borderRadius: isMobile ? 2 : 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  ml: isMobile ? 0 : 1,
                  mt: isMobile ? 1 : 0,
                  fontWeight: 'bold',
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isMobile ? 'Search' : <Search sx={{ fontSize: 24 }} />}
              </Button>
            </Paper>
          </Paper>
        </Fade>
      </Box>

      {/* Popover for form fields */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 3,
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
          },
        }}
      >
        {renderPopoverContent()}
      </Popover>

      {/* Global Styles for Animation */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </Box>
  );
}
