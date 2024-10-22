// src/Api/ventas.ts
import axios from 'axios';
import { Venta } from '../../models/venta'; // Asegúrate de que la interfaz esté definida correctamente

export const obtenerVentas = async (): Promise<Venta[]> => {
  try {
    const response = await axios.get<Venta[]>('http://localhost:5000/ventas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    return [];
  }
};

export const crearVenta = async (venta: Venta): Promise<Venta | null> => {
  try {
    const response = await axios.post<Venta>('http://localhost:5000/ventas', venta);
    return response.data;
  } catch (error) {
    console.error('Error al crear la venta:', error);
    return null;
  }
};
