import React, { useState } from "react";
import Image from "next/image";

export type CustomerType = "gercek" | "tuzel";
export interface CustomerFormValues {
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  address: string;
  type: CustomerType;
  taxOrId: string;
  taxOffice: string;
}

interface CustomerFormProps {
  initialValues?: Partial<CustomerFormValues>;
  onSubmit: (values: CustomerFormValues) => void;
  onCancel?: () => void;
}

const defaultValues: CustomerFormValues = {
  name: "",
  email: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
  street: "",
  address: "",
  type: "gercek",
  taxOrId: "",
  taxOffice: "",
};

export default function CustomerForm({ initialValues, onSubmit, onCancel }: CustomerFormProps) {
  const [values, setValues] = useState<CustomerFormValues>({ ...defaultValues, ...initialValues });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: CustomerType) => {
    setValues((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto pt-10" onClick={onCancel}>
      <div className="w-full max-w-4xl p-2">
        <div className="bg-white rounded-lg shadow-md p-0" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-8 pb-4 border-b border-[#e0e0e0]">
            <div className="flex items-center">
              <Image src="/review.svg" alt="logo" width={50} height={50} className="mr-4" />
              <div>
                <h3 className="text-lg text-[#37474f]">Müşteri Bilgileri</h3>
                <p className="text-xs text-[#37474f]">Müşteriye ait bilgileri eksiksiz olarak doldurunuz.</p>
              </div>
            </div>
            <button type="button" onClick={onCancel} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
              <span className="text-xl text-blue-600">×</span>
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-8 pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">MÜŞTERİ ADI</label>
                <input name="name" value={values.name} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="Müşteri ad soyad giriniz" style={{ color: '#76838f' }} required />
              </div>
              <div></div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">MAIL ADRESİ</label>
                <input name="email" value={values.email} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="Müşteri email giriniz" style={{ color: '#76838f' }} />
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">TELEFON</label>
                <input name="phone" value={values.phone} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="Müşteri telefon giriniz" style={{ color: '#76838f' }} />
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">İL</label>
                <select name="city" value={values.city} onChange={handleChange} className="input w-full border rounded px-3 py-2" style={{ color: '#76838f' }}>
                  <option value="">Lütfen İl Seçiniz</option>
                  {/* Şehir seçenekleri buraya eklenebilir */}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">İLÇE</label>
                <select name="district" value={values.district} onChange={handleChange} className="input w-full border rounded px-3 py-2" style={{ color: '#76838f' }}>
                  <option value="">Lütfen İlçe Seçiniz</option>
                  {/* İlçe seçenekleri buraya eklenebilir */}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">MAHALLE</label>
                <input name="neighborhood" value={values.neighborhood} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="Müşteri mahalle giriniz" style={{ color: '#76838f' }} />
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">SOKAK</label>
                <input name="street" value={values.street} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="Müşteri sokak giriniz" style={{ color: '#76838f' }} />
              </div>
              <div className="md:col-span-2 border-b border-[#e0e0e0] pb-4">
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">AÇIK ADRES</label>
                <textarea name="address" value={values.address} onChange={handleChange} className="input w-full border rounded px-3 py-2 h-30" placeholder="Açık Adres giriniz." style={{ color: '#76838f' }} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-[#5d6e76] font-semibold mb-3">MÜŞTERİ TÜRÜ</label>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                <label className="flex items-center space-x-2 md:space-x-2 md:w-1/2">
                  <input type="radio" checked={values.type === 'tuzel'} onChange={() => handleTypeChange('tuzel')} className="accent-blue-600" />
                  <span className="text-base text-[#37474f]">Tüzel Kişi</span>
                </label>
                <label className="flex items-center space-x-2 md:space-x-2 md:w-1/2 mt-2 md:mt-0">
                  <input type="radio" checked={values.type === 'gercek'} onChange={() => handleTypeChange('gercek')} className="accent-blue-600" />
                  <span className="text-base text-[#37474f]">Gerçek Kişi</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.type === 'gercek' ? (
                <div className="md:col-span-2">
                  <label className="block text-xs text-[#5d6e76] font-semibold mb-1">TC KİMLİK NO *</label>
                  <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="TC NO" style={{ color: '#76838f' }} required={values.type === 'gercek'} />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-[#5d6e76] font-semibold mb-1">VERGİ KİMLİK NO *</label>
                    <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="VKN" style={{ color: '#76838f' }} required={values.type === 'tuzel'} />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5d6e76] font-semibold mb-1">VERGİ DAİRESİ <span className="text-gray-400 text-xs">BOŞ BIRAKILABİLİR*</span></label>
                    <input name="taxOffice" value={values.taxOffice} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="Vergi Dairesi" style={{ color: '#76838f' }} />
                  </div>
                </>
              )}
            </div>
            <div className="text-xs text-blue-500 mt-2 border-b border-[#e0e0e0] pb-4">Şahıs şirketleri dahil LTD, AŞ, vb. tüm şirketler Tüzel Kişi kapsamındadır.</div>
            <div className="flex justify-between mt-6">
              {onCancel ? (
                <button type="button" onClick={onCancel} className="cursor-pointer px-4 py-2 border rounded text-gray-600 border-gray-400 hover:bg-gray-100">Vazgeç</button>
              ) : (
                <button type="button" className="cursor-pointer px-4 py-2 border rounded text-gray-600 border-gray-400 hover:bg-gray-100" disabled>Vazgeç</button>
              )}
              <button type="submit" className="cursor-pointer px-6 py-2 bg-[#11c26d] text-white rounded hover:bg-[#1ed57d] ml-auto">Kaydet</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 