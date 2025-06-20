import React from 'react';

import { platforms } from '@/data/platforms';

const OrderFiltersContent: React.FC = () => {
  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 pl-6">
      {/* STOK DURUMU (FİYAT TİPİ GİBİ) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">STOK DURUMU</label>
        <select className="input mb-2">
          <option>Stok Durumu</option>
        </select>
        <div className="flex space-x-2">
          <input type="number" placeholder="Minimum" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
          <input type="number" placeholder="Maksimum" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      {/* PLATFORM BAĞLANTI DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">PLATFORM BAĞLANTI DURUMU</label>
        <select className="input">
          <option>Platform bağlantı durumunu filtrele</option>
          <option>Bağlı</option>
          <option>Bağlı Değil</option>
        </select>
      </div>
      {/* FİYAT DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">FİYAT DURUMU</label>
        <select className="input mb-2">
          <option>Satış Fiyatı</option>
        </select>
        <div className="flex space-x-2">
          <input type="number" placeholder="Minimum" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
          <input type="number" placeholder="Maksimum" className="block w-1/2 p-2 border border-gray-300 rounded-md" />
        </div>
      </div>
      {/* ÜRÜN DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ÜRÜN DURUMU</label>
        <select className="input">
          <option>Ürün durumunu filtrele</option>
          <option>Aktif</option>
          <option>Pasif</option>
          <option>Taslak</option>
        </select>
      </div>
      {/* SEÇENEK DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">SEÇENEK DURUMU</label>
        <select className="input">
          <option>Seçenek durumunu filtrele</option>
        </select>
      </div>
      {/* SET (BUNDLE) ÜRÜN DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">SET (BUNDLE) ÜRÜN DURUMU</label>
        <select className="input">
          <option>Set (Bundle) ürün durumunu filtrele</option>
        </select>
      </div>
      {/* SANAL ÜRÜN DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">SANAL ÜRÜN DURUMU</label>
        <select className="input">
          <option>Sanal ürün durumunu filtrele</option>
        </select>
      </div>
      {/* ÜRÜN GRUP DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">ÜRÜN GRUP DURUMU</label>
        <select className="input">
          <option>Gruplu ürün durumunu filtrele</option>
        </select>
      </div>
      {/* TOPLU İŞLEM DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">TOPLU İŞLEM DURUMU</label>
        <select className="input">
          <option>Toplu işlem durumunu filtrele</option>
        </select>
      </div>
      {/* GÖRSEL DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">GÖRSEL DURUMU</label>
        <select className="input">
          <option>Görsel durumunu filtrele</option>
        </select>
      </div>
      {/* BARKOD DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">BARKOD DURUMU</label>
        <select className="input">
          <option>Barkod durumunu filtrele</option>
        </select>
      </div>
      {/* MARKA DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">MARKA DURUMU</label>
        <select className="input">
          <option>Marka durumunu filtrele</option>
        </select>
      </div>
      {/* KATEGORİ DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">KATEGORİ DURUMU</label>
        <select className="input">
          <option>Kategori durumunu filtrele</option>
        </select>
      </div>
      {/* LİSTELEME BİTİŞ DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">LİSTELEME BİTİŞ DURUMU</label>
        <select className="input">
          <option>Listeleme Bitiş Durumu</option>
        </select>
      </div>
      {/* FİYAT KİLİT DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">FİYAT KİLİT DURUMU</label>
        <select className="input">
          <option>Fiyat Kilit Durumunu filtrele</option>
        </select>
      </div>
      {/* KANAL BAZLI AÇIK/KAPALI DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">KANAL BAZLI AÇIK/KAPALI DURUMU</label>
        <select className="input">
          <option>Kanal Bazlı Açık/Kapalı Durumu filtrele</option>
        </select>
      </div>
      {/* FİYAT ROBOT DURUMU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">FİYAT ROBOT DURUMU</label>
        <select className="input">
          <option>Fiyat robot Durumunu filtrele</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFiltersContent; 