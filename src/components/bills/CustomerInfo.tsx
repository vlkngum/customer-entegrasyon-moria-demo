import React from "react";
import { CustomerFormValues } from "./CustomerForm";
import Image from "next/image";
interface CustomerInfoProps {
  customer: CustomerFormValues;
  onEdit?: () => void;
}

export default function CustomerInfo({ customer, onEdit }: CustomerInfoProps) {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-2 border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-2">
        <Image src="/iconUser.svg" alt="logo" width={20} height={20} />

          <h2 className="font-semibold text-lg">MÜŞTERİ BİLGİLERİ</h2>
        </div>
        {onEdit && (
          <button onClick={onEdit} className="bg-blue-100 text-blue-700 px-4 py-1 rounded hover:bg-blue-200 font-semibold text-sm">
            MÜŞTERİ DÜZENLE
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-base text-[#37474f]">
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