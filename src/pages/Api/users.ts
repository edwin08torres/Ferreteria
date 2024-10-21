// src/Api/userlogin.ts
import axios from 'axios';
import { Users } from '../../models/user'; // Asegúrate de importar la interfaz correcta

export const loginUser = async (username: string, password: string): Promise<Users | null> => {
  try {
    // Hacemos la petición a la API para obtener la lista de usuarios
    const response = await axios.get<Users[]>('http://localhost:5000/users');
    const users = response.data;

    // Validamos el usuario y contraseña comparando con los datos de la API
    const user = users.find(
      (user: Users) => user.username === username && user.password === password
    );

    if (user) {
      return user; // Si el usuario es encontrado, lo retornamos
    } else {
      return null; // Si no, retornamos null
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return null; // En caso de error, retornamos null
  }
};
