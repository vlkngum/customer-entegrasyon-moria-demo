'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { IoArrowBack } from 'react-icons/io5';
import VariantGroupModal, { Group } from '../../components/products/variant/VariantGroupModal';

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
      // Edit
      setGroups(groups.map(g => g.id === groupToSave.id ? { ...g, ...groupToSave } : g));
    } else {
      // Add
      const newGroup = { ...groupToSave, id: Date.now() }; // temporary ID
      setGroups([...groups, newGroup]);
    }
    handleCloseModal();
  };

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
            <button onClick={handleOpenAddModal} className="border_button">
            <AiFillProduct className="w-6 h-6" />
              <span style={{ fontSize: 10 }} >Seçenek Grubu Ekle</span>
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-12 font-semibold text-gray-600 border-b pb-2 mb-2 text-sm">
          <div className="col-span-5">SEÇENEK GRUBU ADI</div>
          <div className="col-span-5">SEÇENEKLER</div>
          <div className="col-span-2 text-right">İŞLEMLER</div>
        </div>
        <div className="space-y-2">
          {groups.map((group) => (
            <div key={group.id} className="grid grid-cols-12 items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="col-span-5 font-medium text-gray-800">{group.name}</div>
              <div className="col-span-5 text-gray-600 text-sm">
                {group.options.length > 0 ? group.options.join(", ") : "-"}
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <button onClick={() => handleOpenEditModal(group)} className="text-blue-600 hover:text-blue-800 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                  <FiEdit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
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