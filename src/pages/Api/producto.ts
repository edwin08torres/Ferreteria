// src/Api/productos.ts
import axios from 'axios';
import { Producto } from '../../models/producto'; // Asegúrate de que la interfaz esté definida correctamente

export const obtenerProductos = async (): Promise<Producto[]> => {
  try {
    const response = await axios.get<Producto[]>('http://localhost:5000/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
};

export const crearProducto = async (producto: Producto): Promise<Producto | null> => {
  try {
    const response = await axios.post<Producto>('http://localhost:5000/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return null;
  }
};
