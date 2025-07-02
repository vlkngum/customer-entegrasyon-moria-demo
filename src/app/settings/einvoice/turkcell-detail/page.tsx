"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function TurkcellEFaturaAyar() {
  const [kampanyaKodu, setKampanyaKodu] = useState(true);
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState('kapali');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Üst Alan */}
      <div className="bg-white w-full shadow-sm pl-6 pr-16 pt-8 ml-0">
        <div className="flex items-center gap-3 mb-2">
        
            <Image src="/production.svg" alt="production" width={32} height={26} />
      
          <h1 className="text-2xl font-semibold text-[#222]">Turkcell E-Fatura Ayarları</h1>
        </div>
        <div>
          <span className="text-[#1e90ff] text-base font-semibold border-b-2 border-[#1e90ff] pb-1 inline-block mt-2">Turkcell E-Fatura Ayarları</span>
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
                <Image src="/AMBLEM_SARI.webp" alt="Turkcell Logo" width={80} height={80} className="object-contain w-full h-full" />
              </div>
              <span className="text-xl font-semibold text-[#222]">Turkcell E-Fatura Ayarları</span>
            </div>
            {/* Form */}
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API KEY <span className="text-red-500">*</span>
                </label>
                <input type="text" className="input" placeholder="" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FATURA TİPİ <span className="text-red-500">*</span>
                </label>
                <select className="input">
                  <option>Temel Fatura</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ÖN TANIMLI KARGO FİRMASI<span className="text-red-500">*</span>
                </label>
                <select className="input">
                  <option>Kargo Şirketi Seç</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KDV İSTİSNA KODU</label>
                <input type="text" className="input" placeholder="-------------------" />
              </div>
              <div className="mb-6">
            <div className="mb-2 font-semibold text-[#2d3a3a] text-[15px]">E-fatura/E-Arşiv faturalarınızda kargo kampanya kodu barkod olarak eklensin mi ?</div>
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
          <div>
              <label className="block text-[#5d6e76] font-black mb-1">ENTEGASYON DURUMU</label>
              <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 mt-2">
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
              <div className="flex items-center gap-4 mt-2  border-b-2 border-gray-200 pb-4">
                <button type="button" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded px-6 py-2 transition">TEST ET</button>
                
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
            <h2 className="text-lg font-semibold text-[#222] mb-2  border-b-2 border-gray-200 pb-4">Kurulum Rehberi</h2>
            <div className="text-gray-700 text-sm leading-relaxed max-h-72 overflow-y-auto pr-2 border-b-2 border-gray-200">
              Turkcell E-Fatura API bilgisi almak için Turkcell E-Şirket portalına giriş yapıyoruz. Açılan sayfadan kullanıcı adı ve şifrenizi yazarak üye girişi yapıyoruz. Sonrasında cep telefonunuza tek kullanımlık şifre gönderilecek, bu şifreyi ilgili alana yazıp Onayla butonuna tıklıyoruz.<br/><br/>
              Turkcell E-Şirket hesabınıza giriş yaptıktan sonra sayfanın sağ üst kısmından e-posta adresinizin yazdığı alan / Profilim menüsüne tıklıyoruz.<br/><br/>
              Açılan sayfada sol menüden API Yönetimi sekmesine tıklıyoruz.<br/><br/>
              API Yönetimi sayfasında sağ üst kısımda bulunan Yeni API Anahtarı butonuna tıklıyoruz.<br/><br/>
              Açılan pencereden Lütfen oluşturulacak API anahtarı için bir isim belirleyin alanına Entekas yazıyoruz ve Oluştur butonuna tıklıyoruz.<br/><br/>
              Oluşturulan API anahtarını seçip <b>Anahtarı Kopyala</b> butonuna tıklıyoruz. Kopyaladığınız API anahtarını entegrasyon için Turkcell E-Fatura Ayarları sayfasındaki ilgili alana yapıştırıyoruz.<br/><br/>
              Turkcell E-Fatura Entegrasyonunun nasıl yapılacağını <a href="https://www.notion.so/c4dc75644b049dab3e557409346a9fb?psv=21" target="_blank" className="text-blue-600 underline">[Turkcell E-Fatura Entegrasyonu]</a> kısmından öğrenebilirsiniz.
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
