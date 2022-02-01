import React, { Component } from 'react';
import GlobalStyle from '../constants/GlobalStyle';
import SearchBar from './SearchBar/SearchBar';
import { fetchImages } from '../services/pixabayApi';
import ImageGallery from './Imagegallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { AppStyled } from './App.styled';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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

      if (data.length === 0) {
        toast.error('Sorry, there are no images matching your search query. Please try again.');
        this.setState({ status: 'rejected' });
        return;
      }

      const images = this.createsArrayOfImageProperties(data);

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        status: 'resolved',
        error: null,
      }));
    } catch (error) {
      console.log(error.message);
      console.log('fail');
      this.setState({ status: 'rejected' });
    }
  };

  createsArrayOfImageProperties = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const inputValue = event.target.elements.inputToFind.value.toLowerCase().trim();
  //   // console.log(inputValue);
  //   if (inputValue) {
  //     this.setState({ inputToFind: inputValue, page: 1, images: [] });
  //     form.reset();
  //   }
  // };

  handleSubmit = inputToFind => {
    return this.setState({ inputToFind, page: 1, images: [] });
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
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
            />
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
