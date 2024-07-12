import React, { useState, useEffect, useCallback } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookCard from './BookCard';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const itemsPerPage = 10;

  const fetchBooks = useCallback(async () => {
    try {
      let q;
      if (lastVisible) {
        q = query(
          collection(db, 'books'),
          where('status', '==', 'AVAILABLE'),
          orderBy('title'),
          startAfter(lastVisible),
          limit(itemsPerPage)
        );
      } else {
        q = query(
          collection(db, 'books'),
          where('status', '==', 'AVAILABLE'),
          orderBy('title'),
          limit(itemsPerPage)
        );
      }

      const querySnapshot = await getDocs(q);
      const newBooks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (querySnapshot.docs.length < itemsPerPage) {
        setHasMore(false);
      }

      // Merge newBooks with existing books, filtering out duplicates
      setBooks((prevBooks) => {
        const allBooks = [...prevBooks, ...newBooks];
        const uniqueBooks = Array.from(new Set(allBooks.map(book => book.id)))
          .map(id => allBooks.find(book => book.id === id));
        return uniqueBooks;
      });

      if (!querySnapshot.empty) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error('Error fetching books: ', error);
    }
  }, [lastVisible]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchBooks}
      hasMore={hasMore}
      loader={<CircularProgress />}
      endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
    >
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default BookList;
