"use client";

import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { FiFilePlus } from "react-icons/fi";
import { IoReturnUpBack } from "react-icons/io5";
import Image from "next/image";

import YeniKategoriEkleModal from "@/components/categorys-marks/YeniKategoriEkleModal";
import YeniMarkaEkleModal from "@/components/categorys-marks/YeniMarkaEkleModal";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveTab = () => {
    if (pathname.includes('/categorys-marks/category')) return 'Kategoriler';
    if (pathname.includes('/categorys-marks/marks')) return 'Markalar';
    return '';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [isKategoriModalOpen, setIsKategoriModalOpen] = useState(false);
  const [isMarkaModalOpen, setIsMarkaModalOpen] = useState(false);

  const tabs = [
    { name: "Kategoriler", href: '/categorys-marks/category' },
    { name: "Markalar", href: '/categorys-marks/marks' },
  ];

  const showHeader = !pathname.includes('/edit');

  const getPageTitle = () => {
    if (pathname.includes('/categorys-marks/marks')) {
      return 'Markalar';
    }
    return 'Kategoriler';
  };

  const isMarksPage = pathname.includes('/categorys-marks/marks');

  return (
    <div className="min-h-screen p-0">
      <div className="mx-auto">
        {showHeader && (
          <div className="layout-panel">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex items-center space-x-3 ">
              <Image src={'/icon/product.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/>
                <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1> 
              </div>

              <div className="flex gap-2">
                {isMarksPage ? (
                  <>
                    <button
                      className="border_button"
                      type="button"
                      onClick={() => setIsMarkaModalOpen(true)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 12px', minWidth: 90 }}
                    >
                      <FiFilePlus className="w-6 h-6 text-gray-500" />
                      <span className="font-semibold text-gray-600" style={{ fontSize:10 }}>YENİ MARKA EKLE</span>
                    </button>
                    <button
                      className="border_button"
                      type="button"
                      onClick={() => router.back()}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 12px', minWidth: 90 }}
                    >
                      <IoReturnUpBack className="w-6 h-6 text-gray-500" />
                      <span className="font-semibold text-gray-600" style={{ fontSize:10 }}>VAZGEÇ</span>
                    </button>
                  </>
                ) : (
                  <button
                    className="border_button"
                    type="button"
                    onClick={() => setIsKategoriModalOpen(true)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 12px', minWidth: 90 }}
                  >
                    <Image src="/hizliEkle.svg" alt="hizliEkle" width={20} height={20} />
                    <span className="font-semibold text-gray-600" style={{ fontSize:10 }}>YENİ KATEGORİ EKLE</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap border-t border-gray-200">
              {tabs.map((tab) => (
                <a
                  href={tab.href}
                  key={tab.name}
                  className={`px-6 py-3 text-md font-semibold transition-colors duration-200 ${activeTab === tab.name ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.name);
                    router.push(tab.href);
                  }}
                > 
                  <span>{tab.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {children}
      </div>
      {isKategoriModalOpen && (
        <YeniKategoriEkleModal open={isKategoriModalOpen} onClose={() => setIsKategoriModalOpen(false)} />
      )}
      {isMarkaModalOpen && (
        <YeniMarkaEkleModal open={isMarkaModalOpen} onClose={() => setIsMarkaModalOpen(false)} />
      )}
    </div>
  );
}
 