import React, { ReactNode } from 'react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string; // Prop opcional para personalizar el ancho
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children, width }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: width || '600px' }}>
        <button onClick={onClose} className="modal-close-button">X</button>
        <div className="modal-body .credit-payments-container">{children}</div>
      </div>
      <style jsx>{`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    max-height: 90vh;
    min-width: 300px;
    width: 100%;
    overflow: hidden;
    color: black; /* Color negro para todo el contenido del modal */
  }
  .modal-body {
    max-height: calc(90vh - 40px);
    overflow-y: auto;
    color: black; /* Asegurar color negro en el cuerpo del modal */
  }
  .modal-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 16px;
    color: black; /* Color negro para el botón de cierre */
    cursor: pointer;
  }

  /* Responsive para móviles */
  @media (max-width: 768px) {
    .modal-overlay {
      align-items: flex-start;
      padding: 0;
    }
    .modal-content {
      border-radius: 12px;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      transform: translateY(0);
      animation: none;
      color: black; /* Color negro también en móviles */
    }
    .modal-body {
      padding-bottom: 20px;
      color: black; /* Color negro para el contenido en móviles */
    }
  }
`}</style>

    </div>
  );
};

export default CustomModal;
