"use client";

import React, { useState } from "react";

export default function DigitalPlanetSettings() {
  const [kampanyaKodu, setKampanyaKodu] = useState(true);
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState(true);

  return (
    <div className="bg-[#f1f6fd] min-h-screen py-5">
      {/* Başlık ve breadcrumb alanı form kutusunun dışında ve en sola yaslı */}
      <div className="w-[900px] max-w-full mb-12 pl-7">
        <div className="text-[32px] font-bold text-[#3a3a3a] mb-1 font-inherit">DigitalPlanet Ayarları</div>
        <div className="text-[17px] font-normal text-[#222] flex items-center gap-1">
          <span className="text-[#222] font-semibold">Entekas</span>
          <span className="text-[#b0b8c1] font-normal">/</span>
          <span className="text-[#222] font-normal">Ayarlar</span>
          <span className="text-[#b0b8c1] font-normal">/</span>
          <span className="text-[#b0b8c1] font-normal">DigitalPlanet Ayarları</span>
        </div>
      </div>
      <div className="w-2/3 max-w-full bg-white rounded-xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.06)] relative ml-7">
        <form autoComplete="off">
          {/* DigitalPlanet Bilgileri */}
          <div className="flex gap-6 mb-0">
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">DIGITALPLANET ŞİRKET KODU*</label>
              <input className="input" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">DIGITALPLANET KULLANICI ADI*</label>
              <input className="input" />
            </div>
          </div>
          <div className="flex gap-6 mb-6 mt-6">
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">DIGITALPLANET KULLANICI ŞİFRESİ*</label>
              <input className="input" type="password" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">FATURA TİPİ*</label>
              <select className="input"><option>Temel Fatura</option></select>
            </div>
          </div>

          {/* Vergi Bilgileri */}
          <div className="font-semibold text-[16px] my-8 text-[#222]">Vergi Bilgileri</div>
          <div className="flex gap-6 mb-6">
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">VERGİ NUMARASI*</label>
              <input className="input" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">VERGİ DAİRESİ*</label>
              <input className="input" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">MERSİS NUMARASI*</label>
              <input className="input" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">SİCİL NUMARASI*</label>
              <input className="input" />
            </div>
          </div>

          {/* Fatura Bilgileri */}
          <div className="font-semibold text-[16px] my-8 text-[#222]">Fatura Bilgileri</div>
          <div className="flex gap-6 mb-4">
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">GÖNDERİCİ POSTA ADRESİ*</label>
              <input className="input" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">E-FATURA NUMARA EKİ*</label>
              <input className="input" placeholder="Üç harf, örneğin Entekas ent" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">E-ARSİV NUMARA EKİ</label>
              <input className="input" placeholder="Üç harf, örneğin Entekas ent" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">SON KESİLEN FATURA NO</label>
              <input className="input" placeholder="0" />
            </div>
          </div>
          <div className="text-[#202020] text-xs mb-4 mt-[-8px]">
            {`(Fatura ön ekleri hakkında Fatura seri numaraları oluşturulurken numaraların başına size özel 3 harf eklenmektedir. Kendi ön ekinizi 3 büyük harften oluşacak şekilde belirtmeniz gerekmektedir. 1. ön ek e-Fatura sisteminde, 2. ön ek e-Arşiv sisteminde gönderilen faturalar için kullanılacak. Entegratör değiştiriyorsanız, fatura numaranızın çakışmaması için yeni ön ekler belirleyiniz.")`}
          </div>
          <div className="flex gap-6 mb-6">
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">TELEFON*</label>
              <input className="input" placeholder="Faturada yazacak olan telefon numara" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">E-POSTA*</label>
              <input className="input" placeholder="Faturada yazacak olan E-posta adresi" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">WEB SİTESİ</label>
              <input className="input" />
            </div>
          </div>
          <div className="flex gap-6 mb-6">
            <div className="flex-1 flex flex-col">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">FATURA İMZASI</label>
              <input className="input" type="file" />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">FİRMA LOGOSU</label>
              <input className="input" type="file" />
            </div>
          </div>

          {/* Fatura Sabit Bilgileri */}
          <div className="font-semibold text-[16px] my-8 text-[#222]">Fatura Sabit Bilgileri</div>
          <div className="flex gap-6 mb-6">
            <div className="flex-[2]">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">SABİT FATURA AÇIKLAMASI</label>
              <input className="input" />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-medium mb-1 text-[#222]">ÖN TANIMLI KARGO FİRMASI*</label>
              <select className="input"><option>Kargo Şirketi Seç</option></select>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-[14px] font-medium mb-1 text-[#222]">PAZARYERLERİNDEN GELEN ARA FARK AÇIKLAMASI</label>
            <input className="input" />
          </div>

          {/* Ek Ayarlar */}
          <div className="font-semibold text-[16px] my-8 text-[#222]">Ek Ayarlar</div>
          <div className="mb-6">
            <div className="mb-2 font-semibold text-[#2d3a3a] text-[15px]">E-fatura/E-Arşiv faturalarınızda kargo kampanya kodu barkod olarak eklensin mi ?</div>
            <div className="w-2/4">
              {kampanyaKodu ? (
                <div
                  className="flex items-center justify-center w-full px-2 py-2.5 rounded-md font-semibold transition-colors duration-200 bg-[#23db8b] text-white h-[42px] cursor-pointer"
                  onClick={() => setKampanyaKodu(false)}
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
                  <span className="font-semibold">EVET</span>
                </div>
              ) : (
                <div
                  className="flex items-center justify-center w-full rounded-md transition-colors duration-200 bg-[#f3f7f9] text-[#76838f] h-[42px] cursor-pointer"
                  onClick={() => setKampanyaKodu(true)}
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
                  <span className="font-semibold">HAYIR</span>
                </div>
              )}
            </div>
          </div>
          <div className="w-2/4">
            <label className="block text-xs text-black-200 mb-1">Entegrasyon Durumu</label>
            {entegrasyonDurumu ? (
              <div
                className="flex items-center justify-center w-full px-2 py-2.5 rounded-md font-semibold transition-colors duration-200 bg-[#23db8b] text-white h-[42px] cursor-pointer"
                onClick={() => setEntegrasyonDurumu(false)}
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
                className="flex items-center justify-center w-full rounded-md transition-colors duration-200 bg-[#f3f7f9] text-[#76838f] h-[42px] cursor-pointer"
                onClick={() => setEntegrasyonDurumu(true)}
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

          <div className="flex justify-end">
            <button type="button" className="bg-[#007aff] text-white border-0 rounded-md px-11 py-[14px] font-semibold text-[17px] cursor-pointer shadow-[0_2px_8px_rgba(0,122,255,0.08)]">
              KAYDET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
