import React, { Component } from 'react';
import { Header } from './SearchBar.styled';

class SearchBar extends Component {
  render() {
    return (
      <Header className="searchbar">
        <form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </Header>
    );
  }
}

export default SearchBar;
