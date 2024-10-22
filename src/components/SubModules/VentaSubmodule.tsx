import React from 'react';
import Table from '../../components/Table';

const VentaSubModule = () => {
  const columns = [
    { header: 'ID Venta', accessor: 'id' },
    { header: 'Cliente', accessor: 'client' },
    { header: 'Producto', accessor: 'product' },
    { header: 'Cantidad', accessor: 'quantity' },
    { header: 'Fecha de Venta', accessor: 'saleDate' },
  ];

  const data = [
    { id: '001', client: 'Cliente X', product: 'Tornillos', quantity: 200, saleDate: '14/07/2023' },
    { id: '002', client: 'Cliente Y', product: 'Madera', quantity: 30, saleDate: '16/07/2023' },
    // Más datos...
  ];

  return <Table columns={columns} data={data} />;
};

export default VentaSubModule;
