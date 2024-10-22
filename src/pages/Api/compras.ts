// src/Api/compras.ts
import axios from 'axios';
import { Compra } from '../../models/Compra'; // Asegúrate de que la interfaz esté definida correctamente

export const obtenerCompras = async (): Promise<Compra[]> => {
  try {
    const response = await axios.get<Compra[]>('http://localhost:5000/compras');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    return [];
  }
};

export const crearCompra = async (compra: Compra): Promise<Compra | null> => {
  try {
    const response = await axios.post<Compra>('http://localhost:5000/compras', compra);
    return response.data;
  } catch (error) {
    console.error('Error al crear la compra:', error);
    return null;
  }
};
