"use client";
import React, { useState, useRef } from "react";
import { LuPackage } from "react-icons/lu";
import CustomerForm, { CustomerFormValues } from "@/components/CustomerForm";
import CustomerInfo from "@/components/CustomerInfo";
import ReactModal from "react-modal";

type ItemField = "name" | "quantity" | "price" | "vat" | "total";
type Item = { name: string; quantity: number; price: number; vat: number; total: number };

const productOptions = [
  "Elma - STK001",
  "Armut - STK002",
  "Muz - STK003",
  "Karpuz - STK004",
  "Portakal - STK005",
];

const demoCustomers: CustomerFormValues[] = [
  { name: "deneme", email: "deneme@gmail.com", phone: "0(543) 543 54 35", city: "İstanbul", district: "Kadıköy", neighborhood: "", street: "", address: "", type: "gercek", taxOrId: "45435435436", taxOffice: "", },
  { name: "test müşteri", email: "test@test.com", phone: "0(555) 555 55 55", city: "Ankara", district: "Çankaya", neighborhood: "", street: "", address: "", type: "tuzel", taxOrId: "1234567890", taxOffice: "Ankara", },
];

export default function CreateInvoicePage() {
  const [satisTipi, setSatisTipi] = useState<"internetten" | "normal">("internetten");
  const [items, setItems] = useState<Item[]>([
    { name: "", quantity: 1, price: 0, vat: 0, total: 0 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [customerList, setCustomerList] = useState<CustomerFormValues[]>(demoCustomers);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormValues | null>(null);

  const handleAddRow = () => {
    setItems([
      ...items,
      { name: "", quantity: 1, price: 0, vat: 0, total: 0 },
    ]);
  };

  const handleItemChange = (idx: number, field: ItemField, value: any) => {
    const newItems = [...items];
    if (field === "quantity" || field === "price" || field === "vat" || field === "total") {
      newItems[idx][field] = Number(value);
    } else {
      newItems[idx][field] = value;
    }
    // Otomatik toplam hesaplama
    if (field === "quantity" || field === "price" || field === "vat") {
      const price = parseFloat(String(newItems[idx].price)) || 0;
      const quantity = parseFloat(String(newItems[idx].quantity)) || 0;
      const vat = parseFloat(String(newItems[idx].vat)) || 0;
      const subtotal = price * quantity;
      const vatAmount = subtotal * (vat / 100);
      newItems[idx].total = Number((subtotal + vatAmount).toFixed(2));
    }
    setItems(newItems);
  };

  const handleRemoveRow = (idx: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  // Autocomplete filtered options
  const filteredOptions = productOptions.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomers = customerList.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleCustomerSelect = (customer: CustomerFormValues) => {
    setSelectedCustomer(customer);
    setCustomerSearch(customer.name);
    setShowCustomerDropdown(false);
  };

  const handleCustomerAdd = (values: CustomerFormValues) => {
    setCustomerList(prev => [...prev, values]);
    setSelectedCustomer(values);
    setCustomerSearch(values.name);
    setShowCustomerModal(false);
  };

  const handleCustomerEdit = () => {
    setShowCustomerModal(true);
  };

  // Genel toplamlar hesaplama
  const araToplam = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const toplamKdv = items.reduce((sum, item) => {
    const price = item.price * item.quantity;
    return sum + (price * (item.vat / 100));
  }, 0);
  const toplam = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center space-x-2">
        <LuPackage className="text-3xl" />

          <h1 className="text-xl font-semibold">Fatura Oluştur</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Fatura Kalemleri */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
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
                        {/* Dropdown only for first row for demo, you can generalize for all rows if needed */}
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

          {/* Right: Müşteri ve Fatura Bilgileri */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium mb-1">Müşteri Seçiniz</label>
              <div className="relative">
                <input
                  className="w-full border rounded px-2 py-1 mb-2"
                  placeholder="Lütfen müşteri seçiniz"
                  value={customerSearch}
                  onFocus={() => setShowCustomerDropdown(true)}
                  onChange={e => {
                    setCustomerSearch(e.target.value);
                    setShowCustomerDropdown(true);
                  }}
                />
                {showCustomerDropdown && (
                  <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-48 overflow-auto">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((c, i) => (
                        <div
                          key={c.name + i}
                          className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          onMouseDown={() => handleCustomerSelect(c)}
                        >
                          {c.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-center text-gray-500 text-sm">Sonuç bulunamadı</div>
                    )}
                    {filteredCustomers.length === 0 && customerSearch.trim() && (
                      <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-b flex items-center justify-center mt-1"
                        onMouseDown={() => setShowCustomerModal(true)}
                      >
                        <span className="mr-2 text-lg">+</span> MÜŞTERİ EKLE
                      </button>
                    )}
                  </div>
                )}
              </div>
              <ReactModal
                isOpen={showCustomerModal}
                onRequestClose={() => setShowCustomerModal(false)}
                ariaHideApp={false}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-30 z-40"
              >
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                  <button className="absolute top-2 right-2 text-2xl" onClick={() => setShowCustomerModal(false)}>×</button>
                  <h2 className="text-lg font-semibold mb-2">Yeni Müşteri Ekle</h2>
                  <p className="text-gray-500 mb-4 text-sm">Müşteriye ait bilgileri eksiksiz olarak doldurunuz.</p>
                  <CustomerForm onSubmit={handleCustomerAdd} onCancel={() => setShowCustomerModal(false)} />
                </div>
              </ReactModal>
              <div className="mt-4">
                {selectedCustomer ? (
                  <CustomerInfo customer={selectedCustomer} onEdit={handleCustomerEdit} />
                ) : (
                  <div className="text-gray-500 text-sm">Lütfen üst menüden müşteri seçiniz...</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 space-y-3">
              <label className="block text-sm font-medium">Fatura Düzenleme Tarihi</label>
              <input type="datetime-local" className="w-full border rounded px-2 py-1" />

              <label className="block text-sm font-medium">Sipariş No</label>
              <input type="text" className="w-full border rounded px-2 py-1" />

              <div className="flex items-center space-x-4 mt-2">
                <label className="font-semibold">
                  <input
                    type="radio"
                    name="satisTipi"
                    checked={satisTipi === "internetten"}
                    onChange={() => setSatisTipi("internetten")}
                    className="mr-1"
                  />
                  İNTERNETTEN SATIŞ
                </label>
                <label className="font-semibold">
                  <input
                    type="radio"
                    name="satisTipi"
                    checked={satisTipi === "normal"}
                    onChange={() => setSatisTipi("normal")}
                    className="mr-1"
                  />
                  NORMAL SATIŞ
                </label>
              </div>

              {satisTipi === "internetten" && (
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Kargo Şirketi</label>
                    <select className="w-full border rounded px-2 py-1">
                      <option>Kargo Şirketi Seç</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Kargo Kampanya Kodu</label>
                    <input type="text" className="w-full border rounded px-2 py-1" />
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Fatura Kaynağı</label>
                  <select className="w-full border rounded px-2 py-1">
                    <option>CMApps</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">Ödeme Yöntemi</label>
                  <select className="w-full border rounded px-2 py-1">
                    <option>Kredi Kartı</option>
                  </select>
                </div>
              </div>

              <label className="block text-sm font-medium">Fatura Açıklaması</label>
              <textarea className="w-full border rounded px-2 py-1" rows={3} placeholder="Fatura açıklaması giriniz." />
            </div>
          </div>
        </div>

        {/* Bottom: Genel Toplamlar ve Butonlar */}
        <div className="flex flex-col lg:flex-row justify-between items-end mt-8">
          <div className="bg-white rounded-lg shadow p-4 w-full max-w-xs mb-4 lg:mb-0">
            <h3 className="font-semibold mb-2 text-xl">Genel Toplamlar</h3>
            <div className="flex justify-between text-base mb-1">
              <span>Ara Toplam</span>
              <span>{araToplam.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-base mb-1">
              <span>Toplam KDV</span>
              <span>{toplamKdv.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Toplam</span>
              <span>{toplam.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 border rounded text-gray-600 border-gray-400 hover:bg-gray-100">Vazgeç</button>
            <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Faturayı Oluştur</button>
          </div>
        </div>
      </div>
    </div>
  );
}
