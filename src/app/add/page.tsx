"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ImageUpload from '@/tools/ImageUpload'; // adjust the path as needed
import { BsNewspaper } from "react-icons/bs";

function QuickAddProductModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [market, setMarket] = useState('');
  const [link, setLink] = useState('');
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setShowAnim(true), 10); // bir sonraki renderda animasyon başlasın
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
  const [showOtherProps, setShowOtherProps] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  return (
    <div className="bg-[#f6f9fc] min-h-screen p-6">
      {/* Breadcrumb and Title */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-1 flex gap-1 items-center">
          <a href="/" className="text-blue-600 hover:underline">CMApps</a>
          <span>/</span>
          <a href="/urunler" className="text-blue-600 hover:underline">Ürünler</a>
          <span>/</span>
          <a href="#" className="text-blue-600 hover:underline">Ürün Genel Bilgileri</a>
        </div>
        <h1 className="text-2xl font-semibold">Ürün Genel Bilgileri</h1>
      </div>
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded">
                <BsNewspaper className="text-3xl" />
              </div>
              <div>
                <div className="font-semibold">Ürün Bilgileri</div>
                <div className="text-xs text-gray-500 flex gap-2 items-center">
                  <span>Video</span>
                  <span>Yardım</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Ürünün genel bilgilerini aşağıdaki formlar yardımıyla girebilirsiniz.</div>
              </div>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">ÜRÜN MARKASI</label>
                <select className="w-full border rounded px-3 py-2 text-sm bg-gray-50">
                  <option>--------------</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">ÜRÜN KATEGORİSİ</label>
                <select className="w-full border rounded px-3 py-2 text-sm bg-gray-50">
                  <option>--------------</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-500 mb-1">ÜRÜN BAŞLIĞI (MAKSİMUM 150 KARAKTER) *</label>
                <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">BARKOD/GTIN</label>
                <div className="flex gap-2">
                  <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder="" />
                  <button className="bg-gray-200 text-xs px-2 rounded">BARKOD ÜRET</button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">DESİ</label>
                <div className="flex gap-2">
                  <input className="flex-1 border rounded px-3 py-2 text-sm" placeholder="" />
                  <button className="bg-gray-200 text-xs px-2 rounded">DESİ HESAPLA</button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">STOK *</label>
                <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">STOK KODU *</label>
                <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
              </div>
              <div className="col-span-2 flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">ÜRÜN SATIŞ DURUMU</label>
                  <button className="w-full bg-green-500 text-white rounded px-3 py-2 font-semibold">SATIŞA AÇIK</button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-100 text-blue-700 rounded px-4 py-2 text-sm font-semibold"
                onClick={() => setShowOtherProps((v) => !v)}
                type="button"
              >
                {showOtherProps ? 'DİĞER ÜRÜN ÖZELLİKLERİNİ GİZLE' : 'DİĞER ÜRÜN ÖZELLİKLERİNİ GÖR'}
              </button>
            </div>
            {showOtherProps && (
              <div className="mt-6 border-t pt-6 animate-fade-in">
                {/* Other Product Properties Form */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">T. STOK KODU</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">HAZIRLIK SÜRESİ</label>
                    <div className="flex gap-2">
                    <button className="bg-gray-200 px-2 py-1 rounded text-xs h-10">GÜN</button>
                      <input className="border rounded px-3 py-2 text-sm w-1/2 h-10" placeholder="" />
                      
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">GARANTİ SÜRESİ</label>
                    <div className="flex gap-2">
                    <button className="bg-gray-200 px-2 py-1 rounded text-xs h-10">AY</button>
                      <input className="border rounded px-3 py-2 text-sm w-1/2 h-10" placeholder="" />
                     
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">N11 KATALOG NO</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">GTIN</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">RAF</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-500 mb-1">ÜRÜNÜN E-TİCARET LİNKİ</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="" />
                  </div>
                  <div className="col-span-1 flex flex-col justify-end">
                    <label className="block text-xs text-gray-500 mb-1">XML FİYAT KİLİDİ</label>
                    <div className="flex gap-2 h-10 items-center">
                      <label className="flex items-center gap-1">
                        <input type="radio" name="xmlFiyatKilidi" className="accent-blue-500" />
                        <span className="text-xs">AÇIK</span>
                      </label>
                      <label className="flex items-center gap-1">
                        <input type="radio" name="xmlFiyatKilidi" className="accent-blue-500" defaultChecked />
                        <span className="text-xs">KAPALI</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">N11 GRUP KODU</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="Örn:SPY0001" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">N11 ÜRÜN ÖZELLİK ADI</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="Örn:Renk" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-500 mb-1">N11 ÜRÜN ÖZELLİK DEĞERİ</label>
                    <input className="border rounded px-3 py-2 text-sm h-10 w-full" placeholder="Örn:Siyah" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ÜRÜN ALT BAŞLIĞI (MAKSİMUM 65 KARAKTER) *</label>
                    <input className="w-full border rounded px-3 py-2 text-sm h-10" placeholder="" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ÜRÜN SATILDIĞINDA STOKTAN NE KADAR DÜŞÜLECEK ?</label>
                    <input className="w-full border rounded px-3 py-2 text-sm h-10" defaultValue="1" placeholder="" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ÜRÜN FATURA BAŞLIĞI</label>
                    <input className="w-full border rounded px-3 py-2 text-sm h-10" placeholder="" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ÜRÜN MAKSİMUM SATIN ALIM ADEDİ (SINIRSIZ İÇİN 0 BIRAKINIZ.)</label>
                    <input className="w-full border rounded px-3 py-2 text-sm h-10" defaultValue="0" placeholder="" />
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-100 text-blue-700 rounded px-8 py-2 text-sm font-semibold flex items-center gap-2"
                    type="button"
                    onClick={() => setShowOtherProps(false)}
                  >
                    <span className="text-lg">↑</span> GİZLE
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Product Description */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <label className="block text-xs text-gray-500 mb-2">ÜRÜN AÇIKLAMASI</label>
            {/* Placeholder for rich text editor */}
            <textarea className="w-full border rounded min-h-[180px] p-2 text-sm" placeholder="Ürün açıklamasını buraya giriniz..."></textarea>
          </div>
          {/* Image Upload aligned with product description */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <ImageUpload onImageChange={handleImageChange} id="whatWeProduceImage" initialImageUrl={image} />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-[370px]">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Channel icons */}
            <div className="flex gap-2 mb-4">
              {/* Placeholder icons */}
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">A</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">H</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">T</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">G</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">N</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">P</div>
            </div>
            <div className="text-xs text-gray-500 mb-4">Ürünü satışa çıkarmak için ilk olarak ÜRÜNÜ KAYDEDİN.</div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">KDV ORANI</label>
                <select className="w-full border rounded px-3 py-2 text-sm bg-gray-50">
                  <option>% 20</option>
                  <option>% 18</option>
                  <option>% 10</option>
                  <option>% 8</option>
                  <option>% 1</option>
                  <option>% 0</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">ALIŞ FİYATI</label>
                <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">PİYASA(LİSTE) FİYATI</label>
                <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">SATIŞ FİYATI *</label>
                <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" id="channelPricing" />
              <label htmlFor="channelPricing" className="text-xs text-gray-500">KANAL BAZLI FİYATLANDIRMA</label>
            </div>
          </div>
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
