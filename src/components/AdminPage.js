import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AdminBookCard from './AdminBookCard'; // Reuse the AdminBookCard component from previous code
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    navigate('/edit-book', { state: { book } });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Page - Manage Books</Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <AdminBookCard book={book} onEdit={() => handleEdit(book)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminPage;
