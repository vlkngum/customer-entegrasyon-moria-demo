"use client";
import React, { useState } from 'react';
import { FiArrowLeft, FiFilePlus, FiRefreshCw, FiDownload, FiChevronRight, FiTag } from 'react-icons/fi';
import { GiShop } from 'react-icons/gi';
import { useRouter } from 'next/navigation';
import ReviewModal from '@/components/product-shipments/ReviewModal';
import Image from "next/image";

const StatCard = ({ title, value, color, description }: { title: string, value: string, color: string, description: string }) => {
  const colorClass = `border-${color}-500`;
  const textColorClass = `text-${color}-500`;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-full border border-gray-100">
      <div className="text-gray-500 text-sm font-semibold">{title}</div>
      <div className={`text-4xl font-bold my-4 ${textColorClass}`}>{value}</div>
      <div className={`border-t-4 ${colorClass} w-full my-2`}></div>
      <div className="text-gray-400 text-xs mt-2">{description}</div>
    </div>
  );
};

export default function ShipmentReportPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f8fd]">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl text-blue-600"><GiShop /></span>
          <span className="font-semibold text-2xl text-gray-800">Toplu Ürün Gönderimi</span>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="border_button hover:shadow-md transition group focus:outline-none flex items-center gap-2">
                <FiArrowLeft className="text-lg text-gray-500 group-hover:text-blue-600 transition" />
                <span className="text-[11px] font-semibold text-gray-600 group-hover:text-blue-700 tracking-wide">GERİ DÖN</span>
            </button>
            <button onClick={() => router.push("/batch-processing/new-bulk-product-shipment")} className="border_button hover:shadow-md transition group focus:outline-none flex items-center gap-2">
                <FiFilePlus className="text-lg text-gray-500 group-hover:text-blue-600 transition" />
                <span className="text-[11px] font-semibold text-gray-600 group-hover:text-blue-700 tracking-wide">YENİ TOPLU ÜRÜN GÖNDERİMİ BAŞLAT</span>
            </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white px-8 pt-4 flex gap-8 border-b border-gray-200">
        <button className="text-gray-500 pb-3" onClick={() => router.push("/batch-processing/product-shipments")}>Toplu Ürün Gönderimi İşlemleri</button>
        <button className="text-gray-500 pb-3" onClick={() => router.push("/batch-processing/new-bulk-product-shipment")}>Yeni Toplu Ürün Gönderimi Başlat</button>
        <button className="text-blue-700 font-semibold border-b-2 border-blue-700 pb-3">Toplu Ürün Gönderimi Raporu</button>
      </div>

      {/* Main Content */}
      <main className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-7xl mx-auto">
          {/* Report Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Image src="/trendyolLogo.svg" alt="Trendyol" className="w-16 h-16 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Trendyol Ürün Gönderim Raporu</h1>
                <p className="text-sm text-gray-500">20-06-2025 19:45 tarihli gönderim detayları</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-200"
              >
                <FiRefreshCw />
                TEKRAR KONTROL ET
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg font-semibold text-sm hover:bg-green-200">
                <FiDownload />
                RAPORU İNDİR
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <StatCard title="KONTROL EDİLEN ÜRÜN SAYISI" value="1" color="gray" description="Gönderim için kontrol edilen toplam ürün sayısı" />
            <StatCard title="HATASIZ ÜRÜN SAYISI" value="0" color="green" description="Gönderime uygun olan ürün sayısı" />
            <StatCard title="HATALI ÜRÜN SAYISI" value="1" color="red" description="Gönderime uygun olmayan ürün sayısı" />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <span className='w-3 h-3 bg-blue-500 rounded-full'></span>
                <span className="font-semibold text-gray-700">İŞLEM TİPİ:</span>
                <span>SEÇİLEN ÜRÜNLER</span>
            </div>

            <div>
                <h3 className="font-semibold text-gray-700 mb-2">SEÇİLEN KATEGORİLER</h3>
                <div className="flex gap-2">
                    <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <FiTag size={14}/> Deneme Kategorisi
                    </span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-700 mb-1">Kontrol Edilmesi Gereken Hata Listesi</h3>
                <p className="text-sm text-gray-500 bg-orange-50 p-2 rounded-md">
                    <span className='font-bold text-orange-600'>Uyarı:</span> Aşağıdaki listede bulunan <span className="font-bold">hataları/eksiklikleri</span> gidermek için <span className="font-bold">hata mesajına</span> tıklayarak detayları inceleyebilirsiniz.
                </p>
                <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-600 mb-3">HATA MESAJI</h4>
                    <div className="flex items-center gap-3 text-blue-600 cursor-pointer hover:underline">
                        <FiChevronRight size={20} />
                        <span className='font-medium'>Trendyola aktarım sağlayabileceğiniz gönderilmemiş ürününüz bul...</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
    </div>
  );
} 