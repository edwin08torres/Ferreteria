import React from 'react';
import styles from '../styles/Table.module.css';

// Definimos la interfaz para cada fila de datos en la tabla
interface TableRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  date: string;
}

// Definimos la interfaz de las propiedades (props)
interface TableProps {
  moduleName: string; // Nombre del módulo actual
}

const Table: React.FC<TableProps> = ({ moduleName }) => {
  // Puedes cargar datos específicos del módulo aquí
  const data: TableRow[] = [
    { id: 1, name: 'Dionisio Torrez', phone: '8774901', email: 'hernandez@gmail.com', date: '13/07/2020' },
    // Más datos según el módulo
  ];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Cédula/Ruc</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Fecha Ingreso</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.phone}</td>
            <td>{row.email}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
