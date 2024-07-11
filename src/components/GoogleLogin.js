// src/components/GoogleLogin.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';

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
      Cookies.set('user', JSON.stringify({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      }), { expires: 7 });

      Cookies.set('token', token, { expires: 7 });

      console.log('User signed in with Google:', user);

      // Redirect to home page
      navigate('/home');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <h2>Google Login</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default GoogleLogin;
