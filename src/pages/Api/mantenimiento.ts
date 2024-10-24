// src/Api/mantenimientos.ts
import axios from 'axios';
import { Mantenimiento } from '../../models/Mantenimiento';

const API_URL = 'http://localhost:5000/mantenimientos'; 

export const obtenerMantenimientos = async (): Promise<Mantenimiento[]> => {
  try {
    const response = await axios.get<Mantenimiento[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los mantenimientos:', error);
    return [];
  }
};

export const crearMantenimiento = async (mantenimiento: Mantenimiento): Promise<Mantenimiento | null> => {
  try {
    const response = await axios.post<Mantenimiento>(API_URL, mantenimiento);
    return response.data;
  } catch (error) {
    console.error('Error al crear el mantenimiento:', error);
    return null;
  }
};

export const editarMantenimiento = async (id: number, mantenimientoEditado: Mantenimiento): Promise<Mantenimiento | null> => {
  try{
    const response = await axios.put<Mantenimiento>(`${API_URL}/${id}`, mantenimientoEditado);
    return response.data;
  }catch (error){
    console.error('Error al editar el mantenimiento:', error);
    return null;
  }
}

export const eliminarMantenimiento = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar el mantenimiento:', error);
    return false;
  }
};