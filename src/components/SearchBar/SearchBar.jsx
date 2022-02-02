import { useState } from 'react';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';
import propTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [inputToFind, setInputToFind] = useState('');

  const handleInputChange = event => {
    setInputToFind(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputToFind.toLowerCase().trim() === '') {
      return;
    }
    onSubmit(inputToFind);
    setInputToFind('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="inputToFind"
          onChange={handleInputChange}
          value={inputToFind}
        />
      </SearchForm>
    </Header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
