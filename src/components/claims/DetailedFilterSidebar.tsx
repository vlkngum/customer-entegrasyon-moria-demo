"use client";

import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { platforms } from "@/data/platforms";

export default function DetailedFilterSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) { 

  return (
    <div
      className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={onClose}
    >
      <div
        className={`fixed right-0 top-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-500 ease-in-out p-4
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">FİLTRELER</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {/* KAYNAK/DURUM FİLTRESİ */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">KAYNAK/DURUM FİLTRESİ</h3>
            <label className="block text-xs font-semibold text-gray-600 mb-1">PLATFORM</label>
            <div> 
                <select id="platform-status" className="input">
                    {platforms.map((platform) => (
                        <option key={platform} value={platform}>
                        {platform}
                        </option>
                    ))}
                </select>
            </div>
          </div>

          <div>
        <label className="block text-sm font-medium text-gray-700">TARİH SEÇİMİ</label>
        <div className="mt-1 flex space-x-2">
          <input type="date" placeholder="Başlangıç" className="input" />
          <input type="date" placeholder="Bitiş" className="input" />
        </div>
      </div>
        </div>

        <div className="w-full p-4 bg-white border-t border-gray-200">
          <button className="bg-[#0f82ff] text-white px-6 py-2.5 rounded-lg font-semibold flex items-center justify-center space-x-2 w-full hover:bg-[#0068ff] transition-colors duration-200">
            <FaSearch className="w-4 h-4" />
            <span>FİLTRELE</span>
          </button>
        </div>
      </div>
    </div>
  );
} 