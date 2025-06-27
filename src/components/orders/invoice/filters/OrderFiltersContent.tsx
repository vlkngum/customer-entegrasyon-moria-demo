import React from 'react';

import { platforms } from '@/data/platforms';

const OrderFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">PLATFORM SEÇİMİ</label>
        <select id="platform-status" className="input">
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
          <input type="number" placeholder="Minimum" className="input" />
          <input type="number" placeholder="Maksimum" className="input" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">SİPARİŞ TARİHİ</label>
        <div className="mt-1 flex space-x-2">
          <input type="date" placeholder="Başlangıç" className="input" />
          <input type="date" placeholder="Bitiş" className="input" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ÖDEME YÖNTEMİ SEÇMİ</label>
        <select id="platform-status" className="input">
            <option>Tüm Ödemeler</option>
            <option>Havale ve EFT</option>
            <option>Kapalı Ödeme</option>
            <option>Kredi Kartı</option>
            <option>Nakit</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">MİKRO İHRACAT DURUMU</label>
        <select id="platform-status" className="input">
          <option>Mikro İhracat Durumu</option>
          <option>Mikro İhracat</option>
          <option>Tümü</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFiltersContent; 