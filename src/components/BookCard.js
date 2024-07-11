import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BookCard = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={book.image}
        alt={book.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {book.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Rating: {book.rating}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
