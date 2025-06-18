"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ProductGeneralInfo from '@/components/add/ProductGeneralInfo';
import ProductDescription from '@/components/add/ProductDescription';
import ProductPricing from '@/components/add/ProductPricing';
import ProductImageUpload from '@/components/add/ProductImageUpload';
import { AiFillProduct } from "react-icons/ai";
import { MdCancelPresentation } from "react-icons/md";


import QuickAddProductModal from '@/components/add/modal/QuickAddProductModal';

 
export default function AddProductPage() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const handleImageChange = useCallback((base64Image: string) => {
    setImage(base64Image);
  }, []);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between px-3 py-5 ">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Ürün Genel Bilgileri</h1>
          <div className="text-xs text-gray-500 mb-1 flex gap-1 items-center">
            <a href="/" className="text-blue-600 hover:underline">CMApps</a>
            <span>/</span>
            <a className="text-blue-600 hover:underline">Ürünler</a>
            <span>/</span>
            <a href="#" className="text-blue-600 hover:underline">Ürün Genel Bilgileri</a>
          </div>
        </div>


        <div className="flex gap-2">
          <button className="border_button" onClick={() => setShowQuickAdd(true)}>
                <AiFillProduct className="w-6 h-6" />
                <span style={{ fontSize:10 }}>HIZLI ÜRÜN EKLE</span>
            </button>
            <button className="border_button" onClick={() => setShowQuickAdd(true)}>
                <MdCancelPresentation className="w-6 h-6" />
                <span style={{ fontSize:10 }}>VAZGEÇ</span>
            </button>
        </div>

      </div>
             
      
      <div className="flex gap-6">
        <div className="flex-1">
          <ProductGeneralInfo />
          <ProductDescription />
          <ProductImageUpload onImageChange={handleImageChange} initialImageUrl={image} />
        </div>
         
        <div>
          <ProductPricing />
        </div>
      </div> 
      {showQuickAdd && (<QuickAddProductModal open={showQuickAdd} onClose={() => setShowQuickAdd(false)} />)}
    </div>
  );
}
