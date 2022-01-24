import React, { Component } from 'react';
import GlobalStyle from '../constants/GlobalStyle';
import SearchBar from './SearchBar/SearchBar';

class App extends Component {
  state = {
    cat: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=24332293-f673b61ccd63539823a678f1a&image_type=photo&orientation=horizontal&per_page=12',
    )
      .then(res => res.json())
      .then(cat => this.setState({ cat }))
      .finally(() => this.setState({ isLoading: false }));
  }
  render() {
    return (
      <>
        <GlobalStyle />
        <SearchBar />
        {this.state.isLoading && <h1>Загружаем</h1>}
        {this.state.cat && <div>AfterFetch</div>}
      </>
    );
  }
}

export default App;
