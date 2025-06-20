import React from 'react';

const OrderFiltersContent: React.FC = () => {
  const selectOptions: { [key: string]: string[] } = {
    'ÜRÜN DURUMU': ['Ürün Durumunu listele', 'Satışa Açıkları Listele', 'Satışa Kapalıları Listele'],
    'SEÇENEK DURUMU': ['Seçenek Durumunu Filtrele','Seçenekli Ürünleri Listele','Seçeneksiz Ürünleri Listele'],
    'SET (BUNDLE) ÜRÜN DURUMU': ['Set (Bundle) Ürün Durumunu Filtrele', 'Set (Bundle) Ürünleri Listele', 'Set (Bundle) Olmayan Ürünleri Listele'],
    'SANAL ÜRÜN DURUMU': ['Sanal Ürünleri Filtrele', 'Sanal Olmayan Ürünleri Listele'],
    'ÜRÜN GRUP DURUMU': ['Gruplu Ürün Durumunu Filtrele', 'Gruplu Ürünleri Listele', 'Gruplu Olmayan Ürünleri Listele'],
    'TOPLU İŞLEM DURUMU': ['Toplu İşlem Durumunu Filtrele', 'Güncelleme Durumunda Olan Ürünleri Listele', 'Platforma Gönderme Durumunda Olan Ürünleri Listele'],
    'GÖRSEL DURUMU': ['Görsel Durumunu Filtrele ', 'Görselli Olan Ürünleri Listele','Görselli Olmayan Ürünleri Listele'],
    'BARKOD DURUMU': ['Barkod Durumunu Filtrele ', 'Barkodlu Olan Ürünleri Listele','Barkodlu Olmayan Ürünleri Listele'],
    'MARKA DURUMU': ['Marka Durumunu Filtrele ', 'Markalı Olan Ürünleri Listele','Markalı Olmayan Ürünleri Listele'],
    'KATEGORİ DURUMU': ['Kategori Durumunu Filtrele ', 'Kategorili Olan Ürünleri Listele','Kategorili Olmayan Ürünleri Listele'],
    'LİSTELEME BİTİŞ DURUMU': ['Listeleme Bitiş Durumu ', 'Listeleme Süresi Bitmiş', '1 Gün İçerisinde Bitecekler', '2 Gün İçerisinde Bitecekler', '3 Gün İçerisinde Bitecekler', '4 Gün İçerisinde Bitecekler', '5 Gün İçerisinde Bitecekler', '6 Gün İçerisinde Bitecekler', '7 Gün İçerisinde Bitecekler', '8 Gün İçerisinde Bitecekler', '9 Gün İçerisinde Bitecekler'],
    'FİYAT KİLİT DURUMU': ['Açık', 'Kapalı'],
    'KANAL BAZLI AÇIK/KAPALI DURUMU': ['Açık', 'Kapalı'],
    'FİYAT ROBOT DURUMU': ['Açık', 'Kapalı'],
  };

  return (
    <div className="max-h-[100vh] overflow-y-auto px-6 space-y-6   min-w-1/4"> 
 
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">PLATFORM BAĞLANTI DURUMU</label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="trendAktif" className="" />
            <label htmlFor="trendAktif" className="text-sm">Trendyol Aktif</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="trendPasif" className="" />
            <label htmlFor="trendPasif" className="text-sm">Trendyol Pasif</label>
          </div>
        </div>
      </div>

      {/* STOK DURUMU */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">STOK DURUMU</label>
        <div className="flex space-x-2">
          <input type="number" placeholder="Minimum" className="w-1/2 input" />
          <input type="number" placeholder="Maksimum" className="w-1/2 input" />
        </div>
      </div>

      {/* FİYAT DURUMU */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-1">FİYAT DURUMU</label>
        <select className="input mb-2">
          <option>Satış Fiyatı</option>
        </select>
        <div className="flex space-x-2">
          <input type="number" placeholder="Minimum" className="w-1/2 input" />
          <input type="number" placeholder="Maksimum" className="w-1/2 input" />
        </div>
      </div>

      {/* ÜRÜN DURUMLARI */}
      {Object.entries(selectOptions).map(([label, options], index) => (
        <div key={index}>
          <label htmlFor={`select-${index}`} className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>
          <select id={`select-${index}`} className="input">
            <option>{label.toLowerCase()} filtrele</option>
            {options.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex justify-end gap-3 pt-6 mt-36">
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-semibold">Vazgeç</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold">Filtrele</button>
      </div>
    </div>
  );
};

export default OrderFiltersContent;