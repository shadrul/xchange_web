// src/components/Home.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container } from '@mui/material';
import Navbar from './Navbar';
import MyCarousel from './Carousel';
import BookList from './BookList';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = Cookies.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <div style={{ marginTop: '20px' }}>
          <MyCarousel />
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <BookList />
        </div>
        
      </Container>
    </div>
  );
};

export default Home;
