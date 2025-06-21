"use client";

import React from "react";
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  source: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

const DeactivateCategoryModal: React.FC<Props> = ({ open, onClose, category }) => {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Pasife Al</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <span className="text-2xl font-light text-gray-600">&times;</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 bg-red-50">
          <p className="text-lg text-gray-700 mb-6 text-red-600">
            Kategoriyi pasife almak istediğinizden emin misiniz ?
          </p>
          <div className="space-y-4 text-red-600">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="mt-1 text-xl flex-shrink-0" />
              <p>
                Kategoriyi pasife aldığınızda bu kategoriye bağlı satışta olmayan ürünlerinizi pazaryerlerinde satışa çıkaramazsınız.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="mt-1 text-xl flex-shrink-0" />
              <p>
                Kategoriyi pasife aldığınızda bu kategoriye bağlı ürünler entegre olduğu pazaryerlerinde <span className="font-bold">satışa kapanmaz.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-4 p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="flex items-center gap-2 py-3 px-6 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            <FaArrowLeft />
            <span>VAZGEÇ</span>
          </button>
          <button
            onClick={() => {
              console.log(`Deactivating category: ${category.name}`);
              onClose();
            }}
            className="flex items-center gap-2 py-3 px-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
          >
            <span>KATEGORİYİ PASİFE AL</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateCategoryModal; 