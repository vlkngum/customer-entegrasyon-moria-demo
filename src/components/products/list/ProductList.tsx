'use client';
import { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { FaSort } from "react-icons/fa";
import QuickPriceUpdateModal from './QuickPriceUpdateModal';
import QuickStockUpdateModal from './QuickStockUpdateModal';
import ProductActionsMenu from './ProductActionsMenu';
import Image from "next/image";
import Link from 'next/link';
import BulkProcessModal from './BulkProcessModal';

// Define a type for the Product object for better type safety
type Product = {
  id: number;
  sku: string;
  name: string;
  price: string;
  img: string;
  stock: number;
  platform: {
    name: string;
    icon: string;
    synced: boolean;
  };
  status: string;
  source: string;
};

export default function ProductList() { 
  // State for managing price modal
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedProductForPrice, setSelectedProductForPrice] = useState<Product | null>(null);
  
  // State for managing stock modal
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProductForStock, setSelectedProductForStock] = useState<Product | null>(null);
  
  // State for managing the actions menu
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Seçili ürünlerin ID'leri için state
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  // State for BulkProcessModal
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  // State for delete dropdown
  const [isDeleteDropdownOpen, setIsDeleteDropdownOpen] = useState(false);

  const handleOpenPriceModal = (product: Product) => {
    setSelectedProductForPrice(product);
    setIsPriceModalOpen(true);
    setIsStockModalOpen(false);
    setSelectedProductForStock(null);
  };

  const handleClosePriceModal = () => {
    setIsPriceModalOpen(false);
    setSelectedProductForPrice(null);
  };

  const handleOpenStockModal = (product: Product) => {
    setSelectedProductForStock(product);
    setIsStockModalOpen(true);
  };

  const handleCloseStockModal = () => {
    setIsStockModalOpen(false);
    setSelectedProductForStock(null);
  };

  const handleMenuToggle = (productId: number) => {
    setOpenMenuId(prevId => (prevId === productId ? null : productId));
  };

  const handleCloseMenu = () => {
    setOpenMenuId(null);
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProductIds.length === products.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(products.map(p => p.id));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the currently active menu area
      // We find the specific menu's wrapper by its ID
      const menuNode = document.getElementById(`actions-menu-${openMenuId}`);
      if (menuNode && !menuNode.contains(event.target as Node)) {
        handleCloseMenu();
      }
    };

    if (openMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  // Dropdown dışına tıklanınca kapat
  useEffect(() => {
    if (!isDeleteDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('delete-dropdown');
      const button = document.getElementById('delete-dropdown-btn');
      if (dropdown && !dropdown.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
        setIsDeleteDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDeleteDropdownOpen]);

  const products: Product[] = [
    {
      id: 1,
      sku: '1212',
      name: 'sSsS',
      price: '121,00', 
      img:'/trendyol-ico.png',
      stock: 1212,
      platform: {
        name: 'Trendyol',
        icon: 'https://cdn.dsmcdn.com/web/production/favicon.ico',
        synced: false
      },
      status: 'Satışa Açık',
      source: 'Entekas'
    },
    {
      id: 2,
      sku: 'AMZN-543',
      name: 'Amazon Echo Dot',
      price: '499,99',
      img:'/trendyol-ico.png',
      stock: 50,
      platform: {
        name: 'Amazon',
        icon: 'https://www.amazon.com/favicon.ico',
        synced: true
      },
      status: 'Satışa Açık',
      source: 'Manual'
    },
    {
      id: 3,
      sku: 'HB-987',
      name: 'Hepsiburada E-Kitap Okuyucu',
      price: '1299,00',
      img:'/trendyol-ico.png',
      stock: 25,
      platform: {
        name: 'Hepsiburada',
        icon: 'https://www.hepsiburada.com/favicon.ico',
        synced: false
      },
      status: 'Satıştan Kaldırıldı',
      source: 'Entekas'
    },
    // Örnek veri, buraya daha fazla ürün eklenebilir
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Satışa Açık':
        return 'text-green-800 bg-green-100';
      case 'Satıştan Kaldırıldı':
        return 'text-red-800 bg-red-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="bg-blue-50/50 p-4 rounded-lg mt-4 mb-20">
      {/* Toplu İşlemler Barı */}
      {selectedProductIds.length > 0 && (
        <div className="bg-blue-500 text-white rounded-lg flex items-center p-4 mb-4 relative">
          <input
            type="checkbox"
            checked={selectedProductIds.length === products.length}
            onChange={handleSelectAll}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="font-bold mr-4">{selectedProductIds.length} adet kayıt seçildi.</span>
          <button className="flex items-center mr-4 hover:opacity-70" onClick={() => setIsBulkModalOpen(true)}>
          <Image src={'/filtArrow.svg'} width={0} height={0} alt='arrowUp' className='w-4 h-4 mr-2' /> TOPLU İŞLEMLER
          </button>
          <div className="relative">
            <button id="delete-dropdown-btn" className="flex items-center text-white hover:opacity-70" onClick={() => setIsDeleteDropdownOpen((v) => !v)}>
              <Image src="/filtDelete.svg" width={0} height={0} alt="Sil" className="w-[15px] h-[15px] block mr-2"/> SİLME İŞLEMLERİ
            </button>
            {isDeleteDropdownOpen && (
              <div id="delete-dropdown" className="absolute left-0 top-full mt-2 z-20 bg-blue-500 rounded-lg shadow-lg w-56">
                <button className="w-full text-left px-6 py-3 hover:bg-blue-600 text-white font-bold border-b border-blue-400" onClick={() => {/* Seçilenleri sil */ setIsDeleteDropdownOpen(false);}}>SEÇİLENLERİ SİL</button>
                <button className="w-full text-left px-6 py-3 hover:bg-blue-600 text-white font-bold" onClick={() => {/* Tüm ürünleri sil */ setIsDeleteDropdownOpen(false);}}>TÜM ÜRÜNLERİ SİL</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Liste Başlığı */}
      <div className="grid grid-cols-12 gap-4 items-center px-4 py-2 text-xs font-bold text-gray-500 uppercase">
        <div className="col-span-1 flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedProductIds.length === products.length && products.length > 0}
            onChange={handleSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          ETİKET
        </div>
        <div className="col-span-4 lg:col-span-3 flex items-center gap-1 cursor-pointer hover:text-gray-800">ÜRÜN ADI <FaSort /></div>
        <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-gray-800">FİYATI <FaSort /></div>
        <div className="col-span-1 flex items-center gap-1 cursor-pointer hover:text-gray-800">STOK <FaSort /></div>
        <div className="col-span-2">PLATFORM DURUMU</div>
        <div className="col-span-2">AI ÖNERİ</div>
        <div className="col-span-1">DURUMU</div>
        <div className="col-span-1 text-right"></div>
      </div>

      {/* Ürün Kartları */}
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            
            <div className="col-span-1 flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedProductIds.includes(product.id)}
                onChange={() => handleSelectProduct(product.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="font-bold text-gray-400 text-lg">#</span>
            </div>
            
            <div className="col-span-4 lg:col-span-3 flex items-center gap-3">
              <div className="w-12 h-12  rounded-md flex items-center justify-center shrink-0">
                <Image className="text-xs text-gray-500 text-center rounded-full" src={product.img} alt={''} width={50} height={50}  />
              </div>
              <div className="truncate">
                <div className="text-xs text-gray-500">Stok Kodu: {product.sku}</div>
                <div className="font-semibold text-gray-800 truncate">{product.name}</div>
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="font-semibold">{product.price} ₺</div>
              <button onClick={() => handleOpenPriceModal(product)} className="text-xs text-blue-600 hover:underline">Hızlı Düzenle</button>
            </div>
            
            <div className="col-span-1">
              <div className="font-semibold">{product.stock}</div>
              <button onClick={() => handleOpenStockModal(product)} className="text-xs text-blue-600 hover:underline">Hızlı Düzenle</button>
            </div>
            
            <div className="col-span-2 flex items-center gap-2">
               <Image src={product.platform.icon} alt={product.platform.name} className="w-5 h-5 rounded-full"  width={0} height={0} />
               {!product.platform.synced && <span className="text-red-500 text-xl font-light">×</span>}
            </div>
            
            <div className="col-span-1">
              <span className={`px-2 py-1 text-xs text-nowrap font-semibold rounded-full ${getStatusClass(product.status)}`}>{product.status}</span>
              <div className="text-xs text-gray-500 mt-1">Kaynak: {product.source}</div>
            </div>
            
            <div id={`actions-menu-${product.id}`} className="col-span-2 flex justify-end items-center gap-2 relative">
              <Link href="/add" className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md font-semibold text-xs hover:bg-blue-200">
                <FiEdit /> DÜZENLE
              </Link>
              <button onClick={() => handleMenuToggle(product.id)} className="ml-2 p-2 text-gray-500 hover:bg-gray-200 rounded-full">
                <BsThreeDots />
              </button>
              {openMenuId === product.id && <ProductActionsMenu onClose={handleCloseMenu} />}
            </div>
          </div>
        ))}
      </div>
      <QuickPriceUpdateModal 
        isOpen={isPriceModalOpen}
        onClose={handleClosePriceModal}
        product={selectedProductForPrice}
      />
      <QuickStockUpdateModal 
        isOpen={isStockModalOpen}
        onClose={handleCloseStockModal}
        product={selectedProductForStock}
      />
      <BulkProcessModal showModal={isBulkModalOpen} onClose={() => setIsBulkModalOpen(false)} />
    </div>
  );
} 