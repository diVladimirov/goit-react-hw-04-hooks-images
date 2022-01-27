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
    <Header className="searchbar">
      <SearchForm className="form" onSubmit={onSubmit}>
        <SearchFormButton type="submit" className="button">
          <SearchFormButtonLabel className="button-label">Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          className="input"
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
