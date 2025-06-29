'use client'

import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import InvoiceFilterModal from './InvoiceFilterModal';
import Image from 'next/image';

const InvoiceSearchAndFilter: React.FC = () => {
  const [showDetailedFilters, setShowDetailedFilters] = useState(false);

  const toggleDetailedFilters = () => {
    setShowDetailedFilters(!showDetailedFilters);
  };

  return (
    <div className="panel">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 w-1/2">
        <div className="flex-grow mr-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Sipariş numarası ile ara.."
            className="input"
          />
        </div>
        <button className="bg-[#0f82ff] text-white py-2 px-4 rounded-md hover:bg-[#0068ff] flex items-center justify-center">
          <GoSearch className="mr-2" /> FİLTRELE
        </button>
      </div>

      <div className="text-[#47494c] cursor-pointer flex text-md items-center mb-4 justify-end hover:text-[#0868dd]" onClick={toggleDetailedFilters}>
        {showDetailedFilters ? <Image src={'/arrow-right.svg'} width={0} height={0} alt='arrowUp' className='w-4 h-4 opacity-70 mr-2' /> : <Image src={'/arrow-right.svg'} width={0} height={0} alt='arrowDown' className='w-4 h-4 opacity-70 mr-2' />}
        Detaylı Filtrele
      </div>

      <InvoiceFilterModal showModal={showDetailedFilters} onClose={toggleDetailedFilters} />
    </div>
  );
};

export default InvoiceSearchAndFilter; 