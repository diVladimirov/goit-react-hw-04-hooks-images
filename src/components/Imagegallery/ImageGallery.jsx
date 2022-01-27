import React from 'react';
import ImageGalleryItem from '../ImagegalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

const ImageGallery = ({ data }) => {
  return (
    <ImageGalleryStyle className="gallery">
      <ImageGalleryItem data={data} />
    </ImageGalleryStyle>
  );
};

export default ImageGallery;
