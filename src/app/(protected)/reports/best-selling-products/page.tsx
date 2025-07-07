"use client";
import { useState } from "react";
import { Calendar, RefreshCw, CalendarCheck } from "lucide-react";
import Link from "next/link";

const BestSellingProductsPage = () => {
  const [filter, setFilter] = useState({
    salesChannel: "all",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    quickSelect: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const products = [
    {
      stockCode: "DSA4535913160",
      productName: "Deneme",
      salesCount: 1,
      totalAmount: "17.7₺",
    },
    {
      stockCode: "DSA4535913160",
      productName: "Deneme",
      salesCount: 1,
      totalAmount: "17.7₺",
    },
    {
      stockCode: "DSA4535913160",
      productName: "Deneme",
      salesCount: 1,
      totalAmount: "17.7₺",
    },
    // Örnek veri
  ];

  return (
    <div className="p-4 md:p-8 bg-[#f0f2f5] min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          En Çok Satan Ürünler
        </h1>
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:underline">Entekas</Link>
          <span className="mx-2">/</span>
          <Link href="/reports" className="hover:underline">Raporlar</Link>
          <span className="mx-2">/</span>
          <span>En Çok Satan Ürünler</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          En Çok Satan 100 Ürün Listesi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end pr-60">
          <div className="lg:col-span-1">
            <label
              htmlFor="salesChannel"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Satış Kanalı
            </label>
            <select
              id="salesChannel"
              name="salesChannel"
              value={filter.salesChannel}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tümü</option>
              {/* Diğer kanallar */}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Başlangıç Tarihi
            </label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={filter.startDate.split("-").reverse().join(".")}
                onChange={handleFilterChange}
                className="input"
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Bitiş Tarihi
            </label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                id="endDate"
                name="endDate"
                value={filter.endDate.split("-").reverse().join(".")}
                onChange={handleFilterChange}
                className="input"
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="quickSelect"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Hızlı Seçim
            </label>
            <select
              id="quickSelect"
              name="quickSelect"
              value={filter.quickSelect}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seçim Yapınız</option>
              {/* Diğer hızlı seçimler */}
            </select>
          </div>
          <div className="lg:col-span-1 flex space-x-2">
            <button className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <CalendarCheck className="h-4 w-4 mr-2" />
              Filtrele
            </button>
            <button className="w-full flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <RefreshCw className="h-4 w-4 mr-2" />
              Temizle
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STOK KODU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ÜRÜN ADI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SATIŞ ADEDİ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TOPLAM TUTAR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((product, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {product.stockCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {product.salesCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {product.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellingProductsPage;

