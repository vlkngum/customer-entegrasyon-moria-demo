"use client";

import { ReactNode } from 'react';
import { LuFolderDown } from "react-icons/lu"; 

interface OrdersLayoutProps {
  children: ReactNode;
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  return (
    <div className="min-h-screen p-0"> 
      <div className='px-8 pt-8 mb-2'>

        <div className='flex justify-between'>
          <h1 className="text-2xl font-mono text-gray-900 mb-6 flex flex-row items-center gap-2"><LuFolderDown className="w-8 h-8 text-[#0f82ff]" />İade Yönetimi</h1>
        </div>

        
      </div>
      
      <div className='px-6 py-0'>
        {children}
      </div>
    </div>
  );
} 