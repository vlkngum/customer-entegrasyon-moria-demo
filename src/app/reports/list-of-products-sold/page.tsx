"use client";
import { useState } from "react";
import { Calendar, RefreshCw, Printer, Filter } from "lucide-react";
import Link from "next/link";

const ListOfProductsSoldPage = () => {
  const [filter, setFilter] = useState({
    startDate: "2025-06-21",
    endDate: "2025-06-21",
    startTime: "00:00",
    endTime: "00:00",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  interface Product {
    stockCode: string;
    productName: string;
    option: string;
    salesCount: number;
  }

  const products: Product[] = [
    // Örnek veri
  ];

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 15) {
      const hour = i.toString().padStart(2, "0");
      const minute = j.toString().padStart(2, "0");
      timeOptions.push(`${hour}:${minute}`);
    }
  }

  return (
    <div className="p-4 md:p-8 bg-[#f0f2f5] min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Satılan Ürünler
        </h1>
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:underline">Entekas</Link>
          <span className="mx-2">/</span>
          <Link href="/reports" className="hover:underline">Raporlar</Link>
          <span className="mx-2">/</span>
          <span>Satılan Ürünler Raporu</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Satılan Ürünler Raporu
        </h2>
        <div className="border-t border-gray-200 my-4"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
                className="w-full flex-1 rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full flex-1 rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Başlangıç Saati
            </label>
            <select
              id="startTime"
              name="startTime"
              value={filter.startTime}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Bitiş Saati
            </label>
            <select
              id="endTime"
              name="endTime"
              value={filter.endTime}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-start space-x-2 mt-4">
            <button className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </button>
            <button className="flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <RefreshCw className="h-4 w-4 mr-2" />
              Temizle
            </button>
            <button className="flex items-center justify-center bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                <Printer className="h-4 w-4 mr-2" />
                Yazdır
            </button>
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
                SEÇENEK
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SATIŞ ADEDİ
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
                  {product.option}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {product.salesCount}
                </td>
              </tr>
            ))}
             {products.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Kayıt bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfProductsSoldPage;
