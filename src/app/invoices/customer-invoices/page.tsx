"use client";

import { useState } from "react";
import { FaUsers, FaSearch, FaFileInvoiceDollar } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import ProductTable, { ProductTableColumn } from '@/components/ProductTable';

const customers = [
  { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
  { id: '2', name: 'Ayşe Demir', email: 'ayse@example.com' },
  { id: '3', name: 'Mehmet Can', email: 'mehmet@example.com' },
];

const columns: ProductTableColumn[] = [
  { key: 'name', title: 'MÜŞTERİ ADI' },
  { key: 'email', title: 'MÜŞTERİ MAİL' },
  {
    key: 'actions',
    title: <div className="text-right">İŞLEMLER</div>,
    render: (_, row) => (
      <div className="flex justify-end gap-2">
        {/* Buraya ileride düzenle/sil ikonları eklenebilir */}
        <button className="text-blue-600 hover:underline text-xs">Düzenle</button>
        <button className="text-red-500 hover:underline text-xs">Sil</button>
      </div>
    ),
    className: 'text-right',
  },
];

export default function Invoices() {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="w-full mx-auto flex flex-col gap-2">
        <div className="panel">
          <div className="flex items-center justify-between mb-6 px-6 py-4">
            <div className="flex items-center space-x-2">
                <FaUsers className="text-3xl text-gray-700" />
                <h1 className="text-xl font-semibold text-gray-800">Müşteriler</h1>
            </div>
            <button className="border_button">
                <FaFileInvoiceDollar className="w-6 h-6" />
                <span style={{ fontSize:10 }}>YENİ MÜŞTERİ EKLE</span>
            </button>
            </div>
          <div className="flex">
            <a
              className={`px-6 py-3 text-sm font-medium ${activeTab === "invoices" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("invoices")}
              href='/orders/invoice-list'
            >
              Faturalar
            </a>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === "customers" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("customers")}
            >
              Müşteriler
            </button>
          </div>
         
          <div className="flex flex-row justify-start items-center space-x-4 w-full p-6">
            <div className="flex flex-col w-1/3">
              <label className=" text-xs font-semibold text-gray-600 mb-1">MÜŞTERİ ARAMA</label>
              <input
                type="text"
                placeholder="Müşteri Adı veya Mail Adresi ile Ara..."
                className="input"
              />
            </div>
            <button className="bg-blue-600 text-white px-18 py-2.5 rounded-lg font-semibold flex items-center space-x-2 cursor-pointer hover:bg-blue-700 transition-colors duration-200 self-end">
              <FaSearch className="w-4 h-4" />
              <span className="text-sm">FİLTRELE</span>
            </button>
          </div>
        </div>
        <div className="">
          <ProductTable columns={columns} data={customers} />
        </div>
      </div>
    </div>
  );
}
