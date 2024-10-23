import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { obtenerMantenimientos } from '../../pages/Api/mantenimiento'; // API para obtener las ventas
import { Mantenimiento } from '../../models/Mantenimiento';



const MantenimientoSubModule = () => {
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);

  useEffect(() => {
    const fetchMantenimientos = async () => {
      const mantenimientos = await obtenerMantenimientos();
      setMantenimientos(mantenimientos);
    };

    fetchMantenimientos();
  }, []);

  // Definimos las columnas para la tabla
  const columns = [
    { header: 'Cedula | RUC', accessor: 'cedulaRuc' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Telefono', accessor: 'telefono' },
    { header: 'Correo', accessor: 'correo' },
    { header: 'Fecha', accessor: 'fecha' }
  ];

  // Retornamos solo los datos y las columnas hacia el componente Table
  return <Table columns={columns} data={mantenimientos} />;
};

export default MantenimientoSubModule;