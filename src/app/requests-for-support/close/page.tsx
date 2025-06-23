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
          <div className="flex items-center space-x-2">
            <Link href="/requests-for-support/create">
              <button
                className="border_button hover:shadow-md transition group focus:outline-none"
              >
                <FiFilePlus className="text-lg mb-1 text-gray-500 group-hover:text-blue-600 transition" />
                <span className="text-[11px] font-semibold text-gray-600 group-hover:text-blue-700 tracking-wide">
                YENİ DESTEK TALEBİ OLUŞTUR
                </span>
              </button>
            </Link>
          </div>
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
              activeTab === 'open'
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
              activeTab === 'archive'
                ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Arşivlenen Destek Taleplerim
          </Link>
        </div>

        <div className="bg-blue-50/50 p-4 rounded-lg">
          <div className="hidden md:grid grid-cols-7 gap-4 text-gray-500 font-semibold text-xs mb-4 px-4 items-center">
            <div className="col-span-1"></div>
            <div className="col-span-1">DESTEK TİPİ</div>
            <div className="col-span-1">PLATFORM</div>
            <div className="col-span-1">KONU</div>
            <div className="col-span-1">OLUŞTURMA TARİHİ</div>
            <div className="col-span-1">DURUM</div>
            <div className="col-span-1 text-right">İŞLEM</div>
          </div>

          <div className="space-y-4">
            {supportRequests.map(request => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-7 gap-4 items-center"
              >
                <Link
                  href={`/requests-for-support/detail/${request.id.replace(
                    '#',
                    '',
                  )}`}
                  className="flex items-center"
                >
                  <ChevronRight className="text-blue-500 mr-2" />
                  <span className="font-bold text-blue-600 text-sm underline">
                    {request.id}
                  </span>
                </Link>
                <div className="text-sm">
                  <span className="font-bold md:hidden">Destek Tipi: </span>
                  {request.type}
                  <div className="md:hidden ml-auto float-right">
                    <Link
                      href={`/requests-for-support/detail/${request.id.replace(
                        '#',
                        '',
                      )}`}
                    >
                      <button className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg flex items-center text-xs">
                        <Pencil className="mr-2 h-4 w-4" />
                        GÖRÜNTÜLE
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-1 text-sm">
                  <span className="font-bold md:hidden">Platform: </span>
                  {request.platform}
                </div>
                <div className="md:col-span-1 text-sm">
                  <span className="font-bold md:hidden">Konu: </span>
                  {request.subject}
                </div>
                <div className="md:col-span-1 text-sm">
                  <span className="font-bold md:hidden">Oluşturma Tarihi: </span>
                  {request.date}
                </div>
                <div className="md:col-span-1 text-sm">
                  <span
                    className={`border text-xs font-semibold px-2.5 py-1 rounded ${getStatusClass(
                      request.status,
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="hidden md:flex md:col-span-1 justify-end">
                  <Link
                    href={`/requests-for-support/detail/${request.id.replace(
                      '#',
                      '',
                    )}`}
                  >
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center text-sm font-bold">
                      <Pencil className="mr-2 h-4 w-4" />
                      GÖRÜNTÜLE
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenSupportRequestsPage;
