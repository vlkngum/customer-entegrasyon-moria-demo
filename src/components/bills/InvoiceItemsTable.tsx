import React, { useRef } from "react";

type ItemField = "name" | "quantity" | "price" | "vat" | "total";
type Item = { name: string; quantity: number; price: number; vat: number; total: number };

interface InvoiceItemsTableProps {
  items: Item[];
  searchTerm: string;
  showDropdown: boolean;
  setSearchTerm: (term: string) => void;
  setShowDropdown: (show: boolean) => void;
  handleItemChange: (idx: number, field: ItemField, value: any) => void;
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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="font-semibold mb-4 text-xl">FATURA KALEMLERİ</h2>
      <hr className="mb-4" />
      <table className="w-full text-sm mb-2">
        <thead>
          <tr className="text-gray-700">
            <th className="text-left font-semibold pb-2">ÜRÜN ADI VE STOK KODU</th>
            <th className="font-semibold pb-2">MİKTAR</th>
            <th className="font-semibold pb-2">BİRİM FİYAT</th>
            <th className="font-semibold pb-2">VERGİ</th>
            <th className="font-semibold pb-2">TOPLAM</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="align-middle">
              <td className="relative pr-2">
                <div>
                  <input
                    ref={inputRef}
                    className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-blue-400"
                    placeholder="Ürün adı,Stok Kodu,Barkod,Varyant Stok Kodu"
                    value={idx === 0 ? searchTerm : item.name}
                    onFocus={() => idx === 0 && setShowDropdown(true)}
                    onChange={e => {
                      if (idx === 0) {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                      } else {
                        handleItemChange(idx, 'name', e.target.value);
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  />
                  {idx === 0 && showDropdown && (
                    <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-48 overflow-auto">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map(opt => (
                          <div
                            key={opt}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                            onMouseDown={() => {
                              setSearchTerm(opt);
                              handleItemChange(idx, 'name', opt);
                              setShowDropdown(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-center text-gray-500 text-sm">Sonuç bulunamadı</div>
                      )}
                      {filteredOptions.length === 0 && searchTerm.trim() && (
                        <button
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-b flex items-center justify-center mt-1"
                          onMouseDown={() => {
                            setSearchTerm("");
                            handleItemChange(idx, 'name', searchTerm);
                            setShowDropdown(false);
                            setTimeout(() => inputRef.current?.blur(), 0);
                          }}
                        >
                          <span className="mr-2 text-lg">+</span> FATURA KALEMİ EKLE
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-2">
                <input
                  type="number"
                  min={1}
                  className="w-16 border rounded px-2 py-2 text-center bg-gray-50 focus:outline-blue-400"
                  value={item.quantity}
                  onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                />
              </td>
              <td className="px-2">
                <div className="flex items-center gap-0">
                  <input
                    type="number"
                    min={0}
                    className="w-20 border rounded-l px-2 py-2 bg-gray-50 focus:outline-blue-400 h-10"
                    value={item.price}
                    onChange={e => handleItemChange(idx, 'price', e.target.value)}
                  />
                  <span className="inline-flex items-center border border-l-0 rounded-r bg-gray-100 text-gray-500 text-xs h-10 px-2">₺</span>
                </div>
              </td>
              <td className="px-2">
                <div className="flex items-center gap-0">
                  <span className="inline-flex items-center px-2 border rounded-l bg-gray-100 text-gray-500 text-xs h-10">KDV</span>
                  <select
                    className="border-t border-b border-r rounded-r px-2 py-2 bg-white focus:outline-blue-400 h-10"
                    value={item.vat}
                    onChange={e => handleItemChange(idx, 'vat', e.target.value)}
                  >
                    {[0, 1, 8, 10, 18].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </td>
              <td className="px-2">
                <div className="flex items-center gap-0">
                  <input
                    type="number"
                    className="w-20 border rounded-l px-2 py-2 bg-gray-50 text-right focus:outline-none h-10"
                    value={item.total}
                    disabled
                  />
                  <span className="inline-flex items-center border border-l-0 rounded-r bg-gray-100 text-gray-500 text-xs h-10 px-2">₺</span>
                </div>
              </td>
              <td className="pl-2">
                <button
                  className="bg-red-100 hover:bg-red-200 text-red-600 rounded p-2"
                  onClick={() => handleRemoveRow(idx)}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="flex items-center px-5 py-2 border-2 border-blue-200 rounded-lg text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100 transition mt-4 shadow-sm"
        onClick={handleAddRow}
        type="button"
      >
        <span className="mr-2 text-xl">+</span> YENİ SATIR EKLE
      </button>
    </div>
  );
};

export default InvoiceItemsTable; 