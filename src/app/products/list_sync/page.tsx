'use client'

import { useState } from 'react';
import { FiHash, FiSearch } from 'react-icons/fi';
import { FaSearch } from "react-icons/fa"; 

import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"


import ProductFilterModal from "@/components/products/list_sync/ProductFilterModal"
import BulkProcessModal from '@/components/products/list_sync/BulkProcessModal';
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
      <div className="w-full flex flex-row justify-between py-2 px-6">
        <div className="mb-4 flex flex-row items-center gap-2 w-1/2">
          <input
            type="text"
            className="input"
            placeholder="Stok Kodu, Ürün Adı veya Barkod ile ara..."
          />
          <button className="bg-blue-600 text-white px-12 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200 ">
            <FaSearch className="w-4 h-4" />
            <span>FİLTRELE</span>
          </button>
        </div>
        <div className="flex gap-2"> 
          <a className="border_button" href="/add">
            <AiOutlineProduct className="w-6 h-6" />
            <span style={{ fontSize: 10 }}>YENİ ÜRÜN EKLE</span>
          </a>
        </div>
      </div>
      
      <div className="w-full flex justify-end px-4 py-6 gap-4">
        <div className="text-blue-600 cursor-pointer flex items-center mb-4 justify-end" onClick={toggleBulkProcess}>
          {bulkProcessModal ? <IoIosArrowUp className="mr-1" /> : <IoIosArrowDown className="mr-1" />}
          Toplu İşlemler
        </div>
        <div className="text-blue-600 cursor-pointer flex items-center mb-4 justify-end" onClick={toggleDetailedFilters}>
          {showDetailedFilters ? <IoIosArrowUp className="mr-1" /> : <IoIosArrowDown className="mr-1" />}
          Detaylı Filtrele
        </div>
      </div>

      <ProductFilterModal showModal={showDetailedFilters} onClose={toggleDetailedFilters} />
      
      {bulkProcessModal && (
        <BulkProcessModal showModal={bulkProcessModal} onClose={toggleBulkProcess} />
      )}

    </div>

    <div className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-8 gap-4 font-semibold text-gray-600 border-b pb-2 mb-2 text-sm">
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
                <div className="flex justify-center"><img src={row.image} alt="Ürün" className="w-12 h-12 object-contain rounded bg-gray-50" /></div>
                <div className="flex flex-col items-start col-span-2">
                  <span className="text-xs text-gray-400 font-semibold">Stok Kodu: {row.code}</span>
                  <span className="font-semibold text-gray-700">{row.name}</span>
                  <span className="text-xs text-blue-600 font-semibold">{row.category}</span>
                </div>
                <div className="text-center font-bold text-gray-700">{row.stock}</div>
                <div className="flex justify-center"><img src={row.platform} alt="Platform" className="w-8 h-8" /></div>
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
