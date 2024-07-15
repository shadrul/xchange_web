// src/components/BookCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f5f5f5',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const MediaWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 'auto',
  height: '100%',
}));

const BookInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const MRPAndRatingWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

const BookCard = ({ book }) => {
  return (
    <StyledCard>
      <MediaWrapper>
        <StyledCardMedia
          component="img"
          alt={book.title}
          image={book.cover_page}
        />
      </MediaWrapper>
      <CardContent>
        <BookInfo>
          <Typography gutterBottom variant="h6" component="div" color="darkbrown">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {book.authors.join(', ')}
          </Typography>
          <MRPAndRatingWrapper>
            <Typography variant="body2" color="text.secondary">
              MRP: ₹{book.MRP}
            </Typography>
            <Box display="flex" alignItems="center">
              <StarIcon fontSize="inherit" style={{ color: 'gold' }} />
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                {book.rating}
              </Typography>
            </Box>
          </MRPAndRatingWrapper>
        </BookInfo>
      </CardContent>
    </StyledCard>
  );
};

export default BookCard;
