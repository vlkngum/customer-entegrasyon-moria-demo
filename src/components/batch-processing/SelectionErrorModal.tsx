"use client";
import React from 'react';

interface SelectionErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectionErrorModal: React.FC<SelectionErrorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-xs w-full text-center mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Hata!</h2>
        <p className="text-gray-600 mb-8">Lütfen platform seçiniz</p>
        <button
          onClick={onClose}
          className="bg-[#65b4f3] text-white font-semibold px-12 py-2 rounded-lg hover:bg-[#5aa8e0] transition-colors w-full"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SelectionErrorModal; 