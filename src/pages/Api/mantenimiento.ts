// src/Api/mantenimientos.ts
import axios from 'axios';
import { Mantenimiento } from '../../models/Mantenimiento';
export const obtenerMantenimientos = async (): Promise<Mantenimiento[]> => {
  try {
    const response = await axios.get<Mantenimiento[]>('http://localhost:5000/mantenimientos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los mantenimientos:', error);
    return [];
  }
};

export const crearMantenimiento = async (mantenimiento: Mantenimiento): Promise<Mantenimiento | null> => {
  try {
    const response = await axios.post<Mantenimiento>('http://localhost:5000/mantenimientos', mantenimiento);
    return response.data;
  } catch (error) {
    console.error('Error al crear el mantenimiento:', error);
    return null;
  }
};
