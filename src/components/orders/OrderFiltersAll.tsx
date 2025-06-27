"use client";

import { useState } from 'react';
import { FiFilter } from 'react-icons/fi'; 
import { BiCaretDownCircle, BiCaretUpCircle   } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { platforms } from '@/data/platforms';

export default function OrderFilters() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const orderStatuses = [
    "Tüm Durumlar",
    "Onay Bekliyor",
    "Onaylandı",
    "Kargolandı",
    "İptal Edildi",
  ];

  return (
    <div className="panel">
      <div className="flex flex-col md:flex-row gap-4 md:items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
          <div className='space-y-1'>
            <label htmlFor="platform-status" className="block text-md  text-black">Platform Durumu</label>
            <select id="platform-status" className="input">
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
          <div className='space-y-1'>
            <label htmlFor="customer-name" className="block text-md  text-black">Müşteri Adı Soyadı</label>
            <input type="text" id="customer-name" placeholder="Müşteri Adı" className="input" />
          </div>
          <div className='space-y-1'>
            <label htmlFor="order-number" className="block text-md  text-black">Sipariş Numarası</label>
            <input type="text" id="order-number" placeholder="Sipariş Numarası" className="input" />
          </div>
          <div className='space-y-1'>
            <label htmlFor="order-status" className="block text-md  text-black">Sipariş Durumu</label>
            <select id="order-status" className="input">
              {orderStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Filter buttons */}
        <div className="flex flex-col justify-start pt-7">
          <button className="bg-[#0f82ff] text-white py-2 px-4 rounded-md hover:bg-[#0068ff] flex items-center justify-center">
            <FiFilter className="mr-2" /> <span className="text-sm whitespace-nowrap">FİLTRELE</span>
          </button>
          <button className="text-gray-600 hover:text-gray-800 py-3 px-4 rounded-md flex items-center justify-center">
            <MdCancel className="mr-2 text-xl" /> <span className="text-sm whitespace-nowrap">Filtreyi Temizle</span>
          </button>
        </div>
      </div>
      <button
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="text-blue-600 hover:text-blue-800  mb-4 flex flex-row items-center gap-2"
      >
        Detaylı Filtrele {showAdvancedFilters ? <BiCaretUpCircle /> : <BiCaretDownCircle/>}
      </button>

      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* SİPARİŞ TARİHİ */}
          <div className="col-span-2 space-y-1">
            <label htmlFor="start-date" className="block text-md text-black">SİPARİŞ TARİHİ</label>
            <div className="flex items-center space-x-2">
              <input type="date" id="start-date" placeholder="Başlangıç" className="input" />
              <span className="text-gray-500">-</span>
              <input type="date" id="end-date" placeholder="Bitiş" className="input" />
            </div>
          </div>

          {/* SİPARİŞ TUTARI */}
          <div className="col-span-2 space-y-1">
            <label htmlFor="min-amount" className="block text-md text-black">SİPARİŞ TUTARI</label>
            <div className="flex items-center space-x-2">
              <input type="number" id="min-amount" placeholder="Minimum Tutar" className="input" />
              <input type="number" id="max-amount" placeholder="Maksimum Tutar" className="input" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 