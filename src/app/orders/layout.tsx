"use client";

import { ReactNode } from 'react';
import OrderHeader from '@/app/orders/components/Header';

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
      <OrderHeader
        tabItems={tabs}
      />
      {children}
    </div>
  );
} 