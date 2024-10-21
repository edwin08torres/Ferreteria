import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LoginPage.module.css'; // Importamos el CSS module para login
import { loginUser } from './Api/users'; // Importamos la función loginUser

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Llamamos a la función loginUser de Api/userlogin.ts
    const user = await loginUser(username, password);

    if (user) {
      // Si el login es exitoso, simulamos la generación de un token y guardamos el nombre
      const token = 'fake-jwt-token'; // Simulamos un token de JWT
      document.cookie = `token=${token}; path=/`;

      // Guardamos el nombre del usuario en localStorage
      localStorage.setItem('username', user.username);

      // Redireccionamos a la página principal
      router.push('/mainpage');
    } else {
      // Si no se encuentra el usuario, mostramos un mensaje de error
      setError('Usuario o contraseña incorrectos');
    }
  };
  
  return (
    <div className={styles.loginContainer}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.loginButton}>Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
