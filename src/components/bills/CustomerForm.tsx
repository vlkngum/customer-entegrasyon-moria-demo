import React, { useState } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-lg bg-white mt-16 max-h-[90vh] overflow-auto w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">MÜŞTERİ ADI</label>
            <input name="name" value={values.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div></div>
          <div>
            <label className="block text-xs font-semibold mb-1">MAIL ADRESİ</label>
            <input name="email" value={values.email} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Müşteri email giriniz" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">TELEFON</label>
            <input name="phone" value={values.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Müşteri telefon giriniz" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">İL</label>
            <select name="city" value={values.city} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Lütfen İl Seçiniz</option>
              {/* Şehir seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">İLÇE</label>
            <select name="district" value={values.district} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">Lütfen İlçe Seçiniz</option>
              {/* İlçe seçenekleri buraya eklenebilir */}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">MAHALLE</label>
            <input name="neighborhood" value={values.neighborhood} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Müşteri mahalle giriniz" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">SOKAK</label>
            <input name="street" value={values.street} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Müşteri sokak giriniz" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold mb-1">AÇIK ADRES</label>
            <textarea name="address" value={values.address} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Açık Adres giriniz." />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 mt-2">
          <div className="flex items-center space-x-4">
            <label className="text-xs font-semibold">MÜŞTERİ TÜRÜ</label>
            <label className="flex items-center space-x-1">
              <input type="radio" checked={values.type === 'tuzel'} onChange={() => handleTypeChange('tuzel')} />
              <span>Tüzel Kişi</span>
            </label>
            <label className="flex items-center space-x-1">
              <input type="radio" checked={values.type === 'gercek'} onChange={() => handleTypeChange('gercek')} />
              <span>Gerçek Kişi</span>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.type === 'gercek' ? (
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold mb-1">TC KİMLİK NO *</label>
              <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="TC NO" required={values.type === 'gercek'} />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold mb-1">VERGİ KİMLİK NO *</label>
                <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="VKN" required={values.type === 'tuzel'} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">VERGİ DAİRESİ <span className="text-gray-400 text-xs">BOŞ BIRAKILABİLİR*</span></label>
                <input name="taxOffice" value={values.taxOffice} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Vergi Dairesi" />
              </div>
            </>
          )}
        </div>
        <div className="text-xs text-blue-500 mt-2">Şahıs şirketleri dahil LTD, AŞ, vb. tüm şirketler 'Tüzel Kişi' kapsamındadır.</div>
        <div className="flex justify-between mt-6">
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-gray-600 border-gray-400 hover:bg-gray-100">Vazgeç</button>
          )}
          <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto">Kaydet</button>
        </div>
      </form>
    </div>
  );
} 