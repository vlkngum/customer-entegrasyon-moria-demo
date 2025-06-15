"use client";

import { useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';

interface OrderHeaderProps { 
  tabItems: { id: string; name: string; href: string; }[];
}



export default function OrderHeader({ tabItems }: OrderHeaderProps) {

  const pathname = usePathname();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabItems.map((tab) =>  {
            const isActive = pathname === tab.href;
            return (
              <a
                key={tab.id}
                href={tab.href} 
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.name }
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 