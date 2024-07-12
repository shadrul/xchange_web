import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import Cookies from 'js-cookie';

const firebaseConfig = {
  apiKey: "AIzaSyBoZo9XwLKS4wqxezoxrMjxCxVsFfbk9ZE",
  authDomain: "xchange-32adc.firebaseapp.com",
  databaseURL: "https://xchange-32adc-default-rtdb.firebaseio.com",
  projectId: "xchange-32adc",
  storageBucket: "xchange-32adc.appspot.com",
  messagingSenderId: "888679744943",
  appId: "1:888679744943:web:68dbd7b986a68b98615b5a",
  measurementId: "G-E2QWYYQED9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, set cookies or local storage here
    Cookies.set('user', JSON.stringify(user));
  } else {
    // User is signed out, clear cookies or local storage
    Cookies.remove('user');
  }
});

export { auth, db };