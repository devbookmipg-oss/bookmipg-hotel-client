import { CreateNewData } from '@/utils/ApiFunctions';
import { SuccessToast } from '@/utils/GenerateToast';
import {
  Avatar,
  Box,
  Button,
  Card,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';

// Utility: custom time-ago function
const timeAgo = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

const CustomerReviews = ({ myReviews, auth, hotelId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Check if logged-in user already reviewed this hotel
  const hasUserReviewed = useMemo(() => {
    if (!auth?.user) return false;
    return myReviews.some(
      (rev) => rev?.online_user?.documentId === auth?.user?.id
    );
  }, [myReviews, auth]);

  const handleSubmit = async () => {
    if (!auth?.user) {
      ErrorToast('Please sign in to leave a review');
      return;
    }
    if (!rating || !comment.trim()) {
      ErrorToast('Please provide both rating and comment');
      return;
    }

    try {
      setLoading(true);
      await CreateNewData({
        endPoint: 'reviews',
        payload: {
          data: {
            star: rating,
            comment: comment,
            online_user: auth?.user?.id,
            hotel_id: hotelId,
          },
        },
      });
      setRating(0);
      setComment('');
      SuccessToast('Review submitted successfully!');
    } catch (err) {
      ErrorToast('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box>
        <Card
          sx={{
            mt: 5,
            p: 3,
            borderRadius: 3,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Customer Reviews
          </Typography>
          {!hasUserReviewed && (
            <Box
              sx={{
                mb: 4,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#f8fafc',
                border: '1px solid #e5e7eb',
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Write a Review
              </Typography>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="contained"
                color="error"
                disabled={loading}
                onClick={handleSubmit}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </Button>
            </Box>
          )}

          {/* Review List */}
          <Stack spacing={3}>
            {myReviews && myReviews.length > 0 ? (
              myReviews?.map((rev, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #eee',
                    pb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#667eea',
                      width: 40,
                      height: 40,
                      fontWeight: 600,
                    }}
                  >
                    {rev?.online_user?.name
                      ? rev.online_user.name.charAt(0).toUpperCase()
                      : 'U'}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{ color: '#111' }}
                      >
                        {rev?.online_user?.name || 'Anonymous'}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic' }}
                      >
                        {timeAgo(rev?.createdAt)}
                      </Typography>
                    </Box>
                    <Rating
                      value={rev?.stars || rev?.star || 0}
                      readOnly
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5, lineHeight: 1.6 }}
                    >
                      {rev?.comment}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                No reviews yet. Be the first to share your experience!
              </Typography>
            )}
          </Stack>
        </Card>
      </Box>
    </>
  );
};

export default CustomerReviews;
