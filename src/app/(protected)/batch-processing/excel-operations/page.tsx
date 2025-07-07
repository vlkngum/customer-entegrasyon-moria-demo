import React from "react";
import Image from "next/image";

export default function ExcelOperationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center space-x-3 pt-6 px-8">
      <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/product.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/>Toplu Ürün Gönderimi</h1>
        
      </div>

      {/* Tabs */}
      <div className="mt-4 px-8 border-b border-gray-200">
        <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2 px-1 focus:outline-none">
          Excel İşlemlerim
        </button>
      </div>

      {/* Table header and content background */}
      <div className="flex-1 w-full bg-blue-50 min-h-[100vh] mt-0 px-8 py-10">
        <div className="grid grid-cols-3 text-center">
          <div className="text-gray-700 font-medium text-sm">İŞLEM DETAYLARI</div>
          <div className="text-gray-700 font-medium text-sm">DURUM BİLGİSİ</div>
          <div className="text-gray-700 font-medium text-sm">İŞLEMLER</div>
        </div>
        {/* Buraya tablo içeriği veya diğer içerikler eklenebilir */}
      </div>
    </div>
  );
}
