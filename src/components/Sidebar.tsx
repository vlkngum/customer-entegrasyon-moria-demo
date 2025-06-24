"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaThumbtack } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { menuItems, MenuItem } from '@/data/menuItems';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPinned, setIsPinned] = useState(true);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenus(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        if (key !== itemName) {
          newState[key] = false;
        }
      });
      newState[itemName] = !prev[itemName];
      return newState;
    });
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsCollapsed(false);
    }
  };

  return (
    <div 
      className={`bg-white shadow-lg transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      onMouseEnter={() => !isPinned && setIsCollapsed(false)}
      onMouseLeave={() => !isPinned && setIsCollapsed(true)}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-black/20">
        {!isCollapsed && (
          <div className='flex-1 px-5'>
            <Image 
              src="/entekas-logo.svg" 
              alt="CMApps Logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} 
              priority
            />
          </div>
        )}
        <button
          onClick={togglePin}
          className={`p-1 rounded-full hover:bg-gray-100 ${isPinned ? 'text-blue-500' : 'text-gray-500'} relative group`}
        >
          {isPinned ? <FaThumbtack className="h-4 w-4" /> : <FaThumbtack className="h-4 w-4" />}
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Menüyü Sabitle
          </span>
        </button>
      </div>
      <nav className="mt-6 overflow-y-auto overflow-x-hidden h-[calc(100vh-80px)]">
        {menuItems.map((item: MenuItem) => {
          const isActive = pathname === item.href;
          const isSubmenuOpen = openSubmenus[item.name];

          return (
            <div key={item.name} className={item.isSticky ? 'sticky top-0 bg-white z-10' : ''}>
              <div
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleSubmenu(item.name);
                  } else {
                    router.push(item.href);
                  }
                }}
                className={`flex items-center px-6 py-3 cursor-pointer ${
                  item.name === 'Ekle' 
                    ? 'text-blue-500 hover:bg-white' 
                    : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100'
                } ${
                  isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${
                    item.name === 'Ekle' 
                      ? 'text-blue-500' 
                      : isActive ? 'text-blue-500' : ''
                  } group-hover:text-blue-500`} />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 ml-3">{item.name}</span>
                    {item.hasSubmenu && (
                      <div className="group-hover:block">
                        {isSubmenuOpen ? (
                          <IoIosArrowUp className={`h-4 w-4 transition-transform ${
                            item.name === 'Ekle' ? 'text-blue-500' : ''
                          }`} />
                        ) : (
                          <div className="group-hover:hidden">
                            <IoIosArrowDown className={`h-4 w-4 transition-transform ${
                              item.name === 'Ekle' ? 'text-blue-500' : ''
                            }`} />
                          </div>
                        )}
                        <div className="hidden group-hover:block">
                          <IoIosArrowUp className={`h-4 w-4 transition-transform ${
                            item.name === 'Ekle' ? 'text-blue-500' : ''
                          }`} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {!isCollapsed && item.hasSubmenu && isSubmenuOpen && (
                <div className="pl-14 bg-[#e8f2ff]">
                  {item.submenu?.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={`block py-2 text-black hover:text-blue-500 ${
                        pathname === subItem.href ? 'text-blue-500' : ''
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <CiLogout className="w-5 h-5" />
          </div>
          {!isCollapsed && <span className="ml-3">Çıkış Yap</span>}
        </button>
      </nav>
    </div>
  );
} 