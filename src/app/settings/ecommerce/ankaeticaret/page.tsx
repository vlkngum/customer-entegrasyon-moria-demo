"use client";

import React, { useState } from "react";

export default function AnkaEticaretSettings() {
  const [magazaDurumu, setMagazaDurumu] = useState(false); // false: PASİF, true: AKTİF
  const [siteLink, setSiteLink] = useState("");
  const [sabitAciklamaOn, setSabitAciklamaOn] = useState("");
  const [sabitAciklamaSon, setSabitAciklamaSon] = useState("");

  return (
    <div className="bg-[#f1f6fd] min-h-screen py-5">
      {/* Başlık ve breadcrumb alanı */}
      <div className="w-[900px] max-w-full mb-12 pl-7">
        <div className="text-[22px] font-bold text-[#3a3a3a] mb-1 font-inherit">AnkaEticaret Ayarları</div>
        <div className="text-[15px] font-normal text-[#222] flex items-center gap-1">
          <span className="text-[#222] font-semibold">Entekas</span>
          <span className="text-[#b0b8c1] font-normal">/</span>
          <span className="text-[#222] font-normal">Ayarlar</span>
          <span className="text-[#b0b8c1] font-normal">/</span>
          <span className="text-[#b0b8c1] font-normal">AnkaEticaret Ayarları</span>
        </div>
      </div>
      <div className="w-2/3 max-w-full bg-white rounded-xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative ml-7">
        <form autoComplete="off">
          {/* Site Linki */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium mb-1 text-[#222]">SITE LINKI</label>
            <input
              className="input w-full"
              value={siteLink}
              onChange={e => setSiteLink(e.target.value)}
              placeholder=""
            />
          </div>
          {/* Mağaza Durumu */}
          <div className="mb-6">
            <label className="block text-xs text-black-200 mb-1">Entegrasyon Durumu</label>
            {magazaDurumu ? (
              <div
                className="flex items-center justify-center w-1/2 px-2 py-2.5 rounded-md font-semibold transition-colors duration-200 bg-[#23db8b] text-white h-[42px] cursor-pointer"
                onClick={() => setMagazaDurumu(false)}
                onMouseOver={e => (e.currentTarget.style.background = '#589ffc')}
                onMouseOut={e => (e.currentTarget.style.background = '#23db8b')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mr-2"
                  style={{ display: "inline-block" }}
                >
                  <path
                    d="M5 10.5L9 14.5L15 7.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-semibold">AKTİF</span>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-1/2 rounded-md transition-colors duration-200 bg-[#f3f7f9] text-[#76838f] h-[42px] cursor-pointer"
                onClick={() => setMagazaDurumu(true)}
                onMouseOver={e => (e.currentTarget.style.background = '#f3f7f9')}
                onMouseOut={e => (e.currentTarget.style.background = '#f3f7f9')}
              >
                <span
                  className="inline-block mr-2"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#bfc9d9",
                  }}
                ></span>
                <span className="font-semibold">PASİF</span>
              </div>
            )}
          </div>
          {/* Sabit Açıklama Önü */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium mb-1 text-[#222]">ANKAETICARET SABİT AÇIKLAMA(ÜRÜN AÇIKLAMA ÖNÜ)</label>
            <textarea
              className="input w-full min-h-[200px] resize-y"
              value={sabitAciklamaOn}
              onChange={e => setSabitAciklamaOn(e.target.value)}
              placeholder=""
            />
          </div>
          {/* Sabit Açıklama Sonu */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium mb-1 text-[#222]">ANKAETICARET SABİT AÇIKLAMA(ÜRÜN AÇIKLAMA SONU)</label>
            <textarea
              className="input w-full min-h-[200px] resize-y"
              value={sabitAciklamaSon}
              onChange={e => setSabitAciklamaSon(e.target.value)}
              placeholder=""
            />
          </div>
          {/* Kaydet Butonu */}
          <div className="flex justify-end mt-8">
            <button
              type="button"
              className="bg-[#007aff] text-white border-0 rounded-md px-11 py-[14px] font-semibold text-[17px] cursor-pointer shadow-[0_2px_8px_rgba(0,122,255,0.08)]"
            >
              KAYDET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
