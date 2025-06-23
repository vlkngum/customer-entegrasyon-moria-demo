'use client'

import { FaSearch } from "react-icons/fa"; 
import ProductSingleFetchModal from "@/components/products/list/ProductSingleFetchModal";
import { useState } from "react"; 
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import ProductFilterModal from "@/components/products/list/ProductFilterModal"
import BulkProcessModal from '@/components/products/list/BulkProcessModal';

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
      <div className="w-full flex flex-row justify-between py-2 px-6">
        <div className="mb-4 flex flex-row items-center gap-2 w-1/2">
          <input
            type="text"
            className="input"
            placeholder="Stok Kodu, Ürün Adı veya Barkod ile ara..."
          />
          <button className="bg-blue-600 text-white px-12 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200 ">
            <FaSearch className="w-4 h-4" />
            <span>FİLTRELE</span>
          </button>
        </div>
        <div className="flex gap-2">
          <button className="border_button" onClick={() => setIsModalOpen(true)}>
            <AiFillProduct className="w-6 h-6" />
            <span style={{ fontSize: 10 }}>TEKİL ÜRÜN ÇEK</span>
          </button>
          <a className="border_button" href="/add">
            <AiOutlineProduct className="w-6 h-6" />
            <span style={{ fontSize: 10 }}>YENİ ÜRÜN EKLE</span>
          </a>
        </div>
      </div>
      
      <div className="w-full flex justify-end px-4 py-6 gap-4">
        <div className="text-blue-600 cursor-pointer flex items-center mb-4 justify-end" onClick={toggleBulkProcess}>
          {bulkProcessModal ? <IoIosArrowUp className="mr-1" /> : <IoIosArrowDown className="mr-1" />}
          Toplu İşlemler
        </div>
        <div className="text-blue-600 cursor-pointer flex items-center mb-4 justify-end" onClick={toggleDetailedFilters}>
          {showDetailedFilters ? <IoIosArrowUp className="mr-1" /> : <IoIosArrowDown className="mr-1" />}
          Detaylı Filtrele
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