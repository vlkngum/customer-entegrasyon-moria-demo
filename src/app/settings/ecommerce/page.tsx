"use client"
import Image from 'next/image';
import { FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const erpList = [
  {
    name: 'İdeasoft',
    settings: 'İdeasoft Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#99cf65]',
    passive: true,
  },
  {
    name: 'ankaEticaret',
    settings: 'ankaEticaret Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#223A6A]',
    passive: true,
  },
  {
    name: 'Opencart',
    settings: 'Opencart Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#3B7C99]',
    passive: true,
  },
  {
    name: 'Woocommerce',
    settings: 'Woocommerce Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#FF6F5B]',
    passive: true,
  },
  {
    name: 'Shopify',
    settings: 'Shopify Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#2B5C54]',
    passive: true,
  },
  {
    name: 'Ticimax',
    settings: 'Ticimax Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#D13B3B]',
    passive: false,
  },
  {
    name: 'Wix',
    settings: 'Wix Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#D13B3B]',
    passive: true,
  },
  {
    name: 'Kolay Sipariş',
    settings: 'Kolay Sipariş Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#B6E07B]',
    passive: false,
  },
  {
    name: 'ETicaretSoft',
    settings: 'ETicaretSoft Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#3B7C99]',
    passive: true,
  },
  {
    name: 'Shopier',
    settings: 'Shopier Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#223A6A]',
    passive: false,
  },
  {
    name: 'ikas',
    settings: 'İkas Ayarları',
    logo: '/ideasoft.png',
    bg: 'bg-[#223A6A]',
    passive: false,
  },
];

export default function ErpSettingsPage() {
  const router = useRouter();
  const handleCardClick = (erpName: string) => {
    // Platform adını route uyumlu hale getir (Türkçe küçük harf desteği)
    const routeName = erpName
      .toLocaleLowerCase('tr') // Türkçe küçük harfe çevir
      .replace(/ı/g, 'i')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Her platform için özel route
    if (erpName === 'Ticimax') {
      router.push('/settings/ecommerce/ticimax');
    } else if (erpName === 'Kolay Sipariş') {
      router.push('/settings/ecommerce/kolaysiparis');
    } else if (erpName === 'Shopier') {
      router.push('/settings/ecommerce/shopier');
    } else {
      // Diğerleri için dinamik route
      router.push(`/settings/ecommerce/${routeName}`);
    }
  };

  return (
    <div className="px-6 py-8">
      {/* Başlık */}
      <h1 className="text-3xl font-semibold text-[#444] mb-1">E-ticaret Ayarları
      </h1>
      {/* Breadcrumb */}
      <div className="text-base flex items-center gap-1 mb-6">
        <Link href="/" className="font-semibold text-[#222] hover:underline">Entekas</Link>
        <span className="mx-1 text-gray-400">/</span>
        <Link href="/settings" className="text-[#444] hover:underline">Ayarlar</Link>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-400">E-ticaret Ayarları
        </span>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {erpList.map((erp) => (
          <div
            key={erp.name}
            className={`relative rounded-md shadow-md flex flex-col h-[210px] pt-4 pb-0 ${erp.bg} transition-transform hover:scale-[1.03] justify-between cursor-pointer`}
            onClick={() => handleCardClick(erp.name)}
          >
            {/* PASİF etiketi */}
            {erp.passive && (
               <span className="absolute left-3 top-3 bg-gray-400/20 text-white text-[11px] px-2 py-0.5 rounded font-bold z-10">PASİF</span>
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
            <div className="bg-[#F8FAFC] flex items-center border-t border-gray-200 px-6 py-4 mt-auto w-full rounded-b-md">
              <FiSettings className="text-gray-500 mr-2" size={20} />
              <span className="text-base font-medium text-gray-700 whitespace-nowrap">{erp.settings}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
