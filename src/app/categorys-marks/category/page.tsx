"use client";

import React, { useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { MdKeyboardArrowRight, MdSync } from "react-icons/md";
import DetailedFilterSidebar from "../../../components/categorys-marks/DetailedFilterSidebar";
import BatchTransactions from "@/components/products/list/batch-transactions";
import { useRouter } from "next/navigation";
import DeactivateCategoryModal from "@/components/categorys-marks/DeactivateCategoryModal";
import ActivateCategoryModal from "@/components/categorys-marks/ActivateCategoryModal";
import CategorySyncTable from "@/components/categorys-marks/CategorySyncTable";

const categories = [
  {
    id: 1,
    name: "Deneme",
    source: "Entekas",
  },
  {
    id: 2,
    name: "Deneme 2",
    source: "Entekas",
  },
  {
    id: 3,
    name: "Deneme Kategorisi",
    source: "Entekas",
  },
];

export default function CategoryPage() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isBulkProcessModalOpen, setIsBulkProcessModalOpen] = useState(false);
  const [deactivateModalInfo, setDeactivateModalInfo] = useState<{ open: boolean; category: any | null }>({ open: false, category: null });
  const [activateModalInfo, setActivateModalInfo] = useState<{ open: boolean; category: any | null }>({ open: false, category: null });
  const [syncingCategoryId, setSyncingCategoryId] = useState<number | null>(null);
  const router = useRouter();

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCategories(categories.map((c) => c.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const allSelected = selectedCategories.length === categories.length && categories.length > 0;

  return (
    <div className="bg-[#f5f9ff] min-h-screen p-5">
      {/* Filtreleme ve arama alanı */}
      <div className="bg-white rounded-[10px] p-[34px] mb-6">
        <div className="mb-2 font-bold text-[15px] text-[#5a6a85] tracking-[0.5px]">
          KATEGORİ ARAMA
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Kategori adı ile ara..."
            className="w-[350px] max-w-full p-3 rounded-lg border border-[#e3eafc]"
          />
          <button className="bg-[#168cff] text-white py-3 px-8 rounded-lg border-none font-semibold flex items-center gap-2">
          <FaSearch /> FİLTRELE
          </button>
          <div className="ml-auto flex gap-6">
            <button onClick={() => setIsBulkProcessModalOpen(true)} className="bg-transparent border-none text-[#222] font-medium flex items-center gap-1">
              <span className="bg-[#eaf4ff] rounded-full p-1 flex items-center justify-center">
                <MdKeyboardArrowRight className="text-[#168cff] w-4 h-4" />
              </span>
              Toplu İşlemler
            </button>
            <button className="bg-transparent border-none text-[#222] font-medium flex items-center gap-1" onClick={() => setFilterOpen(true)}>
              <span className="bg-[#eaf4ff] rounded-full p-1 flex items-center justify-center">
                <MdKeyboardArrowRight className="text-[#168cff] w-4 h-4" />
              </span>
              Detaylı Filtrele
            </button>
          </div>
        </div>
      </div>

      {selectedCategories.length > 0 ? (
        <div className="bg-[#168cff] text-white rounded-[10px] py-3 px-5 mb-3 flex items-center gap-6">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            className="w-[18px] h-[18px] accent-[#168cff]"
        />
        <span className="font-semibold">{selectedCategories.length} adet kayıt seçildi.</span>

        <div className="border-l border-[rgba(255,255,255,0.3)] h-6 ml-2"></div>

        <button
            onClick={() => setIsBulkProcessModalOpen(true)}
            className="bg-transparent border-none text-white font-medium flex items-center gap-2 cursor-pointer">
            <MdKeyboardArrowRight /> TOPLU İŞLEMLER
        </button>

        <div className="border-l border-[rgba(255,255,255,0.3)] h-6"></div>

        <button className="bg-transparent border-none text-white font-medium flex items-center gap-2">
            <FaTrash /> SİLME İŞLEMLERİ
        </button>

        <div className="ml-auto">
            {selectedCategories.length < categories.length && (
                <button
                    onClick={() => setSelectedCategories(categories.map(c => c.id))}
                    className="bg-transparent border-none text-white font-medium underline cursor-pointer"
                >
                    {categories.length} kaydın tümünü seç
                </button>
            )}
        </div>
        </div>
      ) : (
        <div className="flex items-center bg-[#f5f9ff] py-2 px-4 font-semibold text-[#5a6a85]">
          <input type="checkbox" className="mr-4" onChange={handleSelectAll} checked={allSelected} />
          <div className="flex-[2]">KATEGORİ ADI</div>
          <div className="flex-[2]">EŞİTLEME DURUMLARI</div>
          <div className="flex-1 text-right">İŞLEMLER</div>
        </div>
      )}


      {/* Kategori listesi */}
      {categories.map((cat) => (
        <React.Fragment key={cat.id}>
        <div className={`flex items-center rounded-[10px] my-3 p-4 shadow-[0_1px_4px_#e3eafc33] relative ${selectedCategories.includes(cat.id) ? 'bg-[#eaf4ff]' : 'bg-white'}`}>
          <input type="checkbox" className="mr-4" checked={selectedCategories.includes(cat.id)} onChange={() => handleSelectCategory(cat.id)} />
          <div className="flex-[2]">
            <span className="bg-[#eaf4ff] rounded-full p-1 inline-flex items-center justify-center mr-2">
              <MdKeyboardArrowRight className="text-[#168cff] w-4 h-4" />
            </span>
            <span className="font-bold text-lg">{cat.name}</span>
            <div className="text-sm text-[#5a6a85] mt-1">
              Kaynak: <span className="font-bold">{cat.source}</span>
            </div>
          </div>
          <div className="flex-[2] flex gap-3">
            <button
              onClick={() => setSyncingCategoryId(syncingCategoryId === cat.id ? null : cat.id)}
              className="bg-[#fff4f0] text-[#ff6a3a] border-none rounded-lg py-2 px-4 font-semibold flex items-center gap-[6px]">
              <span className="bg-[#ff6a3a] rounded-full p-1 flex items-center justify-center">
                <MdSync className="text-white w-[15px] h-[15px]" />
              </span>
              KATEGORİ EŞİTLE
            </button>
            <button className="bg-[#fff4f0] text-[#ff6a3a] border-none rounded-lg py-2 px-4 font-semibold flex items-center gap-[6px]">
              <span className="bg-[#ff6a3a] rounded-full p-1 flex items-center justify-center">
                <MdSync className="text-white w-[15px] h-[15px]" />
              </span>
              SEÇENEK EŞİTLE
            </button>
          </div>
          <div className="flex-1 flex justify-end gap-2">
            <button className="bg-[#ffeaea] text-[#ff3b3b] border-none rounded-lg py-2 px-4 font-semibold flex items-center gap-[6px]">
              <span className="bg-[#e60023] rounded-full p-1 flex items-center justify-center">
                <img src="/delete-icon.png" alt="Sil" className="w-[15px] h-[15px] block" />
              </span>
              SİL
            </button>
            <button
              className="bg-[#f5f9ff] border-none rounded-lg py-2 px-3 font-semibold text-[#5a6a85] relative cursor-pointer"
              onClick={() => setOpenDropdown(openDropdown === cat.id ? null : cat.id)}
            >
              <span role="img" aria-label="more">⋯</span>
            </button>
            {openDropdown === cat.id && (
              <div
                className="absolute top-14 right-0 bg-[#168cff] rounded-lg shadow-[0_2px_8px_#168cff33] min-w-[160px] z-10 py-2 flex flex-col text-white font-semibold text-base"
              >
                <button
                  className="bg-transparent border-none text-white text-left py-3 px-6 cursor-pointer outline-none"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => router.push(`/categorys-marks/category/edit/${cat.id}`)}
                >
                  Düzenle
                </button>
                <div className="h-[1px] bg-[rgba(255,255,255,0.2)] my-0 mx-4" />
                <button
                  className="bg-transparent border-none text-white text-left py-3 px-6 cursor-pointer outline-none"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => {
                    setDeactivateModalInfo({ open: true, category: cat });
                    setOpenDropdown(null);
                  }}
                >
                  Pasife Al
                </button>
                <div className="h-[1px] bg-[rgba(255,255,255,0.2)] my-0 mx-4" />
                <button
                  className="bg-transparent border-none text-white text-left py-3 px-6 cursor-pointer outline-none"
                  onMouseDown={e => e.preventDefault()}
                >
                  Kopyala
                </button>
                <div className="h-[1px] bg-[rgba(255,255,255,0.2)] my-0 mx-4" />
                <button
                  className="bg-transparent border-none text-white text-left py-3 px-6 cursor-pointer outline-none"
                  onMouseDown={e => e.preventDefault()}
                   onClick={() => {
                    setActivateModalInfo({ open: true, category: cat });
                    setOpenDropdown(null);
                  }}
                >
                  Aktif Et
                </button>
              </div>
            )}
          </div>
        </div>
        {syncingCategoryId === cat.id && (
          <CategorySyncTable categoryName={cat.name} onClose={() => setSyncingCategoryId(null)} />
        )}
        </React.Fragment>
      ))}

      <DetailedFilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} />

      {isBulkProcessModalOpen && (
        <BatchTransactions
          showModal={isBulkProcessModalOpen}
          onClose={() => setIsBulkProcessModalOpen(false)}
        />
      )}
      {deactivateModalInfo.open && (
        <DeactivateCategoryModal
          open={deactivateModalInfo.open}
          onClose={() => setDeactivateModalInfo({ open: false, category: null })}
          category={deactivateModalInfo.category}
        />
      )}
      {activateModalInfo.open && (
        <ActivateCategoryModal
          open={activateModalInfo.open}
          onClose={() => setActivateModalInfo({ open: false, category: null })}
          category={activateModalInfo.category}
        />
      )}
    </div>
  );
}
