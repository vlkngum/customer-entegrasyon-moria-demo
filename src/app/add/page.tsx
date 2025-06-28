"use client";

import React, { useState, useCallback } from 'react';
import ProductGeneralInfo from '@/components/add/ProductGeneralInfo';
import ProductPricing from '@/components/add/ProductPricing';
import ImageUploadMulti from '@/tools/ImageUploadMulti';
import { FaArrowRight } from "react-icons/fa";

import QuickAddProductModal from '@/components/add/modal/QuickAddProductModal';
import Link from 'next/link';
import Image from 'next/image';

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const handleImageChange = useCallback((base64Image: string) => {
    setImages([base64Image]);
  }, []);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between px-3 py-5 ">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Ürün Genel Bilgileri</h1>
            <div className="text-xs text-gray-500 mb-1 flex gap-1 items-center">
              <Link href="/" className="text-black hover:text-blue-600 hover:underline">Entekas</Link>
              <span>/</span>
              <Link href="/products" className="text-black hover:text-blue-600 hover:underline">Ürünler</Link>
              <span>/</span>
              <span className="text-gray-400">Ürün Genel Bilgileri</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="border_button hover:underline hover:outline-none hover:border-[#3e8ef7]" onClick={() => setShowQuickAdd(true)}>
              <Image src="/hizliEkle.svg" alt="hizliEkle" width={20} height={20} />
              <span className="text-[#6b7b83]" style={{ fontSize:10 }}>HIZLI ÜRÜN EKLE</span>
            </button>
            <Link href="/products" className="border_button hover:underline bg-[#e8ebed]">
              <Image src="/vazgec.svg" alt="vazgec" width={20} height={20} />
              <span className="text-[#6b7b83]" style={{ fontSize:10 }}>VAZGEÇ</span>
            </Link>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-[1.2]">
            <ProductGeneralInfo />
            {/* <ProductDescription /> */}
            <div className="flex gap-6">
              <div className="flex-1">
              <ImageUploadMulti images={images} onImagesChange={setImages} />
              </div>
              {images.length > 0 && (
                <div className="panel flex-1">
                  <div className="w-full h-full p-2 text-sm text-gray-700">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-[0.8] min-w-[320px] max-w-[400px]">
            <ProductPricing />
          </div>
        </div> 
        {showQuickAdd && (<QuickAddProductModal open={showQuickAdd} onClose={() => setShowQuickAdd(false)} />)}
      </div>
      <footer className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 z-20 ">
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
