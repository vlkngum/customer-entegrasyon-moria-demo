"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon, 
  CogIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Kullanıcılar', href: '/users', icon: UsersIcon },
  { name: 'Raporlar', href: '/reports', icon: ChartBarIcon },
  { name: 'Dökümanlar', href: '/documents', icon: DocumentTextIcon },
  { name: 'Ayarlar', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center ">
        <div className='flex-1 px-10 py-4 border-b border-black/20'>
        <Image 
          src="/cmapps-logo.svg" 
          alt="CMApps Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
        </div>
        
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 