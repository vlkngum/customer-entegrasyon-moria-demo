"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CiHome } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { LuNewspaper } from "react-icons/lu";
import { LuFolderDown } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { TbReport } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdPin } from "react-icons/io";
import { FaThumbtack } from "react-icons/fa";



const menuItems = [
  { 
    name: 'Ekle', 
    href: '#', 
    icon: IoMdAddCircle,
    hasSubmenu: true,
    submenu: [
      { name: 'Ürün', href: '/add/new-product' },
      { name: 'Fatura', href: '/add/new-invoice' },
      { name: 'Müşteri', href: '/add/new-customer' }
    ],
    isSticky: true
  },
  { name: 'Dashboard', href: '/', icon: CiHome },
  { name: 'Siparişler', href: '/users', icon: CiShoppingBasket },
  { 
    name: 'Faturalar', 
    href: '/reports', 
    icon: LuNewspaper,
    hasSubmenu: true,
    submenu: [
      { name: 'Fatura Listesi', href: '/reports/invoices' },
      { name: 'Müşteri Listesi', href: '/reports/new-invoice' }
    ]
  },
  { name: 'İade Yönetimi', href: '/documents', icon: LuFolderDown },
  { 
    name: 'Ürünler', 
    href: '/settings', 
    icon: CiShoppingCart,
    hasSubmenu: true,
    submenu: [
      { name: 'Ürün Listesi', href: '/settings/products' },
      { name: 'Rekabet Robotu', href: '/settings/new-product' },
      { name: 'Kategoriler', href: '/settings/new-product' },
      { name: 'Markalar', href: '/settings/new-product' },
      { name: 'Etiketler', href: '/settings/new-product' },
      { name: 'Seçenekler', href: '/settings/new-product' },
      { name: 'XML Kaynakları', href: '/settings/new-product' }
    ]
  },
  { 
    name: 'Toplu İşlemler', 
    href: '/settings', 
    icon: CiLocationArrow1,
    hasSubmenu: true,
    submenu: [
      { name: 'Ürün Gönderimleri', href: '/settings/bulk-update' },
      { name: 'Ürün Güncellemeleri', href: '/settings/bulk-price' },
      { name: 'Excel İşlemleri', href: '/settings/bulk-update' },
      { name: 'Ürün Farklılık Kontrolleri', href: '/settings/bulk-price' }
    ]
  },
  { 
    name: 'Raporlar', 
    href: '/users', 
    icon: TbReport,
    hasSubmenu: true,
    submenu: [
      { name: 'Çok Satan Ürünler', href: '/users/sales-reports' },
      { name: 'Satılan Ürün Listesi', href: '/users/stock-reports' },
      { name: 'Sipariş ve Ciro', href: '/users/stock-reports' },
      { name: 'Kategori Bazlı Satış', href: '/users/stock-reports' },
      { name: 'Marka Bazlı Satış', href: '/users/stock-reports' },
      { name: 'Kdv Raporu', href: '/users/stock-reports' },
      { name: 'Komisyon Raporu', href: '/users/stock-reports' },
      { name: 'Stoktaki Ürün Tutarları Raporu', href: '/users/stock-reports' }
    ]
  },
  { 
    name: 'Ayarlar', 
    href: '/reports', 
    icon: CiSettings,
    hasSubmenu: true,
    submenu: [
      { name: 'Genel Ayarlar', href: '/reports/general-settings' },
      { name: 'ERP Muhasebe', href: '/reports/user-settings' },
      { name: 'Mağaza(Pazaryeri)', href: '/reports/user-settings' },
      { name: 'E-Ticaret(Site)', href: '/reports/user-settings' },
      { name: 'Kargo Ayarları', href: '/reports/user-settings' },
      { name: 'E-fatura Ayarları', href: '/reports/general-settings' },
      { name: 'Ürün ve Sipariş Çıktıları', href: '/reports/user-settings' },
      { name: 'İşlem Hareketleri', href: '/reports/user-settings' }
    ]
  },
  { name: 'Uygulamalar', href: '/documents', icon: CiShop },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPinned, setIsPinned] = useState(false);

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
      className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      onMouseEnter={() => !isPinned && setIsCollapsed(false)}
      onMouseLeave={() => !isPinned && setIsCollapsed(true)}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-black/20">
        {!isCollapsed && (
          <div className='flex-1'>
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
        )}
        <button
          onClick={togglePin}
          className={`p-1 rounded-full hover:bg-gray-100 ${isPinned ? 'text-blue-500' : 'text-gray-500'} relative group`}
        >
          {isPinned ? <FaThumbtack className="h-5 w-5" /> : <FaThumbtack className="h-5 w-5" />}
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Menüyü Sabitle
          </span>
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const isSubmenuOpen = openSubmenus[item.name];

          return (
            <div key={item.name} className={item.isSticky ? 'sticky top-0 bg-white z-10' : ''}>
              <div
                onClick={() => item.hasSubmenu ? toggleSubmenu(item.name) : null}
                className={`flex items-center px-6 py-3 cursor-pointer ${
                  item.name === 'Ekle' 
                    ? 'text-blue-500 hover:bg-[#e8f2ff] hover:bg-white' 
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