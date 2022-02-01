import React from 'react';
import { ButtonStyled } from './Button.styled';
import propTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load more
    </ButtonStyled>
  );
};

export default Button;

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};
