"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import OrderHeader from '@/app/orders/components/Header';
import Image from 'next/image';

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const pathname = usePathname();
  
  const tabs = [
    { id: 'products', name: "Ürün Listesi", href: '/products' },
    { id: 'add', name: "Ürün Ekle", href: '/add' },
    { id: 'category', name: "Kategoriler", href: '/categorys-marks/category' },
    { id: 'marks', name: "Markalar", href: '/categorys-marks/marks' },
    { id: 'variant', name: "Seçenek Grupları (Varyant)", href: '/variant' },
    { id: 'hbCatalogProducts', name: "Hepsiburada Kataloğa Önerilen Ürünler", href: '/products/hbCatalogProducts' },
    { id: 'list_sync', name: "Ürün Bazlı Kategori Özellik Eşitleme Listesi", href: '/products/list_sync' },
    { id: 'price-robot', name: "Rekabet Robotu", href: '/products/price-robot' },
  ];

  const activeTab = tabs.find(tab => tab.href === pathname) || tabs[0];
  const pageTitle = activeTab.name;

  return (
    <div className="min-h-screen p-0"> 
      <div className='layout-panel'>

        <div className='flex justify-between'>
          <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/production.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/> {pageTitle}</h1>
          {pathname === '/products/list_sync' && (
            <div className="flex gap-2 mb-6">
              <a className="border_button flex items-center gap-1" href="/add">
                {/* AiOutlineProduct ikonu burada kullanılacak */}
                <Image src="/hizliEkle.svg" alt="hizliEkle" width={20} height={20} />
                <span style={{ fontSize: 10 }}>YENİ ÜRÜN EKLE</span>
              </a>
            </div>
          )}
        </div>

        <div className='bg-white'>
          <OrderHeader
            tabItems={tabs}
          />
        </div> 
      </div>
      
      <div className='px-6 py-4'>
        {children}
      </div>
    </div>
  );
} 