import { CiHome, CiShoppingBasket, CiShoppingCart, CiLocationArrow1, CiSettings, CiShop, CiLogout } from "react-icons/ci";
import { LuNewspaper, LuFolderDown } from "react-icons/lu";
import { TbReport } from "react-icons/tb";
import { IoMdAddCircle } from "react-icons/io"; 
import { IconType } from "react-icons";

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
  { name: 'Dashboard', href: '/', icon: CiHome },
  { name: 'Siparişler', href: '/orders', icon: CiShoppingBasket },
  { 
    name: 'Faturalar', 
    href: '/invoices', 
    icon: LuNewspaper,
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
    icon: CiShoppingCart,
    hasSubmenu: true,
    submenu: [
      { name: 'Ürün Listesi', href: '/settings/products' },
      { name: 'Rekabet Robotu', href: 'price-competition-robot' },
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
      { name: 'Ürün Gönderimleri', href: '/product-shipments' },
      { name: 'Ürün Güncellemeleri', href: '/new-bulk-product-shipment' },
      { name: 'Excel İşlemleri', href: '/excel-operations' },
      { name: 'Ürün Farklılık Kontrolleri', href: '/product-difference-control' }
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