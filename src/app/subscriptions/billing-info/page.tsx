import React from "react";
import Link from "next/link";

export default function BillingInfoPage() {
  return (
    <div className="min-h-screen bg-[#f4f9ff] p-8">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-[#222] mb-2">Fatura Bilgileri</h1>
        <nav className="text-sm text-[#222] flex items-center space-x-1">
          <Link href="/" className="text-[#222] font-normal hover:underline">Entekas</Link>
          <span className="mx-1 text-[#222]">/</span>
          <Link href="/settings" className="text-[#222] font-bold hover:underline">Ayarlar</Link>
          <span className="mx-1 text-[#222]">/</span>
          <Link href="/settings/account-edit" className="text-[#222] font-bold hover:underline">Hesabım</Link>
          <span className="mx-1 text-[#222]">/</span>
          <span className="text-[#7b7b7b]">Fatura Bilgileri</span>
        </nav>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[#222]">Fatura Bilgileri</h2>
          <div className="flex space-x-3">
            <button className="px-6 py-2 rounded bg-white border border-[#e5e7eb] text-[#222] font-medium hover:bg-gray-100">Vazgeç</button>
            <button className="px-6 py-2 rounded bg-[#006aff] text-white font-medium hover:bg-[#0052cc]">KAYDET</button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Firma/Şahıs */}
          <div>
            <label className="block text-xs font-bold text-[#7b7b7b] mb-1">FİRMA / ŞAHIS</label>
            <select className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#006aff]">
              <option>Şahsım adına fatura istiyorum</option>
              <option>Firma adına fatura istiyorum</option>
            </select>
          </div>

          {/* Ad, Soyad */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7b7b7b] mb-1">ADINIZ</label>
              <input type="text" className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#006aff]" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7b7b7b] mb-1">SOYADINIZ</label>
              <input type="text" className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#006aff]" />
            </div>
          </div>

          {/* TC Kimlik No */}
          <div>
            <label className="block text-xs font-bold text-[#7b7b7b] mb-1">TC KİMLİK NO(KREDİ KARTI İLE ÖDEME İÇİN ZORUNLUDUR.)</label>
            <input type="text" className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#006aff]" />
          </div>

          {/* Adres */}
          <div>
            <label className="block text-xs font-bold text-[#7b7b7b] mb-1">ADRES</label>
            <input type="text" className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#006aff]" />
          </div>

          {/* İl, İlçe */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7b7b7b] mb-1">İL</label>
              <select className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#006aff]">
                <option>ADANA</option>
                {/* Diğer iller buraya eklenebilir */}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-[#7b7b7b] mb-1">İLÇE</label>
              <select className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#006aff]">
                <option></option>
                {/* İlçeler buraya eklenebilir */}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
