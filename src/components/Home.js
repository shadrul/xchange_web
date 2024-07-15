// src/components/Home.js
import React, { useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import Navbar from './Navbar';
import MyCarousel from './Carousel';
import BookList from './BookList';
import { styled } from '@mui/system';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '400px',
  backgroundImage: 'url(https://source.unsplash.com/random/1920x1080?books)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  textAlign: 'center',
  padding: theme.spacing(4),
  boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.4)',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const Home = () => {
  useEffect(() => {
    // Placeholder for future useEffect logic
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Xchange
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Discover, Exchange, and Enjoy Books from Our Community
        </Typography>
        <Button variant="contained" color="primary" size="large" style={{ marginTop: '20px' }}>
          Get Started
        </Button>
      </HeroSection>
      <StyledContainer>
        <Box mt={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Books
          </Typography>
          <MyCarousel />
        </Box>
        <Box mt={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Available Books
          </Typography>
          <BookList />
        </Box>
      </StyledContainer>
    </div>
  );
};

export default Home;
