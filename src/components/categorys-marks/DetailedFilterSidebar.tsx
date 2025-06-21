import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DetailedFilterSidebar: React.FC<Props> = ({ open, onClose }) => {
  const [view, setView] = useState('main');

  useEffect(() => {
    if (!open) {
      // Reset view when sidebar is closed
      setTimeout(() => setView('main'), 300);
    }
  }, [open]);

  if (!open) return null;

  const MainView = (
    <>
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">FİLTRELER</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Kapat">
          <span className="text-2xl font-light text-gray-600">&times;</span>
        </button>
      </div>
      <div className="flex-grow p-6">
        <button onClick={() => setView('category-sync')} className="w-full text-left p-4 mb-4 font-semibold text-gray-700 hover:bg-gray-50 rounded-lg flex items-center transition">
          <span className="bg-blue-100 rounded-full p-2 mr-4">
            <MdKeyboardArrowRight className="text-blue-600" />
          </span>
          Kategori Eşitleme Durumu
        </button>
         <button onClick={() => setView('option-sync')} className="w-full text-left p-4 mb-4 font-semibold text-gray-700 hover:bg-gray-50 rounded-lg flex items-center transition">
          <span className="bg-blue-100 rounded-full p-2 mr-4">
            <MdKeyboardArrowRight className="text-blue-600" />
          </span>
          Seçenek Eşitleme Durumu
        </button>
         <button onClick={() => setView('other-filters')} className="w-full text-left p-4 mb-4 font-semibold text-gray-700 hover:bg-gray-50 rounded-lg flex items-center transition">
          <span className="bg-blue-100 rounded-full p-2 mr-4">
            <MdKeyboardArrowRight className="text-blue-600" />
          </span>
          Diğer Filtreler
        </button>
      </div>
      <div className="p-6 border-t border-gray-200 bg-white flex justify-end">
        <button onClick={onClose} className="py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition">
          VAZGEÇ
        </button>
      </div>
    </>
  );

  const CategorySyncView = (
    <>
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-gray-100" aria-label="Geri">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">FİLTRELER</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Kapat">
          <span className="text-2xl font-light text-gray-600">&times;</span>
        </button>
      </div>
      <div className="flex-grow p-6 bg-gray-50">
        <div className="bg-blue-100 text-blue-700 font-semibold p-3 text-sm rounded-t-md">
          KATEGORİ EŞİTLENME DURUMU
        </div>
        <div className="p-6 bg-white rounded-b-md shadow-sm">
          <div className="mb-6">
            <label htmlFor="platform" className="block text-xs font-medium text-gray-500 mb-2">PLATFORM SEÇİMİ</label>
            <select id="platform" className="input">
              <option>Platform Seçiniz</option>
            </select>
          </div>
          <div>
            <label htmlFor="action" className="block text-xs font-medium text-gray-500 mb-2">YAPILACAK OLAN İŞLEM</label>
            <select id="action" className="input">
              <option>Kategorisi Eşitlenmeyenleri Listele</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-4">
        <button onClick={() => setView('main')} className="py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition">
          VAZGEÇ
        </button>
        <button onClick={onClose} className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <FaSearch />
          <span>FİLTRELE</span>
        </button>
      </div>
    </>
  );

  const OptionSyncView = (
    <>
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-gray-100" aria-label="Geri">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">FİLTRELER</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Kapat">
          <span className="text-2xl font-light text-gray-600">&times;</span>
        </button>
      </div>
      <div className="flex-grow p-6 bg-gray-50">
        <div className="bg-blue-100 text-blue-700 font-semibold p-3 text-sm rounded-t-md">
          SEÇENEK EŞİTLENME DURUMU
        </div>
        <div className="p-6 bg-white rounded-b-md shadow-sm">
          <div className="mb-6">
            <label htmlFor="platform" className="block text-xs font-medium text-gray-500 mb-2">PLATFORM SEÇİMİ</label>
            <select id="platform" className="input">
              <option>Platform Seçiniz</option>
            </select>
          </div>
          <div>
            <label htmlFor="action" className="block text-xs font-medium text-gray-500 mb-2">YAPILACAK OLAN İŞLEM</label>
            <select id="action" className="input">
              <option>Seçenekleri Eşitlenmeyenleri Listele</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-4">
        <button onClick={() => setView('main')} className="py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition">
          VAZGEÇ
        </button>
        <button onClick={onClose} className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <FaSearch />
          <span>FİLTRELE</span>
        </button>
      </div>
    </>
  );

  const OtherFiltersView = (
    <>
       <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <button onClick={() => setView('main')} className="p-2 rounded-full hover:bg-gray-100" aria-label="Geri">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">FİLTRELER</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Kapat">
          <span className="text-2xl font-light text-gray-600">&times;</span>
        </button>
      </div>
      <div className="flex-grow p-6 bg-gray-50">
        <div className="bg-blue-100 text-blue-700 font-semibold p-3 text-sm rounded-t-md">
          DİĞER FİLTRELER
        </div>
        <div className="p-6 bg-white rounded-b-md shadow-sm">
          <div className="mb-6">
            <label htmlFor="category-status" className="block text-xs font-medium text-gray-500 mb-2">KATEGORİ DURUMU</label>
            <select id="category-status" className="input">
              <option>Tümü</option>
            </select>
          </div>
          <div>
            <label htmlFor="category-source" className="block text-xs font-medium text-gray-500 mb-2">KATEGORİ KAYNAĞI</label>
            <select id="category-source" className="input">
              <option>Tümü</option>
            </select>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-4">
        <button onClick={() => setView('main')} className="py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition">
          VAZGEÇ
        </button>
        <button onClick={onClose} className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <FaSearch />
          <span>FİLTRELE</span>
        </button>
      </div>
    </>
  )

  const renderView = () => {
    switch (view) {
      case 'category-sync':
        return CategorySyncView;
      case 'option-sync':
        return OptionSyncView;
      case 'other-filters':
        return OtherFiltersView;
      default:
        return MainView;
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ease-in-out w-[480px] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {renderView()}
      </div>
    </>
  );
};

export default DetailedFilterSidebar; 