"use client";
import Image from 'next/image';
import { FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const erpList = [
  {
    name: 'Akakçe Yazılım',
    settings: 'Akakçe Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#17629e]',
    passive: true,
  },
  {
    name: 'Amazon',
    settings: 'Amazon Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#223A6A]',
    passive: true,
  },
  {
    name: 'Hepsiburada',
    settings: 'Hepsiburada Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#3B7C99]',
    passive: true,
  },
  {
    name: 'Pazarama',
    settings: 'Pazarama Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#FF6F5B]',
    passive: true,
  },
  {
    name: 'N11',
    settings: 'N11 Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#2B5C54]',
    passive: true,
  },
  {
    name: 'Trendyol',
    settings: 'Trendyol Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#D13B3B]',
    passive: false,
  },
  {
    name: 'Çiçeksepeti',
    settings: 'Çiçeksepeti Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#D13B3B]',
    passive: true,
  },
  {
    name: 'PttAVM',
    settings: 'PttAVM Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#B6E07B]',
    passive: false,
  },
  {
    name: 'İdefix',
    settings: 'İdefix Ayarları',
    logo: '/akakceBeyaz.png',
    bg: 'bg-[#3B7C99]',
    passive: true,
  },
];

export default function ErpSettingsPage() {
  const router = useRouter();

  const handleCardClick = (storeName: string) => {
    router.push(`/settings/stores/${storeName}`);
  };

  return (
    <div className="px-6 py-8">
      {/* Başlık */}
      <h1 className="text-3xl font-semibold text-[#444] mb-1">Mağaza Ayarları
      </h1>
      {/* Breadcrumb */}
      <div className="text-base flex items-center gap-1 mb-6">
        <Link href="/" className="font-semibold text-[#222] hover:underline">Entekas</Link>
        <span className="mx-1 text-gray-400">/</span>
        <Link href="/settings" className="text-[#444] hover:underline">Ayarlar</Link>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-400">Mağaza Ayarları
        </span>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {erpList.map((erp) => (
          <div
            key={erp.name}
            className={`relative rounded-lg shadow-md flex flex-col h-[210px] pt-4 pb-0 ${erp.bg} transition-transform hover:scale-[1.03] justify-between cursor-pointer`}
            onClick={() => handleCardClick(erp.name)}
          >
            {/* PASİF etiketi */}
            {erp.passive && (
              <span className="absolute left-3 top-3 bg-[#E74C3C] text-white text-[11px] px-2 py-0.5 rounded font-bold z-10">PASİF</span>
            )}
            {/* Logo */}
            <div className="flex flex-1 w-full items-center justify-center h-[120px]">
              <Image
                src={erp.logo}
                alt={erp.name}
                width={140}
                height={54}
                className="object-contain max-h-[54px]"
                unoptimized
              />
            </div>
            {/* Alt başlık ve dişli */}
            <div className="bg-[#F8FAFC] flex items-center border-t border-gray-200 px-6 py-4 mt-auto w-full">
              <FiSettings className="text-gray-500 mr-2" size={20} />
              <span className="text-base font-medium text-gray-700 whitespace-nowrap">{erp.settings}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
