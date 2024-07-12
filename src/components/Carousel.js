import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import book3 from '../assets/book3.webp';
import './Caraousel.css';


const items = [
  {
    name: 'Random Book 1',
    description: 'Description of book 1',
    image: book3,
  },
  {
    name: 'Random Book 2',
    description: 'Description of book 2',
    image: book3,
  },
];

const MyCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel indicators={false}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

function Item(props) {
  return (
    <Paper className="carousel-item">
      <img 
        src={props.item.image} 
        alt={props.item.name} 
        className="carousel-image"
      />
    </Paper>
  );
}

export default MyCarousel;
