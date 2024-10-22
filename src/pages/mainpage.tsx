import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MainPage.module.css'; // Archivo CSS para el estilo
import NavBar from '../components/NavBar'; // Componente de navegación
import Button from '../components/Button'; // Componente reutilizable para los botones de acción
import MantenimientoSubModule from '../components/SubModules/MantenimientoSubModule';
import ProductoSubModule from '../components/SubModules/ProductoSubModule';
import VentaSubModule from '../components/SubModules/VentaSubmodule';
import CompraSubModule from '../components/SubModules/CompraSubmodule';

// Definir tipo de módulo
type ModuleType = 'Mantenimiento' | 'Producto' | 'Compra' | 'Venta';

const MainPage = () => {
  const [username, setUsername] = useState('');
  const [activeModule, setActiveModule] = useState<ModuleType>('Mantenimiento'); // Submódulo activo
  const router = useRouter();

  // Lista de módulos/submódulos
  const modules: ModuleType[] = ['Mantenimiento', 'Producto', 'Compra', 'Venta'];

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('username');
    router.push('/login');
  };

  const renderModuleContent = (activeModule: ModuleType) => {
    switch (activeModule) {
      case 'Mantenimiento':
        return <MantenimientoSubModule />;
      case 'Producto':
        return <ProductoSubModule />;
      case 'Compra':
        return <CompraSubModule />;
      case 'Venta':
        return <VentaSubModule />;
      default:
        return <MantenimientoSubModule />;
    }
  };

  return (
    <div className={styles.container}>
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
        <h1 className={styles.titulomodulo}>{activeModule}</h1>
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

        {renderModuleContent(activeModule)}
      </div>
    </div>
  );
};

export default MainPage;