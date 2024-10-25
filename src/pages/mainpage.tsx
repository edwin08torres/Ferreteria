import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/MainPage.module.css';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import MantenimientoSubModule from '../components/SubModules/MantenimientoSubModule';
import ProductoSubModule from '../components/SubModules/ProductoSubModule';
import VentaSubModule from '../components/SubModules/VentaSubmodule';
import CompraSubModule from '../components/SubModules/CompraSubmodule';
import Modal from '../components/Modal';
import ChatbotModal from '@/components/ChatBotResponse';

type ModuleType = 'Mantenimiento' | 'Producto' | 'Compra' | 'Venta';

const MainPage = () => {
  const [username, setUsername] = useState('');
  const [activeModule, setActiveModule] = useState<ModuleType>('Mantenimiento');
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const modules: ModuleType[] = ['Mantenimiento', 'Producto', 'Compra', 'Venta'];

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('username');
    router.push('/login');
  };

  const handleNewRecord = () => {
    setModalOpen(true); // Abrir el modal para el nuevo registro
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
        {renderModuleContent(activeModule)}

        {isModalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            {/* Aquí puedes pasar el submódulo activo para saber qué formulario renderizar */}
            <h2>Nuevo {activeModule}</h2>
            {/* Formulario de creación va aquí dependiendo del submódulo */}
          </Modal>
          
        )}

        <ChatbotModal></ChatbotModal>
      </div>
    </div>
  );
};

export default MainPage;
