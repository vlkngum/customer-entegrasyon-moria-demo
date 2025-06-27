"use client";
import React, { useState } from "react";
import { LuPackage } from "react-icons/lu";
import CustomerForm, { CustomerFormValues } from "@/components/bills/CustomerForm";
import CustomerInfo from "@/components/bills/CustomerInfo";
import InvoiceItemsTable from "@/components/bills/InvoiceItemsTable";
import InvoiceDetails from "@/components/bills/InvoiceDetails";
import InvoiceTotals from "@/components/bills/InvoiceTotals";
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
    <div className="min-h-screen bg-blue-50 p-4">
      
        {/* Header */}
        <div className="mb-6 flex items-center space-x-2">
          <LuPackage className="text-3xl" />
          <h1 className="text-xl font-semibold">Fatura Oluştur</h1>
        </div>

        <div className="flex w-full gap-6">
          {/* Left: Fatura Kalemleri */}
          <div className="w-3/5 panel">
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

          {/* Right: Müşteri ve Fatura Bilgileri */}
          <div className="w-2/5">
            <div className="panel">
              <label className="block text-sm font-medium mb-1">Müşteri Seçiniz</label>
              <div className="relative">
                <input
                  className="input"
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
                overlayClassName="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
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
                  <div className="text-gray-500 text-sm">Lütfen üst menüden müşteri seçiniz...</div>
                )}
              </div>
            </div>

            <InvoiceDetails
              satisTipi={satisTipi}
              setSatisTipi={setSatisTipi}
            />
          </div>
        </div>

        {/* Bottom: Genel Toplamlar ve Butonlar */}
        <div className="flex flex-col lg:flex-row justify-between items-end mt-8">
          <InvoiceTotals
            araToplam={araToplam}
            toplamKdv={toplamKdv}
            toplam={toplam}
          />
          <div className="flex space-x-2">
            <button className="px-6 py-2 border rounded text-gray-600 border-gray-400 hover:bg-gray-100">Vazgeç</button>
            <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Faturayı Oluştur</button>
          </div>
        </div> 
    </div>
  );
}
