import React from 'react';
import Table from '../../components/Table';

const CompraSubModule = () => {
  const columns = [
    { header: 'ID Compra', accessor: 'id' },
    { header: 'Proveedor', accessor: 'supplier' },
    { header: 'Cantidad', accessor: 'quantity' },
    { header: 'Total', accessor: 'total' },
    { header: 'Fecha Compra', accessor: 'purchaseDate' },
  ];

  const data = [
    { id: '001', supplier: 'Proveedor A', quantity: 50, total: '$500', purchaseDate: '10/10/2023' },
    { id: '002', supplier: 'Proveedor B', quantity: 20, total: '$200', purchaseDate: '12/10/2023' },
    // Más datos...
  ];

  return <Table columns={columns} data={data} />;
};

export default CompraSubModule;
