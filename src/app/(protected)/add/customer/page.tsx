"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCustomer } from '@/store';
import { useSession } from 'next-auth/react';

interface ExtendedSession {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
  };
}
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
  const { createCustomer, isCreating, error, successMessage, clearErrorAction, clearSuccess } = useCustomer();
  const { data: session } = useSession() as { data: ExtendedSession | null };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: CustomerType) => {
    setValues((prev) => ({ ...prev, type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) {
      alert('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
      return;
    }
    try {
      const createData = {
        // Map your form values to backend fields
        customer_service_id: "1", // Default service ID
        customer_no: `CUST-${Date.now()}`, // Generate customer number
        first_name: values.name.split(' ')[0] || values.name,
        last_name: values.name.split(' ').slice(1).join(' ') || '',
        name: values.name,
        email: values.email,
        phone: values.phone,
        city: values.city,
        district: values.district,
        neighborhood: values.neighborhood,
        street: values.street,
        full_address: values.address,
        customer_type: (values.type === 'gercek' ? 'individual' : 'corporate') as 'individual' | 'corporate',
        tax_or_identity_no: values.taxOrId,
        tax_office: values.taxOffice,
        status: 'active' as const,
        currency: 'TRY',
        integration_id: 29,
      };
      await createCustomer(session.accessToken, createData);
      setValues(defaultValues);
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-2 mb-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8 mt-5">
          <div className="flex items-center mb-6 border-b border-[#e0e0e0] pb-4">
            <div className="mr-4">
              <Image src="/review.svg" alt="logo" width={50} height={50} />
            </div>
            <div>
              <h3 className="text-lg text-[#37474f]">Müşteri Ekle</h3>
              <p className="text-xs text-[#37474f]">Müşteriye ait bilgileri eksiksiz olarak doldurunuz.</p>
            </div>
          </div>
          
          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <div>
                <strong>Hata:</strong> {error}
              </div>
              <button 
                onClick={() => clearErrorAction()}
                className="text-red-700 hover:text-red-900 font-bold"
              >
                ×
              </button>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <div>
                <strong>Başarılı:</strong> {successMessage}
              </div>
              <button 
                onClick={() => clearSuccess()}
                className="text-green-700 hover:text-green-900 font-bold"
              >
                ×
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">MÜŞTERİ ADI</label>
                <input name="name" value={values.name} onChange={handleChange} className="input" placeholder="Müşteri ad soyad giriniz" required />
              </div>
              <div></div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">MAIL ADRESİ</label>
                <input name="email" value={values.email} onChange={handleChange} className="input" placeholder="Müşteri email giriniz" />
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">TELEFON</label>
                <input name="phone" value={values.phone} onChange={handleChange} className="input" placeholder="" />
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">İL</label>
                <select name="city" value={values.city} onChange={handleChange} className="input">
                  <option value="">Lütfen İl Seçiniz</option>
                  <option value="ADANA">ADANA</option>
                  {/* Diğer şehirler eklenebilir */}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">İLÇE</label>
                <select name="district" value={values.district} onChange={handleChange} className="input">
                  <option value="">Lütfen İlçe Seçiniz</option>
                  {/* İlçe seçenekleri eklenebilir */}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">MAHALLE</label>
                <input name="neighborhood" value={values.neighborhood} onChange={handleChange} className="input" placeholder="Müşteri mahalle giriniz" />
              </div>
              <div>
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">SOKAK</label>
                <input name="street" value={values.street} onChange={handleChange} className="input" placeholder="Müşteri sokak giriniz" />
              </div>
              <div className="md:col-span-2 border-b border-[#e0e0e0] pb-4">
                <label className="block text-xs text-[#5d6e76] font-semibold mb-1">AÇIK ADRES</label>
                <textarea name="address" value={values.address} onChange={handleChange} className="input h-30" placeholder="Açık Adres giriniz." />
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
                  <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="input" placeholder="TC NO" required={values.type === 'gercek'} />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs text-[#5d6e76] font-semibold mb-1">VERGİ KİMLİK NO *</label>
                    <input name="taxOrId" value={values.taxOrId} onChange={handleChange} className="input" placeholder="VKN" required={values.type === 'tuzel'} />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5d6e76] font-semibold mb-1">VERGİ DAİRESİ <span className="text-gray-400 text-xs">BOŞ BIRAKILABİLİR*</span></label>
                    <input name="taxOffice" value={values.taxOffice} onChange={handleChange} className="input" placeholder="Vergi Dairesi" />
                  </div>
                </>
              )}
            </div>
            <div className="text-xs text-blue-500 mt-2 border-b border-[#e0e0e0] pb-4">Şahıs şirketleri dahil LTD, AŞ, vb. tüm şirketler &apos;Tüzel Kişi&apos; kapsamındadır.</div>
            <div className="flex justify-between mt-6">
              <button type="button" className="cursor-pointer px-4 py-2 border rounded text-gray-600 border-gray-400 hover:bg-gray-100" disabled>Vazgeç</button>
              <button 
                type="submit" 
                className="cursor-pointer px-6 py-2 bg-[#11c26d] text-white rounded hover:bg-[#1ed57d] ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isCreating}
              >
                {isCreating ? 'KAYDEDİLİYOR...' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
