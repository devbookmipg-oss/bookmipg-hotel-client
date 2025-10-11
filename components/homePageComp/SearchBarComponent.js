'use client';
import {
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
  Popover,
  Fade,
  useTheme,
  useMediaQuery,
  Autocomplete,
  Snackbar,
} from '@mui/material';
import { Search, LocationOn, CalendarToday, Person } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { GetCustomDate, getIndiaDate } from '@/utils/DateFetcher';
import { useRouter } from 'next/navigation';

export default function SearchBarComponent({ locations }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: getIndiaDate(0), // Today in IST
    checkOut: getIndiaDate(1), // Tomorrow in IST
    guests: '2 Adults, 0 Children',
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleFieldClick = (field, event) => {
    setActiveField(field);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveField(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    setSearchData((prev) => ({
      ...prev,
      guests: `${adults} ${adults === 1 ? 'Adult' : 'Adults'}, ${children} ${
        children === 1 ? 'Child' : 'Children'
      }`,
    }));
  }, [adults, children]);

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const showError = (message) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: '' }), 3000);
  };

  const handleSearch = () => {
    const { location, checkIn, checkOut } = searchData;

    if (!location) return showError('Please select a location');
    if (!checkIn) return showError('Please select a check-in date');
    if (!checkOut) return showError('Please select a check-out date');
    if (new Date(checkOut) <= new Date(checkIn))
      return showError('Check-out date must be after check-in');
    if (adults < 1) return showError('At least one adult is required');

    router.push(
      `/hotels?location=${encodeURIComponent(
        location
      )}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}`
    );
  };

  const renderPopoverContent = () => {
    switch (activeField) {
      case 'dates':
        return (
          <Box sx={{ p: 2, width: isMobile ? 300 : 400 }}>
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                background: 'red',
              }}
            >
              Apply Dates
            </Button>
          </Box>
        );

      case 'guests':
        return (
          <Box sx={{ p: 2, width: isMobile ? 280 : 320 }}>
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
                <Typography fontWeight="bold">{adults}</Typography>
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
                <Typography fontWeight="bold">{children}</Typography>
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
          'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2070&q=80)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: isMobile ? 400 : 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1,
        }}
      />

      {/* Animated light */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite alternate',
          zIndex: 1,
        }}
      />

      {/* Main Content */}
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
            <Fade in timeout={800}>
              <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                color="white"
                gutterBottom
                sx={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
              >
                Discover Your Perfect Escape
              </Typography>
            </Fade>

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
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 3,
                bgcolor: '#ffffff96',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 1 : 0,
              }}
            >
              {/* Inline Location */}
              <Box
                sx={{
                  width: isMobile ? '100%' : '40%',
                  flex: 1.5,
                  p: 1,
                  borderRight: isMobile ? 'none' : '1px solid',
                  borderBottom: isMobile ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 20, color: 'error.main' }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="12px"
                    fontWeight="medium"
                  >
                    LOCATION
                  </Typography>
                </Box>
                <Autocomplete
                  freeSolo
                  options={locations || []}
                  getOptionLabel={(option) => option.city || option.name || ''}
                  onChange={(e, value) => {
                    if (value)
                      setSearchData({
                        ...searchData,
                        location: value.city || value.name,
                      });
                  }}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      {...props}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 1,
                        px: 1.5,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <LocationOn color="primary" fontSize="small" />
                      <Box>
                        <Typography fontWeight="medium">
                          {option.city}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.state}, {option.pincode}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search city or hotel name"
                      fullWidth
                      value={searchData.location}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          location: e.target.value,
                        })
                      }
                      variant="standard"
                      sx={{
                        mt: 0.5,
                        '& .MuiInputBase-root': {
                          borderRadius: 2,
                          borderBottom: 'none !important',
                        },
                        '& .MuiInput-underline:before, & .MuiInput-underline:after':
                          {
                            display: 'none',
                          },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Dates */}
              <Box
                sx={{
                  width: isMobile ? '100%' : '40%',
                  flex: 1,
                  p: 1,
                  borderRight: isMobile ? 'none' : '1px solid',
                  borderBottom: isMobile ? '1px solid' : 'none',
                  borderColor: 'divider',
                  cursor: 'pointer',
                }}
                onClick={(e) => handleFieldClick('dates', e)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday sx={{ fontSize: 20, color: 'error.main' }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize="12px"
                    fontWeight="medium"
                  >
                    DATES
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium" noWrap>
                  {searchData.checkIn && searchData.checkOut
                    ? `${GetCustomDate(searchData.checkIn)} - ${GetCustomDate(
                        searchData.checkOut
                      )}`
                    : 'Add dates'}
                </Typography>
              </Box>

              {/* Guests */}
              <Box
                sx={{
                  width: isMobile ? '100%' : '20%',
                  flex: 1,
                  p: 1,
                  borderBottom: isMobile ? '1px solid' : 'none',
                  borderColor: 'divider',
                  cursor: 'pointer',
                }}
                onClick={(e) => handleFieldClick('guests', e)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person sx={{ fontSize: 20, color: 'error.main' }} />
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
                onClick={handleSearch}
                variant="contained"
                sx={{
                  width: isMobile ? '100%' : 56,
                  height: isMobile ? 48 : 56,
                  borderRadius: isMobile ? 2 : 3,
                  bgcolor: 'red',
                  color: 'white',
                  ml: isMobile ? 0 : 1,
                  mt: isMobile ? 1 : 0,
                  fontWeight: 'bold',
                  '&:hover': { transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                {isMobile ? 'Search' : <Search sx={{ fontSize: 24 }} />}
              </Button>
            </Paper>
          </Paper>
        </Fade>
      </Box>

      {/* Popover for dates & guests */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
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

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
}
