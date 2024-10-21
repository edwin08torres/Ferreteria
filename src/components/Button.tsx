import React from 'react';
import styles from '../styles/Button.module.css'; // Estilos para los botones

// Definimos la interfaz de las propiedades (props)
interface ButtonProps {
  label: string;
  isActive?: boolean; // Puede ser opcional
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, isActive = false, onClick }) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
