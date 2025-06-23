import React from 'react';
import { platforms } from '@/data/platformsSelect';

const InvoiceFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4 p-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">ÜRÜN KAYNAĞI</label>
        <select id="platform-status" className="block w-full px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>Ürün Kaynağını Filtrele</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
       
    </div>
  );
};

export default InvoiceFiltersContent; 