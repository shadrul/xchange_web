// src/components/BookUpload.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const BookUpload = ({ bookConditions, bookGenres }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isbn, bookData } = location.state || {};

  const [condition, setCondition] = useState('');
  const [genre, setGenre] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (!isbn || !bookData) {
      navigate('/isbn');
    }
  }, [isbn, bookData, navigate]);

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadError('');
    try {
      const bookID = `book-${Date.now()}`;
      await setDoc(doc(db, 'books', bookID), {
        bookID,
        title: bookData.title || '',
        authors: bookData.authors || [],
        publicationYear: bookData.publishedDate ? parseInt(bookData.publishedDate.split('-')[0]) : null,
        condition,
        ownerID: auth.currentUser.uid, // Use current user's uid
        status: 'InReview',
        ISBN: isbn,
        MRP: bookData.saleInfo?.listPrice?.amount || '',
        rating: bookData.averageRating || '',
        cover_page: bookData.imageLinks?.thumbnail || '',
        synopsis: bookData.description || '',
        genre,
        pages: bookData.pageCount || '',
      });
      navigate('/');
    } catch (error) {
      console.error('Error uploading book:', error);
      setUploadError('Failed to upload book. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (!auth.currentUser) {
      // Store current state in localStorage to restore after login
      localStorage.setItem('uploadState', JSON.stringify({ condition, genre }));
      // Redirect to login page
      navigate('/login');
    } else {
      handleUpload();
    }
  };

  if (!isbn || !bookData) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Upload Book for Exchange</Typography>
      <img src={bookData.imageLinks?.thumbnail} alt={bookData.title} style={{ maxWidth: '100%', marginBottom: '20px' }} />
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="ISBN Number"
            value={isbn}
            fullWidth
            disabled
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Book Name"
            value={bookData.title || ''}
            fullWidth
            disabled
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Author"
            value={bookData.authors?.join(', ') || ''}
            fullWidth
            disabled
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Book Condition</InputLabel>
            <Select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              {bookConditions.map((cond) => (
                <MenuItem key={cond} value={cond}>{cond}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Genre</InputLabel>
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {bookGenres.map((gen) => (
                <MenuItem key={gen} value={gen}>{gen}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadClick}
            disabled={isUploading || !condition || !genre}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isUploading ? <CircularProgress size={24} /> : 'Upload for Exchange'}
          </Button>
          {uploadError && <Typography color="error">{uploadError}</Typography>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookUpload;
