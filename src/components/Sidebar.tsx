"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GoHomeFill } from "react-icons/go";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: GoHomeFill },
  { name: 'Kullanıcılar', href: '/users', icon: GoHomeFill },
  { name: 'Raporlar', href: '/reports', icon: GoHomeFill },
  { name: 'Dökümanlar', href: '/documents', icon: GoHomeFill },
  { name: 'Ayarlar', href: '/settings', icon: GoHomeFill },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

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
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          <GoHomeFill className="h-5 w-5 mr-3" />
          Çıkış Yap
        </button>
      </nav>
    </div>
  );
} 