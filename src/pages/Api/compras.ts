// src/Api/compras.ts
import axios from 'axios';
import { Compra } from '../../models/Compra';

const API_URL = 'http://localhost:5000/compras'; 

// Obtener todas las compras
export const obtenerCompras = async (): Promise<Compra[]> => {
  try {
    const response = await axios.get<Compra[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    return [];
  }
};

// Crear una nueva compra
export const crearCompra = async (nuevaCompra: Compra): Promise<Compra | null> => {
  try {
    const response = await axios.post<Compra>(API_URL, nuevaCompra);
    return response.data;
  } catch (error) {
    console.error('Error al crear la compra:', error);
    return null;
  }
};

// Editar una compra existente
export const editarCompra = async (id: number, compraEditada: Compra): Promise<Compra | null> => {
  try {
    const response = await axios.put<Compra>(`${API_URL}/${id}`, compraEditada);
    return response.data;
  } catch (error) {
    console.error('Error al editar la compra:', error);
    return null;
  }
};

// Eliminar una compra
export const eliminarCompra = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar la compra:', error);
    return false;
  }
};
