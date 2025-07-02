"use client"

import { GiShop } from 'react-icons/gi';
import Image from "next/image";
import React, { useState } from 'react';

export default function StoreDetailPage() {
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState('kapali');

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8">
      {/* Üst Başlık ve Sekme */}
      <div className="w-full flex flex-col items-center bg-white shadow-sm">
        <div className="w-full max-w-7xl flex items-center gap-3 py-6 px-4">
          <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
            <span className="text-2xl text-blue-600"><GiShop /></span>
          </div>
          <span className="text-2xl font-semibold text-gray-800">Akakce Ayarları</span>
        </div>
        {/* Sekme Barı */}
        <div className="w-full max-w-7xl flex border-b border-gray-200 px-4">
          <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">API Tanımlama</button>
          {/* Diğer sekmeler eklenebilir */}
        </div>
      </div>
      {/* Breadcrumb */}
      <div className="w-full max-w-7xl mb-6 px-4 mt-4">
        
      </div>
      {/* İçerik Kutuları */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row overflow-hidden relative mx-4 md:mx-12 xl:mx-32 gap-8">
        {/* Sol: API Bilgileri Formu */}
        <div className="w-full bg-white p-8 flex flex-col gap-6 border-r border-gray-100 min-w-[350px] rounded-xl">
          <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-200 pb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Image src="/akakce.svg" alt="logo" width={0} height={0} className="w-10 h-10 object-contain" />
            </div>
            <div className="text-xl font-semibold text-gray-700 ">API Bilgilerini Tanımlama</div>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">API NAME <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" placeholder="API Name" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">API KEY <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" placeholder="API Key" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">API EXPORT LINK (AKAKÇEYE GÖNDERİLEN ÜRÜNLERİN LİNKİ) <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" value="https://entekas.com" readOnly />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">API EXPORT LINK (AKAKÇEYE GÖNDERİLEN ÜRÜNLERİN İSİMLERİNİN BAŞINA MARKA EKLİ ŞEKİLDE GÖZÜKEN LİNK) <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" value="https://entekas.com" readOnly />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">ENTEGRASYON DURUMU</label>
              <div className="flex gap-6 mt-2 border-b-2 border-gray-200 pb-4">
                <label
                  htmlFor="entegrasyon_acik"
                  className={`flex items-center gap-3 px-6 py-4 min-w-[260px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'acik' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="relative flex items-center">
                    <input
                      type="radio"
                      id="entegrasyon_acik"
                      name="entegrasyon_durumu"
                      checked={entegrasyonDurumu === 'acik'}
                      onChange={() => setEntegrasyonDurumu('acik')}
                      className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                    />
                    <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${entegrasyonDurumu === 'acik' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                    {entegrasyonDurumu === 'acik' && (
                      <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                    )}
                  </span>
                  <span className={`font-bold ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGRASYON AÇIK</span>
                </label>
                <label
                  htmlFor="entegrasyon_kapali"
                  className={`flex items-center gap-3 px-6 py-4 min-w-[260px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'kapali' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="relative flex items-center">
                    <input
                      type="radio"
                      id="entegrasyon_kapali"
                      name="entegrasyon_durumu"
                      checked={entegrasyonDurumu === 'kapali'}
                      onChange={() => setEntegrasyonDurumu('kapali')}
                      className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                    />
                    <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${entegrasyonDurumu === 'kapali' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                    {entegrasyonDurumu === 'kapali' && (
                      <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                    )}
                  </span>
                  <span className={`font-bold ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGRASYON KAPALI</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button type="submit" className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-bold py-3 px-10 rounded-lg text-base flex items-center gap-2">
                AYARLARI KAYDET
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </form>
        </div>
        {/* Sağ: Kurulum Rehberi */}
        <div className="w-full h-fit bg-white p-8 flex flex-col gap-4 rounded-xl border border-[#e5e7eb] shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-4">
            <div className="text-xl font-semibold">Kurulum Rehberi</div>
            <button className="flex items-center gap-2 bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-full hover:bg-red-200 text-sm shadow-none focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#fff"/><polygon points="10,8 16,12 10,16" fill="#ef4444"/></svg>
              VİDEOLU ANLATIM
            </button>
          </div>
          <div className="bg-white text-gray-800 text-base leading-relaxed border-b border-gray-200 pb-4">
            <div>1- API Bilgilerinizi Tanımlayın</div>
            <div className="mt-2">
              - Dia tarafındaki müşteri destek ekibinden api bilgilerinizi istemeniz gerekmektedir.<br />
              - Api bilgilerinizin ardından kullanıcılarınıza yetki vermeyi dia panelinden unutmayınız!<br />
              - İlgili alınan bilgileri sol taraftaki alanlara yazıp Ayarları kaydet butonuna tıklamanız gerekmektedir.<br />
              - Sonrasında aşağıdaki alandan mutlaka adres bilgilerinizi giriniz.
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="border-2 border-[#eff6ff] text-blue-600 font-bold text-lg px-8 py-3 rounded-lg bg-white hover:bg-[#eff6ff] transition-all shadow-sm">
              DETAYLI KURULUM REHBERİNİ İNCELE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 