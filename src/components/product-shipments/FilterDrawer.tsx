import React from "react";
import { FiX, FiSearch } from "react-icons/fi";

interface FilterDrawerProps {
  onClose: () => void;
  onFilter: () => void;
}

const platforms = [
  { value: "", label: "Platform Seç" },
  { value: "trendyol", label: "Trendyol" },
  { value: "hepsiburada", label: "Hepsiburada" },
  { value: "n11", label: "n11" },
  { value: "gittigidiyor", label: "Gitti Gidiyor" },
];

const statuses = [
  { value: "", label: "İşlem Durumu filtrele" },
  { value: "success", label: "Başarılı" },
  { value: "pending", label: "Bekliyor" },
  { value: "failed", label: "Başarısız" },
];

const FilterDrawer: React.FC<FilterDrawerProps> = ({ onClose, onFilter }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 z-40 transition-opacity"
        onClick={onClose}
      />
      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-lg flex flex-col animate-slideIn">
        <div className="flex items-center justify-between px-8 py-6 border-b">
          <h2 className="text-2xl font-bold text-gray-700">FİLTRELER</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-blue-600 text-2xl">
            <FiX />
          </button>
        </div>
        <div className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">PLATFORM SEÇİMİ</label>
            <select className="input">
              {platforms.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-600 mb-2">İŞLEM DURUMU SEÇİMİ</label>
            <select className="input">
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 px-8 py-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded border border-blue-100 bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            VAZGEÇ
          </button>
          <button
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
            onClick={onFilter}
          >
            <FiSearch className="text-lg" />
            FİLTRELE
          </button>
        </div>
      </aside>
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
};

export default FilterDrawer; 