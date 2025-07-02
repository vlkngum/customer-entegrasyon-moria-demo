"use client";
import React, { useState } from "react";

export default function SuratKargoSettings() {
  const [form, setForm] = useState({
    normalUsername: "",
    normalPassword: "",
    codUsername: "",
    codPassword: "",
    cargoStatus: "pasif", // "aktif" veya "pasif"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Kaydedildi! (Demo)");
  };

  const toggleCargoStatus = () => {
    setForm((prev) => ({
      ...prev,
      cargoStatus: prev.cargoStatus === "aktif" ? "pasif" : "aktif",
    }));
  };

  return (
    <div className="bg-[#f3f8fe] min-h-screen p-0">
      <div className="pt-5 pl-8">
        <div className="font-semibold text-2xl">Surat Kargo Ayarları</div>
        <div className="text-xs mt-0.5">
          <span>Entekas</span> / <span className="text-gray-600">Ayarlar</span> / <span className="text-gray-400">Surat Kargo Ayarları</span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 mx-6 panel max-w-[1200px]"
      >
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex-1 gap-4 flex flex-col">
            <label className="font-medium text-xs block">
              NORMAL KARGO KULLANICI ADI *
              <input
                type="text"
                name="normalUsername"
                value={form.normalUsername}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
            <label className="font-medium text-xs block">
              KAPIDA ÖDEME KARGO KULLANICI ADI *
              <input
                type="text"
                name="codUsername"
                value={form.codUsername}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
          </div>
          <div className="flex-1 gap-4 flex flex-col">
            <label className="font-medium text-xs block">
              NORMAL KARGO KULLANICI ŞİFRESİ *
              <input
                type="password"
                name="normalPassword"
                value={form.normalPassword}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
            <label className="font-medium text-xs block">
              KAPIDA ÖDEME KARGO KULLANICI ŞİFRESİ *
              <input
                type="password"
                name="codPassword"
                value={form.codPassword}
                onChange={handleChange}
                required
                className="input"
              />
            </label>
          </div>
        </div>
        <div className="mt-6">
          <div className="font-medium text-xs mb-2">Kargo Durumu</div>
          <button
            type="button"
            onClick={toggleCargoStatus}
            className={`w-1/2 flex justify-center items-center gap-2 px-6 py-2 hover:bg-blue-500 cursor-pointer rounded-lg transition-colors duration-600 border border-gray-200 shadow-sm select-none text-center
              ${form.cargoStatus === "aktif" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700"}
            `}
          >
            <span className={`font-bold text-xl ${form.cargoStatus === "aktif" ? "text-white" : "text-gray-700"}`}>•</span>
            <span>
              {form.cargoStatus === "aktif" ? "AKTİF" : "PASİF"}
            </span>
          </button>
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
