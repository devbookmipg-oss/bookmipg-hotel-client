import {
  TextField,
  Typography,
  Button,
  Card,
  Stack,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Edit,
  CalendarMonth,
  MailOutline,
  Phone,
  Wc,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { UpdateData } from '@/utils/ApiFunctions';
import { ErrorToast, SuccessToast } from '@/utils/GenerateToast';

const UpdateUserForm = ({ data, userId }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: data?.name || '',
    email: data.email || '',
    phone: data.phone || '',
    gender: data?.gender || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await UpdateData({
        endPoint: 'online-users',
        payload: {
          data: {
            name: profile?.name,
            email: profile.email || '',
            phone: profile.phone,
            gender: profile.gender || '',
          },
        },
        id: userId,
      });
      console.log(res);
      setLoading(false);
      SuccessToast('Profile updated successfully.');
      return;
    } catch (err) {
      console.log(`Error updaing profile: ${err}`);
      setLoading(false);
      ErrorToast('Someting went wrong.');
      return;
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            borderRadius: 4,
            p: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            background: 'white',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="text.primary"
            mb={2}
          >
            Edit Profile
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <Edit sx={{ mr: 1, color: '#FF6B6B' }} />,
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <MailOutline sx={{ mr: 1, color: '#FF6B6B' }} />
                ),
              }}
            />
            <TextField
              label="Mobile Number"
              name="phone"
              value={profile.phone}
              fullWidth
              disabled
              InputProps={{
                startAdornment: <Phone sx={{ mr: 1, color: '#FF6B6B' }} />,
              }}
            />
            {/* ✅ Gender Selector */}
            <TextField
              select
              label="Gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: <Wc sx={{ mr: 1, color: '#FF6B6B' }} />,
              }}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdate}
              disabled={loading}
              sx={{
                py: 1.4,
                mt: 1,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: '1rem',
                background: 'red',
                '&:hover': {
                  background: 'red',
                },
              }}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </Stack>
        </Card>
      </motion.div>
    </>
  );
};

export default UpdateUserForm;
