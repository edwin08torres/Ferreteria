import React from 'react';
import Table from '../../components/Table';

const MantenimientoSubModule = () => {
  const columns = [
    { header: 'Cédula/Ruc', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Correo', accessor: 'email' },
    { header: 'Fecha Ingreso', accessor: 'date' },
  ];

  const data = [
    { id: '001', name: 'Dionisio Torrez', phone: '8774901', email: 'hernandez@gmail.com', date: '13/07/2020' },
    // Más datos...
  ];

  return <Table columns={columns} data={data} />;
};

export default MantenimientoSubModule;
