import { ReactNode } from 'react';
import styles from './DataTable.module.css';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  key: string;
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  emptyMessage = 'No data available',
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`${styles.container} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.th} style={{ width: col.width }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className={styles.tr}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : (item[col.accessor] as unknown as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
