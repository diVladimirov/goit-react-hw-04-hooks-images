import React, { Component } from 'react';
import GlobalStyle from '../constants/GlobalStyle';
import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from '../services/pixabayApi';
import ImageGallery from './Imagegallery/ImageGallery';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    // const data = await fetchImages();
    // console.log(data);
    this.setState({ isLoading: true });

    try {
      const images = await fetchImages();
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    // console.log(event.target);
    // console.log(event.target.elements.inputToFind.value);
    const form = event.target;
    form.reset();
  };

  render() {
    const { images } = this.state;
    console.log(images);
    return (
      <>
        <GlobalStyle />
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <h1>Загружаем</h1>}
        {this.state.images && <div>AfterFetch</div>}
        <ImageGallery data={images} />
      </>
    );
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
