"use client";
import React from "react";
import Image from "next/image";

export default function BulkProductUpdatesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex items-center w-full mx-auto">
        <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/product.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/>Toplu Ürün Gönderimi</h1>
        
      </header>

      {/* Sekme */}
      <div className="bg-white px-8 pt-4 flex gap-8 border-b border-gray-200 w-full mx-auto">
        <button className="text-blue-700 font-semibold border-b-2 border-blue-700 pb-2">Toplu Ürün Güncelleme İşlemlerim</button>
      </div>

      {/* Banner */}
      <div className="w-full max-w-none bg-gradient-to-r from-[#f44336] via-[#ff9800] to-[#ff9800] text-white px-8 py-2 flex items-center gap-2 text-sm font-semibold mt-2 rounded">
        <span>❗</span>
        <span>Kısıtlı kullanıma</span> <span className="font-bold">sahipsiniz.</span> Deneme yapmak için seçimlerinizden başarılı <span className="font-bold">ilk 100 adet</span> ürününüz platforma gönderilecektir. – Yıllık pakete geç, <span className="font-bold">sınırsız gönderim yap!</span> 🥳
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="bg-white rounded-xl shadow-md px-10 py-20 mt-10 flex flex-col items-center w-full max-w-5xl">
          
          <h2 className="text-lg font-bold text-center text-gray-700 mb-2">DAHA ÖNCE HİÇ TOPLU ÜRÜN GÜNCELLEMESİ YAPMAMIŞSINIZ</h2>
          <p className="text-gray-500 text-center mb-6">Toplu ürün güncellemesi başlatmak için ürün listenizden toplu işlemler ekranından yapabilirsiniz.</p>
          <Image
            src="/bulk-products-illustration.webp"
            alt="Toplu Ürün Gönderimi Görseli"
            width={800}
            height={400}
            className="mb-6 w-full max-w-xxl mx-auto"
          />
          <button className="bg-green-600 text-white mt-10 px-6 py-3 rounded font-semibold hover:bg-green-700 transition">ÜRÜN LİSTESİNE GİT</button>
        </div>
      </main>
    </div>
  );
}
