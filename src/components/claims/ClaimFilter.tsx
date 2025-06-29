"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa"; 
import DetailedFilterSidebar from "@/components/claims/DetailedFilterSidebar";
import Image from "next/image";

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
                <div className="text-[#47494c] cursor-pointer flex text-md items-center mb-4 justify-end hover:text-[#0868dd]" onClick={() => setIsSidebarOpen(true)}>
         <Image src={'/arrow-right.svg'} width={0} height={0} alt='arrowUp' className='w-4 h-4 opacity-70 mr-2' />
        Detaylı Filtrele
      </div>
                </div>
            </div>


            <DetailedFilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}