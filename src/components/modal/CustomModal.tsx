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
      <div className="modal-content" style={{ maxWidth: width || '600px' }}> {/* Usa el ancho personalizado o el predeterminado */}
        <button onClick={onClose} className="modal-close-button">X</button>
        <div className="modal-body">{children}</div>
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
          padding: 20px; /* Para evitar que el contenido toque los bordes */
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          position: relative;
          max-height: 90vh; /* Limita la altura máxima del modal */
          min-width: 300px;
          width: 100%;
          overflow: hidden; /* Evita desbordamiento horizontal */
        }
        .modal-body {
          max-height: calc(90vh - 40px); /* Ajusta según el padding */
          overflow-y: auto; /* Habilita el desplazamiento vertical */
        }
        .modal-close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CustomModal;