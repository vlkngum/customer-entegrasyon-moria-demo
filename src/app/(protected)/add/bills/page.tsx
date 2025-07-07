"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomerForm, { CustomerFormValues } from "@/components/bills/CustomerForm";
import CustomerInfo from "@/components/bills/CustomerInfo";
import CustomerInfoPlaceholder from "@/components/bills/CustomerInfoPlaceholder";
import InvoiceItemsTable from "@/components/bills/InvoiceItemsTable";
import InvoiceDetails from "@/components/bills/InvoiceDetails";
import InvoiceTotals from "@/components/bills/InvoiceTotals";
import ReactModal from "react-modal";
import Image from "next/image";
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
  { name: "deneme", email: "deneme@gmail.com", phone: "0(543) 543 54 35", city: "İstanbul", district: "Kadıköy", neighborhood: "", street: "", address: "", type: "gercek", tax_or_identity_no: "45435435436", taxOrId: "45435435436", taxOffice: "", },
  { name: "test müşteri", email: "test@test.com", phone: "0(555) 555 55 55", city: "Ankara", district: "Çankaya", neighborhood: "", street: "", address: "", type: "tuzel", tax_or_identity_no: "1234567890", taxOrId: "1234567890", taxOffice: "Ankara", },
];

export default function CreateInvoicePage() {
  const [satisTipi, setSatisTipi] = useState<"internetten" | "normal">("internetten");
  const [items, setItems] = useState<Item[]>([
    { name: "", quantity: 1, price: 0, vat: 0, total: 0 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState<number | false>(false);
  const [customerList, setCustomerList] = useState<CustomerFormValues[]>(demoCustomers);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormValues | null>(null);
  const customerDropdownRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklanınca dropdown'ı kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (customerDropdownRef.current && !customerDropdownRef.current.contains(event.target as Node)) {
        setShowCustomerDropdown(false);
      }
    }
    if (showCustomerDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCustomerDropdown]);

  const handleAddRow = () => {
    setItems([
      ...items,
      { name: "", quantity: 1, price: 0, vat: 0, total: 0 },
    ]);
  };

  const handleItemChange = (idx: number, field: ItemField, value: string) => {
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
  }

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
    <>
      <div className="min-h-screen bg-blue-50 p-0 flex flex-row w-full"> 
        

        <div className="flex flex-col w-2/3 px-8 gap-6 p-4">

        <div className="mb-6 flex items-center space-x-2 border-b border-[#d6e8ff] pb-4">
          <Image src="/sopyoOrderico.svg" alt="logo" width={32} height={32} />
          <h1 className="text-xl font-semibold">Fatura Oluştur</h1>
        </div>
          {/* Sol: Fatura Kalemleri ve Genel Toplamlar Ortak Kapsayıcı */}
          <div className="flex-1">
            {/* Fatura Kalemleri Paneli */}
            <div className="panel w-full">
              <InvoiceItemsTable
                items={items}
                searchTerm={searchTerm}
                showDropdown={showDropdown}
                setSearchTerm={setSearchTerm}
                setShowDropdown={setShowDropdown}
                handleItemChange={handleItemChange}
                handleRemoveRow={handleRemoveRow}
                handleAddRow={handleAddRow}
                filteredOptions={filteredOptions}
              />
            </div>

            {/* Genel Toplamlar: Fatura panelinin dışında, sağ altına hizalı */}
            <div className="w-full mt-4 flex justify-end">
              <InvoiceTotals
                araToplam={araToplam}
                toplamKdv={toplamKdv}
                toplam={toplam}
              />
            </div>
          </div> 
        </div>


        <div className="w-1/3 flex flex-col min-h-[500px]">
            <div className="layout-panel">
              <label className="block text-xs text-[#5d6e76] mb-1">MÜŞTERİ SEÇİNİZ</label>
              <div className="relative" ref={customerDropdownRef}>
                <button
                  type="button"
                  className={`input w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 ${!selectedCustomer ? "text-gray-400" : "text-black"}`}
                  style={{ minHeight: 42, background: '#fff' }}
                  onClick={() => setShowCustomerDropdown((v) => !v)}
                >
                  <span className={`block w-full text-left ${!selectedCustomer ? "text-gray-400 mx-auto text-center" : "text-black"}`}
                    style={!selectedCustomer ? { width: '100%' } : {}}>
                    {selectedCustomer ? selectedCustomer.name : "Lütfen Müşteri Seçiniz"}
                  </span>
                  <svg className="w-4 h-4 ml-2 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
                </button>
                {showCustomerDropdown && (
                  <div className="absolute z-20 bg-white border border-blue-300 w-full mt-1 rounded shadow animate-fade-in">
                    <input
                      className="w-full p-2 border-b outline-none text-sm"
                      placeholder="Aranıyor..."
                      value={customerSearch}
                      onChange={(e) => {
                        setCustomerSearch(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      autoFocus
                    />
                    <div className="max-h-40 overflow-y-auto bg-gray-50">
                      {filteredCustomers.length === 0 && (
                        <div className="p-2 text-gray-400 text-sm">Müşteri bulunamadı</div>
                      )}
                      {filteredCustomers.map((c, i) => (
                        <div
                          key={c.name + i}
                          className={`p-2 cursor-pointer hover:bg-blue-100 text-sm ${selectedCustomer && selectedCustomer.name === c.name ? "bg-blue-100" : ""}`}
                          onClick={() => handleCustomerSelect(c)}
                        >
                          {c.name}
                        </div>
                      ))}
                    </div>
                    <button
                      className="w-full text-white p-2 flex items-center justify-center gap-2 mt-2 rounded-b transition-colors"
                      style={{ background: '#2984ff' }}
                      type="button"
                      onMouseOver={e => (e.currentTarget.style.background = '#3e90ff')}
                      onMouseOut={e => (e.currentTarget.style.background = '#2984ff')}
                      onClick={() => setShowCustomerModal(true)}
                    >
                      <span className="text-lg font-bold">+</span> Yeni Müşteri Ekle
                    </button>
                  </div>
                )}
              </div>
              {!selectedCustomer && (
                <div className="flex items-center mt-1 text-xs text-[#0f86ff] border-b border-gray-200 pb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="#0f86ff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#0f86ff" strokeWidth="2" fill="none"/><path d="M12 16v-4" stroke="#0f86ff" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="8" r="1" fill="#0f86ff"/></svg>
                  Kayıtlı bir müşteri seçebilir veya yeni bir müşteri ismi yazabilirsiniz.
                </div>
              )}
              <ReactModal
                isOpen={showCustomerModal}
                onRequestClose={() => setShowCustomerModal(false)}
                ariaHideApp={false}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black/40 z-40"
              >
                <div className="panel text-black">
                  <button className="absolute top-2 right-2 text-2xl" onClick={() => setShowCustomerModal(false)}>×</button>
                  <h2 className="text-lg font-semibold mb-2 text-black">Yeni Müşteri Ekle</h2>
                  <p className="text-gray-500 mb-4 text-sm">Müşteriye ait bilgileri eksiksiz olarak doldurunuz.</p>
                  <CustomerForm onSubmit={handleCustomerAdd} onCancel={() => setShowCustomerModal(false)} />
                </div>
              </ReactModal>
              <div className="mt-4">
                {selectedCustomer ? (
                  <CustomerInfo customer={selectedCustomer} onEdit={handleCustomerEdit} />
                ) : (
                  <CustomerInfoPlaceholder />
                )}
              </div>
            </div>

            <InvoiceDetails
              satisTipi={satisTipi}
              setSatisTipi={setSatisTipi}
            />
          </div>
      </div>












      <footer className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 z-20 w-full">
        <div className="flex justify-between">
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-8 py-3 text-[#2d3a4a] font-bold text-base hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="#2d3a4a" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            VAZGEÇ
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-[#11ce6c] hover:bg-[#0fa95a] text-white font-bold text-base rounded-lg px-8 py-3 transition-colors"
          >
            FATURAYI OLUŞTUR
            <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </footer>
    </>
  );
}
