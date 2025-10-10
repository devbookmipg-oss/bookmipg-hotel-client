'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Grid,
  CircularProgress,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import { GetSingleData } from '@/utils/ApiFunctions';
import { UpdateUserForm } from '@/components/forms';
import { parseCookies } from 'nookies';
import { Preloader } from '@/components/common';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { auth } = useAuth();
  const userId = auth?.user?.id;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { user } = parseCookies();
    if (!user) {
      router.push(`/signin`);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Fetch user & KYC data
  const data = GetSingleData({
    endPoint: 'online-users',
    id: userId,
  });

  return (
    <Box sx={{ minHeight: '50vh', bgcolor: '#fafafa', pb: 6, mb: 5 }}>
      {!data || isLoading ? (
        <Preloader />
      ) : (
        <>
          {/* 🌈 Header with Avatar */}
          <Box
            sx={{
              bgcolor: 'linear-gradient(135deg, #4f46e5, #9333ea)',
              background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
              color: 'white',
              textAlign: 'center',
              py: 5,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            }}
          >
            <Avatar
              src="/user-avatar.png"
              sx={{
                width: 70,
                height: 70,
                margin: '0 auto',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                border: '3px solid white',
              }}
            />
            <Typography variant="h6" fontWeight={700} mt={1}>
              {data?.name}
            </Typography>
          </Box>

          {/* ⚙️ Profile Card */}
          <Container maxWidth="xs" sx={{ mt: -5 }}>
            <UpdateUserForm data={data} userId={userId} />

            {/* 📜 Links Section */}
            <Grid container spacing={1.5} mt={4}>
              {[
                { label: 'About Us', href: '/about-us' },
                { label: 'Terms & Conditions', href: '/terms-and-condition' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Cancellation Policy', href: '/cancellation-refund' },
                { label: 'Delete Account', href: '/delete-account' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link, i) => (
                <Grid key={i} size={{ xs: 6, md: 12 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    // startIcon={<Assignment />}
                    onClick={() => router.push(link.href)}
                    sx={{
                      borderRadius: 3,
                      borderColor: '#FF6B6B',
                      color: '#FF6B6B',
                      fontWeight: 600,
                      py: 1,
                      textTransform: 'none',
                    }}
                  >
                    {link.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
}
