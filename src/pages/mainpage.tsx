import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MainPage.module.css'; // Archivo CSS para el estilo
import NavBar from '../components/NavBar'; // Componente de navegación
import Button from '../components/Button'; // Componente reutilizable para los botones de acción
import Table from '../components/Table'; // Componente reutilizable para la tabla de datos

const MainPage = () => {
  const [username, setUsername] = useState('');
  const [activeModule, setActiveModule] = useState('Mantenimiento'); // Submódulo activo
  const router = useRouter();

  // Lista de módulos/submódulos
  const modules = ['Mantenimiento', 'Producto', 'Compra', 'Venta'];

  useEffect(() => {
    // Obtenemos el nombre del usuario desde localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Si no hay usuario en localStorage, redirigimos al login
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    // Limpiamos las cookies y el localStorage al cerrar sesión
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('username');
    router.push('/login'); // Redirigimos al login
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'Mantenimiento':
        return <Table moduleName="Mantenimiento" />;
      case 'Producto':
        return <Table moduleName="Producto" />;
      case 'Compra':
        return <Table moduleName="Compra" />;
      case 'Venta':
        return <Table moduleName="Venta" />;
      default:
        return <Table moduleName="Mantenimiento" />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Agregamos el NavBar con el nombre de usuario y botón de logout */}
      <NavBar username={username} onLogout={handleLogout} />

      <div className={styles.moduleSelector}>
        {modules.map((module) => (
          <Button
            key={module}
            label={module}
            isActive={activeModule === module}
            onClick={() => setActiveModule(module)}
          />
        ))}
      </div>

      <div className={styles.content}>
        <h1>{activeModule} - Clientes registrados</h1>
        <input 
          type="text" 
          placeholder={`Buscar en ${activeModule}`} 
          className={styles.searchInput} 
        />
        <div className={styles.actions}>
          <Button 
            label="Nuevo" 
            onClick={() => console.log(`Crear nuevo registro en ${activeModule}`)} 
          />
          <Button 
            label="Editar" 
            onClick={() => console.log(`Editar registro en ${activeModule}`)} 
          />
        </div>

        {renderModuleContent()} {/* Aquí se renderiza dinámicamente la tabla de datos del submódulo */}
      </div>
    </div>
  );
};

export default MainPage;
