"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function LogoEFaturaAyarlar() {
  const [integration, setIntegration] = useState(false);
  const [kampanyaKodu, setKampanyaKodu] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Üst Alan */}
      <div className="bg-white w-full shadow-sm pl-6 pr-16 pt-8 ml-0">
        <div className="flex items-center gap-3 mb-2">
          <Image src="/production.svg" alt="Logo" width={32} height={26} />
          <h1 className="text-2xl font-semibold text-[#222]">Logo E-Fatura Ayarları</h1>
        </div>
        <div>
          <span className="text-[#1e90ff] text-base font-semibold border-b-2 border-[#1e90ff] pb-1 inline-block mt-2">Logo E-Fatura Ayarları</span>
        </div>
      </div>
      {/* İçerik */}
      <div className="w-full px-2 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
          {/* Sol: Form Kartı */}
          <div className="bg-white rounded-xl shadow p-4 md:p-4 flex flex-col gap-6 w-full flex-1 mb-12">
            {/* Logo ve başlık */}
            <div className="flex items-center gap-4 border-b border-gray-200">
              <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/elogo.svg" width={80} height={80} alt="Logo" className="object-contain w-full h-full" />
              </div>
              <span className="text-xl font-semibold text-[#222]">Logo E-Fatura Ayarları</span>
            </div>
            {/* Form */}
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">KULLANICI KODU</label>
                  <input type="text" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ŞİFRE</label>
                  <input type="password" className="input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">FATURA TİPİ</label>
                <select className="input">
                  <option>Fatura Tipi Seçiniz</option>
                </select>
              </div>
              <div className="font-semibold text-base mt-4 mb-2">Vergi Bilgileri</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ŞİRKET TÜRÜ</label>
                  <select className="input">
                    <option>Limited Şirket veya Anonim Şirketi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ŞİRKET ÜNVANI</label>
                  <input type="text" className="input" placeholder="Şirket Unvanınız" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">VERGİ NUMARASI</label>
                  <input type="text" className="input" placeholder="Vergi Numaranız" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">VERGİ DAİRESİ</label>
                  <input type="text" className="input" placeholder="Vergi Daireniz" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">MERSİS NUMARASI</label>
                  <input type="text" className="input" placeholder="Mersis Numaranız" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SİCİL NUMARASI</label>
                  <input type="text" className="input" placeholder="Ticaret Sicil Numaranız" />
                </div>
              </div>
              <div className="font-semibold text-base mt-4 mb-2">Fatura Sabit Bilgileri</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">E-FATURA NUMARA EKİ</label>
                  <input type="text" className="input" placeholder="Ör: harf, örneğin Sopay şirketi için SOP gibi" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-ARŞİV NUMARA EKİ</label>
                  <input type="text" className="input" placeholder="Ör: harf, örneğin Sopay şirketi için SPY gibi" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">TELEFON</label>
                  <input type="text" className="input" placeholder="(5XX) XXX XX XX" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-POSTA</label>
                  <input type="email" className="input" placeholder="ornek@mail.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">WEB SİTE</label>
                  <input type="text" className="input" />
                </div>
                <div></div>
                <div>
                  <label className="block text-sm font-medium mb-1">FATURA İMZASI</label>
                  <input type="file" className="input file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-blue-50 file:text-blue-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">FİRMA LOGOSU</label>
                  <input type="file" className="input file:mr-2 file:py-1 file:px-2 file:border-0 file:bg-blue-50 file:text-blue-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ÖN TANIMLI KARGO FİRMASI</label>
                  <select className="input">
                    <option>Kargo Şirketi Seç</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-FATURA/E-ARŞİV FATURALARINIZDA KARGO KAMPANYA KODU BARKOD OLARAK EKLENSİN Mİ?</label>
                  <div className="w-full block">
                    {kampanyaKodu ? (
                      <div
                        className="flex items-center justify-center w-full px-2 py-2.5 rounded-md font-semibold transition-colors duration-200 bg-[#23db8b] text-white h-[42px] cursor-pointer"
                        onClick={() => setKampanyaKodu(false)}
                        onMouseOver={e => (e.currentTarget.style.background = '#589ffc')}
                        onMouseOut={e => (e.currentTarget.style.background = '#23db8b')}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="mr-2"
                          style={{ display: "inline-block" }}
                        >
                          <path
                            d="M5 10.5L9 14.5L15 7.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-semibold">EVET</span>
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-center w-full rounded-md transition-colors duration-200 bg-[#f3f7f9] text-[#76838f] h-[42px] cursor-pointer"
                        onClick={() => setKampanyaKodu(true)}
                        onMouseOver={e => (e.currentTarget.style.background = '#f3f7f9')}
                        onMouseOut={e => (e.currentTarget.style.background = '#f3f7f9')}
                      >
                        <span
                          className="inline-block mr-2"
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#bfc9d9",
                          }}
                        ></span>
                        <span className="font-semibold">HAYIR</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2  border-b-2 border-gray-200 pb-8">
                  <label className="block text-[#5d6e76] font-black mb-1">ENTEGRASYON DURUMU</label>
                  <div className="flex flex-row w-full gap-1 mt-2">
                    <label
                      htmlFor="entegrasyon_acik"
                      className={`w-full flex items-center gap-2 px-4 py-4 rounded-lg border transition-all cursor-pointer ${integration ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                    >
                      <span className="relative flex items-center">
                        <input
                          type="radio"
                          id="entegrasyon_acik"
                          name="entegrasyon_durumu"
                          checked={integration}
                          onChange={() => setIntegration(true)}
                          className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                        />
                        <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${integration ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                        {integration && (
                          <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                        )}
                      </span>
                      <span className={`font-bold ${integration ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
                    </label>
                    <label
                      htmlFor="entegrasyon_kapali"
                      className={`w-full flex items-center gap-2 px-4 py-4 rounded-lg border transition-all cursor-pointer ${!integration ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                    >
                      <span className="relative flex items-center">
                        <input
                          type="radio"
                          id="entegrasyon_kapali"
                          name="entegrasyon_durumu"
                          checked={!integration}
                          onChange={() => setIntegration(false)}
                          className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                        />
                        <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${!integration ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                        {!integration && (
                          <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                        )}
                      </span>
                      <span className={`font-bold ${!integration ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <button type="submit" className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-semibold rounded px-6 py-2 ml-auto transition flex items-center gap-2">
                  AYARLARI KAYDET
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M13.293 17.293a1 1 0 0 1 1.414 0l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 1 1.414-1.414l5.707 5.707a1 1 0 0 1 0 1.414l-5.707 5.707a1 1 0 0 1-1.414-1.414Z"></path><path fill="#fff" d="M19 12a1 1 0 0 1-1 1H5a1 1 0 1 1 0-2h13a1 1 0 0 1 1 1Z"></path></svg>
                </button>
              </div>
            </form>
          </div>
          {/* Sağ: Kurulum Rehberi */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col gap-4 h-fit w-full flex-1">
            <h2 className="text-lg font-semibold text-[#222] mb-2 border-b-2 border-gray-200 pb-4">Kurulum Rehberi</h2>
            <div className="text-gray-700 text-sm leading-relaxed max-h-72 overflow-y-auto pr-2 border-b-2 border-gray-200">
              Logo E-Fatura API bilgisi almak için Logo portalına giriş yapınız. Açılan sayfadan kullanıcı adı ve şifrenizi yazarak üye girişi yapınız. Sonrasında ilgili alanları doldurunuz.<br/><br/>
              Logo E-Fatura Entegrasyonunun nasıl yapılacağını <a href="#" target="_blank" className="text-blue-600 underline">[Logo E-Fatura Entegrasyonu]</a> kısmından öğrenebilirsiniz.
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
}
