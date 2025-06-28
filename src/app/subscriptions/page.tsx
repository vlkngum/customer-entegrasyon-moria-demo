"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const applications = [
  {
    name: 'İdeasoft',
    logo: '/opencart-ico.svg', 
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'Opencart',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'Woocommerce',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'Shopify',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'Ticimax',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'Wix',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'Kolay Sipariş',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'ETicaretSoft',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'Shopier',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
  {
    name: 'ikas',
    logo: '/opencart-ico.svg',
    oldPrice: '18.000,00 TL',
    newPrice: '14.900,00 TL',
  },
];

interface Application {
  name: string;
  logo: string;
  oldPrice: string;
  newPrice: string;
}

const ApplicationCard = ({ application }: { application: Application }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">{application.name}</h3>
      <div className="w-20 h-20 relative mb-4">
        <Image src={application.logo} alt={`${application.name} logo`} layout="fill" objectFit="contain" />
      </div>
      <p className="text-gray-400 line-through text-sm">{application.oldPrice}</p>
      <p className="text-xl font-bold text-gray-800">{application.newPrice} <span className="text-sm font-normal text-gray-500">/ Yıllık</span></p>
      <button className="mt-4 bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300">
        7 Gün Dene
      </button>
    </div>
    
  );
};

// Paketler için örnek veri
const packages = [
  {
    name: 'Profesyonel',
    oldPrice: '17.990 TL',
    newPrice: '17.000',
    credit: true,
    cargoGift: true,
  },
  {
    name: 'Gelişmiş',
    oldPrice: '29.990 TL',
    newPrice: '28.500',
    credit: true,
    cargoGift: true,
  },
  {
    name: 'Uzman',
    oldPrice: '44.990 TL',
    newPrice: '42.500',
    credit: true,
    cargoGift: true,
  },
];

const Timer = () => {
  const [time, setTime] = useState(4 * 3600 + 26 * 60 + 54); // 4 saat 26 dk 54 sn
  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return (
    <span className="flex gap-2 items-center text-white font-bold text-lg">
      <span>0 GÜN</span>
      <span>{hours} SAAT</span>
      <span>{minutes} DAKİKA</span>
      <span>{seconds} SANİYE</span>
    </span>
  );
};

const SubscriptionBanner = () => (
  <div className="w-full flex justify-center pt-8 pb-2 bg-[#eaf3fc]">
    <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-400 px-6 py-3 rounded-2xl shadow-lg">
      <span className="bg-white rounded-full p-2 mr-2">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#F59E42" d="M12 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19.93 11H21a1 1 0 1 1 0 2h-1.07A7.002 7.002 0 0 1 13 19.93V21a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 4.07 13H3a1 1 0 1 1 0-2h1.07A7.002 7.002 0 0 1 11 4.07V3a1 1 0 0 1 1-1Zm0 4a5 5 0 1 0 0 10A5 5 0 0 0 12 6Z"/></svg>
      </span>
      <span className="text-white font-semibold text-lg">Kısa Süreli Fırsat</span>
      <Timer />
    </div>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PackageDetailMenu = ({ selectedPackage }: { selectedPackage: typeof packages[0] }) => {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <div className="mt-6 bg-[#f7fbff] border border-blue-100 rounded-2xl p-6 shadow-inner animate-fade-in">
      <div className="mb-2">
        <span className="font-bold text-gray-700">NOT :</span>
        <span className="ml-2 text-gray-700">Profesyonel paket abonelikleri içerisinde kargo ve e-ticaret entegrasyonları yer almamaktadır.</span>
      </div>
      <ul className="mt-3 mb-2 space-y-2">
        <li className="flex items-center text-blue-700 font-medium"><svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M6 10.5l2.5 2L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>Pazaryerlerine toplu ürün yükleme</li>
        <li className="flex items-center text-blue-700 font-medium"><svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M6 10.5l2.5 2L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>Toplu kategori ve marka atama işlemi</li>
        <li className="flex items-center text-blue-700 font-medium"><svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M6 10.5l2.5 2L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>Toplu barkod değiştirme</li>
        <li className="flex items-center text-blue-700 font-medium"><svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M6 10.5l2.5 2L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>Toplu desi bilgisi tanımlama</li>
        {showMore && (
          <>
            <li className="flex items-center text-blue-700 font-medium"><svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M6 10.5l2.5 2L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>Demo Özellik 1: Ekstra raporlama modülü</li>
            <li className="flex items-center text-blue-700 font-medium"><svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M6 10.5l2.5 2L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>Demo Özellik 2: Gelişmiş kullanıcı yönetimi</li>
            <li className="flex items-center text-blue-700 font-medium"><svg className="mr-2" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M6 10.5l2.5 2L14 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>Demo Özellik 3: Otomatik yedekleme</li>
          </>
        )}
      </ul>
      <div className="text-blue-700 text-sm cursor-pointer hover:underline mb-2" onClick={() => setShowMore(v => !v)}>
        {showMore ? 'Daha az göster' : 'Devamını görmek için tıklayınız.'}
      </div>
      <div className="mt-4 border-t pt-3 text-gray-700 text-sm">
        <span className="inline-flex items-center">
          <svg className="mr-1" width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFD700"/><path d="M12 7v5l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          Entekas kullanımızdan daha fazla avantaj, e-ticaret sitenizi entegre etmek ve kargo entegrasyonları ile işlerinizi kolaylaştırmak için gelişmiş pakete geçiş yapabilirsiniz.
        </span>
      </div>
    </div>
  );
};

const PackageSelector = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${selected !== null ? 'max-w-5xl' : 'max-w-3xl'} mx-auto mt-8 transition-all duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Paket Seçimi</h2>
        <button className="border border-blue-500 text-blue-600 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-blue-50">PAKETLERİ KARŞILAŞTIR</button>
      </div>
      <div className="flex flex-col gap-4">
        {packages.map((pkg, i) => (
          <React.Fragment key={pkg.name}>
            <div className="flex items-center justify-between border-b last:border-b-0 py-4 relative">
              {pkg.cargoGift && (
                <span className="absolute -left-32 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-r-lg text-xs font-bold shadow-md">KARGO<br/>Entegrasyonu<br/>Hediye!</span>
              )}
              <label className="flex items-center cursor-pointer w-full">
                <input type="radio" name="package" checked={selected === i} onChange={() => setSelected(i)} className="form-radio h-5 w-5 text-blue-600" />
                <span className="ml-3 text-lg font-semibold text-gray-700">{pkg.name}</span>
              </label>
              <div className="flex-1 flex flex-col items-end">
                <span className="text-gray-400 line-through text-sm">{pkg.oldPrice}</span>
                <span className="text-2xl font-bold text-gray-800">{pkg.newPrice} <span className="text-base font-normal text-gray-500">TL / yıllık</span></span>
              </div>
              {pkg.credit && (
                <button className="ml-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                  <span className="bg-white rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FFD700"/><path d="M12 7v5l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg></span>
                  KREDİ KARTINA 12 TAKSİT
                </button>
              )}
            </div>
            {selected === i && <PackageDetailMenu selectedPackage={pkg} />}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-gradient-to-r from-orange-500 to-red-400 text-white font-bold text-lg px-16 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">SATIN AL</button>
      </div>
    </div>
  );
};

const ApplicationsPage = () => {
  return (
    <div className="bg-[#f0f5ff] min-h-screen p-0 font-sans">
      <SubscriptionBanner />
      <div className="text-center mt-8 mb-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">Abonelik Satın Al.</h1>
        <p className="text-lg text-gray-600">
          Size <a href="#" className="text-blue-600 font-semibold underline">en uygun paketi</a> aşağıdan seçerek işleme devam edebilirsiniz.
        </p>
      </div>
      <PackageSelector />
      <div className="mt-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Ek Modüller & Hizmetler</h1>
          <p className="text-lg text-gray-600">
            Tüm Paketleri <span className="text-blue-600 font-semibold">7 Gün Boyunca</span> Ücret Ödemeden Deneyebilirsiniz!
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">E-Ticaret entegrasyonları</h2>
            <p className="text-gray-500">
              E-ticaret sitenizdeki ürün, fiyat, stok ve sipariş yönetiminizi pazaryeri satışlarıyla birlikte tek bir ekrandan yönetin.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {applications.map((app, index) => (
              <ApplicationCard key={index} application={app} />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">E-Ticaret entegrasyonları</h2>
            <p className="text-gray-500">
              E-ticaret sitenizdeki ürün, fiyat, stok ve sipariş yönetiminizi pazaryeri satışlarıyla birlikte tek bir ekrandan yönetin.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {applications.map((app, index) => (
              <ApplicationCard key={index} application={app} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
