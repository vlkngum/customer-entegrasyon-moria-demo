import React from 'react';

import { platforms } from '@/data/platforms';

const OrderFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">PLATFORM SEÇİMİ</label>
        <select id="platform-status" className="block w-full px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">SİPARİŞ TUTARI</label>
        <div className="mt-1 flex space-x-2">
          <input type="number" placeholder="Minimum" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
          <input type="number" placeholder="Maksimum" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">SİPARİŞ TARİHİ</label>
        <div className="mt-1 flex space-x-2">
          <input type="date" placeholder="Başlangıç" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
          <input type="date" placeholder="Bitiş" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ÖDEME YÖNTEMİ SEÇMİ</label>
        <select id="platform-status" className="block w-full px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
            <option>Tüm Ödemeler</option>
            <option>Havale ve EFT</option>
            <option>Kapalı Ödeme</option>
            <option>Kredi Kartı</option>
            <option>Nakit</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">MİKRO İHRACAT DURUMU</label>
        <select id="platform-status" className="block w-full px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option>Mikro İhracat Durumu</option>
          <option>Mikro İhracat</option>
          <option>Tümü</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFiltersContent; 