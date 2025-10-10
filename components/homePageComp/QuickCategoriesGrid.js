'use client';
import {
  Grid,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import Link from 'next/link';

export default function QuickCategoriesGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const categories = [
    {
      url: '/hotels',
      id: 1,
      name: 'Hotels',
      icon: '🏨',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      count: '2.4M+',
    },
    {
      url: '/hotels',
      id: 2,
      name: 'Villas',
      icon: '🏡',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      count: '450K+',
    },
    {
      url: '/hotels',
      id: 3,
      name: 'Resorts',
      icon: '🌴',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      count: '180K+',
    },
    {
      url: 'https://bookmipg.com/',
      id: 4,
      name: 'Apartments',
      icon: '🏢',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      count: '1.2M+',
    },
    {
      url: '/hotels',
      id: 5,
      name: 'Beach',
      icon: '🏖️',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      count: '890K+',
    },
    {
      url: '/hotels',
      id: 6,
      name: 'Luxury',
      icon: '⭐',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      count: '350K+',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid size={{ xs: 4, sm: 4, md: 2 }} key={category.id}>
            <Link href={category.url} style={{ textDecoration: 'none' }}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: category.color,
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'rgba(255,255,255,0.3)',
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}
                >
                  {category.icon}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    fontSize: '1.1rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  {category.name}
                </Typography>
                <Typography
                  sx={{
                    opacity: 0.9,
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  {category.count}
                </Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
