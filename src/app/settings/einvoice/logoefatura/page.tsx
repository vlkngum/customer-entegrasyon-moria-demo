"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function LogoEFaturaAyarlar() {
  const [integration, setIntegration] = useState(false);
  const [barcode, setBarcode] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8ff] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <span className="text-blue-600">
           <img src="/elogo.svg" alt="Logo" width={24} height={24} />
          </span>
          Logo E-Fatura Ayarları
        </h1>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-blue-600 font-medium text-sm border-b-2 border-blue-600 pb-1">Logo E-Fatura Ayarları</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sol Form Alanı */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
            {/* Kart başlık ve logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 flex items-center justify-center ">
                <img src="/elogo.svg" alt="Logo" className="w-full h-full" />
              </div>
              <div className="font-semibold text-lg">Logo E-Fatura Ayarları</div>
            </div>
            {/* Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">KULLANICI KODU</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ŞİFRE</label>
                  <input type="password" className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">FATURA TİPİ</label>
                <select className="w-full border rounded px-3 py-2 text-sm bg-white">
                  <option>Fatura Tipi Seçiniz</option>
                </select>
              </div>
              <div className="font-semibold text-base mt-4 mb-2">Vergi Bilgileri</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ŞİRKET TÜRÜ</label>
                  <select className="w-full border rounded px-3 py-2 text-sm bg-white">
                    <option>Limited Şirket veya Anonim Şirketi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ŞİRKET ÜNVANI</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Şirket Unvanınız" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">VERGİ NUMARASI</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Vergi Numaranız" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">VERGİ DAİRESİ</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Vergi Daireniz" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">MERSİS NUMARASI</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Mersis Numaranız" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SİCİL NUMARASI</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Ticaret Sicil Numaranız" />
                </div>
              </div>
              <div className="font-semibold text-base mt-4 mb-2">Fatura Sabit Bilgileri</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">E-FATURA NUMARA EKİ</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Ör: harf, örneğin Sopay şirketi için SOP gibi" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-ARŞİV NUMARA EKİ</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="Ör: harf, örneğin Sopay şirketi için SPY gibi" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">TELEFON</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" placeholder="(5XX) XXX XX XX" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-POSTA</label>
                  <input type="email" className="w-full border rounded px-3 py-2 text-sm" placeholder="ornek@mail.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">WEB SİTE</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" />
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium mb-1">FATURA İMZASI</label>
                  <input type="file" className="w-full border rounded px-3 py-2 text-sm file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-blue-50 file:text-blue-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">FİRMA LOGOSU</label>
                  <input type="file" className="w-full border rounded px-3 py-2 text-sm file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-blue-50 file:text-blue-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ÖN TANIMLI KARGO FİRMASI</label>
                  <select className="w-full border rounded px-3 py-2 text-sm bg-white">
                    <option>Kargo Şirketi Seç</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-FATURA/E-ARŞİV FATURALARINIZDA KARGO KAMPANYA KODU BARKOD OLARAK EKLENSİN Mİ?</label>
                  <div className="flex items-center gap-4 mt-1">
                    <label className="inline-flex items-center">
                      <input type="radio" name="barcode" checked={!barcode} onChange={() => setBarcode(false)} className="form-radio text-blue-600" />
                      <span className="ml-2">Hayır</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="barcode" checked={barcode} onChange={() => setBarcode(true)} className="form-radio text-blue-600" />
                      <span className="ml-2">Evet</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ENTEGRASYON DURUMU</label>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setIntegration(!integration)}
                      className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${integration ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${integration ? 'translate-x-4' : ''}`}></div>
                    </button>
                    <span className="text-xs font-medium">{integration ? 'Entegrasyon Açık' : 'Entegrasyon Kapalı'}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded flex items-center gap-2">
                  AYARLARI KAYDET
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#fff" d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"/></svg>
                </button>
              </div>
            </form>
          </div>
          {/* Sağ Bilgi Kutusu */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <div className="font-semibold text-base mb-2">Kurulum Rehberi</div>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-4 py-2 rounded transition-all border border-blue-200">
                DETAYLI KURULUM REHBERİNİ İNCELE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
