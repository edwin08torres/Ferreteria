// src/Api/productos.ts
import axios from 'axios';
import { Producto } from '../../models/producto'; // Asegúrate de que la interfaz esté definida correctamente


const API_URL = 'http://localhost:5000/productos'; 


export const obtenerProductos = async (): Promise<Producto[]> => {
  try {
    const response = await axios.get<Producto[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
};

export const crearProducto = async (producto: Producto): Promise<Producto | null> => {
  try {
    const response = await axios.post<Producto>(API_URL, producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return null;
  }
};

export const editarProducto = async (id: number, ProductoEditado: Producto): Promise<Producto | null> => {
  try{
    const response = await axios.put<Producto>(`${API_URL}/${id}`, ProductoEditado);
    return response.data;
  }catch (error){
    console.error('Error al editar el Producto:', error);
    return null;
  }
}

export const eliminarProducto = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar el Producto:', error);
    return false;
  }
};