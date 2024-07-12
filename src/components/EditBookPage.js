import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const EditBookPage = ({ bookConditions, bookGenres }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [title, setTitle] = useState(book?.title || '');
  const [authors, setAuthors] = useState(book?.authors?.join(', ') || '');
  const [condition, setCondition] = useState(book?.condition || '');
  const [genre, setGenre] = useState(book?.genre || '');
  const [status, setStatus] = useState(book?.status || '');
  const [MRP, setMRP] = useState(book?.MRP || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    if (!book) {
      navigate('/admin');
    }
  }, [book, navigate]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateError('');
    try {
      const bookRef = doc(db, 'books', book.bookID);
      await updateDoc(bookRef, {
        title,
        authors: authors.split(',').map(author => author.trim()),
        condition,
        genre,
        status,
        MRP,
      });
      navigate('/admin');
    } catch (error) {
      console.error('Error updating book:', error);
      setUpdateError('Failed to update book. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!book) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Book Details</Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Book Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Author"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            fullWidth
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
          <TextField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="MRP"
            value={MRP}
            onChange={(e) => setMRP(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={isUpdating}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isUpdating ? <CircularProgress size={24} /> : 'Update Book'}
          </Button>
          {updateError && <Typography color="error">{updateError}</Typography>}
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditBookPage;
