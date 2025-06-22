import React from 'react';

export interface ProductTableColumn {
  key: string;
  title: string | React.ReactNode;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface ProductTableProps {
  columns: ProductTableColumn[];
  data: any[];
}

const ProductTable: React.FC<ProductTableProps> = ({ columns, data }) => {
  return (
    <div className="rounded-lg my-4">
      <div className="grid grid-cols-4 gap-4 items-center px-4 py-2 text-xs font-bold text-gray-500 uppercase text-center">
        {columns.map((col) => (
          <div key={col.key} className={col.className || ''}>{col.title}</div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {data.map((row, idx) => (
          <div
            key={row.id || row[columns[0].key] || idx}
            className={
              `grid grid-cols-4 items-center text-gray-700 text-center bg-white rounded-xl shadow transition hover:shadow-lg border border-gray-100 px-4 py-4` +
              (idx % 2 === 1 ? ' bg-gray-50' : '')
            }
            style={{ minHeight: '64px' }}
          >
            {columns.map((col) => (
              <div key={col.key} className={col.className || ''}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </div>
            ))}
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center text-gray-400 py-10 col-span-4">Katalogda ürün bulunamadı.</div>
        )}
      </div>
    </div>
  );
};

export default ProductTable; 