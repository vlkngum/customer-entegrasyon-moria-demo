import React from 'react';
import Image from 'next/image';

type Props = {
  open: boolean;
  onClose: () => void;
  values: { en: string; boy: string; yukseklik: string; agirlik: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DesiCalculatorModal: React.FC<Props> = ({ open, onClose, values, onChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl relative animate-fade-in">
        <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <div className="flex items-center gap-6 border-b border-gray-200 p-6 pb-4">
          {/* Görsel alanı */}
          <div>
          <Image src="/desiHesaplama.svg" alt="Desi Hesaplama Görseli" width={100} height={100} className="object-contain w-full h-full" />
          </div>
        </div>
        <div className="p-6 pt-4">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1">EN (CM)</label>
              <input name="en" value={values.en} onChange={onChange} className="input text-[#76838f]" placeholder="" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">BOY (CM)</label>
              <input name="boy" value={values.boy} onChange={onChange} className="input text-[#76838f]" placeholder="" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">YÜKSEKLİK (CM)</label>
              <input name="yukseklik" value={values.yukseklik} onChange={onChange} className="input text-[#76838f]" placeholder="" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">AĞIRLIK (KG)</label>
              <input name="agirlik" value={values.agirlik} onChange={onChange} className="input text-[#76838f]" placeholder="" />
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-[#11c26d] hover:bg-[#19e07b] text-white py-3 rounded text-lg font-semibold transition-colors">
            <span className="text-2xl">✓</span> Hesapla
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesiCalculatorModal; 