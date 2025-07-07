"use client";
import Link from "next/link";
import { FaBoxOpen, FaTurkishLiraSign } from "react-icons/fa6";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const ProductAmountsInStockReportPage = () => {
  const statCards = [
    {
      title: "TOPLAM ÜRÜN SAYISI",
      value: "1",
      description: "Aktif stoklu toplam ürün sayısı",
      icon: <FaBoxOpen className="h-6 w-6 text-white" />,
      iconBgColor: "bg-orange-400",
    },
    {
      title: "TOPLAM TUTAR",
      value: "42,00 ₺",
      description: "Aktif stoklu ürünlerin toplam değeri",
      icon: <FaTurkishLiraSign className="h-6 w-6 text-white" />,
      iconBgColor: "bg-blue-500",
    },
    {
      title: "YÜKSEK STOKLU ÜRÜN",
      value: "Deneme",
      description: "Stok miktarı en çok olan ürün",
      subValue: "- (Stok:2)",
      icon: <FiArrowUp className="h-6 w-6 text-white" />,
      iconBgColor: "bg-green-500",
    },
    {
      title: "DÜŞÜK STOKLU ÜRÜN",
      value: "Deneme",
      description: "Stok miktarı en düşük olan ürün",
      subValue: "- (Stok:2)",
      icon: <FiArrowDown className="h-6 w-6 text-white" />,
      iconBgColor: "bg-red-500",
    },
  ];

  const products = [
    {
      name: "Deneme",
      stockCode: "3213",
      price: "21,00 ₺",
      stock: "2",
      total: "42,00 ₺",
    },
    {
      name: "Deneme",
      stockCode: "3213",
      price: "21,00 ₺",
      stock: "2",
      total: "42,00 ₺",
    },
  ];

  const tableHeaders = [
    "Ürün Adı",
    "Stok Kodu",
    "Satış Fiyatı",
    "Stok",
    "Toplam Tutar",
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Stoktaki Ürün Tutarları
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
          <span>Stoktaki Ürün Tutarları</span>
        </div>
      </div>

      <div className="bg-[#eef2f7] p-4 md:p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm flex items-center space-x-4"
            >
              <div
                className={`rounded-full p-3 flex-shrink-0 ${card.iconBgColor}`}
              >
                {card.icon}
              </div>
              <div className="flex-grow">
                <p className="text-xs text-gray-500 font-semibold">
                  {card.title}
                </p>
                <div className="flex items-end space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  {card.subValue && (
                    <p className="text-sm text-gray-600 pb-px">
                      {card.subValue}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Table */}
        <div>
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-4 py-2">
            {tableHeaders.map((header) => (
              <div
                key={header}
                className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="space-y-2">
            {products.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-4 items-center bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="text-sm font-medium text-gray-900">
                  {product.name}
                </div>
                <div className="text-sm text-gray-600">{product.stockCode}</div>
                <div className="text-sm text-gray-600">{product.price}</div>
                <div className="text-sm text-gray-600">{product.stock}</div>
                <div className="text-sm text-gray-600 font-semibold">
                  {product.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAmountsInStockReportPage;
