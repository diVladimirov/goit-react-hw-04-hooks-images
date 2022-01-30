import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { OverlayStyled, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  render() {
    return createPortal(
      <OverlayStyled>
        <ModalStyled>
          <img src="" alt="" />
        </ModalStyled>
      </OverlayStyled>,
      modalRoot,
    );
  }
}

export default Modal;
