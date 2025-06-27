"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import OrderHeader from '@/app/orders/components/Header';
import { PiStepsFill } from "react-icons/pi";
import Image from 'next/image';

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const pathname = usePathname();
  
  const tabs = [
    { id: 'all-unprocessed', name: 'Tüm İşlem Görmemiş Siparişler', href: '/orders' },
    { id: 'pending-approval', name: 'Onay Bekleyen Siparişler', href: '/orders/pending-approval' },
    { id: 'approved', name: 'Onaylanan Siparişler', href: '/orders/approved' },
    { id: 'shipped', name: 'Kargolanan Siparişler', href: '/orders/shipped' },
    { id: 'cancelled', name: 'İptal Siparişler', href: '/orders/cancelled' },
    { id: 'invoice-list', name: 'Fatura Listesi', href: '/orders/invoice-list' },
  ];

  // Aktif sayfanın adını bul
  const activeTab = tabs.find(tab => tab.href === pathname) || tabs[0];
  const pageTitle = activeTab.name;

  return (
    <div className="min-h-screen p-0"> 
      <div className='layout-panel'>

      <div className='flex justify-between'>
        <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/orderIcon.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/> {pageTitle}</h1>

        <button className="border_button">
          <PiStepsFill className="w-6 h-6 opacity-70" />
          <span className='opacity-80' style={{ fontSize:10 }}>Toplu Fatura Listesine Aktar</span>
        </button>
      </div>
      
        <OrderHeader
          tabItems={tabs}
        />
      </div>
      
      <div className='px-6 py-4'>
        {children}
      </div>
    </div>
  );
} 