'use client';
import { ChevronRight, FilePlus, Pencil, Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GiShop } from 'react-icons/gi';
import { FiFilePlus } from 'react-icons/fi';

const OpenSupportRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [filterOpen, setFilterOpen] = useState(false);

  const supportRequests = [
    {
      id: '#77564',
      type: 'Ürün İşlemleri',
      platform: 'Trendyol',
      subject: 'Deneme',
      date: '22.06.2025 18:56',
      status: 'Kapalı',
    },
    {
      id: '#77565',
      type: 'Sipariş Sorunu',
      platform: 'Hepsiburada',
      subject: 'Kargo gecikmesi',
      date: '21.06.2025 14:30',
      status: 'Kapalı',
    },
    {
      id: '#77566',
      type: 'Fatura Hatası',
      platform: 'N11',
      subject: 'Faturada yanlış ürün',
      date: '20.06.2025 11:00',
      status: 'Kapalı',
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'İşlem Bekliyor':
        return 'border-cyan-400 text-cyan-500';
      case 'Cevaplandı':
        return 'border-green-400 text-green-500';
      case 'İnceleniyor':
        return 'border-yellow-400 text-yellow-500';
      case 'Kapalı':
        return 'border-red-400 text-red-500';
      default:
        return 'border-gray-400 text-gray-500';
    }
  };

  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-gray-800">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center mb-4 md:mb-0">
            <span className="text-2xl text-blue-600 mr-2">
              <GiShop />
            </span>
            Kapalı Destek Taleplerim
          </h1>
          
        </div>

        <div className="flex border-b mb-6 text-sm">
          <Link
            href="/requests-for-support/open"
            onClick={() => setActiveTab('open')}
            className={`py-2 px-4 ${
              activeTab === 'close'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Açık Destek Taleplerim
          </Link>
          <Link
            href="/requests-for-support/close"
            onClick={() => setActiveTab('close')}
            className={`py-2 px-4 ${
              activeTab === 'close'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Kapalı Destek Taleplerim
          </Link>
          <Link
            href="/requests-for-support/archive"
            onClick={() => setActiveTab('archive')}
            className={`py-2 px-4 ${
              activeTab === 'open'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Arşivlenen Destek Taleplerim
          </Link>
        </div>
        <div className='flex justify-center items-center bg-[#f2f8ff] h-screen'>
        <img src="/noTicket.svg" alt="" className='w-300 h-150' />
        </div>
      </div>
    </>
  );
};

export default OpenSupportRequestsPage;
