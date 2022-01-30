import React from 'react';
import { Rings } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderStyled>
      <Rings color="#3f51b5" height={300} width={300} />
    </LoaderStyled>
  );
};

export default Loader;
