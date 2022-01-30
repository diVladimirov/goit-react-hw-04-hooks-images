import React from 'react';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';
import propTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="inputToFind"
        />
      </SearchForm>
    </Header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: propTypes.func,
};
