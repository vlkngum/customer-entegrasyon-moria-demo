"use client";
import { useState } from "react";
import { Calendar, RefreshCw } from "lucide-react";
import Link from "next/link";

const CategoryBasedSellingPage = () => {
  const [filter, setFilter] = useState({
    salesChannel: "all",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    quickSelect: "",
  });
  const [ciroReportType, setCiroReportType] = useState("Grafiksel");
  const [siparisReportType, setSiparisReportType] = useState("Grafiksel");

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const tableHeaders = [
    "KATEGORI",
    "ANKAETICARET",
    "AKAKÇE",
    "AMAZON",
    "N11",
    "HEPSIBURADA",
    "TRENDYOL",
    "ÇİÇEKSEPETİ",
    "PTTAVM",
    "İDEFİX",
    "TOPLAM",
  ];

  const demoCiroData = [
    {
      KATEGORI: "Elektronik",
      ANKAETICARET: "1.500",
      AKAKÇE: "2.000",
      AMAZON: "5.000",
      N11: "3.500",
      HEPSIBURADA: "7.000",
      TRENDYOL: "10.000",
      ÇİÇEKSEPETİ: "1.200",
      PTTAVM: "800",
      İDEFİX: "500",
      TOPLAM: "31.500",
    },
    {
      KATEGORI: "Moda",
      ANKAETICARET: "800",
      AKAKÇE: "1.200",
      AMAZON: "3.000",
      N11: "2.500",
      HEPSIBURADA: "4.000",
      TRENDYOL: "8.000",
      ÇİÇEKSEPETİ: "1.500",
      PTTAVM: "600",
      İDEFİX: "300",
      TOPLAM: "21.900",
    },
  ];

  const demoSiparisData = [
    {
      KATEGORI: "Elektronik",
      ANKAETICARET: 10,
      AKAKÇE: 15,
      AMAZON: 30,
      N11: 25,
      HEPSIBURADA: 50,
      TRENDYOL: 80,
      ÇİÇEKSEPETİ: 8,
      PTTAVM: 5,
      İDEFİX: 3,
      TOPLAM: 226,
    },
    {
      KATEGORI: "Moda",
      ANKAETICARET: 12,
      AKAKÇE: 18,
      AMAZON: 35,
      N11: 28,
      HEPSIBURADA: 45,
      TRENDYOL: 90,
      ÇİÇEKSEPETİ: 10,
      PTTAVM: 7,
      İDEFİX: 4,
      TOPLAM: 259,
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#f0f2f5] min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
        Marka Bazlı Satış Raporu

        </h1>
        <div className="text-sm text-gray-500">
          <Link href="/" className="hover:underline">
            Entekas
          </Link>
          <span className="mx-2">/</span>
          <Link href="/reports" className="hover:underline">
            Raporlar
          </Link>
          <span className="mx-2">/</span>
          <span>Marka Bazlı Satış Raporu
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Marka Bazlı Satış Raporu

        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
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
              {/* Other channels */}
            </select>
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Başlangıç Tarihi
            </label>
            <div className="relative">
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={filter.startDate.split("-").reverse().join(".")}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Bitiş Tarihi
            </label>
            <div className="relative">
              <input
                type="text"
                id="endDate"
                name="endDate"
                value={filter.endDate.split("-").reverse().join(".")}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
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
              {/* Other quick selections */}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full">
              Filtrele
            </button>
            <button className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full">
              <RefreshCw className="h-4 w-4 mr-1" />
              Temizle
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Bu ay ki Marka Bazlı
            <select
              value={ciroReportType}
              onChange={(e) => setCiroReportType(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md shadow-sm font-normal text-base"
            >
              <option>Grafiksel</option>
              <option>Sayısal</option>
            </select>
            <span className="ml-2">Ciro Raporu</span>
          </h2>
        </div>
        {ciroReportType === "Sayısal" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50">
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-y border-r first:border-l border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {demoCiroData.length > 0 ? (
                  demoCiroData.map((row, index) => (
                    <tr key={index}>
                      {tableHeaders.map((header) => (
                        <td
                          key={header}
                          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-r first:border-l border-gray-200 text-center"
                        >
                          {row[header as keyof typeof row]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="text-center py-4 text-gray-500"
                    >
                      Veri bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Bu kısım hazırlanıyor.
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Bu ay ki Marka Bazlı
            <select
              value={siparisReportType}
              onChange={(e) => setSiparisReportType(e.target.value)}
              className="ml-2 border border-gray-300 rounded-md shadow-sm font-normal text-base"
            >
              <option>Grafiksel</option>
              <option>Sayısal</option>
            </select>
            <span className="ml-2">Toplam Sipariş Raporu</span>
          </h2>
        </div>
        {siparisReportType === "Sayısal" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50">
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-y border-r first:border-l border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {demoSiparisData.length > 0 ? (
                  demoSiparisData.map((row, index) => (
                    <tr key={index}>
                      {tableHeaders.map((header) => (
                        <td
                          key={header}
                          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 border-r first:border-l border-gray-200 text-center"
                        >
                          {row[header as keyof typeof row]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="text-center py-4 text-gray-500"
                    >
                      Veri bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Bu kısım hazırlanıyor.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBasedSellingPage;
