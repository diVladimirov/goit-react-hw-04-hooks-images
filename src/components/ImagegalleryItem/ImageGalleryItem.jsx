import React from 'react';
import { ImageGalleryItemStyle, ImageGalleryItemImage } from './ImageGalleryItem.styled';
import propTypes from 'prop-types';

const ImageGalleryItem = ({ data, onClick }) => {
  return data.map(({ id, webformatURL, tags, largeImageURL }) => (
    <ImageGalleryItemStyle key={id}>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL, tags)}
      />
    </ImageGalleryItemStyle>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
      largeImageURL: propTypes.string.isRequired,
    }),
  ),
};
