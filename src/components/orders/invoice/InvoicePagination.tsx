import React from 'react';

const InvoicePagination: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between text-sm text-gray-700">
      <div className="flex items-center space-x-2">
        <span>Toplam 0 sayfada</span>
        <select className="border border-gray-300 p-1 rounded-md">
          <option>0</option>
        </select>
        <span>sayfadasınız. Her sayfada</span>
        <select className="border border-gray-300 p-1 rounded-md">
          <option>0</option>
        </select>
        <span>kayıt göster.</span>
      </div>
    </div>
  );
};

export default InvoicePagination; 