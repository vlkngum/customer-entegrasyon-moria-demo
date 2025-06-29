"use client";

import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import ProductTable, { ProductTableColumn } from '@/components/ProductTable';
import { MdKeyboardArrowRight } from "react-icons/md";
import CustomerForm, { CustomerFormValues } from '@/components/bills/CustomerForm';
import Image from "next/image";

const customers = [
  { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
  { id: '2', name: 'Ayşe Demir', email: 'ayse@example.com' },
  { id: '3', name: 'Mehmet Can', email: 'mehmet@example.com' },
];

export default function Invoices() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Partial<CustomerFormValues> | undefined>(undefined);

  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
  const handleEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedCustomer(undefined);
  };
  const handleCustomerSubmit = () => {
    setEditModalOpen(false);
    setSelectedCustomer(undefined);
  };

  const columns = useMemo<ProductTableColumn[]>(() => [
    {
      key: 'arrow',
      title: '',
      render: () => (
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-100">
          <MdKeyboardArrowRight className="text-blue-400 w-4 h-4" />
        </span>
      ),
      className: 'w-8',
    },
    { key: 'name', title: 'MÜŞTERİ ADI', className: 'text-left pl-0 justify-start' },
    { key: 'email', title: 'MÜŞTERİ MAİL', className: 'text-left pl-0 justify-start' },

    {
      key: 'actions',
      title: <div className="text-right">İŞLEMLER</div>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, row: any) => (
        <div className="flex justify-end gap-2">
          <button
            className="flex items-center gap-1 bg-blue-100 text-[#0f82ff] px-3 py-1 rounded-md text-xs font-semibold shadow hover:bg-blue-200 transition"
            onClick={() => handleEdit(row)}
          >
            <Image src={'/entekasProductedit.svg'} width={0} height={0} alt='edit' className='w-3 h-3' />
            DÜZENLE
          </button>
          <button className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-semibold shadow hover:bg-red-200 transition">
            <Image src={'/mini-delete.svg'} width={0} height={0} alt='delete' className='w-4 h-4' />
            SİL
          </button>
        </div>
      ),
      className: 'text-right',
    },
  ], []);

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto flex flex-col gap-2">
        <div className="panel">
          <div className="flex flex-row justify-start items-center space-x-4 w-full p-6">
            <div className="flex flex-col w-1/3">
              <label className=" text-xs font-semibold text-gray-600 mb-1">MÜŞTERİ ARAMA</label>
              <input
                type="text"
                placeholder="Müşteri Adı veya Mail Adresi ile Ara..."
                className="input"
              />
            </div>
            <button className="bg-[#0f82ff] text-white px-18 py-2.5 rounded-lg font-mono flex items-center space-x-2 cursor-pointer hover:bg-[#0068ff] transition-colors duration-200 self-end">
              <FaSearch className="w-4 h-4" />
              <span className="text-sm">FİLTRELE</span>
            </button>
          </div>
        </div>
        <div className="">
          <ProductTable columns={columns} data={customers} />
          {editModalOpen && selectedCustomer && (
            <CustomerForm
              initialValues={selectedCustomer}
              onSubmit={handleCustomerSubmit}
              onCancel={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
