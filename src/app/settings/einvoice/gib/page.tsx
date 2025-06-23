"use client";
import React, { useState } from "react";
import { GiShop } from "react-icons/gi";

const GibEArsivAyar = () => {
  const [integrationStatus, setIntegrationStatus] = useState("kapali");
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#f6faff] p-6">
      {/* Başlık ve Sekme */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl text-blue-600"><GiShop /></span>
          <h1 className="text-2xl font-semibold">GİB E-Arşiv Ayarları</h1>
        </div>
        <div className="flex gap-4 border-b border-blue-100">
          <button className="text-[#1976d2] font-semibold border-b-2 border-[#1976d2] px-2 pb-2 bg-transparent focus:outline-none">
            GİB E-Arşiv Ayarları
          </button>
        </div>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sol Kart: Ayar Formu */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <img src="/gib.svg" alt="GİB Logo"  />
            <span className="text-xl font-semibold">GİB E-Arşiv Ayarları</span>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                GİB KULLANICI KODU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={userCode}
                onChange={e => setUserCode(e.target.value)}
                placeholder="Kullanıcı kodunuzu girin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                GİB ŞİFRENİZ <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Şifrenizi girin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">ENTEGRASYON DURUMU</label>
              <div className="flex gap-4">
                <label className={`flex items-center gap-2 border rounded px-4 py-2 cursor-pointer ${integrationStatus === "acik" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                  <input
                    type="radio"
                    name="integration"
                    checked={integrationStatus === "acik"}
                    onChange={() => setIntegrationStatus("acik")}
                  />
                  ENTEGRASYON AÇIK
                </label>
                <label className={`flex items-center gap-2 border rounded px-4 py-2 cursor-pointer ${integrationStatus === "kapali" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                  <input
                    type="radio"
                    name="integration"
                    checked={integrationStatus === "kapali"}
                    onChange={() => setIntegrationStatus("kapali")}
                  />
                  ENTEGRASYON KAPALI
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-6 py-2 transition-all"
            >
              AYARLARI KAYDET
            </button>
          </form>
        </div>

        {/* Sağ Kart: Kurulum Rehberi */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Kurulum Rehberi</h2>
          <div className="overflow-y-auto max-h-72 pr-2">
            <p className="text-red-600 font-semibold mb-2">
              !!! UYARI !!! GİB E-Arşiv sisteminde toplu olarak fatura kesmenizi önermiyoruz. GİB E-Arşiv sistemi toplu işlemlerde aynı işlemi birden fazla kez yapmaktadır. Faturalarınız birden çok kesilmesine sebebiyet verebilir. Önerimiz faturaları tek tek kesmenizden yanadır. Fatura çoklanmalarında Sopyo sorumluluk kabul etmemektedir.
            </p>
            <p className="text-red-600 font-semibold mb-2">
              !!! UYARI !!! Entegrasyon işlemini sorunsuz bir şekilde gerçekleştirebilmek için GİB E-Arşiv Portal paneliniz açık ise kapatmanız (güvenli çıkış yapmanız) gerekmektedir.
            </p>
            <p className="text-gray-700">
              GİB E-Arşiv Entegrasyonunu gerçekleştirebilmek için GİB kullanıcı kodu ve şifrenizi bilmeniz gerekmektedir. GİB kullanıcı kodu ve şifrenizi bilmiyorsanız mali müşavirinizden öğrenebilirsiniz.
            </p>
          </div>
          <button className="mt-4 border border-blue-400 text-blue-700 font-semibold rounded px-6 py-2 hover:bg-blue-50 transition-all self-start">
            DETAYLI KURULUM REHBERİNİ İNCELE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GibEArsivAyar;
