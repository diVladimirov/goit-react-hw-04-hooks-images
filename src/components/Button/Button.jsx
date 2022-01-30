import React from 'react';
import { ButtonStyled } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load more
    </ButtonStyled>
  );
};

export default Button;
