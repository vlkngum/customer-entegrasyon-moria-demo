"use client";

import { ReactNode } from 'react';

import Image from 'next/image';

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  return (
    <div className="min-h-screen p-0"> 
      <div className='px-8 pt-8 mb-2'>

        <div className='flex justify-between'>
          <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><Image src={'/icon/product.svg'} width={0} height={0} alt='orderIcon' className='h-10 w-10'/>İade Yönetimi</h1>
        </div>

        
      </div>
      
      <div className='px-6 py-0'>
        {children}
      </div>
    </div>
  );
} 