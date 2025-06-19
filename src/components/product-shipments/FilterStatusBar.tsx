import React from "react";
import { FiTrash2 } from "react-icons/fi";

interface FilterStatusBarProps {
  onClear: () => void;
}

const FilterStatusBar: React.FC<FilterStatusBarProps> = ({ onClear }) => {
  return (
    <div className="w-full px-2 pt-4">
      <div className="w-full flex items-center justify-between rounded-xl" style={{background: '#eaf4ff', minHeight: 40, padding: '0 12px'}}>
        {/* Sol */}
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
          <span className="text-[#007aff] font-bold text-sm uppercase tracking-tight">FİLTRE UYGULANDI</span>
        </div>
        {/* Sağ */}
        <button onClick={onClear} className="flex items-center gap-1 text-black font-bold text-sm hover:underline">
          <span className="uppercase tracking-tight">FİLTRELERİ KALDIR</span>
          <span className="ml-1 bg-red-600 text-white rounded-full p-1 flex items-center justify-center"><FiTrash2 size={16} /></span>
        </button>
      </div>
    </div>
  );
};

export default FilterStatusBar; 