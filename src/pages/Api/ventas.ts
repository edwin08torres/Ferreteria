import axios from 'axios';
import { Venta } from '../../models/venta'; // Asegúrate de que la interfaz esté definida correctamente

// Define la URL base de tu JSON Server
const API_URL = 'http://localhost:5000/ventas'; 

// Obtener todas las ventas
export const obtenerVentas = async (): Promise<Venta[]> => {
  try {
    const response = await axios.get<Venta[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    return [];
  }
};

// Crear una nueva venta
export const crearVenta = async (nuevaVenta: Venta): Promise<Venta | null> => {
  try {
    const response = await axios.post<Venta>(API_URL, nuevaVenta);
    return response.data; // Devolver la nueva venta creada
  } catch (error) {
    console.error('Error al crear la venta:', error);
    return null; // Devolver null si hay un error
  }
};

// Editar una venta existente
export const editarVenta = async (id: number, ventaEditada: Venta): Promise<Venta | null> => {
  try {
    const response = await axios.put<Venta>(`${API_URL}/${id}`, ventaEditada);
    return response.data; // Devolver la venta editada
  } catch (error) {
    console.error('Error al editar la venta:', error);
    return null; // Devolver null si hay un error
  }
};

// Eliminar una venta
export const eliminarVenta = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    return false;
  }
};
