"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import OrderHeader from '@/app/(protected)/orders/components/Header';
import Image from 'next/image';

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const pathname = usePathname();
  
  const tabs = [
    { id: 'invoice-list', name: "Fatura", href: '/orders/invoice-list' },
    { id: 'customer-invoices', name: "Müşteriler", href: '/invoices/customer-invoices' }, 
  ];

  // Aktif sayfanın adını bul
  const activeTab = tabs.find(tab => tab.href === pathname) || tabs[0];
  const pageTitle = activeTab.name;

  return (
    <div className="min-h-screen p-0"> 
      <div className='layout-panel'>

        <div className='flex justify-between'>
          <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/product.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/> {pageTitle}</h1>
          <a href='/add/customer' className="border_button">
            <Image src={'/invoicePrint.svg'} width={0} height={0} alt='add' className='w-6 h-6 opacity-70' />
            <span className='opacity-80' style={{ fontSize:10 }}>Yeni Müşteri Ekle</span>
          </a>
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