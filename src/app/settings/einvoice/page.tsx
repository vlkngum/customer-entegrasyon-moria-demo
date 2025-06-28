"use client"
import Image from 'next/image';
import { FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const erpList = [
  {
    name: 'Trendyol E-faturam (Sovos)',
    settings: 'Trendyol E-faturam (Sovos) Ayarları',
    logo: '/dp-trLogo.svg',
    bg: 'bg-[#b4c42c]',
    passive: true,
  },
  {
    name: 'Turkcell E-Fatura',
    settings: 'Turkcell E-Fatura Ayarları',
    logo: '/logo-dark.svg',
    bg: 'bg-[#f7e5a6]',
    passive: true,
  },
  {
    name: 'Logo E-Fatura',
    settings: 'Logo E-Fatura Ayarları',
    logo: '/eLogoWhite.svg',
    bg: 'bg-[#2b378a]',
    passive: true,
  },
  {
    name: 'GİB E-Arşiv',
    settings: 'GİB E-Arşiv Ayarları',
    logo: '/earsiv-beyazlogo.svg',
    bg: 'bg-[#d8232a]',
    passive: true,
  },
  {
    name: 'QNB eFinans E-Fatura',
    settings: 'QNB eFinans E-Fatura Ayarları',
    logo: '/indir.png',
    bg: 'bg-[#b14f88]',
    passive: true,
  },
];

export default function ErpSettingsPage() {
  const router = useRouter();
  const handleCardClick = (erpName: string) => {
    if (erpName === 'Trendyol E-faturam (Sovos)') {
      router.push('/settings/einvoice/detail');
    } else if (erpName === 'Turkcell E-Fatura') {
      router.push('/settings/einvoice/turkcell-detail');
    } else if (erpName === 'Logo E-Fatura') {
      router.push('/settings/einvoice/logoefatura');
    } else if (erpName === 'GİB E-Arşiv') {
      router.push('/settings/einvoice/gib');
    } else if (erpName === 'QNB eFinans E-Fatura') {
      router.push('/settings/einvoice/qnb');
    } else {
      router.push(`/settings/einvoice/${encodeURIComponent(erpName)}`);
    }
  };

  return (
    <div className="px-6 py-8">
      {/* Başlık */}
      <h1 className="text-3xl font-semibold text-[#444] mb-1">E-Fatura Ayarları</h1>
      {/* Breadcrumb */}
      <div className="text-base flex items-center gap-1 mb-6">
        <Link href="/" className="font-semibold text-[#222] hover:underline">Entekas</Link>
        <span className="mx-1 text-gray-400">/</span>
        <Link href="/settings" className="text-[#444] hover:underline">Ayarlar</Link>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-400">E-Fatura Ayarları</span>
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
            <div className="bg-[#F8FAFC] flex gap-2 items-center justify-center border-t border-gray-200 px-6 py-4 mt-auto w-full">
              <FiSettings className="text-gray-500 self-center" size={20} />
              <span className="flex flex-col justify-center text-base font-medium text-gray-700 break-words text-center">{erp.settings}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
