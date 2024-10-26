import React, { useState, useEffect  } from "react";
import { useRouter } from "next/router";
import styles from "../styles/LoginPage.module.css"; // Importamos el CSS module para login
import { loginUser } from "./api/users"; // Importamos la función loginUser

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser(username, password);

      if (user) {
        const token = "fake-jwt-token"; // Simulamos un token de JWT
        document.cookie = `token=${token}; path=/`;

        // Guardamos el nombre del usuario en localStorage
        localStorage.setItem("username", user.username);

        // Redireccionamos a la página principal
        router.push("/mainpage");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  // Temporizador para borrar el mensaje de error después de 4 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Limpiamos el mensaje de error
      }, 4000); // 4 segundos

      // Limpiamos el temporizador si el componente se desmonta antes de tiempo
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={styles.loginContainer}>
      <form className={styles.Forms} onSubmit={handleLogin}>
        <h1 className={styles.Title}>Iniciar Sesión</h1>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.formGroup}>
          <label className={styles.labelTitulo}>Usuario</label>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.labelTitulo}>Contraseña</label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.loginButton}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
