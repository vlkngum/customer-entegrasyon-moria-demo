"use client";

import { useState } from "react";
import { AiFillProduct, AiOutlineProduct  } from "react-icons/ai"; 
import { FaProductHunt  } from "react-icons/fa";
import ProductSingleFetchModal from "@/components/products/list/ProductSingleFetchModal";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Ürün Listesi");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { name: "Ürün Listesi" , href: '/products' },
    { name: "Ürün Ekle", href: '/add' },
    { name: "Kategoriler", href: '/categorys-marks/category' },
    { name: "Markalar", href: '/categorys-marks/marks' },
    { name: "Seçenek Grupları (Varyant)", href: '/products/variant' },
    { name: "Hepsiburada Kataloğa Önerilen Ürünler", href: '/products/hbCatalogProducts' },
    { name: "Ürün Bazlı Kategori Özellik Eşitleme Listesi", href: '/products/list_sync' },
    { name: "Rekabet Robotu", href: '/products/price_robot' },

  ];

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 mb-6 w-full">
          <div className="w-full flex flex-row justify-between py-2 px-6">
            <div className="flex items-center space-x-3 ">
              <FaProductHunt className="text-3xl text-gray-700" />
              <h1 className="text-xl font-semibold text-gray-800">İade Yönetimi</h1> 
            </div>

            <div className="flex gap-2">
          <button className="border_button" onClick={() => setIsModalOpen(true)}>
                <AiFillProduct className="w-6 h-6" />
                <span style={{ fontSize:10 }}>TEKİL ÜRÜN ÇEK</span>
            </button>
            <a className="border_button" href="/add" >
                <AiOutlineProduct className="w-6 h-6" />
                <span style={{ fontSize:10 }}>YENİ ÜRÜN EKLE</span>
            </a>
        </div>
          </div>
          
          <div className="flex flex-wrap p-1 border-t border-gray-200">
            {tabs.map((tab) => (
              <a
                href={tab.href}
                key={tab.name}
                className={`px-6 py-2  text-sm font-semibold flex items-center space-x-2 transition-colors duration-200 ${activeTab === tab.name ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:bg-blue-50 hover:text-gray-700"}`}
                onClick={() => setActiveTab(tab.name)}
              > 
                <span>{tab.name}</span>
              </a>
            ))}
          </div>
        </div>

        
        {children}
      </div>
      {isModalOpen && (
        <ProductSingleFetchModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
 