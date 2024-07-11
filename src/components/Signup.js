// Signup.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Adjust the path as per your project structure
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handleSignInSubmit();
        }
      });
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      console.log('SMS sent');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const handleSignInSubmit = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      console.log('User signed in:', user);
      // Handle successful sign-in, e.g., redirect or state update
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in errors
    }
  };

  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      console.log("hi");
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
       console.log("no hi");
    });

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <div id="recaptcha-container"></div> {/* Ensure this div exists */}
      <button onClick={handleSendCode}>Send Verification Code</button>

      {/* Verification Code input */}
      <input type="text" placeholder="Verification Code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      <button onClick={handleSignInSubmit}>Verify Code</button>
    </div>
  );
};

export default Signup;
