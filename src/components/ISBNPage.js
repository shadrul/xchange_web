import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled, keyframes } from '@mui/system';

const shakeAnimation = keyframes`
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
`;

const ShakeButton = styled(Button)(({ shake }) => ({
  animation: shake ? `${shakeAnimation} 0.82s cubic-bezier(.36,.07,.19,.97) both` : 'none',
  transform: 'translate3d(0, 0, 0)',
  backfaceVisibility: 'hidden',
  perspective: 1000,
}));

const Exchange = ({ apiKey }) => {
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleIsbnChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,13}$/.test(value)) {
      setIsbn(value);
      setError('');
    } else {
      setError('ISBN must be a number with up to 13 digits');
    }
  };

  const handleSubmit = async () => {
    if (isbn.length < 10) {
      setError('ISBN must be between 10 and 13 digits');
      setShake(true);
      setTimeout(() => setShake(false), 820);
      return;
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`);
      const bookData = response.data.items[0].volumeInfo;
      console.log(bookData);
      navigate('/book-upload', { state: { isbn, bookData } });
    } catch (error) {
      console.error('Error fetching book data:', error);
      setError('Failed to fetch book data. Please try again.');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Enter ISBN</Typography>
      <TextField
        label="ISBN Number"
        value={isbn}
        onChange={handleIsbnChange}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        <ShakeButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          shake={shake}
        >
          Submit
        </ShakeButton>
      </Box>
    </Container>
  );
};

export default Exchange;
