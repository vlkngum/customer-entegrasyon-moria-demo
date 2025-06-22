'use client';

import { useState, useEffect, FormEvent } from 'react';
import { FiX } from 'react-icons/fi';

export interface Group {
  id?: number;
  name: string;
  options: string[];
}

interface VariantGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: Group) => void;
  groupToEdit?: Group | null;
}

export default function VariantGroupModal({ isOpen, onClose, onSave, groupToEdit }: VariantGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [optionsString, setOptionsString] = useState('');

  const isEditMode = !!groupToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && groupToEdit) {
        setGroupName(groupToEdit.name);
        setOptionsString(groupToEdit.options.join(', '));
      } else {
        setGroupName('');
        setOptionsString('');
      }
    }
  }, [groupToEdit, isEditMode, isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalOptions = optionsString.split(',').map(o => o.trim()).filter(o => o !== '');
    onSave({
      ...groupToEdit,
      name: groupName,
      options: finalOptions,
    } as Group);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-40 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg transform transition-all relative">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditMode ? 'Seçenek Grubunu Düzenle' : 'Yeni Seçenek Grubu Ekle'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="groupName" className="block text-xs font-bold text-gray-600 mb-2">SEÇENEK GRUBU ADI</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="input w-full"
              placeholder="Renk, beden, numara vb.."
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="options" className="block text-xs font-bold text-gray-600 mb-2">SEÇENEK GRUBU DEĞERLERİ</label>
            <textarea
              id="options"
              value={optionsString}
              onChange={(e) => setOptionsString(e.target.value)}
              className="input w-full min-h-[100px]"
              placeholder="Örnek olarak Renk: Kırmızı, Sarı - Beden: S,M,L,XL - Numara:34,35,36 vb.."
            />
             <p className="text-xs text-gray-500 mt-1">Değerleri virgül (,) ile ayırarak giriniz.</p>
          </div>

          <div className="flex justify-end pt-4 mt-4">
            <button type="submit" className="bg-green-500 text-white px-8 py-2 rounded-md font-semibold text-sm hover:bg-green-600 transition-colors">
              KAYDET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 