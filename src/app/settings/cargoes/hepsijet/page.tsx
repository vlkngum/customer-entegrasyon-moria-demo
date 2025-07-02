"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function HepsijetSettings() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    integrationStatus: "kapali", // "acik" veya "kapali"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ayarlar kaydedildi! (Demo)");
  };

  return (
    <div className=" min-h-screen p-0">
      <div className="pl-8 bg-white shadow-sm">
        <div className="font-semibold text-2xl flex items-center gap-3 py-5">
        <Image src={'/hepsijet-icon.svg'} alt="HepsiJet" width={0} height={0} className="bg-[#f3f8fe] rounded-full w-14 h-14 flex items-center justify-center text-lg font-bold "/>
          Hepsijet Ayarları
        </div>
        <div className="border-b border-gray-200">
          <button className="text-blue-600 font-semibold border-b-2 border-blue-600 px-4 py-2 bg-transparent">API Tanımlama</button>
        </div>
      </div>
      <div className="mt-6 mx-6">
      
        <div className="flex flex-row gap-6 mt-6" style={{minWidth: 1200}}>
          {/* Sol Panel: Form */}
          <div className="panel w-1/2 ">
            <div className="font-semibold text-lg mb-4">API Bilgilerini Tanımlama</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label className="block text-sm font-bold mb-2 mt-4 text-gray-500">KULLANICI ADI<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="input"
              />
              <label className="block text-sm font-bold mb-2 mt-4 text-gray-500">ŞİFRE <span className="text-red-500">*</span></label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="input"
              />
              <label className="block text-sm font-semibold mb-2 text-gray-500">ENTEGRASYON DURUMU</label>
              <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 mt-2 border-b-2 border-gray-200 pb-4">
                <label
                  htmlFor="entegrasyon_acik"
                  className={`flex-1 flex items-center gap-3 px-6 py-3 min-w-[160px] rounded-lg border transition-all cursor-pointer ${form.integrationStatus === 'acik' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="relative flex items-center">
                    <input
                      type="radio"
                      id="entegrasyon_acik"
                      name="integrationStatus"
                      value="acik"
                      checked={form.integrationStatus === 'acik'}
                      onChange={handleChange}
                      className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                    />
                    <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${form.integrationStatus === 'acik' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                    {form.integrationStatus === 'acik' && (
                      <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                    )}
                  </span>
                  <span className={`font-bold text-sm ${form.integrationStatus === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
                </label>
                <label
                  htmlFor="entegrasyon_kapali"
                  className={`flex-1 flex items-center gap-3 px-6 py-3 min-w-[160px] rounded-lg border transition-all cursor-pointer ${form.integrationStatus === 'kapali' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="relative flex items-center">
                    <input
                      type="radio"
                      id="entegrasyon_kapali"
                      name="integrationStatus"
                      value="kapali"
                      checked={form.integrationStatus === 'kapali'}
                      onChange={handleChange}
                      className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                    />
                    <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${form.integrationStatus === 'kapali' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                    {form.integrationStatus === 'kapali' && (
                      <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                    )}
                  </span>
                  <span className={`font-bold text-sm ${form.integrationStatus === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white rounded px-6 py-2 font-semibold flex items-center gap-2"
                >
                  AYARLARI KAYDET
                  <span className="text-xl">→</span>
                </button>
              </div>
            </form>
          </div>
          {/* Sağ Panel: Kurulum Rehberi */}
          <div className="panel w-1/2 relative">
            <div className="flex items-start justify-between border-b border-gray-300">
              <div className="font-semibold text-lg mb-4">Kurulum Rehberi</div>
              <button className="bg-red-100 text-red-600 font-semibold rounded-full px-4 py-2 flex items-center gap-2 ml-4 mt-[-8px]">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-600">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="7,5 15,10 7,15" fill="white" />
                  </svg>
                </span>
                VİDEOLU ANLATIM
              </button>
            </div>
            <div className="pt-4">
              <div className="font-semibold text-base mb-2">API Bilgilerinizi Tanımlayın</div>
              <div className="text-gray-700 text-xs mb-4">
                Hepsijet tarafından api bilgilerinizi istememiz gerekmektedir. Sizlere verilen bilgiler arasındaki parola ve şifrenizi lütfen yazınız.<br/><br/>
                Gönderim yapacağınız bilgilerin girilmesi ve doğruluğu çok önemli. Aksi taktirde siparişleriniz Hepsijet tarafına iletilemeyecektir.<br/><br/>
                Detaylı bilgi için aşağıda yer alan DETAYLI KURULUM REHBERİNİ İNCELE butonuna tıklayabilirsiniz.
              </div>
            </div>
            <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 mt-4 border-t border-gray-300 w-full flex justify-center pt-6">
              <button className="border border-blue-600 text-blue-600 font-semibold rounded px-4 py-2 hover:bg-blue-50">
                DETAYLI KURULUM REHBERİNİ İNCELE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
