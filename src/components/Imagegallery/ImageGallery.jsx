import React from 'react';
import ImageGalleryItem from '../ImagegalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';
import propTypes from 'prop-types';

const ImageGallery = ({ data, onClick }) => {
  return (
    <ImageGalleryStyle>
      <ImageGalleryItem data={data} onClick={onClick} />
    </ImageGalleryStyle>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
  onClick: propTypes.func,
};
