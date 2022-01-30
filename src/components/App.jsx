import React, { Component } from 'react';
import GlobalStyle from '../constants/GlobalStyle';
import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from '../services/pixabayApi';
import ImageGallery from './Imagegallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { AppStyled } from './App.styled';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    error: null,
    inputToFind: '',
    page: 1,
    status: 'idle',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevInputToFind = prevState.inputToFind;
    const nextInputToFind = this.state.inputToFind;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevInputToFind !== nextInputToFind || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      setTimeout(() => {
        this.finderImages();
      }, 200);
    }

    if (nextPage > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  finderImages = async () => {
    const { inputToFind, page } = this.state;

    try {
      const data = await fetchImages(inputToFind, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...data],
        status: 'resolved',
        error: null,
      }));
    } catch (error) {
      console.log(error.message);
      this.setState({ status: 'rejected' });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const inputValue = event.target.elements.inputToFind.value.toLowerCase().trim();
    // console.log(inputValue);
    if (inputValue) {
      this.setState({ inputToFind: inputValue, page: 1, images: [] });
      form.reset();
    }
  };

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpenModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ modalLargeImage: largeImageURL, modalLargeAlt: tags });
  };

  render() {
    const { images, status, showModal, modalLargeImage, modalLargeAlt } = this.state;

    if (status === 'idle') {
      return (
        <>
          <GlobalStyle />
          <AppStyled>
            <SearchBar onSubmit={this.handleSubmit} />
          </AppStyled>
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <GlobalStyle />
          <AppStyled>
            <SearchBar onSubmit={this.handleSubmit} />
            <Loader />
          </AppStyled>
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <GlobalStyle />
          <AppStyled>
            <SearchBar onSubmit={this.handleSubmit} />
            <p>Fail</p>
          </AppStyled>
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <GlobalStyle />
          <AppStyled>
            <SearchBar onSubmit={this.handleSubmit} />
            <ImageGallery data={images} onClick={this.handleOpenModal} />
            <Button onClick={this.handleButtonClick} />
          </AppStyled>
          {showModal && (
            <Modal src={modalLargeImage} alt={modalLargeAlt} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}

export default App;
