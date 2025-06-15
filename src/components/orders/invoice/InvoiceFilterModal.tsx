import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import InvoiceSubFilterModal from './InvoiceSubFilterModal';
import OrderFiltersContent from './filters/OrderFiltersContent';
import InvoiceFiltersContent from './filters/InvoiceFiltersContent';
import ErpInvoiceFiltersContent from './filters/ErpInvoiceFiltersContent';
import ShippingFiltersContent from './filters/ShippingFiltersContent';

interface InvoiceFilterModalProps {
  showModal: boolean;
  onClose: () => void;
}

const InvoiceFilterModal: React.FC<InvoiceFilterModalProps> = ({ showModal, onClose }) => {
  const [activeSubFilter, setActiveSubFilter] = useState<string | null>(null);

  const openSubFilter = (filterName: string) => {
    setActiveSubFilter(filterName);
  };

  const closeSubFilter = () => {
    setActiveSubFilter(null);
  };

  return (
    <>
      <div
        className={`fixed min-w-1/4 inset-y-0 right-0 w-80 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out
          ${showModal ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex justify-center items-center py-5">
          <h2 className="text-2xl font-semibold justify-center self-center">FİLTRELER</h2>
          <button onClick={onClose} className="text-white bg-black rounded-full p-1 shadow shadow-black absolute right-5 ">
            <IoClose size={16} />
          </button>
        </div>
        <div className="space-y-2 p-2 border-t border-blue-500/20">
          <div className="text-gray-700 ">
            <div className="flex justify-start items-center py-4 cursor-pointer border-b border-gray-200 gap-2" onClick={() => openSubFilter('Sipariş Filtreleri')}>
              <button className="text-blue-600 bg-blue-300/80 rounded-full p-0.5  ">
                <MdKeyboardArrowRight size={20} />
              </button>
              <span>Sipariş Filtreleri</span>
            </div>
            <div className="flex justify-start items-center py-4 cursor-pointer border-b border-gray-200 gap-2" onClick={() => openSubFilter('Fatura Filtreleri')}>
              <button className="text-blue-600 bg-blue-300/80 rounded-full p-0.5  ">
                <MdKeyboardArrowRight size={20} />
              </button>
              <span>Fatura Filtreleri</span>
            </div>
            <div className="flex justify-start items-center py-4 cursor-pointer border-b border-gray-200 gap-2" onClick={() => openSubFilter('Ön Muhasebe/ERP Fatura Filtreleri')}>
              <button className="text-blue-600 bg-blue-300/80 rounded-full p-0.5  ">
                <MdKeyboardArrowRight size={20} />
              </button>
              <span>Ön Muhasebe/ERP Fatura Filtreleri</span>
            </div>
            <div className="flex justify-start items-center py-4 cursor-pointer border-b border-gray-200 gap-2" onClick={() => openSubFilter('Kargo Filtreleri')}>
              <button className="text-blue-600 bg-blue-300/80 rounded-full p-0.5  ">
                <MdKeyboardArrowRight size={20} />
              </button>
              <span>Kargo Filtreleri</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 self-center justify-center space-x-2">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md">
                VAZGEÇ
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                FİLTRELE
            </button>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50"
          style={{ zIndex: 999 }}
          onClick={onClose}
        ></div>
      )}

      {/* Sub Filter Modals */}
      <InvoiceSubFilterModal
        showModal={activeSubFilter === 'Sipariş Filtreleri'}
        onClose={closeSubFilter}
        title="Sipariş Filtreleri"
      >
        <OrderFiltersContent />
      </InvoiceSubFilterModal>

      <InvoiceSubFilterModal
        showModal={activeSubFilter === 'Fatura Filtreleri'}
        onClose={closeSubFilter}
        title="Fatura Filtreleri"
      >
        <InvoiceFiltersContent />
      </InvoiceSubFilterModal>

      <InvoiceSubFilterModal
        showModal={activeSubFilter === 'Ön Muhasebe/ERP Fatura Filtreleri'}
        onClose={closeSubFilter}
        title="Ön Muhasebe/ERP Fatura Filtreleri"
      >
        <ErpInvoiceFiltersContent />
      </InvoiceSubFilterModal>

      <InvoiceSubFilterModal
        showModal={activeSubFilter === 'Kargo Filtreleri'}
        onClose={closeSubFilter}
        title="Kargo Filtreleri"
      >
        <ShippingFiltersContent />
      </InvoiceSubFilterModal>
    </>
  );
};

export default InvoiceFilterModal; 