
'use client'
import { usePathname } from "next/navigation";

import { FaProductHunt } from "react-icons/fa";

export default function ProductsLayout({ children }: { children: React.ReactNode }) { 

  const pathname = usePathname();

  const tabs = [
    { name: "Ürün Listesi", href: '/products' },
    { name: "Ürün Ekle", href: '/add' },
    { name: "Kategoriler", href: '/categorys-marks/category' },
    { name: "Markalar", href: '/categorys-marks/marks' },
    { name: "Seçenek Grupları (Varyant)", href: '/variant' },
    { name: "Hepsiburada Kataloğa Önerilen Ürünler", href: '/products/hbCatalogProducts' },
    { name: "Ürün Bazlı Kategori Özellik Eşitleme Listesi", href: '/products/list_sync' },
    { name: "Rekabet Robotu", href: '/products/price-robot' },
  ];

  // En uzun eşleşen href'i bul
  const getActiveTabHref = () => {
    let activeHref = tabs[0].href;
    let maxLength = 0;
    for (const tab of tabs) {
      if (
        pathname === tab.href ||
        (pathname.startsWith(tab.href + "/") && tab.href.length > maxLength)
      ) {
        activeHref = tab.href;
        maxLength = tab.href.length;
      }
    }
    return activeHref;
  };
  const activeTabHref = getActiveTabHref();

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 mb-6 w-full">
          <div className="w-full flex flex-row justify-between py-4 px-6">
            <div className="flex items-center space-x-3 ">
              <FaProductHunt className="text-3xl text-gray-700" />
              <h1 className="text-xl font-semibold text-gray-800">Ürün Listesi</h1>
            </div>
          </div>
          <div className="flex flex-wrap p-1 border-t border-gray-200">
            {tabs.map((tab) => (
              <a
                href={tab.href}
                key={tab.name}
                className={`px-6 py-2  text-sm font-semibold flex items-center space-x-2 transition-colors duration-200 ${activeTabHref === tab.href ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:bg-blue-50 hover:text-gray-700"}`}
              >
                <span>{tab.name}</span>
              </a>
            ))}
          </div>
        </div>
        {children}
      </div>
      
    </div>
  );
}
 