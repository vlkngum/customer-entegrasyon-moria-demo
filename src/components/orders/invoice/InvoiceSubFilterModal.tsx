import React from 'react';
import { IoClose } from "react-icons/io5";

interface InvoiceSubFilterModalProps {
  showModal: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const InvoiceSubFilterModal: React.FC<InvoiceSubFilterModalProps> = ({ showModal, onClose, title, children }) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-1/4 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out
          ${showModal ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 1001 }} // Higher z-index than main filter modal
      >
        <div className="flex justify-between items-center py-5">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white bg-black rounded-full p-1 shadow shadow-black">
            <IoClose size={16} />
          </button>
        </div>
        <div className="space-y-4 border-t border-blue-500/20 pt-4">
          {children}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-end space-x-2">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md">
                VAZGEÇ
            </button>
            <button className="px-4 py-2 bg-[#0f82ff] text-white rounded-md">
                FİLTRELE
            </button>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 1000 }} // Overlay behind sub-modal
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default InvoiceSubFilterModal; 