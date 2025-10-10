import { Box, IconButton, Rating, Typography } from '@mui/material';
import { Favorite, LocationOn, FavoriteBorder } from '@mui/icons-material';
import { calculateReviewStats } from '@/utils/CalculateRating';

const HotelHeader = ({ data, toggleFavorite, isMobile, isFav }) => {
  const ratingValue = calculateReviewStats(data?.reviews);
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              fontWeight="700"
              sx={{
                background: 'red',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontSize: isMobile ? '2rem' : '2.5rem',
                lineHeight: 1.2,
              }}
            >
              {data.hotel_name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1,
              }}
            >
              <Rating
                value={ratingValue.averageRating}
                precision={0.1}
                readOnly
              />
              <Typography variant="body1" color="text.secondary">
                {ratingValue.averageRating} ({ratingValue.totalReviews} reviews)
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              sx={{
                bgcolor: '#f2f2f2ff',
                border: '1px solid #d7d7d7ff',
              }}
              onClick={() =>
                auth.user ? toggleFavorite() : router.push('/signin')
              }
            >
              {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
          }}
        >
          <LocationOn sx={{ color: '#667eea' }} />
          <Typography variant="body1" color="text.secondary">
            {data.hotel_address_line1},{data.hotel_district},
            {data.hotel_country},{data.hotel_pincode}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default HotelHeader;
