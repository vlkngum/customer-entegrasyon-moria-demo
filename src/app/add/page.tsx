"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ProductGeneralInfo from '@/components/add/ProductGeneralInfo';
import ProductDescription from '@/components/add/ProductDescription';
import ProductPricing from '@/components/add/ProductPricing';
import ProductImageUpload from '@/components/add/ProductImageUpload';
import { AiFillProduct } from "react-icons/ai";
import { MdCancelPresentation } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

import QuickAddProductModal from '@/components/add/modal/QuickAddProductModal';

export default function AddProductPage() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const handleImageChange = useCallback((base64Image: string) => {
    setImage(base64Image);
  }, []);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <>
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
            <div className="flex gap-6">
              <div className="flex-1">
                <ProductImageUpload onImageChange={handleImageChange} initialImageUrl={image} />
              </div>
              {image && (
                <div className="panel flex-1">
                  <div className="w-full h-full p-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <ProductPricing />
          </div>
        </div> 
        {showQuickAdd && (<QuickAddProductModal open={showQuickAdd} onClose={() => setShowQuickAdd(false)} />)}
      </div>
      <footer className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-4 z-20 ">
        <div className="flex justify-end">
          <button className="bg-emerald-500 text-white px-6 py-2.5 rounded-lg flex items-center text-sm font-semibold shadow-md hover:bg-emerald-600 transition-colors">
            ÜRÜNÜ KAYDET
            <FaArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </footer>
    </>
  );
}
