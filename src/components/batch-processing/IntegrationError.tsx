"use client";
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const IntegrationError = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center p-12">
      <h2 className="text-xl font-bold text-gray-600 mb-3">ENTEGRASYONLARINIZ AKTİF DEĞİL</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Aktif pazar yeri entegrasyonunuz bulunmamaktadır. Lütfen entegrasyon bilgilerinizi tanımlayınız...
      </p>
      <img
        src="/syncErrorVector.svg" 
        alt="Entegrasyon bulunamadı"
        className="max-w-xl w-full my-12"
      />
      <button 
        onClick={() => router.push('/settings/integrations')} // Varsayılan ayarlar rotası
        className="bg-green-500 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
      >
        MAĞAZA AYARLARINA GİT
        <FiArrowRight />
      </button>
    </div>
  );
};

export default IntegrationError; 