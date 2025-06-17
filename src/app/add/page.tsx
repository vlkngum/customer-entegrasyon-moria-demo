"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ProductGeneralInfo from '@/components/add/ProductGeneralInfo';
import ProductDescription from '@/components/add/ProductDescription';
import ProductPricing from '@/components/add/ProductPricing';
import ProductImageUpload from '@/components/add/ProductImageUpload';
import { BsNewspaper } from "react-icons/bs";

function QuickAddProductModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [market, setMarket] = useState('');
  const [link, setLink] = useState('');
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShowAnim(true), 10); 
    } else {
      setShowAnim(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div
        className={`
          bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative
          transition-all duration-300
          ${showAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-semibold mb-4">Hızlı Ürün Ekle</h2>
        <div className="mb-4 text-gray-700">Ürünün çekileceği pazar yerini seçiniz.</div>
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1">PAZARYERLERİ</label>
          <select
            className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
            value={market}
            onChange={e => setMarket(e.target.value)}
          >
            <option value="">Seçiniz</option>
            <option value="trendyol">Trendyol</option>
            <option value="hepsiburada">Hepsiburada</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-2 text-gray-700">Ürün linkini aşağıdaki alana yapıştırınız.</div>
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-1">TARAMA YAPILACAK SAYFA LİNKİ</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="flex justify-end">
          <a
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-8 py-2 rounded font-semibold text-lg hover:bg-green-600 transition"
          >
            ÜRÜNÜ GETİR
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AddProductPage() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const handleImageChange = useCallback((base64Image: string) => {
    setImage(base64Image);
  }, []);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <div className="bg-[#f6f9fc] min-h-screen p-6">
      {/* Breadcrumb and Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Ürün Genel Bilgileri</h1>
        <div className="text-xs text-gray-500 mb-1 flex gap-1 items-center">
          <a href="/" className="text-blue-600 hover:underline">CMApps</a>
          <span>/</span>
          <a href="/urunler" className="text-blue-600 hover:underline">Ürünler</a>
          <span>/</span>
          <a href="#" className="text-blue-600 hover:underline">Ürün Genel Bilgileri</a>
        </div>
      </div>
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1">
          <ProductGeneralInfo />
          <ProductDescription />
          <ProductImageUpload onImageChange={handleImageChange} initialImageUrl={image} />
        </div>
        
        {/* Right Column */}
        <div className="w-[370px]">
          <ProductPricing />
        </div>
      </div>
      {/* Top right buttons */}
      <div className="absolute top-6 right-6 flex gap-2">
        <button
          className="bg-gray-100 px-4 py-2 rounded font-semibold"
          onClick={() => setShowQuickAdd(true)}
        >
          HIZLI ÜRÜN EKLE
        </button>
        <button className="bg-gray-100 px-4 py-2 rounded font-semibold">VAZGEÇ</button>
      </div>
      <QuickAddProductModal open={showQuickAdd} onClose={() => setShowQuickAdd(false)} />
    </div>
  );
}
