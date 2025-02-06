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
        }
        .modal-body {
          max-height: calc(90vh - 40px);
          overflow-y: auto;
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
        
        /* Responsive para móviles */
        @media (max-width: 768px) {
          .modal-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .modal-content {
            border-radius: 12px 12px 0 0;
            width: 100%;
            max-width: 100%;
            max-height: 80vh;
            transform: translateY(100%);
            animation: slide-up 0.3s ease-out forwards;
          }
          @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        }
      `}</style>
    </div>
  );
};



export default CustomModal;