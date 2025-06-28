import { LuFolderDown } from "react-icons/lu"; 
import { IoMdAddCircle } from "react-icons/io"; 
import { IconType } from "react-icons";

import { House, ShoppingBasket,ScrollText, Layers ,  Send,ChartPie,Wrench,Store,  } from 'lucide-react';

export interface SubMenuItem {
  name: string;
  href: string;
}

export interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
  isSticky?: boolean;
}

export const menuItems: MenuItem[] = [
  { 
    name: 'Ekle', 
    href: '#', 
    icon: IoMdAddCircle,
    hasSubmenu: true,
    submenu: [
      { name: 'Ürün', href: '/add' },
      { name: 'Fatura', href: '/add/bills' },
      { name: 'Müşteri', href: '/add/customer' }
    ],
    isSticky: true
  },
  { name: 'Dashboard', href: '/', icon: House },
  { name: 'Siparişler', href: '/orders', icon: ShoppingBasket },
  { 
    name: 'Faturalar', 
    href: '/invoices', 
    icon: ScrollText,
    hasSubmenu: true,
    submenu: [
      { name: 'Fatura Listesi', href: '/orders/invoice-list' },
      { name: 'Müşteri Listesi', href: '/invoices/customer-invoices' }
    ]
  },
  { name: 'İade Yönetimi', href: '/claims', icon: LuFolderDown },
  { 
    name: 'Ürünler', 
    href: '/settings', 
    icon: Layers,
    hasSubmenu: true,
    submenu: [
      { name: 'Ürün Listesi', href: '/products' },
      { name: 'Rekabet Robotu', href: '/products/price-robot' },
      { name: 'Kategoriler', href: '/categorys-marks/category' },
      { name: 'Markalar', href: '/categorys-marks/marks' },
      { name: 'Etiketler', href: '/tags' },
      { name: 'Seçenekler', href: '/variant' },
      { name: 'XML Kaynakları', href: '/xml' }
    ]
  },
  { 
    name: 'Toplu İşlemler', 
    href: '/settings', 
    icon: Send,
    hasSubmenu: true,
    submenu: [
      { name: 'Ürün Gönderimleri', href: '/batch-processing/product-shipments' },
      { name: 'Ürün Güncellemeleri', href: '/batch-processing/new-bulk-product-shipment' },
      { name: 'Excel İşlemleri', href: '/batch-processing/excel-operations' },
      { name: 'Ürün Farklılık Kontrolleri', href: '/batch-processing/product-difference-control' }
    ]
  },
  { 
    name: 'Raporlar', 
    href: '/users', 
    icon: ChartPie,
    hasSubmenu: true,
    submenu: [
      { name: 'Çok Satan Ürünler', href: '/reports/best-selling-products' },
      { name: 'Satılan Ürün Listesi', href: '/reports/list-of-products-sold' },
      { name: 'Sipariş ve Ciro', href: '/reports/order-and-turnover' },
      { name: 'Kategori Bazlı Satış', href: '/reports/category-based-selling' },
      { name: 'Marka Bazlı Satış', href: '/reports/brand-based-selling' },
      { name: 'Kdv Raporu', href: '/reports/vat-report' },
      { name: 'Komisyon Raporu', href: '/reports/commission-report' },
      { name: 'Stoktaki Ürün Tutarları Raporu', href: '/reports/product-amounts-in-stock-report' }
    ]
  },
  { 
    name: 'Ayarlar', 
    href: '/reports', 
    icon: Wrench,
    hasSubmenu: true,
    submenu: [
      { name: 'Genel Ayarlar', href: '/settings' },
      { name: 'ERP Muhasebe', href: '/settings/erp' },
      { name: 'Mağaza(Pazaryeri)', href: '/settings/stores' },
      { name: 'E-Ticaret(Site)', href: '/settings/ecommerce' },
      { name: 'Kargo Ayarları', href: '/settings/cargoes' },
      { name: 'E-fatura Ayarları', href: '/settings/einvoice' },
      { name: 'Ürün ve Sipariş Çıktıları', href: '/reports/user-settings' },
      { name: 'İşlem Hareketleri', href: '/reports/user-settings' }
    ]
  },
  { name: 'Uygulamalar', href: '/applications', icon: Store },
]; 