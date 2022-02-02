import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { OverlayStyled, ModalStyled } from './Modal.styled';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, src, alt }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <OverlayStyled onClick={handleBackDropClick}>
      <ModalStyled>
        <img src={src} alt={alt} />
      </ModalStyled>
    </OverlayStyled>,
    modalRoot,
  );
};

export default Modal;

Modal.propTypes = {
  alt: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
  src: propTypes.string.isRequired,
};
