"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

export default function OpencartSettingsPage() {
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState("kapali");

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0  bg-[#f2f8ff]">
      {/* Üst Başlık ve Sekme */}
      <div className="w-full flex flex-col items-start bg-white px-2 md:px-4 lg:px-6">
        <div className="w-full flex items-center gap-3 py-6 px-0">
          <Image src="/production.svg" alt="opencart" width={32} height={26} />
          <span className="text-2xl font-semibold text-gray-800">Opencart Ayarları</span>
        </div>
        {/* Sekme Barı */}
        <div className="w-full flex px-0">
          <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">API Tanımlama</button>
        </div>
      </div>
      {/* İçerik Kutuları */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-4 lg:px-6 mt-8">
        {/* Sol: API Bilgileri Formu */}
        <div className="bg-white p-8 flex flex-col gap-6 rounded-xl shadow-sm min-w-[320px] h-full self-stretch">
          <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-200 pb-4">
            <div className="text-xl font-semibold text-[#37474f]">API Bilgilerini Tanımlama</div>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-[#5d6e76] font-black mb-1">
                SİTE LİNKİ (LÜTFEN SONUNDA &quot;/&quot; İLE BİRLİKTE YAZINIZ.) <span className="text-red-500">*</span>
              </label>
              <input type="text" className="input" placeholder="" />
            </div>
            <div>
              <label className="block text-[#5d6e76] font-black mb-1">
                OPENCART EKLENTİSİ <span className="text-red-500">*</span>
              </label>
              <a
                href="#"
                className="flex items-center gap-2 bg-[#19c2d1] hover:bg-[#13aab7] text-white font-semibold px-6 py-3 rounded-md text-base transition-colors w-1/2 justify-center mt-2 mb-2"
              >
                <FaDownload className="text-lg" />
                Eklentiyi indirmek için tıklayınız
              </a>
            </div>
            <div>
              <label className="block text-[#5d6e76] font-black mb-1">ENTEGRASYON DURUMU</label>
              <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 mt-2 border-b-2 border-gray-200 pb-4">
                <label
                  htmlFor="entegrasyon_acik"
                  className={`flex-1 flex items-center gap-3 px-6 py-4 min-w-[160px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'acik' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
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
                  <span className={`font-bold ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
                </label>
                <label
                  htmlFor="entegrasyon_kapali"
                  className={`flex-1 flex items-center gap-3 px-6 py-4 min-w-[160px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'kapali' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
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
                  <span className={`font-bold ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button type="submit" className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-bold py-3 px-10 rounded-lg text-base flex items-center gap-2">
                AYARLARI KAYDET
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </form>
        </div>
        {/* Sağ: Kurulum Rehberi */}
        <div className="bg-white p-8 flex flex-col gap-4 rounded-xl border border-[#e5e7eb] shadow-sm min-w-[320px] h-full self-stretch">
          <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-4">
            <div className="text-xl text-[#37474f] font-semibold">Kurulum Rehberi</div>
            <button className="group flex items-center gap-2 bg-[#fedfdf] text-[#d00527] font-semibold px-4 py-2 rounded-full hover:bg-[#d0021b] hover:text-white text-sm shadow-none focus:outline-none transition-colors">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#d00527] group-hover:bg-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polygon 
                    points="6,4.5 12,8 6,11.5" 
                    className="fill-white group-hover:fill-[#d00527] transition-colors"
                  />
                </svg>
              </span>
              VİDEOLU ANLATIM
            </button>
          </div>
          <div className="bg-white text-gray-800 text-base leading-relaxed border-b border-gray-200 pb-4">
            <div>1- API Bilgilerinizi ve Eklenti Kurulumunu Tamamlayın</div>
            <div className="mt-2">
            Opencart entegrasyonunu gerçekleştirebilmek için ilk olarak Opencart Entekas Eklentisini indirmeniz gerekiyor. Bu işlemi API Bilgilerini Tanımlama kısmında bulunan Opencart Entekas Eklentisini İndirmek İçin Tıklayın yazan butonuna basarak gerçekleştirebilirsiniz.<br /><br />

*Eklentiyi indirdikten sonra kurulumun nasıl yapılacağını öğrenmek için ilgili destek yazımızı inceleyebilirsiniz.<br /><br />

Eklenti kurulumu tamamlandıktan sonra API Bilgilerini Tanımlama kısmında bulunan Site Linki alanına sitenizin adresini (sonuna / işareti ekleyerek) yazmalısınız.
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
