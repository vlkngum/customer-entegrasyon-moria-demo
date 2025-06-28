"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa"; 
import { MdKeyboardArrowRight } from "react-icons/md"; 
import DetailedFilterSidebar from "@/components/claims/DetailedFilterSidebar";

export default function ClaimFilter () {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <> 
            <div className="p-5">
                <div className="flex items-end space-x-4">
                    <div className=" w-1/3">
                        <label className="block text-xs font-semibold text-gray-600 mb-2">TALEP ARAMA</label>
                        <input
                            type="text"
                            placeholder="Sipariş numarası, talep numarası, Müşteri adı-soyadı veya stok kodu ile ara..."
                            className="input"
                        />
                    </div>
                    <button className="bg-[#0f82ff] text-white px-16 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-[#0068ff] transition-colors duration-200 ">
                        <FaSearch className="w-4 h-4" />
                        <span>FİLTRELE</span>
                    </button>
                    
                </div>
                <div className="w-full flex justify-end px-4 py-6">
                    <button 
                        className="flex items-center space-x-1 text-blue-600 font-medium text-sm py-2.5 px-3 cursor-pointer"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <span>Detaylı Filtrele</span>
                        <MdKeyboardArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>


            <DetailedFilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}