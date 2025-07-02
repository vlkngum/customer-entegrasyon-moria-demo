"use client";
import React, { useState } from "react";
import Image from "next/image";

const GibEArsivAyar = () => {
  const [integrationStatus, setIntegrationStatus] = useState("kapali");
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Üst Alan */}
      <div className="bg-white w-full shadow-sm pl-6 pr-16 pt-8 ml-0">
        <div className="flex items-center gap-3 mb-2">
        <Image src="/production.svg" alt="Logo" width={32} height={26} />
          <h1 className="text-2xl font-semibold text-[#222]">GİB E-Arşiv Ayarları</h1>
        </div>
        <div>
          <span className="text-[#1e90ff] text-base font-semibold border-b-2 border-[#1e90ff] pb-1 inline-block mt-2">GİB E-Arşiv Ayarları</span>
        </div>
      </div>
      {/* İçerik */}
      <div className="w-full px-2 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 items-stretch">
          {/* Sol: Form Kartı */}
          <div className="bg-white rounded-xl shadow p-4 md:p-4 flex flex-col gap-6 w-full flex-1 mb-12 h-full">
            {/* Logo ve başlık */}
            <div className="flex items-center gap-4 border-b border-gray-200 mb-4 pb-2">
              <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/gib.svg" width={80} height={80} alt="GİB Logo" className="object-contain w-full h-full" />
              </div>
              <span className="text-xl font-semibold text-[#222]">GİB E-Arşiv Ayarları</span>
            </div>
            {/* Form */}
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">GİB KULLANICI KODU <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="input"
                    value={userCode}
                    onChange={e => setUserCode(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GİB ŞİFRENİZ <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2 border-b-2 border-gray-200 pb-8">
                <label className="block text-[#5d6e76] font-black mb-1">ENTEGRASYON DURUMU</label>
                <div className="flex flex-row w-full gap-1 mt-2">
                  <label
                    htmlFor="entegrasyon_acik"
                    className={`w-full flex items-center gap-2 px-4 py-4 rounded-lg border transition-all cursor-pointer ${integrationStatus === "acik" ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        id="entegrasyon_acik"
                        name="entegrasyon_durumu"
                        checked={integrationStatus === "acik"}
                        onChange={() => setIntegrationStatus("acik")}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                      />
                      <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${integrationStatus === "acik" ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                      {integrationStatus === "acik" && (
                        <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <span className={`font-bold ${integrationStatus === "acik" ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
                  </label>
                  <label
                    htmlFor="entegrasyon_kapali"
                    className={`w-full flex items-center gap-2 px-4 py-4 rounded-lg border transition-all cursor-pointer ${integrationStatus === "kapali" ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        id="entegrasyon_kapali"
                        name="entegrasyon_durumu"
                        checked={integrationStatus === "kapali"}
                        onChange={() => setIntegrationStatus("kapali")}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                      />
                      <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${integrationStatus === "kapali" ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                      {integrationStatus === "kapali" && (
                        <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <span className={`font-bold ${integrationStatus === "kapali" ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button
                  type="submit"
                  className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-semibold rounded px-6 py-2 ml-auto transition flex items-center gap-2"
                >
                  AYARLARI KAYDET
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M13.293 17.293a1 1 0 0 1 1.414 0l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 1 1.414-1.414l5.707 5.707a1 1 0 0 1 0 1.414l-5.707 5.707a1 1 0 0 1-1.414-1.414Z"></path><path fill="#fff" d="M19 12a1 1 0 0 1-1 1H5a1 1 0 1 1 0-2h13a1 1 0 0 1 1 1Z"></path></svg>
                </button>
              </div>
            </form>
          </div>
          {/* Sağ: Kurulum Rehberi */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col gap-4 h-full w-full flex-1">
            <h2 className="text-lg font-semibold text-[#222] mb-2 border-b-2 border-gray-200 pb-4">Kurulum Rehberi</h2>
            <div className="text-gray-700 text-sm leading-relaxed max-h-72 overflow-y-auto pr-2 border-b-2 border-gray-200">
              <p className="text-red-600 font-semibold mb-2">
                !!! UYARI !!! GİB E-Arşiv sisteminde toplu olarak fatura kesmenizi önermiyoruz. GİB E-Arşiv sistemi toplu işlemlerde aynı işlemi birden fazla kez yapmaktadır. Faturalarınız birden çok kesilmesine sebebiyet verebilir. Önerimiz faturaları tek tek kesmenizden yanadır. Fatura çoklanmalarında Entekas sorumluluk kabul etmemektedir.
              </p>
              <p className="text-red-600 font-semibold mb-2">
                !!! UYARI !!! Entegrasyon işlemini sorunsuz bir şekilde gerçekleştirebilmek için GİB E-Arşiv Portal paneliniz açık ise kapatmanız (güvenli çıkış yapmanız) gerekmektedir.
              </p>
              <p className="text-gray-700">
              GİB E-Arşiv Entegrasyonunu gerçekleştirebilmek için GİB kullanıcı kodu ve şifrenizi bilmeniz gerekmektedir. GİB kullanıcı kodu ve şifrenizi bilmiyorsanız mali müşavirinizden öğrenebilirsiniz.

GİB Kullanıcı Kodu ve GİB Şifreniz alanlarına GİB E-Arşiv Portal&apos;a (https://earsivportal.efatura.gov.tr/intragiris.html) giriş panelinde kullandığınız kullanıcı kodu ve şifre bilgilerinizi yazıyoruz.
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <button className="border-2 border-[#eff6ff] text-blue-600 font-bold text-lg px-8 py-3 rounded-lg bg-white hover:bg-[#eff6ff] transition-all shadow-sm">
                DETAYLI KURULUM REHBERİNİ İNCELE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GibEArsivAyar;
