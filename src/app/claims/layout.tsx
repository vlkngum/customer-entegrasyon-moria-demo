"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaFileDownload } from "react-icons/fa";

export default function ClaimsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Aktif İadeler");

  const tabs = [
    { name: "Tümü", icon: <FaBars className="w-4 h-4" />, href: '/claims/tumu' },
    { name: "Aktif İadeler", href: '/claims/active' },
    { name: "Aksiyon Alınacak", href: '/claims/action' },
    { name: "Kabul Edilen", href: '/claims/accepted' },
    { name: "Reddedilen", href: '/claims/rejected' },
    { name: "Servis & Analiz", href: '/claims/service-analysis' },
    { name: "İptal Edilen", href: '/claims/cancelled' },
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 mb-6 w-full">
          <div className="flex items-center space-x-2 py-4 px-6">
            <FaFileDownload className="text-3xl text-gray-700" />
            <h1 className="text-xl font-semibold text-gray-800">İade Yönetimi</h1> 
          </div>
          <div className="flex flex-wrap p-1 border-t border-gray-200">
            {tabs.map((tab) => (
              <a
                href={tab.href}
                key={tab.name}
                className={`px-6 py-2  text-sm font-semibold flex items-center space-x-2 transition-colors duration-200 ${activeTab === tab.name ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:bg-blue-50 hover:text-gray-700"}`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon && tab.icon}
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
 