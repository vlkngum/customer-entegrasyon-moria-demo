"use client";
import React from "react";
import { FiLock, FiTrash2, FiEdit3 } from "react-icons/fi";
import FilterDrawer from "@/components/product-shipments/FilterDrawer";
import { useState } from "react";
import FilterStatusBar from "@/components/product-shipments/FilterStatusBar";
import { useRouter } from "next/navigation";
import { FiTag } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import Image from "next/image";

import Error from "@/components/product-shipments/Error";

const dummyData = [
  {
    id: 1,
    platform: {
      name: "Trendyol",
      logo: "/trendyolLogo.svg",
      code: "#677641",
    },
    type: "SEÇİLEN ÜRÜNLER",
    date: "20-06-2025 19:45",
    checkedCount: 1,
    errorCount: 1,
    transferableCount: 0,
    status: "Hatalı",
    statusColor: "red",
    report: true,
    error: true,
  },
  {
    id: 2,
    platform: {
      name: "Trendyol",
      logo: "/trendyolLogo.svg",
      code: "#677642",
    },
    type: "SEÇİLEN ÜRÜNLER",
    date: "21-06-2025 19:45",
    checkedCount: 2,
    errorCount: 0,
    transferableCount: 2,
    status: "Başarılı",
    statusColor: "green",
    report: true,
    error: false,
  },
];

export default function BulkTransactionsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/product.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/>Toplu Ürün Gönderimi</h1>
        </div>
        <div className="flex gap-6">
          {/* Detaylı Filtrele Button */}
          <button
            className="border_button hover:shadow-md transition group focus:outline-none"
            onClick={() => setFilterOpen(true)}
          >
             <Image src="/hizliEkle.svg" alt="hizliEkle" width={20} height={20} />
            <span className="text-[11px] font-semibold text-gray-600 group-hover:text-blue-700 tracking-wide">DETAYLI FİLTRELE</span>
          </button>
          {/* Yeni Toplu Ürün Gönderimi Başlat Button */}
          <button className="border_button hover:shadow-md transition group focus:outline-none" onClick={() => router.push("/batch-processing/add")}>
          <Image src="/hizliEkle.svg" alt="hizliEkle" width={20} height={20} />
            <span className="text-[11px] font-semibold text-gray-600 group-hover:text-blue-700 tracking-wide">YENİ TOPLU ÜRÜN GÖNDERİMİ BAŞLAT</span>
          </button>
        </div>
      </header>

      {filterOpen && (
        <FilterDrawer onClose={() => setFilterOpen(false)} onFilter={() => { setFilterApplied(true); setFilterOpen(false); }} />
      )}

      {/* Tabs */}
      <div className="bg-white px-8 pt-4 flex gap-8 border-b border-gray-200">
        <button className="text-blue-700 font-semibold border-b-2 border-blue-700 pb-2">Toplu Ürün Gönderimi İşlemleri</button>
        <button className="text-gray-500 pb-2" onClick={() => router.push("/batch-processing/add")}>Yeni Toplu Ürün Gönderimi Başlat</button>
      </div>

      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-red-500 via-orange-400 to-orange-500 text-white px-8 py-2 flex items-center gap-2 text-sm font-semibold">
        <span>❗</span>
        Kısıtlı kullanıma sahipsiniz. Deneme yapmak için seçimlerinizden başarılı <span className="font-bold">ilk 100 adet</span> ürününüz platforma gönderilecektir. – Yıllık pakete geç, <span className="font-bold">sınırsız gönderim yap!</span> 🥳
      </div>

      <main className="flex-1 flex flex-col items-center justify-start w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* FİLTRE DURUMU */}
          {filterApplied && (
            <div className="mb-4">
              <FilterStatusBar onClear={() => setFilterApplied(false)} />
            </div>
          )}

          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 bg-transparent text-sm font-bold text-gray-500 border-b-2 border-gray-200 pb-3">
            <div className="p-2 text-center">PLATFORM</div>
            <div className="p-2 col-span-3">İŞLEM DETAYLARI</div>
            <div className="p-2 text-center">DURUM BİLGİSİ</div>
            <div className="p-2 text-center col-span-2">İŞLEMLER</div>
          </div>
          {/* Data Rows */}
          <div className="space-y-4 mt-4">
            {dummyData.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-7 gap-4 bg-white items-center rounded-xl shadow-sm p-4">
                {/* PLATFORM */}
                <div className="flex flex-col items-center justify-center gap-2">
                  <Image src={item.platform.logo} alt={item.platform.name} width={64} height={64} className="w-16 h-16 object-contain" />
                  <div className="text-sm text-gray-500 font-medium">{item.platform.code}</div>
                </div>
                
                {/* İŞLEM DETAYLARI */}
                <div className="col-span-3 flex flex-row items-start justify-start gap-8">
                  {/* Sol Taraf: İşlem Tipi ve Tarih */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <FiTag className="text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">İŞLEM TİPİ: <span className="font-bold text-black">{item.type}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">TARİH: {item.date}</span>
                    </div>
                  </div>
                  
                  {/* Sağ Taraf: Ürün Sayıları */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FiLock className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-600">KONTROL EDİLEN ÜRÜN SAYISI: <span className="font-bold text-black">{item.checkedCount}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiLock className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-600">HATALI ÜRÜN SAYISI: <span className="font-bold text-black">{item.errorCount}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiLock className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-600">AKTARILABİLECEK ÜRÜN SAYISI: <span className="font-bold text-black">{item.transferableCount}</span></span>
                    </div>
                  </div>
                </div>
                
                {/* DURUM BİLGİSİ */}
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="text-xs text-gray-500">İşlem Durumu</div>
                  <span className={`px-4 py-1 rounded-full font-semibold text-xs flex items-center gap-2 ${item.statusColor === 'red' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    <span className={`w-2 h-2 rounded-full ${item.statusColor === 'red' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    {item.status}
                  </span>
                </div>
                
                {/* İŞLEMLER */}
                <div className="col-span-2 flex items-center justify-center gap-3">
                  <button 
                    onClick={() => router.push('/batch-processing/product-shipments/report')}
                    className="bg-blue-100 text-blue-700 px-5 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-2 hover:bg-blue-200 whitespace-nowrap"
                  >
                    <FiEdit3 size={15}/> RAPOR GÖRÜNTÜLE
                  </button>
                  <button className="bg-red-100 text-red-700 px-5 py-2.5 rounded-lg font-semibold text-xs flex items-center gap-2 hover:bg-red-200 whitespace-nowrap">
                    <FiTrash2 size={15}/> SİL
                  </button>
                </div>
              </div>
            ))}
          </div>

          {dummyData.length === 0 && (
            <div className="mt-4">
              <Error onClick={() => router.push("/batch-processing/new-bulk-product-shipment")} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
