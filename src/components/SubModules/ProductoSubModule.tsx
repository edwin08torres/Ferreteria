import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { obtenerProductos } from '../../pages/Api/producto'; // API para obtener los productos
import { Producto } from '@/models/producto';


const ProductoSubModule = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productos = await obtenerProductos();
      setProductos(productos);
    };

    fetchProductos();
  }, []);

  // Definimos las columnas para la tabla
  const columns = [
    { header: 'ID Producto', accessor: 'id' },
    { header: 'Nombre Producto', accessor: 'nombre' },
    { header: 'Cantidad', accessor: 'cantidad' },
    { header: 'Precio', accessor: 'precio' }
  ];

  // Retornamos solo los datos y las columnas hacia el componente Table
  return <Table columns={columns} data={productos} />;
};

export default ProductoSubModule;
