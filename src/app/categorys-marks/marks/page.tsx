"use client";

import React, { useState } from "react";
import { FaSearch, FaTrash, FaPencilAlt, FaSync } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import MarkaFilterSidebar from "../../../components/categorys-marks/MarkaFilterSidebar";
import BatchTransactions from "@/components/products/list/batch-transactions";
import { useRouter } from "next/navigation";
import MarkaDuzenleModal from "@/components/categorys-marks/MarkaDuzenleModal";
import MarkaEsitleModal from "@/components/categorys-marks/MarkaEsitleModal";

const marks = [
  {
    id: 1,
    name: "dwdw",
    platforms: [{ name: 'trendyol', synced: false, logo: '/trendyolLogo.svg' }]
  },
  {
    id: 2,
    name: "Another Mark",
    platforms: [
        { name: 'trendyol', synced: true, logo: '/trendyolLogo.svg' }
    ]
  },
];

export default function MarksPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMarks, setSelectedMarks] = useState<number[]>([]);
  const [isBulkProcessModalOpen, setIsBulkProcessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMark, setEditingMark] = useState<{ id: number; name: string } | null>(null);
  const [syncPopoverOpenFor, setSyncPopoverOpenFor] = useState<number | null>(
    null
  );
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncingMark, setSyncingMark] = useState<any | null>(null);
  const router = useRouter();

  const handleEditClick = (mark: { id: number; name: string }) => {
    setEditingMark(mark);
    setIsEditModalOpen(true);
  };

  const handleOpenSyncModal = (mark: any) => {
    setSyncingMark(mark);
    setIsSyncModalOpen(true);
    setSyncPopoverOpenFor(null);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedMarks(marks.map((m) => m.id));
    } else {
      setSelectedMarks([]);
    }
  };

  const handleSelectMark = (markId: number) => {
    setSelectedMarks((prevSelected) => {
      if (prevSelected.includes(markId)) {
        return prevSelected.filter((id) => id !== markId);
      } else {
        return [...prevSelected, markId];
      }
    });
  };

  const allSelected = selectedMarks.length === marks.length && marks.length > 0;

  return (
    <div className="bg-[#f5f9ff] min-h-screen p-5">
      {/* Search and filter area */}
      <div className="bg-white rounded-[10px] p-[34px] mb-6">
        <div className="mb-2 font-bold text-[15px] text-[#5a6a85] tracking-[0.5px]">
          MARKA ARAMA
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Marka adı ile ara..."
            className="w-[350px] max-w-full p-3 rounded-lg border border-[#e3eafc] focus:outline-none"
          />
          <button className="bg-[#168cff] text-white py-3 px-8 rounded-lg border-none font-semibold flex items-center gap-2">
            <FaSearch /> FİLTRELE
          </button>
          <div className="ml-auto">
            <button onClick={() => setFilterOpen(true)} className="bg-transparent border-none text-[#5a6a85] font-medium flex items-center gap-1">
                <MdKeyboardArrowRight className="text-[#168cff]" />
                Detaylı Filtrele
            </button>
          </div>
        </div>
      </div>

      {selectedMarks.length > 0 ? (
        <div className="bg-[#168cff] text-white rounded-[10px] py-3 px-5 mb-3 flex items-center gap-6">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            className="w-[18px] h-[18px] accent-[#168cff]"
        />
        <span className="font-semibold">{selectedMarks.length} adet kayıt seçildi.</span>
        <div className="border-l border-white/30 h-6 ml-2"></div>
        <button
            onClick={() => setIsBulkProcessModalOpen(true)}
            className="bg-transparent border-none text-white font-medium flex items-center gap-2 cursor-pointer">
            <MdKeyboardArrowRight /> TOPLU İŞLEMLER
        </button>
        <div className="border-l border-white/30 h-6"></div>
        <button className="bg-transparent border-none text-white font-medium flex items-center gap-2">
            <FaTrash /> SİLME İŞLEMLERİ
        </button>
        <div className="ml-auto">
            {selectedMarks.length < marks.length && (
                <button
                    onClick={() => setSelectedMarks(marks.map(m => m.id))}
                    className="bg-transparent border-none text-white font-medium underline cursor-pointer"
                >
                    {marks.length} kaydın tümünü seç
                </button>
            )}
        </div>
        </div>
      ) : (
        <div className="flex items-center bg-[#f5f9ff] py-3 px-4 font-semibold text-[#5a6a85]">
          <input type="checkbox" className="mr-4 w-[18px] h-[18px] accent-[#168cff]" onChange={handleSelectAll} checked={allSelected} />
          <div className="flex-1">MARKA ADI</div>
          <div className="flex-1">EŞİTLEME DURUMLARI</div>
          <div className="flex-[2] text-right">İŞLEMLER</div>
        </div>
      )}

      {/* Mark list */}
      {marks.map((mark) => (
        <div key={mark.id} className={`flex items-center ${selectedMarks.includes(mark.id) ? 'bg-[#eaf4ff]' : 'bg-white'} rounded-[10px] my-2 p-4 shadow-[0_1px_4px_#e3eafc33]`}>
          <input type="checkbox" className="mr-4 w-[18px] h-[18px] accent-[#168cff]" checked={selectedMarks.includes(mark.id)} onChange={() => handleSelectMark(mark.id)} />
          
          <div className="flex-1 flex items-center gap-2">
            <span className="bg-[#eaf4ff] text-[#168cff] rounded p-1 inline-flex">
                <MdKeyboardArrowRight />
            </span>
            <span className="font-bold text-base">{mark.name}</span>
          </div>

          <div className="flex-1 flex gap-2 items-center">
            {mark.platforms.map(platform => (
                <div key={platform.name} className="relative">
                    <img src={platform.logo} alt={platform.name} className={`w-10 h-10 rounded-full border-2 border-[#eee] ${platform.synced ? 'grayscale-0' : 'grayscale'}`}/>
                    {!platform.synced && (
                        <div className="absolute top-[-2px] right-[-2px] bg-[#ff3b3b] text-white w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold border border-white">
                            &times;
                        </div>
                    )}
                </div>
            ))}
          </div>

          <div className="flex-[2] flex justify-end gap-2">
            <div className="relative">
              <button
                onClick={() =>
                  setSyncPopoverOpenFor(
                    syncPopoverOpenFor === mark.id ? null : mark.id
                  )
                }
                className="bg-[#fff4f0] text-[#ff6a3a] border-none rounded-lg py-2 px-4 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <FaSync size={14} />
                <span>MARKA EŞİTLE</span>
              </button>
              {syncPopoverOpenFor === mark.id && (
                <div
                  className="absolute bottom-[110%] left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-10 w-max"
                >
                  <div
                    className="absolute bottom-[-5px] left-1/2 ml-[-5px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white"
                  />
                  <button
                    onClick={() => handleOpenSyncModal(mark)}
                    className="flex items-center gap-2 py-3 px-4 bg-[#168cff] text-white border-none rounded-lg font-semibold cursor-pointer"
                  >
                    <MdKeyboardArrowRight /> Trendyol Eşitle
                  </button>
                </div>
              )}
            </div>
            <button 
                onClick={() => handleEditClick(mark)}
                className="bg-[#eaf4ff] text-[#168cff] border-none rounded-lg py-2 px-4 font-semibold flex items-center gap-1.5">
                <FaPencilAlt size={14} />
                <span>DÜZENLE</span>
            </button>
            <button className="bg-[#ffeaea] text-[#ff3b3b] border-none rounded-lg py-2 px-4 font-semibold flex items-center gap-1.5">
                <FaTrash size={14} />
                <span>SİL</span>
            </button>
          </div>
        </div>
      ))}

      {/* Modals */}
      {filterOpen && (
        <MarkaFilterSidebar
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
        />
      )}

      {isBulkProcessModalOpen && (
        <BatchTransactions
          showModal={isBulkProcessModalOpen}
          onClose={() => setIsBulkProcessModalOpen(false)}
        />
      )}

      <MarkaDuzenleModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mark={editingMark}
      />
      <MarkaEsitleModal
        open={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        markName={syncingMark?.name}
      />
    </div>
  );
}