"use client";

import { useState } from "react";
import ProductTable from "@/components/ProductTable";
import { ProductTableColumn } from "@/components/ProductTable";

const tagsData = [
  { 
    id: 1, 
    name: 'Elektronik', 
    color: '#FF6B6B',  
  },
  { 
    id: 2, 
    name: 'Giyim', 
    color: '#4ECDC4', 
    productCount: 78 
  },
  { 
    id: 3, 
    name: 'Ev & Bahçe', 
    color: '#45B7D1',  
  },
  { 
    id: 4, 
    name: 'Spor', 
    color: '#FFA07A',  
  }
];

const tagColumns: ProductTableColumn[] = [
  {
    key: 'name',
    title: 'ETİKET',
    className: 'col-span-6 text-left pl-4',
    render: (value, row) => (
      <div className="flex items-center space-x-3">
        <div 
          className="w-8 h-8 rounded-full" 
          style={{ backgroundColor: row.color }}
        />
        <span>{value}</span>
      </div>
    )
  },
  {
    key: 'color',
    title: 'RENK',
    className: 'col-span-4 text-left',
    render: (value) => (
      <span 
        className="inline-block w-16 h-6 rounded" 
        style={{ backgroundColor: value }}
      />
    )
  }, 
  {
    key: 'actions',
    title: 'İŞLEMLER',
    className: 'col-span-2 text-center',
    render: () => (
      <div className="flex justify-center space-x-2">
        <button className="text-blue-500 hover:text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button className="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    )
  }
];

export default function TagsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Etiketlerim</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => setShowModal(true)}
        >
          + Yeni Etiket Ekle
        </button>
      </div>
      <ProductTable 
        columns={tagColumns} 
        data={tagsData} 
        variant="card" 
      />

      {/* Modal Tasarımı */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Kapat"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Yeni Etiket Ekle</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Etiket Adı</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Örn: Yazılım, Kışlık, Elektronik..."
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Renk</label>
                <select 
                  className="input" 
                >
                    <option>Siyah</option>
                    <option>Mavi</option>
                    <option>Kırmızı</option>
                    <option>Sarı</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  İptal
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  disabled
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 


