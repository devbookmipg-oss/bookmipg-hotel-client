'use client';
import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  IconButton,
  Rating,
} from '@mui/material';
import { Favorite, FavoriteBorder, LocationOn } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import { UpdateData } from '@/utils/ApiFunctions';
import { ErrorToast, SuccessToast } from '@/utils/GenerateToast';
import { calculateReviewStats } from '@/utils/CalculateRating';

import Slider from 'react-slick';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function FeaturedPropertiesCarousel({ hotels, reviews }) {
  const { auth } = useAuth();
  const router = useRouter();
  // inside your component
  const theme = useTheme();
  // match typical breakpoints — adjust if your theme differs
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // ~600px
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-900
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 900-1200
  const isLg = useMediaQuery(theme.breakpoints.up('lg')); // >1200

  let slidesToShow = 4;
  if (isXs) slidesToShow = 1;
  else if (isSm) slidesToShow = 2; // or 2 if you prefer
  else if (isMd) slidesToShow = 3;
  else if (isLg) slidesToShow = 4;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    // optional fallback responsive (react-slick will also respect this)
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 800, settings: { slidesToShow: 1 } },
    ],
  };

  const toggleFavorite = async (propertyId, isFav) => {
    try {
      const property = hotels.find((p) => p.documentId === propertyId);
      let newFavList =
        property?.online_users?.map(({ documentId }) => documentId) || [];

      if (isFav) {
        newFavList = newFavList.filter((user) => user !== auth.user.id);
      } else {
        newFavList = [...newFavList, auth.user.id];
      }

      await UpdateData({
        auth,
        endPoint: 'hotels',
        id: propertyId,
        payload: { data: { online_users: newFavList } },
      });

      SuccessToast(isFav ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (err) {
      console.error('toggleFavorite error:', err);
      ErrorToast('Something went wrong');
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        mt: 5,
        mb: 10,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        textAlign="center"
        color="text.primary"
      >
        🌟 Featured Properties
      </Typography>

      {/* 🧭 Slider container */}
      <Slider {...sliderSettings}>
        {hotels?.slice(0, 10).map((property) => {
          const myReviews = reviews?.filter((item) => {
            return item?.hotel_id === property?.documentId;
          });
          const ratingValue = calculateReviewStats(myReviews);
          const isFav = property?.online_users?.some(
            (u) => u.documentId === auth?.user?.id
          );

          return (
            <Box key={property.documentId} sx={{ px: 1 }}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                  },
                }}
              >
                {/* 🖼️ Image */}
                <Box
                  sx={{
                    height: { xs: 180, sm: 200 },
                    background: `url(${property?.banner_image?.url}) center/cover no-repeat`,
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
                      top: 10,
                      right: 10,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': { bgcolor: 'white' },
                    }}
                    size="small"
                  >
                    {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                </Box>

                {/* 🏨 Details */}
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
                    <LocationOn
                      sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }}
                    />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {property.hotel_address_line1}, {property.hotel_district}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

                  {/* 🧩 Amenities */}
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

                  {/* 💰 Price + Book Button */}
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
                        sx={{ display: 'flex', alignItems: 'center' }}
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
                        router.push(`/hotels/details?id=${property.documentId}`)
                      }
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 2.5,
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #ff1744, #f50057)',
                        '&:hover': {
                          background:
                            'linear-gradient(90deg, #f50057, #ff1744)',
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
}
