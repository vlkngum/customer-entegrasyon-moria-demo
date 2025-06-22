'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FiBox,
  FiCpu,
  FiCheckSquare,
  FiSettings,
  FiPlus,
  FiTrash2,
  FiLayers,
  FiGrid,
  FiRotateCcw,
  FiImage,
} from 'react-icons/fi';

import { IoMdSettings } from 'react-icons/io';

interface Option {
  id: number;
  name: string;
}

interface OptionGroup {
  id: string;
  name: string;
  checked: boolean;
  options: Option[];
}

const mockProduct = {
  name: 'Pamuklu T-Shirt',
  code: 'TSHIRT-001',
  imageUrl: '', // No image in screenshot
};

const initialOptionGroups: OptionGroup[] = [
  {
    id: 'renk',
    name: 'Renk',
    checked: false,
    options: [],
  },
  {
    id: 'beden',
    name: 'Beden',
    checked: false,
    options: [],
  },
  {
    id: 'materyal',
    name: 'Materyal',
    checked: false,
    options: [],
  },
  {
    id: 'materyal2',
    name: 'Materyal',
    checked: false,
    options: [],
  },

  {
    id: 'materyal3',
    name: 'Materyal',
    checked: false,
    options: [],
  },
];

export default function VariantsPage() {
  const [optionGroups, setOptionGroups] = useState(initialOptionGroups);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const handleCheckboxChange = (id: string) => {
    setOptionGroups(
      optionGroups.map((group) =>
        group.id === id ? { ...group, checked: !group.checked } : group
      )
    );
  };

  const handleInputChange = (groupId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [groupId]: value }));
  };

  const handleAddOption = (groupId: string) => {
    const inputValue = inputValues[groupId]?.trim();
    if (!inputValue) return;

    setOptionGroups(
      optionGroups.map((group) => {
        if (group.id === groupId) {
          const newOption: Option = {
            id: Date.now(),
            name: inputValue,
          };
          return { ...group, options: [...group.options, newOption] };
        }
        return group;
      })
    );

    handleInputChange(groupId, '');
  };

  const handleDeleteOption = (groupId: string, optionId: number) => {
    setOptionGroups(
      optionGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            options: group.options.filter((option) => option.id !== optionId),
          };
        }
        return group;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="panel">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex flex-col py-2 px-6 items-center gap-2 border-r border-gray-300 cursor-pointer">
            <FiBox className="text-blue-600 w-8 h-8" />
            <a className="text-nowrap">Ürün Bilgileri </a>
          </div>

          <div className="flex flex-col py-2 px-6 items-center gap-2 border-r border-gray-300 cursor-pointer mr-5">
            <FiLayers className="text-blue-600 w-8 h-8" />
            <a className="text-nowrap"> Entegrasyon</a>
          </div>

          <div className="w-full flex gap-4 ">
            <div className="bg-blue-100 items-center justify-center flex rounded-lg w-16 h-16">
              <FiCpu className="text-blue-600 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Seçenekler</h1>
              <p className="text-sm text-gray-600">
              Ürününüze ait renk, numara ve boyut gibi alt seçenekler ekleyebilirsiniz
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full  gap-8 items-start justify-between border-t border-gray-300 py-4">
          <div className="flex items-start gap-3 min-w-36">
            <div className="rounded-lg items-center justify-center flex-shrink-0 flex flex-col ">
              <img src={'/cmapps-logo.svg'} className="w-24 aspect-square"></img>
              <p className="text-xs text-gray-500">
                {' '}
                Ürünün seçenekleri yok
              </p>
            </div>
          </div>

          <div className="min-w-1/4 items-left justify-center flex flex-col">
            <p className="text-md font-semibold text-gray-800 uppercase mb-1">
              ÜRÜN ADI
            </p>
            <p className="text-gray-500 mb-1">{mockProduct.name}</p>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-md font-semibold text-gray-800 uppercase mb-1">
                ÜRÜN KODU
              </p>
              <p className="text-gray-500 mb-1">{mockProduct.code}</p>
            </div>

            <div className="flex space-x-2">
              <div className="text-center">
                <Image
                  src="/trendyolLogo.svg"
                  alt="Trendyol"
                  width={40}
                  height={40}
                  className="border rounded-md p-1"
                />
                <span className="text-xs text-red-500">Pasif</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xl italic">a</span>
                </div>
                <span className="text-xs text-red-500">Pasif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Ürün Seçenek Grupları
          </h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm hover:bg-blue-600 transition-colors">
            <FiPlus />
            <span>YENİ SEÇENEK GRUBU EKLE</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Aşağıda yer alan seçenekleri seçerek ürününüz için varyant
          oluşturabilirsiniz.
        </p>
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-600 mb-2">
            SEÇENEK GRUBU LİSTENİZ
          </p>
          <div className="flex items-center flex-wrap gap-6">
            {optionGroups.map((group) => (
              <label
                key={group.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={group.checked}
                  onChange={() => handleCheckboxChange(group.id)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-800 font-medium">{group.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          {optionGroups
            .filter((group) => group.checked)
            .map((group) => {
              return (
                <div key={group.id} className="w-full md:w-1/2 lg:w-1/4 px-6 mb-4 ">
                  <div className="border border-gray-200 rounded-lg p-3 bg-white h-full border-t-4 border-t-blue-500 shadow-sm min-h-48 justify-between">
                    <h3 className="font-bold text-blue-600 mb-3">
                      {group.name}
                    </h3>
                    <div className="flex items-center border bg-white rounded-md mb-3 shadow-sm">
                      <input
                        type="text"
                        placeholder={`${group.name} Giriniz`}
                        className="flex-grow p-2 bg-transparent outline-none text-sm"
                        value={inputValues[group.id] || ''}
                        onChange={(e) => handleInputChange(group.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddOption(group.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleAddOption(group.id)}
                        className="px-4 text-gray-500 font-semibold text-sm hover:text-blue-600"
                      >
                        Ekle
                      </button>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-400 font-normal">
                          <th className="py-1 font-semibold w-12">SEÇ</th>
                          <th className="py-1 font-semibold">SEÇENEK ADI</th>
                          <th className="py-1 font-semibold w-12 text-right">
                            SİL
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.options.map((option) => (
                          <tr key={option.id} className="border-t">
                            <td className="py-2">
                              <FiCheckSquare className="text-blue-500 text-lg" />
                            </td>
                            <td className="py-2 text-gray-700">
                              {option.name}
                            </td>
                            <td className="py-2 text-right">
                              <button
                                onClick={() =>
                                  handleDeleteOption(group.id, option.id)
                                }
                                className="text-gray-400 hover:text-red-500"
                              >
                                <FiTrash2 />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md" role="alert">
        <p className="text-sm">
          <span className="font-bold">Uyarı:</span> Bu ürün kategorisinde
          Trendyol'da varyantlı/seçenekli ürün satışı sunmak için, Trendyol
          Seçenek Eşitleme işlemi yapmanız gerekmektedir.
        </p>
      </div>

      {/* Ürün Seçenek Listesi Paneli */}
      <div className="panel mt-8">
        <div className="flex justify-between items-center bg-gray-50 rounded-t-lg px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Ürün Seçenek Listesi</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-200">
              <FiGrid className="w-4 h-4" />
              SEÇENEK EŞİTLE
            </button>
            <button className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded-md font-semibold text-sm hover:bg-red-200">
              <FiTrash2 className="w-4 h-4" />
              TÜM SEÇENEKLERİ SİL
            </button>
            <button className="flex items-center gap-2 bg-orange-100 text-orange-700 border border-orange-200 px-4 py-2 rounded-md font-semibold text-sm hover:bg-orange-200">
              <FiRotateCcw className="w-4 h-4" />
              TÜM SEÇENEKLERİ TEMİZLE
            </button>
            <button className="flex items-center gap-2 bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 rounded-md font-semibold text-sm hover:bg-blue-200">
              <FiImage className="w-4 h-4" />
              SEÇENEK RESİM TANIMLAMA
            </button>
          </div>
        </div>
        <div className="bg-white rounded-b-lg px-6 py-8 min-h-[60px] border-t border-gray-100">
          {/* Boş alan veya seçenek listesi buraya gelecek */}
        </div>
      </div>
    </div>
  );
}