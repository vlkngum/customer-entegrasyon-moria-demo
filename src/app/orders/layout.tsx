"use client";

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import OrderHeader from '@/app/orders/components/Header';
import { PiStepsFill } from "react-icons/pi";
import { FaFileInvoiceDollar } from 'react-icons/fa';
import Image from 'next/image';
import ProductActionsMenu from '@/components/products/list/ProductActionsMenu';
import ProductSingleFetchModal from '@/components/orders/invoice/ProductSingleFetchModal';

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const pathname = usePathname();
  const [showSingleFetchModal, setShowSingleFetchModal] = useState(false);
  
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

        <div className='flex flex-row gap-2'>
          {pageTitle !== 'Fatura Listesi' && (
           <button className="border_button">
            <PiStepsFill className="w-6 h-6 opacity-70" />
            <span className='opacity-80' style={{ fontSize:10 }}>Toplu Fatura Listesine Aktar</span>
            </button> 
          )}

          {pageTitle === 'Fatura Listesi' && (
           <>
            <button
              className="border_button"
              onClick={() => setShowSingleFetchModal(true)}
            >
              <FaFileInvoiceDollar className="w-6 h-6 opacity-70" />
              <span className='opacity-80' style={{ fontSize:10 }}>Hızlı Sipariş Ekle</span>
            </button>
 
            <a href='/add/customer' className="border_button">
              <FaFileInvoiceDollar className="w-6 h-6 opacity-70" />
              <span className='opacity-80' style={{ fontSize:10 }}>Müşteri Ekle</span>
            </a>

            <a href='/add/bills' className="border_button">
              <FaFileInvoiceDollar className="w-6 h-6 opacity-70" />
              <span className='opacity-80' style={{ fontSize:10 }}>Fatura Ekle</span>
            </a>
          </>
          )}
          
                
        </div>
        
      </div>
      
        <OrderHeader
          tabItems={tabs}
        />
      </div>
      
      <div className='px-6 py-4'>
        {children}
      </div>

      <ProductSingleFetchModal open={showSingleFetchModal} onClose={() => setShowSingleFetchModal(false)} />
    </div>
  );
} 