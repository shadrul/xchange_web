import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    // Simulate a fetch request
    const newBooks = Array.from({ length: itemsPerPage }, (_, index) => ({
      name: `Book ${books.length + index + 1}`,
      image: 'https://via.placeholder.com/150',
      rating: (Math.random() * 5).toFixed(1),
    }));
    setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    if (books.length >= 50) {
      setHasMore(false); // Simulate an end of data scenario
    }
  };

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchBooks}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
    >
      <Grid container spacing={2} justifyContent="center">
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default BookList;
