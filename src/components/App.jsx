import { useState, useEffect } from 'react';
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

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [inputToFind, setInputToFind] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalLargeImage, setModalLargeImage] = useState('');
  const [modalLargeAlt, setModalLargeAlt] = useState('');

  useEffect(() => {
    if (inputToFind === '') {
      return;
    }
    setStatus('pending');

    const finderImages = async () => {
      try {
        const data = await fetchImages(inputToFind, page);

        if (data.length === 0) {
          toast.error('Sorry, there are no images matching your search query. Please try again.');
          setStatus('rejected');
          return;
        }

        const images = createsArrayOfImageProperties(data);

        setImages(prevState => [...prevState, ...images]);
        setStatus('resolved');
        setError(null);

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        console.log(error.message);
        console.log('fail');
        setStatus('rejected');
      }
    };

    finderImages();
  }, [inputToFind, page]);

  const createsArrayOfImageProperties = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  const handleSubmit = inputToFind => {
    setInputToFind(inputToFind);
    setPage(1);
    setImages([]);
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOpenModal = (largeImageURL, tags) => {
    toggleModal();

    setModalLargeImage(largeImageURL);
    setModalLargeAlt(tags);
  };

  return (
    <>
      <GlobalStyle />
      <AppStyled>
        <SearchBar onSubmit={handleSubmit} />
        {status === 'pending' ? <Loader /> : null}
        {status === 'rejected' ? (
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
          />
        ) : null}
        {images.length > 0 && (
          <>
            <ImageGallery data={images} onClick={handleOpenModal} />
            <Button onClick={handleButtonClick} />
          </>
        )}
      </AppStyled>
      {showModal && <Modal src={modalLargeImage} alt={modalLargeAlt} onClose={toggleModal} />}
    </>
  );
};

export default App;
