import React from "react";

interface Product {
  name: string;
  quantity: number;
}

const exampleProducts: Product[] = [
  { name: "Apple iPhone 14", quantity: 120 },
  { name: "Samsung Galaxy S23", quantity: 98 },
  { name: "Xiaomi Mi 13", quantity: 87 },
  { name: "Vestel TV 55" , quantity: 75 },
  { name: "Arçelik Çamaşır Makinesi", quantity: 62 },
  { name: "Philips Airfryer", quantity: 59 },
  { name: "HP Laptop 15s", quantity: 54 },
  { name: "Apple AirPods Pro", quantity: 51 },
  { name: "Fakir Blender Seti", quantity: 48 },
  { name: "Logitech Mouse M185", quantity: 45 },
];

const TopSellingProducts = ({ products = exampleProducts }: { products?: Product[] }) => (
  <div className="bg-white p-8 rounded-lg shadow-sm w-full h-full flex flex-col">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Haziran Ayı En Çok Satan 10 Ürün</h3>
    <ol className="divide-y divide-gray-100">
      {products.map((product, idx) => (
        <li key={product.name} className="flex items-center justify-between py-2">
          <span className="font-medium text-gray-700 flex items-center gap-2">
            <span className="inline-block w-6 text-center text-xs font-bold text-gray-400">{idx + 1}</span>
            {product.name}
          </span>
          <span className="bg-blue-100/50 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
            {product.quantity} adet
          </span>
        </li>
      ))}
    </ol>
  </div>
);

export default TopSellingProducts; 