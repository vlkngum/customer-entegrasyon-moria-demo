import React from "react";
import Link from "next/link";

const AccountEditPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f9ff]">
      {/* Header & Breadcrumb */}
      <div className="px-6 pt-8 pb-2">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Hesabım</h1>
        <nav className="text-gray-500 text-base">
          <Link href="/" className="font-semibold text-black hover:underline">Entekas</Link> <span className="mx-1">/</span> <Link href="/settings" className="hover:underline">Ayarlar</Link> <span className="mx-1">/</span> <span className="text-gray-700">Hesabım</span>
        </nav>
      </div>

      {/* Card */}
      <div className="max-w-7xl mx-auto mt-8 bg-white rounded-lg shadow-sm p-8">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium text-gray-800">Hesabım</h2>
          <div className="flex gap-3">
            <button className="px-6 py-2 rounded bg-gray-100 text-gray-600 font-medium border border-gray-200 hover:bg-gray-200 transition">Vazgeç</button>
            <button className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Kaydet</button>
          </div>
        </div>
        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">YENİ ŞİFRENİZ *</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Yeni şifrenizi giriniz"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="passwordRepeat">YENİ ŞİFRENİZ(TEKRAR) *</label>
            <input
              id="passwordRepeat"
              type="password"
              className="input"
              placeholder="Yeni şifrenizi tekrar giriniz"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountEditPage;
