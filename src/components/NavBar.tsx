import React from 'react';
import styles from '../styles/NavBar.module.css'; // Estilos para el navbar

// Definimos la interfaz de las propiedades (props)
interface NavBarProps {
  username: string;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ username, onLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Ferretería Largaespada</div>
      <div className={styles.username}>Bienvenido, {username}</div>
      <button onClick={onLogout} className={styles.logoutButton}>Cerrar Sesión</button>
    </nav>
  );
};

export default NavBar;
