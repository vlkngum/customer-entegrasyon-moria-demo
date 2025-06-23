'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GiShop } from 'react-icons/gi';
import { FiFilePlus } from 'react-icons/fi';
import Error from '@/components/requests-for-support/Error';

const OpenSupportRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('open');
  const [filterOpen, setFilterOpen] = useState(false);


  return (
    <>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-gray-800">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center mb-4 md:mb-0">
            <span className="text-2xl text-blue-600 mr-2">
              <GiShop />
            </span>
            Arşivlenen Destek Taleplerim
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
        <Error />
      </div>
    </>
  );
};

export default OpenSupportRequestsPage;
