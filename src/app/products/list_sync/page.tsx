'use client'

import { useState } from 'react';
import { FiHash } from 'react-icons/fi';
import { FaSearch } from "react-icons/fa"; 
import ProductFilterModal from "@/components/products/list_sync/ProductFilterModal"
import BulkProcessModal from '@/components/products/list_sync/BulkProcessModal';
import Image from "next/image";
const sampleProducts = [
  {
    id: 1,
    image: '/entekas-logo.svg',
    code: 'DT-WEB',
    name: 'Web Tabanlı Personel Takip Sistemi Parmak Okuma',
    category: 'Güvenlik Cihazı',
    stock: 0,
    platform: '/trendyolLogo.svg',
  },
  {
    id: 2,
    image: '/entekas-logo.svg',
    code: '3641272468425',
    name: 'Libre EDP 90 Ml Kadın Parfüm',
    category: 'Parfüm',
    stock: 0,
    platform: '/trendyolLogo.svg',
  },
  {
    id: 3,image: '/entekas-logo.svg',
    code: '8886006000079',
    name: 'Black Orchid EDP 100ml',
    category: 'Parfüm',
    stock: 0,
    platform: '/trendyolLogo.svg',
  },
  {
    id: 4,image: '/entekas-logo.svg',
    code: '8411061025222',
    name: '212 Sexy Men Bay Parfüm 100 ml Resmi Distribütör',
    category: 'Parfüm',
    stock: 0,
    platform: '/trendyolLogo.svg',
  },
  {
    id: 5,image: '/entekas-logo.svg',
    code: '8411061273760',
    name: '212 Vip Erkek EDT 100ml',
    category: 'Parfüm',
    stock: 0,
    platform: '/trendyolLogo.svg',
  },
];

export default function ListSyncPage() { 
  
  const [bulkProcessModal, setBulkProcessModal] = useState(false);

  const [showDetailedFilters, setShowDetailedFilters] = useState(false);

  const toggleDetailedFilters = () => {
    setShowDetailedFilters(!showDetailedFilters);
  };

  const toggleBulkProcess = () => {
    setBulkProcessModal(!bulkProcessModal);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
   <div className="panel"> 
   <div className="w-full flex flex-row py-2 px-6">
        <div className="mb-4 flex flex-row items-center gap-2 w-full">
          <div className="flex flex-col w-full">
            <label className="block text-sm font-bold text-gray-700 mb-1">ÜRÜN ARAMA</label>
            <div className="flex flex-row items-center gap-2 w-full">
              <input
                type="text"
                className="input"
                placeholder="Stok Kodu, Ürün Adı veya Barkod ile ara..."
              />
              <button className="bg-[#0f82ff] text-white px-12 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-600 transition-colors duration-200 ">
                <FaSearch className="w-4 h-4" />
                <span>FİLTRELE</span>
              </button>
            </div>
          </div>
        </div>
      
      
      <div className="w-full flex justify-end px-4 py-6 gap-4">
      <div className="text-[#47494c] cursor-pointer flex text-md items-center mb-4 justify-end hover:text-[#0868dd]" onClick={toggleBulkProcess}>
        <Image src={'/arrow-right.svg'} width={0} height={0} alt='arrowUp' className='w-4 h-4 opacity-70 mr-2' />
        Toplu İşlemler
        </div>
        <div className="text-[#47494c] cursor-pointer flex text-md items-center mb-4 justify-end hover:text-[#0868dd]" onClick={toggleDetailedFilters}>
        <Image src={'/arrow-right.svg'} width={0} height={0} alt='arrowUp' className='w-4 h-4 opacity-70 mr-2' />
        Detaylı Filtrele
      </div>
      </div>
      </div>

      <ProductFilterModal showModal={showDetailedFilters} onClose={toggleDetailedFilters} />
      
      {bulkProcessModal && (
        <BulkProcessModal showModal={bulkProcessModal} onClose={toggleBulkProcess} />
      )}

    </div>

    <div className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto mb-8">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8 gap-4 font-semibold text-gray-600 border-b border-gray-200 pb-2 mb-2 text-sm">
              <div className="w-8 text-center"><input type="checkbox" className="form-checkbox" /></div>
              <div className="text-center">ETİKET</div>
              <div className="text-center">ÜRÜN GÖRSELİ</div>
              <div className="text-left col-span-2">ÜRÜN KATEGORİ & ADI</div>
              <div className="text-center">STOK</div>
              <div className="text-center">EŞİTLEME DURUMU</div>
              <div className="text-center"></div>
            </div>
            {sampleProducts.map((row) => (
              <div key={row.id} className="grid grid-cols-8 gap-4 items-center bg-white rounded-xl shadow p-4 mb-4">
                <div className="w-8 flex justify-center"><input type="checkbox" className="form-checkbox" /></div>
                <div className="flex justify-center"><FiHash className="text-blue-500 w-5 h-5" /></div>
                <div className="flex justify-center"><Image src={row.image} alt="Ürün" width={0} height={0} className="w-12 h-12 object-contain rounded bg-gray-50" /></div>
                <div className="flex flex-col items-start col-span-2">
                  <span className="text-xs text-gray-400 font-semibold">Stok Kodu: {row.code}</span>
                  <span className="font-semibold text-gray-700">{row.name}</span>
                  <span className="text-xs text-blue-600 font-semibold">{row.category}</span>
                </div>
                <div className="text-center font-bold text-gray-700">{row.stock}</div>
                <div className="flex justify-center"><Image src={row.platform} alt="Platform" width={0} height={0} className="w-8 h-8" /></div>
                <div className="flex justify-center">
                  <button className="bg-orange-50 text-orange-600 border border-orange-200 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-orange-100 transition">
                    ÖZELLİK EŞİTLE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
