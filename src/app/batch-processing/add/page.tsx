"use client";
import React, { useState } from 'react';
import IntegrationError from '@/components/batch-processing/IntegrationError';
import PlatformSelection from '@/components/batch-processing/PlatformSelection';

export default function AddBulkProductPage() {
  // Entegrasyon durumunu kontrol edecek state. 'true' yaparak normal akışı gösteriyoruz.
  const [hasIntegration, setHasIntegration] = useState(true); 

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#f4f8fd] min-h-full">
      <div className="bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
        <div className="flex items-center gap-4 border-b border-gray-200 p-6">
          <div className=" p-3 rounded-lg">
            <img src="/reportIcon.svg" alt="Report Icon" className="h-16 w-16" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Toplu Ürün Gönderim Sihirbazı</h1>
            <p className="text-sm text-gray-500">Lütfen sağlıklı bir gönderim yapabilmek için tüm alanları doldurunuz...</p>
          </div>
        </div>
        
        {/* Entegrasyon durumuna göre render etme */}
        {!hasIntegration ? (
          <IntegrationError />
        ) : (
          <PlatformSelection />
        )}
      </div>
    </div>
  );
}
