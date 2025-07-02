"use client";

import React, { useState } from "react";

export default function IdeasoftSettings() {
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState(false);

  return (
    <div className="bg-[#f1f6fd] min-h-screen py-5">
      {/* Başlık ve breadcrumb alanı */}
      <div className="w-[900px] max-w-full mb-12 pl-7">
        <div className="text-[24px] font-bold text-[#3a3a3a] mb-1 font-inherit">Ideasoft Ayarları</div>
        <div className="text-[15px] font-normal text-[#222] flex items-center gap-1">
          <span className="text-[#222] font-semibold">Entekas</span>
          <span className="text-[#b0b8c1] font-normal">/</span>
          <span className="text-[#222] font-normal">Ayarlar</span>
          <span className="text-[#b0b8c1] font-normal">/</span>
          <span className="text-[#b0b8c1] font-normal">Ideasoft Ayarları</span>
        </div>
      </div>
      <div className="w-2/3 max-w-full bg-white rounded-xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative ml-7">
        <form autoComplete="off">
          {/* Site Linki ve Client Bilgileri */}
          <div className="mb-6">
            <label className="block text-[13px] font-medium mb-1 text-[#222]">SITE LINKI(LÜTFEN SONUNDA / ILE BIRLIKTE YAZINIZ.)</label>
            <input className="input w-full mb-4" />
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-[13px] font-medium mb-1 text-[#222]">CLIENT ID</label>
                <input className="input w-full" />
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-medium mb-1 text-[#222]">CLIENT SECRET</label>
                <input className="input w-full" />
              </div>
            </div>
          </div>

          {/* Fiyatlandırma Ayarları */}
          <div className="font-semibold text-[16px] my-8 text-[#222]">Fiyatlandırma Ayarları</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">N11 Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Gittigidiyor Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Hepsiburada Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Trendyol Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Çiçeksepeti Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">PTTAvm Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Pazarama Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Akakçe Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Amazon Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1 text-[#222]">İdefix Fiyat Tipi</label>
              <select className="input w-full"><option>Fiyat 1</option></select>
            </div>
          </div>

          {/* Entegrasyon Durumu ve Stok/Fiyat Güncelleme */}
          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              <label className="block text-xs text-black-200 mb-1">Entegrasyon Durumu</label>
              {entegrasyonDurumu ? (
                <div
                  className="flex items-center justify-center w-full px-2 py-2.5 rounded-md font-semibold transition-colors duration-200 bg-[#23db8b] text-white h-[42px] cursor-pointer"
                  onClick={() => setEntegrasyonDurumu(false)}
                  onMouseOver={e => (e.currentTarget.style.background = '#589ffc')}
                  onMouseOut={e => (e.currentTarget.style.background = '#23db8b')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mr-2" style={{ display: "inline-block" }}>
                    <path d="M5 10.5L9 14.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-semibold">AKTİF</span>
                </div>
              ) : (
                <div
                  className="flex items-center justify-center w-full rounded-md transition-colors duration-200 bg-[#f3f7f9] text-[#76838f] h-[42px] cursor-pointer"
                  onClick={() => setEntegrasyonDurumu(true)}
                  onMouseOver={e => (e.currentTarget.style.background = '#f3f7f9')}
                  onMouseOut={e => (e.currentTarget.style.background = '#f3f7f9')}
                >
                  <span className="inline-block mr-2" style={{ width: 10, height: 10, borderRadius: "50%", background: "#bfc9d9" }}></span>
                  <span className="font-semibold">PASİF</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-[13px] font-medium mb-1 text-[#222]">Stoklar ve Fiyatlar Ideasoft Sitenizde Güncellensin mi ?</label>
              <select className="input w-full"><option>Stoklar ve Fiyatlar Güncellensin</option></select>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="bg-[#007aff] text-white border-0 rounded-md px-11 py-[14px] font-semibold text-[17px] cursor-pointer shadow-[0_2px_8px_rgba(0,122,255,0.08)]">
              KAYDET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
