// src/components/GoogleLogin.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';
import { Container, Box, Typography, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      navigate('/home');
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      // Save user data and token in cookies
      Cookies.set(
        'user',
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        }),
        { expires: 7 }
      );

      Cookies.set('token', token, { expires: 7 });

      console.log('User signed in with Google:', user);

      // Redirect to home page
      navigate('/home');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          p: 4,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          textAlign: 'center',
          boxShadow: 3,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Xchange
        </Typography>
        <Typography variant="h6" gutterBottom>
          Sign in with Google to continue
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            bgcolor: '#DB4437',
            '&:hover': {
              bgcolor: '#C33D2E',
            },
            mt: 3,
          }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default GoogleLogin;
