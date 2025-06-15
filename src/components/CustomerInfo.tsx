import React from "react";
import { CustomerFormValues } from "./CustomerForm";
import { IoPersonSharp } from "react-icons/io5";

interface CustomerInfoProps {
  customer: CustomerFormValues;
  onEdit?: () => void;
}

export default function CustomerInfo({ customer, onEdit }: CustomerInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
        <IoPersonSharp className="text-3xl" />

          <h2 className="font-semibold text-lg">MÜŞTERİ BİLGİLERİ</h2>
        </div>
        {onEdit && (
          <button onClick={onEdit} className="bg-blue-100 text-blue-700 px-4 py-1 rounded hover:bg-blue-200 font-semibold text-sm">
            MÜŞTERİ DÜZENLE
          </button>
        )}
      </div>
      <hr className="mb-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-base">
        <div>
          <div><span className="font-medium">Müşteri Adı:</span> {customer.name}</div>
          <div><span className="font-medium">Email:</span> {customer.email}</div>
          <div><span className="font-medium">Telefon:</span> {customer.phone}</div>
        </div>
        <div>
          <div><span className="font-medium">TCKN:</span> {customer.type === 'gercek' ? customer.taxOrId : '-'}</div>
          <div><span className="font-medium">VKN:</span> {customer.type === 'tuzel' ? customer.taxOrId : '-'}</div>
          <div><span className="font-medium">Vergi Dairesi:</span> {customer.taxOffice || '-'}</div>
        </div>
      </div>
    </div>
  );
} 