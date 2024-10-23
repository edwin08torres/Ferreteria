import React from 'react';
import styles from '../styles/Table.module.css';

interface TableColumn {
  header: string;
  accessor: string; 
}

interface TableProps {
  columns: TableColumn[]; 
  data: any[]; 
  onEdit: (item: any) => void;  // Callback para editar
  onDelete: (id: number) => void;  // Callback para eliminar
}

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHeader}>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor} className={styles.tableCell}>
              {column.header}
            </th>
          ))}
          <th className={styles.tableCell}>Acciones</th>
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
            <td className={styles.tableCell}>
              <button onClick={() => onEdit(row)}>Editar</button>
              <button onClick={() => onDelete(row.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
