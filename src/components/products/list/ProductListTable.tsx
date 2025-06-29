'use client'

import { FaSearch } from "react-icons/fa"; 
import ProductSingleFetchModal from "@/components/orders/invoice/ProductSingleFetchModal";
import { useState } from "react"; 
import ProductFilterModal from "@/components/products/list/ProductFilterModal"
import BulkProcessModal from '@/components/products/list/BulkProcessModal';
import Image from "next/image";

export default function ProductListTable() { 

  const [bulkProcessModal, setBulkProcessModal] = useState(false);

  const [showDetailedFilters, setShowDetailedFilters] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDetailedFilters = () => {
    setShowDetailedFilters(!showDetailedFilters);
  };

  const toggleBulkProcess = () => {
    setBulkProcessModal(!bulkProcessModal);
  };

  return (
    <div className="panel"> 
      <div className="w-full flex flex-row py-2 px-6">
        <div className="mb-4 flex flex-row items-center gap-2 w-full">
          <div className="flex flex-col w-full">
            <label className="block text-sm font-bold text-gray-700 mb-1">ÜRÜN ARAMA</label>
            <div className="flex flex-row items-center gap-2 w-full">
              <input
                type="text"
                className="input"
                placeholder="Stok Kodu, Ürün Adı veya Barkod ile ara..."
              />
              <button className="bg-[#0f82ff] text-white px-12 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-600 transition-colors duration-200 ">
                <FaSearch className="w-4 h-4" />
                <span>FİLTRELE</span>
              </button>
            </div>
          </div>
        </div>
      
      
      <div className="w-full flex justify-end px-4 py-6 gap-4">
      <div className="text-[#47494c] cursor-pointer flex text-md items-center mb-4 justify-end hover:text-[#0868dd]" onClick={toggleBulkProcess}>
        <Image src={'/arrow-right.svg'} width={0} height={0} alt='arrowUp' className='w-4 h-4 opacity-70 mr-2' />
        Toplu İşlemler
        </div>
        <div className="text-[#47494c] cursor-pointer flex text-md items-center mb-4 justify-end hover:text-[#0868dd]" onClick={toggleDetailedFilters}>
        <Image src={'/arrow-right.svg'} width={0} height={0} alt='arrowUp' className='w-4 h-4 opacity-70 mr-2' />
        Detaylı Filtrele
      </div>
      </div>
      </div>
      <ProductFilterModal showModal={showDetailedFilters} onClose={toggleDetailedFilters} />
      
      {bulkProcessModal && (
        <BulkProcessModal showModal={bulkProcessModal} onClose={toggleBulkProcess} />
      )}

      {isModalOpen && (
        <ProductSingleFetchModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}