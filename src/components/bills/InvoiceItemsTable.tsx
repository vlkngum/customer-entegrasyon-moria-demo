import React, { useRef, useEffect } from "react";
import Image from "next/image";

type ItemField = "name" | "quantity" | "price" | "vat" | "total";
type Item = { name: string; quantity: number; price: number; vat: number; total: number };

interface InvoiceItemsTableProps {
  items: Item[];
  searchTerm: string;
  showDropdown: number | false;
  setSearchTerm: (term: string) => void;
  setShowDropdown: (show: number | false) => void;
  handleItemChange: (idx: number, field: ItemField, value: string) => void;
  handleRemoveRow: (idx: number) => void;
  handleAddRow: () => void;
  filteredOptions: string[];
}

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  items,
  searchTerm,
  showDropdown,
  setSearchTerm,
  setShowDropdown,
  handleItemChange,
  handleRemoveRow,
  handleAddRow,
  filteredOptions,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklanınca dropdown'ı kapat
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="">
      <h2 className="font-bold text-lg text-[#2a3a4b] border-b-3 border-gray-200 pb-4">FATURA KALEMLERİ</h2>
      <div className="overflow-x-auto border-b-2 border-gray-200 pb-4" style={{ overflow: 'visible', zIndex: 50 }}>
        <table className="w-full text-sm mb-2 bg-white">
          <thead>
            <tr className="text-[#2a3a4b] border-b border-blue-100">
              <th className="text-left font-semibold py-3 px-6">ÜRÜN ADI VE STOK KODU</th>
              <th className="font-semibold py-3 px-2">MİKTAR</th>
              <th className="font-semibold py-3 px-2">BİRİM FİYAT</th>
              <th className="font-semibold py-3 px-2">VERGİ</th>
              <th className="font-semibold py-3 px-2">TOPLAM</th>
              <th className="py-3 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="align-middle border-b border-blue-50 last:border-b-0">
                <td className="relative pr-2 pl-6 py-2" style={{ overflow: 'visible', zIndex: 50 }}>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`border border-gray-200 rounded px-4 py-2 w-full flex items-center justify-between transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 ${!item.name ? "text-gray-400" : "text-black"} ${idx !== items.length - 1 ? 'pointer-events-none opacity-60' : ''}`}
                      style={{ minHeight: 42, background: '#fff', minWidth: 340 }}
                      onClick={() => idx === items.length - 1 && setShowDropdown(showDropdown === idx ? false : idx)}
                      disabled={idx !== items.length - 1}
                    >
                      <span className={`block w-full text-left ${!item.name ? "text-gray-400 mx-auto text-center" : "text-black"}`}
                        style={!item.name ? { width: '100%', color: '#76838f' } : { color: '#76838f' }}>
                        {item.name || "Ürün adı,Stok Kodu,Barkod"}
                      </span>
                      <svg className="w-4 h-4 ml-2 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    {showDropdown === idx && idx === items.length - 1 && (
                      <div className="absolute z-50 bg-white border border-blue-300 w-full mt-1 rounded shadow animate-fade-in" style={{ minWidth: 340 }}>
                        <input
                          className="input"
                          style={{ color: '#76838f' }}
                          placeholder="Aranıyor..."
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowDropdown(idx);
                          }}
                          autoFocus
                        />
                        <div className="max-h-40 overflow-y-auto bg-gray-50">
                          {filteredOptions.length === 0 && (
                            <div className="p-2 text-gray-400 text-sm">Ürün bulunamadı</div>
                          )}
                          {filteredOptions.map((opt, i) => (
                            <div
                              key={opt + i}
                              className={`p-2 cursor-pointer hover:bg-blue-100 text-sm ${item.name === opt ? "bg-blue-100" : ""}`}
                              onClick={() => {
                                handleItemChange(idx, 'name', opt);
                                setShowDropdown(false);
                              }}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                        <button
                          className="w-full text-white p-2 flex items-center justify-center gap-2 mt-2 rounded-b transition-colors"
                          style={{ background: '#2984ff' }}
                          type="button"
                          onMouseOver={e => (e.currentTarget.style.background = '#3e90ff')}
                          onMouseOut={e => (e.currentTarget.style.background = '#2984ff')}
                          onClick={() => {
                            handleItemChange(idx, 'name', searchTerm);
                            setShowDropdown(false);
                          }}
                        >
                          <span className="text-lg font-bold">+</span> FATURA KALEMİ EKLE
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-2 w-28 py-2">
                  <div className="flex items-center h-[42px]">
                    <input
                      type="text"
                      className="input text-center h-[42px] px-4"
                      style={{ color: '#76838f' }}
                      value={item.quantity}
                      onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                    />
                  </div>
                </td>
                <td className="px-2 w-36 py-2">
                  <div className="relative flex items-center h-[42px]">
                    <input
                      type="text"
                      min={0}
                      className="input h-[42px] pr-12 px-4"
                      style={{ color: '#76838f' }}
                      value={item.price}
                      onChange={e => handleItemChange(idx, 'price', e.target.value)}
                    />
                    <span
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-gray-200 text-[#76838f] text-base"
                      style={{ width: 32, height: 32 }}
                    >
                      ₺
                    </span>
                  </div>
                </td>
                <td className="px-2 w-32 py-2">
                  <div className="flex items-center h-[42px]">
                    <span className="inline-flex items-center px-2 border border-gray-200 rounded-l bg-gray-100 text-[#76838f] text-xs h-[42px]">KDV</span>
                    <select
                      className="border-t border-b border-r border-gray-200 rounded-r px-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 h-[42px]"
                      style={{ color: '#76838f' }}
                      value={item.vat}
                      onChange={e => handleItemChange(idx, 'vat', e.target.value)}
                    >
                      {[0, 1, 8, 10, 18].map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-2 w-36 py-2">
                  <div className="relative flex items-center h-[42px]">
                    <input
                      type="text"
                      className="input text-left h-[42px] px-4"
                      style={{ color: '#76838f' }}
                      value={item.total}
                      disabled
                    />
                    <span
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-gray-200 text-[#76838f] text-base"
                      style={{ width: 32, height: 32 }}
                    >
                      ₺
                    </span>
                  </div>
                </td>
                <td className="">
                  <button
                    className="text-red-600 rounded flex items-center justify-center transition-colors duration-200"
                    onClick={() => handleRemoveRow(idx)}
                    type="button"
                    style={{ width: 44, height: 44 }}
                  >
                    <Image src="/tableDelete.svg" alt="Sil" width={35} height={35} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Yeni Satır Ekle Butonu */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleAddRow}
          className="flex items-center gap-2 px-6 py-2 rounded-sm border border-[#e8f2ff] bg-white text-[#2196f3] font-bold text-base shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-100 hover:bg-[#edf5ff]"
          
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2196f3]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5V15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 10H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          YENİ SATIR EKLE
        </button>
      </div>
    </div>
  );
};

export default InvoiceItemsTable; 