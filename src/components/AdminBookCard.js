import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const AdminBookCard = ({ book, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Authors: {book.authors.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Owner ID: {book.ownerID}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {book.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          MRP: {book.MRP}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onEdit}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminBookCard;
