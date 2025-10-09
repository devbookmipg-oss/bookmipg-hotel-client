'use client';

import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Paper,
  IconButton,
  Rating,
  Drawer,
  Divider,
  useMediaQuery,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Close,
  FilterAltOutlined,
} from '@mui/icons-material';
import { useState, useEffect, Suspense } from 'react';
import { GetDataList, UpdateData } from '@/utils/ApiFunctions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@/context';
import { Preloader } from '@/components/common';
import { ErrorToast, SuccessToast } from '@/utils/GenerateToast';
import { calculateReviewStats } from '@/utils/CalculateRating';

const HotelsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const { auth } = useAuth();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const queryLocation = searchParams.get('location') || '';

  // Always call hooks at the top — no conditional returns before this
  const hotels = GetDataList({ endPoint: 'hotels' }) || [];
  const locations = GetDataList({ endPoint: 'locations' }) || [];

  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(queryLocation);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const amenitiesList = [
    'Free Wi-Fi',
    'Parking',
    'Swimming Pool',
    'Restaurant',
    'Air Conditioning',
    'Gym',
    'Spa',
    'Bar',
    'Pool',
  ];

  // ✅ useEffect always runs — no conditional call
  useEffect(() => {
    if (!hotels?.length) return;

    let list = [...hotels];

    // Filter by location
    if (selectedLocation) {
      const search = selectedLocation.toLowerCase();
      list = list.filter(
        (h) =>
          h.hotel_district?.toLowerCase().includes(search) ||
          h.hotel_state?.toLowerCase().includes(search) ||
          h.hotel_name?.toLowerCase().includes(search)
      );
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      list = list.filter((h) =>
        selectedAmenities.every((am) =>
          h.amenities?.some((a) => a.title === am)
        )
      );
    }

    // Sort
    if (sortOption === 'lowToHigh') {
      list.sort(
        (a, b) =>
          (a.discounted_base_price || 0) - (b.discounted_base_price || 0)
      );
    } else if (sortOption === 'highToLow') {
      list.sort(
        (a, b) =>
          (b.discounted_base_price || 0) - (a.discounted_base_price || 0)
      );
    }

    setFilteredHotels(list);
  }, [hotels, selectedLocation, selectedAmenities, sortOption]);

  const toggleFavorite = async (propertyId, isFav) => {
    try {
      const property = hotels.find((p) => p.documentId === propertyId);
      if (!property) return;

      let newFavList = property?.online_users?.map((u) => u.documentId) || [];

      if (isFav) newFavList = newFavList.filter((id) => id !== auth.user.id);
      else newFavList.push(auth.user.id);

      await UpdateData({
        auth,
        endPoint: 'hotels',
        id: propertyId,
        payload: { data: { online_users: newFavList } },
      });
      SuccessToast(isFav ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (err) {
      console.error(`error toggleFav: ${err}`);
      ErrorToast('Something went wrong');
    }
  };

  const FilterContent = (
    <Box sx={{ width: { xs: 280, sm: 320 }, p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          label="Location"
        >
          <MenuItem value="">All</MenuItem>
          {locations?.map((loc, i) => (
            <MenuItem key={i} value={loc.city}>
              {loc.city}, {loc.state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Amenities
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {amenitiesList.map((am) => (
          <Chip
            key={am}
            label={am}
            color={selectedAmenities.includes(am) ? 'primary' : 'default'}
            onClick={() =>
              setSelectedAmenities((prev) =>
                prev.includes(am) ? prev.filter((x) => x !== am) : [...prev, am]
              )
            }
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              fontSize: '0.75rem',
            }}
          />
        ))}
      </Box>

      {isMobile && (
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            borderRadius: 2,
            textTransform: 'none',
            background: 'red',
          }}
          onClick={() => setDrawerOpen(false)}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );

  // ✅ Early return *after* all hooks
  if (!hotels?.length || !locations?.length) {
    return (
      <Box sx={{ py: 10 }}>
        <Preloader />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Top bar with Sort + Filter */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {isMobile ? (
          <Button
            variant="outlined"
            startIcon={<FilterAltOutlined />}
            onClick={() => setDrawerOpen(true)}
            sx={{
              textTransform: 'none',
              borderRadius: 3,
              fontWeight: 600,
              color: 'primary.main',
              borderColor: 'primary.main',
            }}
          >
            Filters
          </Button>
        ) : (
          <Typography variant="h6" fontWeight="bold">
            Explore Hotels
          </Typography>
        )}

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="lowToHigh">Price: Low → High</MenuItem>
            <MenuItem value="highToLow">Price: High → Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Drawer (Mobile Filter) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {FilterContent}
      </Drawer>

      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={{ md: 3 }}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
              {FilterContent}
            </Paper>
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 9 }}>
          <Grid container spacing={3}>
            {filteredHotels.map((property) => {
              const isFav = property?.online_users?.some(
                (u) => u.documentId === auth?.user?.id
              );
              const ratingValue = calculateReviewStats(property?.reviews);
              return (
                <Grid key={property.documentId} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper
                    elevation={2}
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: 160, sm: 180 },
                        background: `url(${property?.banner_image?.url}) center/cover`,
                        position: 'relative',
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          auth.user
                            ? toggleFavorite(property.documentId, isFav)
                            : router.push('/signin')
                        }
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: 'rgba(255,255,255,0.9)',
                          '&:hover': { bgcolor: 'white' },
                        }}
                        size="small"
                      >
                        {isFav ? (
                          <Favorite color="error" />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                      >
                        {property.hotel_name}
                      </Typography>

                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <LocationOn
                          sx={{
                            fontSize: 16,
                            color: 'text.secondary',
                            mr: 0.5,
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {property.hotel_address_line1},{' '}
                          {property.hotel_district}, {property.hotel_state}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Rating
                          value={ratingValue.averageRating || 0}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {ratingValue.averageRating || 0} (
                          {ratingValue.totalReviews || 0})
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: 0.5,
                          mb: 2,
                          flexWrap: 'wrap',
                        }}
                      >
                        {property.amenities?.slice(0, 3).map((a, idx) => (
                          <Chip
                            key={idx}
                            label={a.title}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem', height: 24 }}
                          />
                        ))}
                        {property.amenities?.length > 3 && (
                          <Chip
                            label={`+${property.amenities.length - 3}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem', height: 24 }}
                          />
                        )}
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="error"
                          >
                            ₹{property.discounted_base_price || 'N/A'}
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                textDecoration: 'line-through',
                                ml: 1,
                              }}
                            >
                              ₹{property.base_price || 'N/A'}
                            </Typography>
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            per night
                          </Typography>
                        </Box>
                        <Button
                          onClick={() =>
                            router.push(`/hotels/${property.documentId}`)
                          }
                          variant="contained"
                          size="small"
                          sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            px: 2,
                            fontWeight: 'bold',
                            background: 'red',
                          }}
                        >
                          Book Now
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          {filteredHotels.length === 0 && (
            <Typography
              textAlign="center"
              sx={{ mt: 6 }}
              color="text.secondary"
            >
              No hotels found with selected filters.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const Page = () => (
  <Suspense>
    <HotelsPage />
  </Suspense>
);

export default Page;
