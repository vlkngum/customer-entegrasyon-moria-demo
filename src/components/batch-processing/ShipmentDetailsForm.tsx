"use client";
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const SelectInput = ({ label, value, onChange, options, required = false, placeholder = 'Seçiniz...' }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[], required?: boolean, placeholder?: string }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select 
        value={value}
        onChange={onChange}
        className="input"
      >
        <option value="">{placeholder}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      
    </div>
  </div>
);

const ShipmentDetailsForm = () => {
  const [productSource, setProductSource] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className="mt-8 space-y-8">
      {/* Gönderim Özellikleri */}
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Gönderim Özellikleri</h3>
        <p className="text-sm text-gray-500 mb-6">
          Uyarı: Aşağıda bulunan yıldızlı (<span className="text-red-500 font-bold">*</span>) kutucukları doldurmanız zorunludur. Aksi takdirde ürünleriniz gönderilemez.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className={productSource ? 'col-span-1' : 'col-span-3'}>
             <SelectInput 
                label="UYGULANACAK ÜRÜNLER" 
                options={['Kategori, Marka, Etiket veya XML Kaynağı']} 
                required 
                value={productSource}
                onChange={(e) => setProductSource(e.target.value)}
                placeholder="Kategori, Marka, Etiket veya XML Kaynağı"
            />
          </div>

          {productSource && (
            <>
              <SelectInput 
                label="MARKA SEÇİNİZ" 
                options={['Marka 1', 'Marka 2']} 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Seçenek seçilmedi"
              />
              <SelectInput 
                label="KATEGORİ SEÇİNİZ" 
                options={['Deneme Kategorisi, Deneme 2']} 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Deneme Kategorisi, Deneme 2"
              />
            </>
          )}
        </div>
      </div>

      {/* UYARI Kutusu */}
      <div className="bg-orange-100 border-l-4 border-orange-400 text-orange-700 p-4 rounded-md" role="alert">
        <p className="font-bold text-sm">UYARI</p>
        <p className="text-sm">
          Toplu ürün gönderimini başlatmak için ilk olarak <span className="font-semibold">yukarıdaki</span> kutucuklardan göndermek istediğiniz ürünlere ait seçimi gerçekleştirmelisiniz. Bu seçimi yaparken <span className="font-semibold">tüm ürünlerinizi, kategoriye ya da markaya</span> özel aktarım isteği oluşturabilirsiniz. Daha sonrasında <span className="font-semibold">aşağıda</span> yer alan <span className="font-semibold">kargo ve süreç seçimlerini</span> belirlemeniz gerekmektedir.
        </p>
      </div>

      {/* Kargo ve Süreç Seçimleri */}
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Kargo ve Süreç Seçimleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bu kısımdaki select'leri de state'e bağlamak gerekebilir, şimdilik statik bırakıyorum */}
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-600 mb-1">ÖN TANIMLI KARGO FİRMASI</label>
            <select className="input"><option>DHL Marketplace</option></select>
            
          </div>
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-600 mb-1">ÖN TANIMLI KARGO ADRESİ</label>
            <select className="input"><option>Mahalle:ÇİFTLİKKÖY MAH. Cadde/Sokak:1</option></select>
            
          </div>
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-600 mb-1">ÖN TANIMLI İADE ADRESİ</label>
            <select className="input"><option>Mahalle:ÇİFTLİKKÖY MAH. Cadde/Sokak:1</option></select>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsForm; 