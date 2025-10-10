'use client';

import { useAuth } from '@/context';
import { GetDataList, UpdateData } from '@/utils/ApiFunctions';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  useTheme,
  Paper,
  IconButton,
  Rating,
  Button,
} from '@mui/material';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GetCustomDate } from '@/utils/DateFetcher';
import { calculateReviewStats } from '@/utils/CalculateRating';
import { ErrorToast, SuccessToast } from '@/utils/GenerateToast';

const Page = () => {
  const router = useRouter();
  const theme = useTheme();
  const { auth } = useAuth();
  const userId = auth?.user?.id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { user } = parseCookies();
    if (!user) {
      router.push('/signin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const hotels = GetDataList({
    endPoint: 'hotels',
  });
  const toggleFavorite = async (propertyId) => {
    try {
      const property = hotels.find((p) => p.documentId === propertyId);
      if (!property) return;

      let newFavList = property?.online_users?.map((u) => u.documentId) || [];

      newFavList = newFavList.filter((id) => id !== auth.user.id);

      await UpdateData({
        auth,
        endPoint: 'hotels',
        id: propertyId,
        payload: { data: { online_users: newFavList } },
      });
      SuccessToast('Removed from wishlist');
    } catch (err) {
      console.error(`error toggleFav: ${err}`);
      ErrorToast('Something went wrong');
    }
  };

  const filteredData = hotels?.filter((item) => {
    const isFav = item?.online_users?.some((u) => u.documentId === userId);

    return isFav;
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="70vh"
        sx={{ bgcolor: 'background.default' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="70vh"
        sx={{
          bgcolor: 'background.default',
          textAlign: 'center',
        }}
      >
        <FavoriteIcon sx={{ fontSize: 50, mb: 2, color: 'text.secondary' }} />
        <Typography color="text.secondary">Wishlist is empty</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '60vh',
        pb: 4,
      }}
    >
      {/* BOOKINGS LIST */}
      <Box
        sx={{
          mt: 5,
          px: { xs: 2, sm: 3 },
          mx: 'auto',
        }}
      >
        <Grid container spacing={2}>
          {filteredData.map((property) => {
            const ratingValue = calculateReviewStats(property?.reviews);

            return (
              <Grid key={property.documentId} size={{ xs: 12, sm: 6, md: 3 }}>
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
                          ? toggleFavorite(property.documentId)
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
                      <FavoriteIcon color="error" />
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

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon
                        sx={{
                          fontSize: 16,
                          color: 'text.secondary',
                          mr: 0.5,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" noWrap>
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
                        {ratingValue.totalReviews || 0} reviews)
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
                          router.push(
                            `/hotels/details?id=${property.documentId}`
                          )
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
      </Box>
    </Box>
  );
};

export default Page;
