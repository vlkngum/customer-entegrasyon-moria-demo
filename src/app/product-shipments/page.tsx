"use client";
import React from "react";
import { GiShop } from "react-icons/gi";
import { FiFilePlus } from "react-icons/fi";
import FilterDrawer from "@/components/product-shipments/FilterDrawer";
import { useState } from "react";
import FilterStatusBar from "@/components/product-shipments/FilterStatusBar";
import { useRouter } from "next/navigation";



export default function BulkTransactionsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f4f8fd] flex flex-col">
      {filterApplied && (
        <FilterStatusBar onClear={() => setFilterApplied(false)} />
      )}
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-blue-600"><GiShop /></span>
          <span className="font-semibold text-xl text-gray-800">Toplu Ürün Gönderimi</span>
        </div>
        <div className="flex gap-6">
          {/* Detaylı Filtrele Button */}
          <button
            className="border_button hover:shadow-md transition group focus:outline-none"
            onClick={() => setFilterOpen(true)}
          >
            <FiFilePlus className="text-lg mb-1 text-gray-500 group-hover:text-blue-600 transition" />
            <span className="text-[11px] font-semibold text-gray-600 group-hover:text-blue-700 tracking-wide">DETAYLI FİLTRELE</span>
          </button>
          {/* Yeni Toplu Ürün Gönderimi Başlat Button */}
          <button className="border_button hover:shadow-md transition group focus:outline-none" onClick={() => router.push("/product-shipments/new")}>
            <FiFilePlus className="text-lg mb-1 text-gray-500 group-hover:text-blue-600 transition" />
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
        <button className="text-gray-500 pb-2" onClick={() => router.push("/product-shipments/new")}>Yeni Toplu Ürün Gönderimi Başlat</button>
      </div>

      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-red-500 via-orange-400 to-orange-500 text-white px-8 py-2 flex items-center gap-2 text-sm font-semibold">
        <span>❗</span>
        Kısıtlı kullanıma sahipsiniz. Deneme yapmak için seçimlerinizden başarılı <span className="font-bold">ilk 100 adet</span> ürününüz platforma gönderilecektir. – Yıllık pakete geç, <span className="font-bold">sınırsız gönderim yap!</span> 🥳
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {filterApplied && (
          <FilterStatusBar onClear={() => setFilterApplied(false)} />
        )}
        {/* ÜRÜN DURUMU etiketi ve baloncuğu */}
        {filterApplied && (
          <div className="w-full flex flex-col items-center mt-2 mb-2 bg-white rounded-xl shadow-md p-4 px-2">
            <span className="text-xs text-gray-400 mb-1">ÜRÜN DURUMU</span>
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-1">
              <span className="font-bold text-gray-700 text-sm">Duraklatıldı</span>
              <button className="ml-2 bg-red-600 text-white rounded-full p-1 flex items-center justify-center"><svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'><path d='M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2'></path></svg></button>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-md p-10 mt-10 flex flex-col items-center w-full max-w-2xl">
          <h2 className="text-lg font-bold text-center text-gray-700 mb-2">DAHA ÖNCE HİÇ TOPLU ÜRÜN GÖNDERİMİ YAPMAMIŞSINIZ</h2>
          <p className="text-gray-500 text-center mb-6">Toplu ürün gönderimi başlatmak için "Yeni Toplu Ürün Gönderimi Başlat" butonuna tıklayabilirsiniz.</p>
          <img
            src="/bulk-products-illustration.webp"
            alt="Toplu Ürün Gönderimi Görseli"
            className="mb-6 w-full max-w-md mx-auto"
          />
          
          <button className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition">YENİ TOPLU ÜRÜN GÖNDERİMİ BAŞLAT</button>
        </div>
      </main>
    </div>
  );
}
