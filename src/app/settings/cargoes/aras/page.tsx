"use client";
import React, { useState } from "react";

export default function ArasKargoSettings() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    customerCode: "",
    cargoStatus: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada API'ye gönderme işlemi yapılabilir
    alert("Kaydedildi! (Demo)");
  };

  return (
    <div className="bg-[#f3f8fe] min-h-screen p-0">
      <div className="pt-5 pl-8">
        <div className="font-semibold text-2xl">Aras Kargo Ayarları</div>
        <div className="text-xs mt-0.5">
          <span>Entekas</span> / <span className="text-gray-600">Ayarlar</span> / <span className="text-gray-400">Aras Kargo Ayarları</span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mx-6 panel max-w-[1200px]"
      >
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex-1 gap-4 flex flex-col">
            <label className="font-medium text-xs block">
              KULLANICI ADI *
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
            <label className="font-medium text-xs block">
              MÜŞTERİ KODU
              <input
                type="text"
                name="customerCode"
                value={form.customerCode}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label className="font-medium text-xs flex items-center gap-2 select-none">
              Kargo Durumu
              <input
                type="checkbox"
                name="cargoStatus"
                checked={form.cargoStatus}
                onChange={handleChange}
                className="ml-2 accent-blue-600 w-4 h-4"
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="font-medium text-xs block">
              KULLANICI ŞİFRESİ *
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
          </div>
        </div>
        <div className="text-right mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-5 py-2.5 text-base transition-colors"
          >
            KAYDET
          </button>
        </div>
      </form>
    </div>
  );
}
