"use client";
import React from 'react';
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

const ApplicationsPage = () => {
  return (
    <div className="bg-[#f0f5ff] min-h-screen p-8 font-sans">
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
    
  );
};

export default ApplicationsPage;
