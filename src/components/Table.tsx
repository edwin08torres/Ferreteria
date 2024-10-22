import React from 'react';
import styles from '../styles/Table.module.css';

interface TableColumn {
  header: string;
  accessor: string; // clave para acceder a los datos
}

interface TableProps {
  columns: TableColumn[]; // Array de columnas dinámicas
  data: any[]; // Datos dinámicos según las columnas
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHeader}>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor} className={styles.tableCell}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${rowIndex % 2 === 0 ? styles.tableRowEven : ''} ${
              styles.tableRowHover
            }`}
          >
            {columns.map((column) => (
              <td key={column.accessor} className={styles.tableCell}>
                {row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
