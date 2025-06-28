"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import OrderHeader from '@/app/orders/components/Header';
import {  FaBars } from "react-icons/fa";
import Image from 'next/image';

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const pathname = usePathname();
  
  const tabs = [
    { id:"/claims", name: "Tümü", icon: <FaBars className="w-4 h-4" />, href: '/claims' },
    { id:"/claims/active", name: "Aktif İadeler", href: '/claims/active' },
    { id:"/claims/action", name: "Aksiyon Alınacak", href: '/claims/action' },
    { id:"/claims/accepted", name: "Kabul Edilen", href: '/claims/accepted' },
    { id:"/claims/rejected", name: "Reddedilen", href: '/claims/rejected' },
    { id:"/claims/service-analysis", name: "Servis & Analiz", href: '/claims/service-analysis' },
    { id:"/claims/cancelled", name: "İptal Edilen", href: '/claims/cancelled' },
  ];

  // Aktif sayfanın adını bul
  const activeTab = tabs.find(tab => tab.href === pathname) || tabs[0];
  const pageTitle = activeTab.name;

  return (
    <div className="min-h-screen p-0"> 
      <div className='layout-panel'>

        <div className='flex justify-between'>
          <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/product.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/> {pageTitle}</h1>
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