import React from 'react';

const ErpInvoiceFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">AKTARIM DURUMU</label>
        <select id="platform-status" className="block w-full px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
        <option>Aktarım Durumu</option>
          <option>Aktarıldı</option>
          <option>Aktarılmadı</option>
        </select>
      </div>
    </div>
  );
};

export default ErpInvoiceFiltersContent; 