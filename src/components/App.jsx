import React, { Component } from 'react';
import GlobalStyle from '../constants/GlobalStyle';
import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from '../services/pixabayApi';
import ImageGallery from './Imagegallery/ImageGallery';
import './App.css';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    inputToFind: '',
    page: 1,
    status: 'idle',
  };

  // async componentDidMount() {
  //   const data = await fetchImages();
  //   console.log(data);
  //   this.setState({ isLoading: true });

  //   try {
  //     const images = await fetchImages();
  //     this.setState({ images });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    const { inputToFind, page } = this.state;
    const prevInputToFind = prevState.inputToFind;
    const nextInputToFind = this.state.inputToFind;
    console.log(prevInputToFind);
    console.log(nextInputToFind);
    if (prevInputToFind !== nextInputToFind) {
      this.setState({ status: 'pending' });
    }

    fetchImages(inputToFind, page).then(response => {
      this.setState({ images: [...response], status: 'resolved' });
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log(event.target);
    // console.log(event.target.elements.inputToFind.value);
    const form = event.target;
    const inputValue = event.target.elements.inputToFind.value.toLowerCase().trim();
    // console.log(inputValue);
    if (inputValue) {
      this.setState({ inputToFind: inputValue, page: 1 });
      form.reset();
    }
  };

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return (
        <>
          <GlobalStyle />
          <SearchBar onSubmit={this.handleSubmit} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <GlobalStyle />
          <SearchBar onSubmit={this.handleSubmit} />
          <p>Loading</p>
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <GlobalStyle />
          <SearchBar onSubmit={this.handleSubmit} />
          <ImageGallery data={images} />
        </>
      );
    }
    // return (
    //   <>
    //     <GlobalStyle />
    //     <SearchBar onSubmit={this.handleSubmit} />
    //     {this.state.isLoading && <h1>Загружаем</h1>}
    //     {this.state.images.length > 0 && <div>AfterFetch</div>}
    //     <ImageGallery data={images} />
    //   </>
    // );
  }
}

export default App;

// componentDidMount() {
//   this.setState({ isLoading: true });
//   fetch(
//     'https://pixabay.com/api/?q=cat&page=1&key=24332293-f673b61ccd63539823a678f1a&image_type=photo&orientation=horizontal&per_page=12',
//   )
//     .then(res => res.json())
//     .then(cat => this.setState({ cat }))
//     .finally(() => this.setState({ isLoading: false }));
// }
