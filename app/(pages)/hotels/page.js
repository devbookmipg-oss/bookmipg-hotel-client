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
  Tune,
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

const HotelsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const { auth } = useAuth();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const location = searchParams.get('location');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');

  // Data
  const hotels = GetDataList({ endPoint: 'hotels' }) || [];
  const locations = GetDataList({ endPoint: 'locations' }) || [];

  if (!hotels || !locations) {
    <Preloader />;
  }

  // States
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Example static list of amenities
  const amenitiesList = [
    'Free Wi-Fi',
    'Parking',
    'Swimming Pool',
    'Restaurant',
    'Air Conditioning',
    'Gym',
    'Spa',
    'Bar',
  ];

  // Filter logic
  useEffect(() => {
    if (hotels.length) {
      let list = [...hotels];

      if (selectedLocation)
        list = list.filter((h) => h.hotel_district === selectedLocation);

      if (selectedAmenities.length > 0)
        list = list.filter((h) =>
          selectedAmenities.every((am) =>
            h.amenities.some((a) => a.title === am)
          )
        );

      if (sortOption === 'lowToHigh')
        list.sort(
          (a, b) =>
            (a.discounted_base_price || 0) - (b.discounted_base_price || 0)
        );
      if (sortOption === 'highToLow')
        list.sort(
          (a, b) =>
            (b.discounted_base_price || 0) - (a.discounted_base_price || 0)
        );

      setFilteredHotels(list);
    }
  }, [hotels, selectedLocation, selectedAmenities, sortOption]);

  const toggleFavorite = async (propertyId, isFav) => {
    try {
      const property = hotels.find((p) => p.documentId === propertyId);
      let newFavList = property?.online_users?.map(
        ({ documentId }) => documentId
      );
      if (isFav) {
        newFavList = newFavList.filter((user) => user !== auth.user.id);
      } else {
        newFavList = [...newFavList, auth.user.id];
      }

      await UpdateData({
        auth,
        endPoint: 'hotels',
        id: propertyId,
        payload: {
          data: {
            online_users: newFavList,
          },
        },
      });
      SuccessToast('Added to wishlist');
    } catch (err) {
      console.log(`error toggleFav: ${err}`);
      ErrorToast('Someting went wrong');
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

      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Location</InputLabel>
        <Select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          label="Location"
        >
          <MenuItem value="">All</MenuItem>
          {locations?.map((loc, i) => (
            <MenuItem key={i} value={loc.name}>
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
          onClick={() => setDrawerOpen(false)}
        >
          Apply Filters
        </Button>
      )}
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Mobile Filter Button */}
      {isMobile && (
        <Button
          variant="outlined"
          startIcon={<FilterAltOutlined />}
          onClick={() => setDrawerOpen(true)}
          sx={{
            mb: 2,
            textTransform: 'none',
            borderRadius: 3,
            fontWeight: 600,
            color: 'primary.main',
            borderColor: 'primary.main',
          }}
        >
          Filters & Sort
        </Button>
      )}

      {/* Drawer (Mobile) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {FilterContent}
      </Drawer>

      {/* Desktop Filter Sidebar + List */}
      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={3}>
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
              return (
                <Grid key={property.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                    {/* Image */}
                    <Box
                      sx={{
                        height: { xs: 160, sm: 180 },
                        background: `url(${property?.banner_image?.url}) center/cover`,
                        position: 'relative',
                      }}
                    >
                      {auth.user ? (
                        <IconButton
                          onClick={() =>
                            toggleFavorite(property.documentId, isFav)
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
                      ) : (
                        <IconButton
                          onClick={() => router.push('/signin')}
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: 'rgba(255,255,255,0.9)',
                            '&:hover': { bgcolor: 'white' },
                          }}
                          size="small"
                        >
                          <FavoriteBorder />
                        </IconButton>
                      )}
                    </Box>

                    {/* Details */}
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
                          {property?.hotel_address_line1},{' '}
                          {property?.hotel_district}, {property?.hotel_state}
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
                          value={property.rating || 4}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {property.rating || 0} ({property.reviewCount || 0})
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
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <Chip
                            key={idx}
                            label={amenity.title}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem', height: 24 }}
                          />
                        ))}
                        {property.amenities.length > 3 && (
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
                            color="primary"
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
                            background:
                              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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

const Page = () => {
  return (
    <>
      <Suspense>
        <HotelsPage />
      </Suspense>
    </>
  );
};
export default Page;
