import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ExcelProcessModal from './ExcelProcessModal';

interface BulkProcessModalProps {
  showModal: boolean;
  onClose: () => void;
}

const BulkProcessModal: React.FC<BulkProcessModalProps> = ({ showModal, onClose }) => {
  const [excelModalOpen, setExcelModalOpen] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'excel') {
      setExcelModalOpen(true);
    }
  };

  if (!showModal) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
        <div className="bg-white rounded-xl shadow-lg p-0 max-w-1/3 relative" onClick={e => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl"
            aria-label="Kapat"
          >
            <AiOutlineClose />
          </button>
          {/* Başlık */}
          <div className="px-8 pt-8 pb-2">
            <h2 className="text-2xl font-semibold mb-2">Toplu İşlemler</h2>
          </div>
          {/* Mavi Bilgilendirme Alanı */}
          <div className="bg-blue-500 text-white px-8 py-4 ">
            Tüm ürünler veya filtrelemiş olduğunuz ürünlere toplu olarak işlem yapmak için aşağıdaki seçenek menüsünü kullanabilirsiniz.
          </div>
          {/* İçerik */}
          <div className="px-8 py-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">TOPLU İŞLEM SEÇENEĞİNİ SEÇİNİZ</label>
            <select className="input" onChange={handleSelectChange}>
              <option value="">Seçim yapmak için tıklayınız...</option>
              <option value="excel">Excel İşlemleri</option>
              <option>Toplu Fiyat & Stok İşlemleri</option>
              <option>Toplu Fiyat & Stok Güncellemesi İlet</option>
            </select>
            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-100"
              >
                <IoIosArrowBack /> VAZGEÇ
              </button>
              <button
                className="bg-blue-600 text-white px-8 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-blue-700"
              >
                İŞLEME GİT <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ExcelProcessModal showModal={excelModalOpen} onClose={() => setExcelModalOpen(false)} />
    </>
  );
};

export default BulkProcessModal; 