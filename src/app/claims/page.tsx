"use client";

import { useState } from "react";
import { FaSearch, FaRegFileArchive, FaQuestionCircle, FaFileDownload } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { LuFolderDown } from "react-icons/lu";
import DetailedFilterSidebar from "@/components/claims/DetailedFilterSidebar";

export default function ClaimsPage() {
  const [activeTab, setActiveTab] = useState("Aktif İadeler");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { name: "Tümü", icon: <FaBars className="w-4 h-4" /> },
    { name: "Aktif İadeler" },
    { name: "Aksiyon Alınacak" },
    { name: "Kabul Edilen" },
    { name: "Reddedilen" },
    { name: "Servis & Analiz" },
    { name: "İptal Edilen" },
  ];

  return (
    <div className="min-h-screen">
      <div className="flex-1">

        {/* Search and Filter */}
        <div className="panel">
          <div className="flex items-end space-x-4">
            <div className=" w-1/3">
              <label className="block text-xs font-semibold text-gray-600 mb-2">TALEP ARAMA</label>
              <input
                type="text"
                placeholder="Sipariş numarası, talep numarası, Müşteri adı-soyadı veya stok kodu ile ara..."
                className="w-full border rounded-lg px-4 py-2 text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-12 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200">
              <FaSearch className="w-4 h-4" />
              <span>FİLTRELE</span>
            </button>
            
           </div>
           <div className="w-full flex justify-end px-4 py-6">
              <button 
                className="flex items-center space-x-1 text-blue-600 font-semibold text-sm py-2.5 px-3"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span>Detaylı Filtrele</span>
                <MdKeyboardArrowRight className="w-5 h-5" />
              </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6 min-h-40">
          {/* Return list will go here */}
          <p className="text-center text-gray-500">İade listesi burada görünecek.</p>
        </div>


        <DetailedFilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
    </div>
  );
}
