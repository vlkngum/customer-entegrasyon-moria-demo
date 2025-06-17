import React, { useState } from 'react';
import { BsNewspaper } from "react-icons/bs";

export default function ProductGeneralInfo() {
  const [showOtherProps, setShowOtherProps] = useState(false);

  return (
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
  );
} 