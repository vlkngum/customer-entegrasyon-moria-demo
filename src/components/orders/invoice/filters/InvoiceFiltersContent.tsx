import React from 'react';

const InvoiceFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">FATURA YAZDIRMA DURUMU</label>
        <select id="platform-status" className="input">
          <option>Fatura Yazdırma Durumu</option>
          <option>Fatura Yazdırıldı</option>
          <option>Fatura Yazdırılmadı</option>
        </select>
      </div>
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

export default InvoiceFiltersContent; 