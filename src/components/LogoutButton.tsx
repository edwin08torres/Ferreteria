import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from '../styles/LogoutButton.module.css';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Elimina el token de las cookies
    Cookies.remove('token');

    // Redirige al login después de cerrar sesión
    router.push('/login');
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
