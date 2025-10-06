'use client';
import { useState } from 'react';
import Slider from 'react-slick';
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

export default function FeaturedPropertiesCarousel() {
  const [favorites, setFavorites] = useState(new Set());

  const featuredProperties = [
    {
      id: 1,
      name: 'Luxury Beach Resort & Spa',
      location: 'Bali, Indonesia',
      price: 289,
      originalPrice: 359,
      rating: 4.8,
      reviewCount: 1247,
      image: '/hotel/1.jpg',
      discount: '20% OFF',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Breakfast'],
    },
    {
      id: 2,
      name: 'Metropolitan Sky Hotel',
      location: 'New York, USA',
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviewCount: 892,
      image: '/hotel/2.jpg',
      discount: '15% OFF',
      amenities: ['Gym', 'Restaurant', 'Bar', 'City View'],
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      location: 'Swiss Alps',
      price: 175,
      originalPrice: 220,
      rating: 4.9,
      reviewCount: 567,
      image: '/hotel/3.jpg',
      discount: '25% OFF',
      amenities: ['Fireplace', 'Hiking', 'Skiing', 'Hot Tub'],
    },
    {
      id: 4,
      name: 'Desert Oasis Resort',
      location: 'Dubai, UAE',
      price: 420,
      originalPrice: 525,
      rating: 4.7,
      reviewCount: 734,
      image: '/hotel/4.jpg',
      discount: '18% OFF',
      amenities: ['Private Pool', 'Butler', 'Beach', 'Luxury Spa'],
    },
  ];

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) newFavorites.delete(propertyId);
      else newFavorites.add(propertyId);
      return newFavorites;
    });
  };

  // ✅ Updated responsive settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200, // large tablets
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900, // tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600, // mobile
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 400, // very small mobile
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        mb: 10,
        mt: 5,
      }}
    >
      <Slider {...settings}>
        {featuredProperties.map((property) => (
          <Box
            key={property.id}
            sx={{
              pr: { xs: 1, sm: 2 }, // ✅ right margin between cards
              boxSizing: 'border-box',
            }}
          >
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
                  background: `url(${property.image}) center/cover`,
                  position: 'relative',
                }}
              >
                <Chip
                  label={property.discount}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    bgcolor: 'error.main',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
                <IconButton
                  onClick={() => toggleFavorite(property.id)}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'white' },
                  }}
                  size="small"
                >
                  {favorites.has(property.id) ? (
                    <Favorite color="error" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>

              {/* Details */}
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                  {property.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn
                    sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }}
                  />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {property.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={property.rating} readOnly size="small" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {property.rating} ({property.reviewCount})
                  </Typography>
                </Box>

                <Box
                  sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}
                >
                  {property.amenities.slice(0, 3).map((amenity, idx) => (
                    <Chip
                      key={idx}
                      label={amenity}
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
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      ${property.price}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through', ml: 1 }}
                      >
                        ${property.originalPrice}
                      </Typography>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      per night
                    </Typography>
                  </Box>
                  <Button
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
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
