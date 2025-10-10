'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,
  Divider,
  Slide,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CreateNewData } from '@/utils/ApiFunctions';
import { ErrorToast } from '@/utils/GenerateToast';
import Link from 'next/link';

const DeleteAccount = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    reason: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await CreateNewData({
        endPoint: 'delete-account-requests',
        payload: { data: formData },
      });
      if (res?.data) setSuccess(true);
    } catch (err) {
      console.log(err);
      ErrorToast('Failed to submit request. Please try again.');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        py: 6,
        background:
          'linear-gradient(180deg, rgba(255,255,255,1) 0%, #fff5f5 100%)',
      }}
    >
      <Paper
        elevation={4}
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          width: '100%',
          background: 'linear-gradient(145deg, #fff, #ffe6e6)',
          boxShadow: '0 8px 25px rgba(255,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* FORM SECTION */}
        {!success && (
          <Box>
            <Box textAlign="center" mb={3}>
              <DeleteOutlineIcon
                sx={{
                  fontSize: 60,
                  color: '#e53935',
                  mb: 1,
                }}
              />
              <Typography
                variant="h5"
                fontWeight="700"
                color="#d32f2f"
                gutterBottom
              >
                Delete Your Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We’re sorry to see you go. Please fill out the form below to
                request account deletion.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="mobile"
                label="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="reason"
                label="Reason for Deletion"
                value={formData.reason}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="description"
                label="Additional Comments"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: '#ffebee',
                  border: '1px solid #ffcdd2',
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="#c62828"
                  fontWeight="600"
                  gutterBottom
                >
                  ⚠️ Deletion Terms & Conditions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Your account deletion request will be processed within{' '}
                  <strong>15 days</strong> of submission. <br />• Once deleted,
                  all your data, bookings, and records will be{' '}
                  <strong>permanently removed</strong> and cannot be recovered.{' '}
                  <br />• If you have any queries, please contact our support
                  team at <strong>support@bookmipg.com</strong>.
                </Typography>
              </Box>

              <Button
                onClick={handleSubmit}
                variant="contained"
                type="submit"
                size="large"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: 'linear-gradient(90deg, #e53935, #b71c1c)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #d32f2f, #880e4f)',
                    transform: 'scale(1.02)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Submit Deletion Request
              </Button>

              <Grid container justifyContent="center" mt={2}>
                <Grid item>
                  <Button
                    startIcon={<ContactSupportIcon />}
                    href="/contact"
                    sx={{
                      color: '#e53935',
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Need Help? Contact Us
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {/* SUCCESS BOTTOM SHEET */}
        <Slide direction="up" in={success} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              height: { xs: '50%', sm: 'auto' },
              bgcolor: '#ffffff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              boxShadow: '0 -6px 20px rgba(0,0,0,0.15)',
              p: 4,
              textAlign: 'center',
              zIndex: 1300,
            }}
            component={motion.div}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 80 }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 70, color: '#2e7d32', mb: 2 }}
            />
            <Typography
              variant="h5"
              fontWeight="700"
              color="#2e7d32"
              gutterBottom
            >
              Request Submitted Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Your account deletion request has been received and will be
              processed within 15 days. You’ll be notified once the process is
              complete.
            </Typography>

            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                py: 1.3,
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                background: 'linear-gradient(90deg, #43a047, #2e7d32)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #388e3c, #1b5e20)',
                  transform: 'scale(1.03)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Slide>
      </Paper>
    </Container>
  );
};

export default DeleteAccount;
