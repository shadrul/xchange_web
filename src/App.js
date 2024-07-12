// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import Home from './components/Home';
import ISBNPage from './components/ISBNPage';
import BookUpload from './components/BookUpload';
import AdminPage from './components/AdminPage';
import EditBookPage from './components/EditBookPage';

const apiKey = 'AIzaSyAFPRQbBaSihhOEuPNe20_1-G8PLwQNSww';

const conditionOptions = ['New', 'Good', 'Fair'];
const ageOfBookOptions = ['1', '2', '3', '4'];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/isbn" element={<ISBNPage apiKey={apiKey} />} />
        <Route path="/book-upload" element={<BookUpload apiKey={apiKey} bookConditions={conditionOptions} bookGenres={ageOfBookOptions} />}/>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/edit-book" element={<EditBookPage bookConditions={conditionOptions} bookGenres={ageOfBookOptions} />} />
      </Routes>
    </Router>
  );
}

export default App;
