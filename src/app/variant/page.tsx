'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { AiFillProduct } from "react-icons/ai";
import VariantGroupModal, { Group } from '../../components/products/variant/VariantGroupModal';
import ProductTable from '@/components/ProductTable';

export default function VariantPage() {
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: "Renk Seçenekleri", options: ["Kırmızı", "Mavi", "Yeşil"] },
    { id: 2, name: "Beden Seçenekleri", options: ["S", "M", "L", "XL"] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const handleOpenAddModal = () => {
    setEditingGroup(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (group: Group) => {
    setEditingGroup(group);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
  };

  const handleSaveGroup = (groupToSave: Group) => {
    if (groupToSave.id) {
      setGroups(groups.map(g => g.id === groupToSave.id ? { ...g, ...groupToSave } : g));
    } else {
      const newGroup = { ...groupToSave, id: Date.now() };
      setGroups([...groups, newGroup]);
    }
    handleCloseModal();
  };

  const handleDeleteGroup = (id: number) => {
    setGroups(groups.filter(g => g.id !== id));
  };

  const columns = [
    {
      key: 'name',
      title: 'SEÇENEK GRUBU ADI',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (value: any) => <span className="font-medium text-gray-800">{value}</span>,
      className: 'col-span-5',
    },
    {
      key: 'options',
      title: 'SEÇENEKLER',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (value: any) => (
        <span className="text-gray-600 text-sm">{value.length > 0 ? value.join(", ") : '-'}</span>
      ),
      className: 'col-span-5',
    },
    {
      key: 'actions',
      title: <div className="text-right">İŞLEMLER</div>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, row: Group) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleOpenEditModal(row)}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteGroup(row.id!)}
            className="text-red-600 hover:text-red-800 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      ),
      className: 'col-span-2 text-right',
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ürün Seçenek Grupları</h1>
            <div className="text-sm text-gray-500 mt-1">
              Entekas &gt; Ürünler &gt; Ürün Seçenek Grupları
            </div>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition">
              <AiFillProduct className="w-6 h-6 text-gray-700" />
              <span className="text-xs font-semibold text-gray-700">Seçenek Grubu Ekle</span>
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <ProductTable columns={columns} data={groups} variant="card" />
      </div>
      <VariantGroupModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGroup}
        groupToEdit={editingGroup}
      />
    </div>
  );
}