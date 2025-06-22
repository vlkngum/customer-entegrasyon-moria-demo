"use client";
import React, { useState } from "react";

// CustomerFormValues ve CustomerType tanımları
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

export default function AddCustomerPage() {
  const [values, setValues] = useState<CustomerFormValues>(defaultValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: CustomerType) => {
    setValues((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("newCustomer", JSON.stringify(values));
    }
    // İsterseniz burada yönlendirme veya başka bir işlem ekleyebilirsiniz
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="flex items-center mb-6">
            <div className="mr-4">
              <svg width="40" height="40" fill="none" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#E3F0FF"/><path d="M20 21c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm0 2c-4.418 0-8 2.239-8 5v2h16v-2c0-2.761-3.582-5-8-5z" fill="#2196F3"/></svg>
            </div>
            <div>
              <div className="text-lg font-semibold">Müşteri Ekle</div>
              <div className="text-xs text-gray-500">Müşteriye ait bilgileri eksiksiz olarak doldurunuz.</div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">MÜŞTERİ ADI</label>
                <input name="name" value={values.name} onChange={handleChange} className="input" placeholder="Müşteri ad soyad giriniz" required />
              </div>
              <div></div>
              <div>
                <label className="block text-xs font-semibold mb-1">MAIL ADRESİ</label>
                <input name="email" value={values.email} onChange={handleChange} className="input" placeholder="Müşteri email giriniz" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">TELEFON</label>
                <input name="phone" value={values.phone} onChange={handleChange} className="input" placeholder="Müşteri telefon giriniz" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">İL</label>
                <select name="city" value={values.city} onChange={handleChange} className="input">
                  <option value="">Lütfen İl Seçiniz</option>
                  <option value="ADANA">ADANA</option>
                  {/* Diğer şehirler eklenebilir */}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">İLÇE</label>
                <select name="district" value={values.district} onChange={handleChange} className="input">
                  <option value="">Lütfen İlçe Seçiniz</option>
                  {/* İlçe seçenekleri eklenebilir */}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">MAHALLE</label>
                <input name="neighborhood" value={values.neighborhood} onChange={handleChange} className="input" placeholder="Müşteri mahalle giriniz" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">SOKAK</label>
                <input name="street" value={values.street} onChange={handleChange} className="input" placeholder="Müşteri sokak giriniz" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1">AÇIK ADRES</label>
                <textarea name="address" value={values.address} onChange={handleChange} className="input" placeholder="Açık Adres giriniz." />
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
                  <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="input" placeholder="TC NO" required={values.type === 'gercek'} />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold mb-1">VERGİ KİMLİK NO *</label>
                    <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="input" placeholder="VKN" required={values.type === 'tuzel'} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">VERGİ DAİRESİ <span className="text-gray-400 text-xs">BOŞ BIRAKILABİLİR*</span></label>
                    <input name="taxOffice" value={values.taxOffice} onChange={handleChange} className="input" placeholder="Vergi Dairesi" />
                  </div>
                </>
              )}
            </div>
            <div className="text-xs text-blue-500 mt-2">Şahıs şirketleri dahil LTD, AŞ, vb. tüm şirketler 'Tüzel Kişi' kapsamındadır.</div>
            <div className="flex justify-between mt-6">
              <button type="button" className="px-4 py-2 border rounded text-gray-600 border-gray-400 hover:bg-gray-100" disabled>Vazgeç</button>
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-auto">Kaydet</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
