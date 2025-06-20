'use client'

import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md"
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import ProductFilterModal from "@/components/products/list/ProductFilterModal"

export default function ProductListTable() { 

  const [bulkProcessModal, setBulkProcessModal] = useState(false);

  const [showDetailedFilters, setShowDetailedFilters] = useState(false);

  const toggleDetailedFilters = () => {
    setShowDetailedFilters(!showDetailedFilters);
  };

  const toggleBulkProcess = () => {
    setBulkProcessModal(!bulkProcessModal);
  };

  return (
    <div className="panel">
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
    </div>
  );
}