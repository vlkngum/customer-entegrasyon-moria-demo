import React from 'react';

const ErpInvoiceFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">AKTARIM DURUMU</label>
        <select id="platform-status" className="input">
        <option>Aktarım Durumu</option>
          <option>Aktarıldı</option>
          <option>Aktarılmadı</option>
        </select>
      </div>
    </div>
  );
};

export default ErpInvoiceFiltersContent; 