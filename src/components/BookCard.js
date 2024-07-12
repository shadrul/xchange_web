// src/components/BookCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const BookCard = ({ book }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={book.title}
        height="140"
        image={book.cover_page}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.authors.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          MRP: {book.MRP}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
