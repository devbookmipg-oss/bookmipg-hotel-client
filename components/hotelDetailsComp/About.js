import { Paper, Typography, Button } from '@mui/material';
import React, { useState } from 'react';

const About = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const aboutText = data?.about || '';
  const isLongText = aboutText.length > 220;

  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom fontWeight="600">
        About This Hotel
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        sx={{
          lineHeight: 1.6,
          ...(isLongText && !expanded
            ? {
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
            : {}),
        }}
      >
        {aboutText}
      </Typography>
      {isLongText && (
        <Button
          onClick={() => setExpanded((prev) => !prev)}
          sx={{ mt: 1, px: 0, textTransform: 'none' }}
          size="small"
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </Paper>
  );
};

export default About;
