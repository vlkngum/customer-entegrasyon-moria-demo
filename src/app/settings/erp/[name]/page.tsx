"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { GiShop } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import React, { useState } from 'react';

export default function ErpDetailPage() {
  const params = useParams();
  let erpNameRaw = params?.name || '';
  if (Array.isArray(erpNameRaw)) {
    erpNameRaw = erpNameRaw.join('-');
  }
  const erpName = decodeURIComponent(erpNameRaw);

  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState('kapali');

  if (erpName === 'Trendyol E-faturam (Sovos)') {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8">
        <div className="w-full flex flex-col items-start bg-white shadow-sm px-4 md:px-8 lg:px-16">
          <div className="w-full flex items-center gap-3 py-6 px-0">
            <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
              <span className="text-2xl text-blue-600"><GiShop /></span>
            </div>
            <span className="text-2xl font-semibold text-gray-800">DigitalPlanet Ayarları</span>
          </div>
          <div className="w-full flex border-b border-gray-200 px-0">
            <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">Ayarlar</button>
          </div>
        </div>
        <div className="w-full mb-6 px-4 md:px-8 lg:px-16 mt-4">
          <div className="text-base flex items-center gap-1 mb-2">
            <Link href="/" className="font-semibold text-[#222] hover:underline">Entekas</Link>
            <span className="mx-1 text-gray-400">/</span>
            <Link href="/settings" className="text-[#444] hover:underline">Ayarlar</Link>
            <span className="mx-1 text-gray-400">/</span>
            <span className="text-gray-400">DigitalPlanet Ayarları</span>
          </div>
        </div>
        <form className="w-full max-w-7xl bg-white rounded-lg shadow-md p-8 flex flex-col gap-8">
          {/* DigitalPlanet Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">DIGITALPLANET ŞİRKET KODU*</label>
              <input className="w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold mb-1">DIGITALPLANET KULLANICI ADI*</label>
              <input className="w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold mb-1">DIGITALPLANET KULLANICI ŞİFRESİ*</label>
              <input className="w-full border rounded px-3 py-2" type="password" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold mb-1">FATURA TİPİ*</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Temel Fatura</option>
                <option>Ticari Fatura</option>
              </select>
            </div>
          </div>
          {/* Vergi Bilgileri */}
          <div>
            <div className="font-semibold mb-2">Vergi Bilgileri</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block mb-1">Vergi Numarası*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Vergi Dairesi*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">MERSİS Numarası*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Sicil Numarası*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
            </div>
          </div>
          {/* Fatura Bilgileri */}
          <div>
            <div className="font-semibold mb-2">Fatura Bilgileri</div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <label className="block mb-1">Gönderici Posta Adresi*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">E-Fatura Numara Eki*</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Üç harf, örneğin Entekas şrl" />
              </div>
              <div>
                <label className="block mb-1">E-Arşiv Numara Eki</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Üç harf, örneğin Entekas şrl" />
              </div>
              <div>
                <label className="block mb-1">Son Kesilen Fatura No</label>
                <input className="w-full border rounded px-3 py-2" defaultValue={0} />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              (Fatura ön ekleri hakkında *)Fatura seri numaraları oluşturulurken numaraların başına size özel 3 harf eklenmektedir. Kendi ön ekinizi 3 büyük harften oluşacak şekilde belirtmeniz gerekmektedir. 1. ön ek e-Fatura sisteminde, 2. ön ek e-Arşiv sistemine gönderilen faturalar için kullanılacak. Entegratör değiştiriyorsanız, fatura numaranızın çakışmaması için yeni ön ekler belirleyiniz.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className="block mb-1">Telefon*</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Faturada yazacak olan telefon numarası" />
              </div>
              <div>
                <label className="block mb-1">E-Posta*</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Faturada yazacak olan E-posta adresi" />
              </div>
              <div>
                <label className="block mb-1">Web Sitesi</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block mb-1">Fatura İmzası</label>
                <input type="file" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Firma Logosu</label>
                <input type="file" className="w-full border rounded px-3 py-2" />
              </div>
            </div>
          </div>
          {/* Fatura Sabit Bilgileri */}
          <div>
            <div className="font-semibold mb-2">Fatura Sabit Bilgileri</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1">Sabit Fatura Açıklaması</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Ön Tanımlı Kargo Firması*</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Kargo Şirketi Seç</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-1">Pazaryerlerinden Gelen Ara Fark Açıklaması</label>
              <input className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          {/* Ek Ayarlar */}
          <div>
            <div className="font-semibold mb-2">Ek Ayarlar</div>
            <div className="mb-4">
              <label className="block mb-1">E-fatura/E-Arşiv faturalarınızda kargo kampanya kodu barkod olarak eklensin mi?</label>
              <div className="flex gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="barkod" id="barkod_hayir" className="accent-blue-600" defaultChecked />
                  <label htmlFor="barkod_hayir">HAYIR</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="barkod" id="barkod_evet" className="accent-blue-600" />
                  <label htmlFor="barkod_evet">EVET</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">ENTEGASYON DURUMU</label>
              <div className="flex gap-6 mt-2">
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
                  <span className={`font-bold ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
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
                  <span className={`font-bold ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg text-lg">KAYDET</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8">
      {/* Üst Başlık ve Sekme */}
      <div className="w-full flex flex-col items-start bg-white shadow-sm px-4 md:px-8 lg:px-16">
        <div className="w-full flex items-center gap-3 py-6 px-0">
          <Image src="/production.svg" alt="production" width={32} height={26} />
          <span className="text-2xl font-semibold text-gray-800">{erpName} Ayarları</span>
        </div>
        {/* Sekme Barı */}
        <div className="w-full flex border-b border-gray-200 px-0">
          <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">API Tanımlama</button>
        </div>
      </div>
      {/* Breadcrumb */}
      <div className="w-full mb-6 px-4 md:px-8 lg:px-16 mt-4">
        {/* Breadcrumb can be added here if needed */}
      </div>
      {/* İçerik Kutuları */}
      <div className="w-full flex gap-8 px-4 md:px-8 lg:px-16">
        {/* Sol: API Bilgileri Formu */}
        <div className="w-full bg-white p-8 flex flex-col gap-6 border-r border-gray-100 min-w-[350px] rounded-xl">
          <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-200 pb-4">
            <div className="text-xl font-semibold text-gray-700">API Bilgilerini Tanımlama</div>
          </div>
          <form className="flex flex-col gap-4 b">
            <div>
              <label className="block text-gray-700 font-medium mb-1">SUNUCU ADI <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">KULLANICI ADI <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" placeholder="ı" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">ŞİFRE <span className="text-red-500">*</span></label>
              <input type="password" className="input w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">API KEY <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">FİRMA KODU <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">DÖNEM KODU <span className="text-red-500">*</span></label>
              <input type="text" className="input w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">ENTEGASYON DURUMU</label>
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
                  <span className={`font-bold ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
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
                  <span className={`font-bold ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
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