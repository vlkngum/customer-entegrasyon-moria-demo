"use client";

import { ReactNode } from 'react';
import OrderHeader from '@/app/orders/components/Header';
import { PiStepsFill } from "react-icons/pi";

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const tabs = [
    { id: 'all-unprocessed', name: 'Tüm İşlem Görmemiş Siparişler', href: '/orders' },
    { id: 'pending-approval', name: 'Onay Bekleyen Siparişler', href: '/orders/pending-approval' },
    { id: 'approved', name: 'Onaylanan Siparişler', href: '/orders/approved' },
    { id: 'shipped', name: 'Kargolanan Siparişler', href: '/orders/shipped' },
    { id: 'cancelled', name: 'İptal Siparişler', href: '/orders/cancelled' },
    { id: 'invoice-list', name: 'Fatura Listesi', href: '/orders/invoice-list' },
  ];

  return (
    <div className="min-h-screen p-8"> 
      <div className='panel'>

      <div className='flex justify-between'>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Siparişler</h1>

        <button className="border_button">
          <PiStepsFill className="w-6 h-6" />
          <span style={{ fontSize:10 }}>Toplu Fatura Listesine Aktar</span>
        </button>
      </div>
      
        <OrderHeader
          tabItems={tabs}
        />
      </div>
      
      {children}
    </div>
  );
} 