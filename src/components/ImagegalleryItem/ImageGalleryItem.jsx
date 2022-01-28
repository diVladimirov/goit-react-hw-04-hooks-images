import React from 'react';
import { ImageGalleryItemStyle, ImageGalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ data }) => {
  return data.map(({ id, webformatURL, tags, largeImageURL }) => (
    <ImageGalleryItemStyle key={id}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} path={largeImageURL} />
    </ImageGalleryItemStyle>
  ));
};

export default ImageGalleryItem;
