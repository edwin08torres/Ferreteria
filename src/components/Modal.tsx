import React from 'react';
import styles from '../styles/Modal.module.css'; // Estilos para el modal

interface ModalProps {
  children: React.ReactNode; // Se asegura que cualquier contenido dentro del modal sea pasado como children
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        {children} {/* Aquí se renderiza el contenido pasado */}
      </div>
    </div>
  );
};

export default Modal;
