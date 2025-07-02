"use client"

import Image from "next/image";
import React, { useState, useRef } from 'react';

export default function StoreDetailPage() {
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState('kapali');
  const [showScrollHint, setShowScrollHint] = useState(true);
  const rehberRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (rehberRef.current) {
      if (rehberRef.current.scrollTop > 10) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col i py-0 mb-8 w-full justify-start">
      <div className="w-full flex flex-col items-start">
        {/* Üst Başlık ve Sekme */}
        <div className="w-full flex flex-col items-start bg-white ">
          <div className="w-full flex items-center gap-3 py-1 px-0 ml-10">
            <div className="p-2 flex items-center justify-center">
              <Image src="/production.svg" alt="production" width={32} height={26} />
            </div>
            <span className="text-[20px] font-semibold text-gray-800">Akakce Ayarları</span>
          </div>
          {/* Sekme Barı */}
          <div className="w-full flex border-b border-gray-200 px-0 ml-10">
            <button className="px-0 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none text-[15px] h-[38px] min-w-[140px]">API Tanımlama</button>
          </div>
        </div>
        {/* İçerik Kutuları */}
        <div className="w-full flex flex-row gap-6 mt-8 items-stretch ml-10 mr-10 justify-center">
          {/* Sol: API Bilgileri Formu ve Kargo ve Süreç Seçimleri aynı column parent'ta */}
          <div className="w-1/2 flex flex-col">
            <div className="bg-white p-4 flex flex-col gap-5 rounded-2xl border border-[#e5e7eb] shadow-md min-h-[640px] max-h-[640px] h-[640px] overflow-y-auto">
              <div className="flex items-center gap-3 mb-0 border-b border-gray-200 pb-1">
                <div className="p-0">
                  <Image src="/akakce.svg" alt="logo" width={96} height={96} className="w-20 h-20 object-contain" />
                </div>
                <div className="text-lg font-semibold text-gray-700 ">API Bilgilerini Tanımlama</div>
              </div>
              <form className="flex flex-col gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-[14px]">API NAME <span className="text-red-500">*</span></label>
                  <input type="text" className="input w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-[15px]" placeholder="API Name" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-[14px]">API KEY <span className="text-red-500">*</span></label>
                  <input type="text" className="input w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-[15px]" placeholder="API Key" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-[14px]">API EXPORT LINK (AKAKÇEYE GÖNDERİLEN ÜRÜNLERİN LİNKİ) <span className="text-red-500">*</span></label>
                  <input type="text" className="input w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-[15px] bg-[#F3F4F6]" value="https://entekas.com" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-[14px]">API EXPORT LINK (AKAKÇEYE GÖNDERİLEN ÜRÜNLERİN İSİMLERİNİN BAŞINA MARKA EKLİ ŞEKİLDE GÖZÜKEN LİNK) <span className="text-red-500">*</span></label>
                  <input type="text" className="input w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-[15px] bg-[#F3F4F6]" value="https://entekas.com" readOnly />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-[14px]">ENTEGRASYON DURUMU</label>
                  <div className="flex gap-10 mt-2 justify-center border-b border-gray-200 pb-4">
                    <label
                      htmlFor="entegrasyon_acik"
                      className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'acik' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                    >
                      <span className="relative flex items-center">
                        <input
                          type="radio"
                          id="entegrasyon_acik"
                          name="entegrasyon_durumu"
                          checked={entegrasyonDurumu === 'acik'}
                          onChange={() => setEntegrasyonDurumu('acik')}
                          className="peer appearance-none w-4 h-4 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                        />
                        <span className={`absolute left-0 top-0 w-4 h-4 rounded-full border-2 ${entegrasyonDurumu === 'acik' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                        {entegrasyonDurumu === 'acik' && (
                          <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-blue-600"></span>
                        )}
                      </span>
                      <span className={`font-bold text-[14px] ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGRASYON AÇIK</span>
                    </label>
                    <label
                      htmlFor="entegrasyon_kapali"
                      className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'kapali' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                    >
                      <span className="relative flex items-center">
                        <input
                          type="radio"
                          id="entegrasyon_kapali"
                          name="entegrasyon_durumu"
                          checked={entegrasyonDurumu === 'kapali'}
                          onChange={() => setEntegrasyonDurumu('kapali')}
                          className="peer appearance-none w-4 h-4 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                        />
                        <span className={`absolute left-0 top-0 w-4 h-4 rounded-full border-2 ${entegrasyonDurumu === 'kapali' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                        {entegrasyonDurumu === 'kapali' && (
                          <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-blue-600"></span>
                        )}
                      </span>
                      <span className={`font-bold text-[14px] ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGRASYON KAPALI</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-bold py-2 px-7 rounded-lg text-[15px] flex items-center gap-2 min-w-[160px] h-[44px]">
                    AYARLARI KAYDET
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-white p-8 flex flex-col gap-4 rounded-2xl shadow-md border border-[#E5E7EB] mt-4">
              <div className="text-lg font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-4">Kargo ve Süreç Seçimleri</div>
              <form className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ucretsiz_kargo" className="w-4 h-4 rounded border-gray-300" />
                  <label htmlFor="ucretsiz_kargo" className="text-[14px] text-gray-700">Akakçe&#39;ye gönderilecek ürünlerde ücretsiz kargo uygulansın mı?</label>
                </div>
                <div className="flex gap-4 border-b border-gray-200 pb-4">
                  <div className="flex flex-col flex-1">
                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Kargoya Veriliş Zamanı</label>
                    <select className="input">
                      <option>Aynı Gün</option>
                      <option>Ertesi Gün</option>
                    </select>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Kargoya Veriliş Saati</label>
                    <select className="input">
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i}>{i.toString().padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-bold py-2 px-7 rounded-lg text-[15px] flex items-center gap-2 min-w-[160px] h-[44px]">
                    AYARLARI KAYDET
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Sağ: Kurulum Rehberi */}
          <div className="flex-1 min-w-0 bg-white p-8 flex flex-col gap-3 rounded-2xl mr-15 border border-[#e5e7eb] shadow-md w-1/2 mx-0 min-h-[640px] max-h-[640px] h-[640px] overflow-y-auto">
            <div className="flex items-center justify-between mb-2 border-b border-gray-200 pb-3">
              <div className="text-lg font-semibold">Kurulum Rehberi</div>
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
            
            <div
              ref={rehberRef}
              onScroll={handleScroll}
              className="bg-white text-gray-800 text-[15px] leading-relaxed border-b border-gray-200 pb-3 overflow-y-auto flex-1 pr-2"
              style={{ transition: 'box-shadow 0.2s', boxShadow: showScrollHint ? '0 2px 8px 0 rgba(239,68,68,0.04)' : 'none' }}
            >
              <div className="font-semibold">1- API Bilgilerinizi Tanımlayın</div>
              <div className="mt-1 font-light">
                Akakçe entegrasyonunu gerçekleştirebilmek için ilk olarak API Bilgisi alanı gerekmektedir. Bu bilgilere Akakçe yönetim panelinizden ulaşabilirsiniz.<br />
                *API bilgisini nasıl alacağınız öğrenmek için ilgili destek yazımıza inceleyebilirsiniz.<br />
                API bilgisini aldıktan sonra Akakçe API Ayarları sayfasının API Bilgilerini Tanımlama kısmında bulunan API Name alanına API Kullanıcı Adını, API KEY kısmına da Şifre bilgilerini yazmalısınız.<br />
              </div>
              <div className="font-semibold mt-2">2- Ürünlerinizi Aktarın</div>
              <div className="mt-1 font-light">
              Ürünlerinizi Entekas&#39;a aktarmadan önce Kargo ve Süreç Seçimlerinizi ve Sabit Ürün Açıklaması alanları ile ilgili ayarlamaları yapabilirsiniz.

İlgili ayarlamaları tamamladıktan sonra sayfanın sol üst kısmında bulunan Ürünleri Ve Fiyatları Aktar butonuna tıklayın. Açılan sayfada ürün aktarımı ile ilgili aktarım kurallarını özelleştirip İşlemi Onayla butonuna tıklayarak aktarma işlemini başlatabilirsiniz.
              </div>
              <div className="font-semibold mt-2">3- Aktarım Detaylarını İnceleyin</div>
              <div className="mt-1 font-light">
              Aktarım işlemi tamamlandıktan sonra sayfanın sağ üst kısmında bulunan Aktarım Detayları alanında aktarım işlemi ile ilgili detaylı bilgiye ulaşabilirsiniz.

Mavi alanda aktarılan toplam ürün adedi bilgisi yer alır.

Yeşil alanda aktarılan ürünler ile eşleşen ürünlerin(Entekas&#39;da olan ürünlerle) toplam adet bilgisi yer alır.

Turuncu alanda ise aktarılan ürünler ile eşleşmeyen ürünlerin(Entekas&#39;da olan ürünlerle) toplam adet bilgisi yer alır.


              </div>
            </div>
            <div className="flex justify-center mt-2">
              <button className="border-2 border-[#eff6ff] text-blue-600 font-bold text-[15px] px-6 py-2 rounded-lg bg-white hover:bg-[#eff6ff] transition-all shadow-sm min-w-[260px] h-[44px]">DETAYLI KURULUM REHBERİNİ İNCELE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
} 