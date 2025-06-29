"use client";

import React, { useState } from "react";

export default function DigitalPlanetSettings() {
  const [kampanyaKodu, setKampanyaKodu] = useState(true);
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState(true);

  return (
    <div style={{ background: "#f1f6fd", minHeight: "100vh", padding: "40px 0"}}>
      {/* Başlık ve breadcrumb alanı form kutusunun dışında ve en sola yaslı */}
      <div style={{ width: 900, maxWidth: '100%', marginBottom: 48, paddingLeft: 56 }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#3a3a3a", marginBottom: 4, fontFamily: 'inherit' }}>DigitalPlanet Ayarları</div>
        <div style={{ fontSize: 17, fontWeight: 400, color: "#222", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: "#222", fontWeight: 600 }}>Entekas</span>
          <span style={{ color: "#b0b8c1", fontWeight: 400 }}>/</span>
          <span style={{ color: "#222", fontWeight: 400 }}>Ayarlar</span>
          <span style={{ color: "#b0b8c1", fontWeight: 400 }}>/</span>
          <span style={{ color: "#b0b8c1", fontWeight: 400 }}>DigitalPlanet Ayarları</span>
        </div>
      </div>
      <div style={{ width: 900, maxWidth: '100%', background: "#fff", borderRadius: 12, padding: 40, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", position: "relative", marginLeft: 56 }}>
        <form autoComplete="off">
          {/* DigitalPlanet Bilgileri */}
          <div style={{ display: "flex", gap: 24, marginBottom: 0 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">DIGITALPLANET ŞİRKET KODU*</label>
              <input className="input" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">DIGITALPLANET KULLANICI ADI*</label>
              <input className="input" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginBottom: 24, marginTop: 24 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">DIGITALPLANET KULLANICI ŞİFRESİ*</label>
              <input className="input" type="password" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">FATURA TİPİ*</label>
              <select className="input"><option>Temel Fatura</option></select>
            </div>
          </div>

          {/* Vergi Bilgileri */}
          <div className="section-title">Vergi Bilgileri</div>
          <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">VERGİ NUMARASI*</label>
              <input className="input" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">VERGİ DAİRESİ*</label>
              <input className="input" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">MERSİS NUMARASI*</label>
              <input className="input" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">SİCİL NUMARASI*</label>
              <input className="input" />
            </div>
          </div>

          {/* Fatura Bilgileri */}
          <div className="section-title">Fatura Bilgileri</div>
          <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">GÖNDERİCİ POSTA ADRESİ*</label>
              <input className="input" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">E-FATURA NUMARA EKİ*</label>
              <input className="input" placeholder="Üç harf, örneğin Sopyo şrl" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">E-ARSİV NUMARA EKİ</label>
              <input className="input" placeholder="Üç harf, örneğin Sopyo şrl" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">SON KESİLEN FATURA NO</label>
              <input className="input" placeholder="0" />
            </div>
          </div>
          <div style={{ color: "#8b98a9", fontSize: 12, marginBottom: 16, marginTop: -8 }}>
            (Fatura ön ekleri hakkında "Fatura seri numaraları oluşturulurken numaraların başına size özel 3 harf eklenmektedir. Kendi ön ekinizi 3 büyük harften oluşacak şekilde belirtmeniz gerekmektedir. 1. ön ek e-Fatura sisteminde, 2. ön ek e-Arşiv sisteminde gönderilen faturalar için kullanılacak. Entegratör değiştiriyorsanız, fatura numaranızın çakışmaması için yeni ön ekler belirleyiniz.")
          </div>
          <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">TELEFON*</label>
              <input className="input" placeholder="Faturada yazacak olan telefon numara" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">E-POSTA*</label>
              <input className="input" placeholder="Faturada yazacak olan E-posta adresi" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">WEB SİTESİ</label>
              <input className="input" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <label className="form-label">FATURA İMZASI</label>
              <input className="input" type="file" style={{ padding: 8, background: "#fff" }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <label className="form-label">FİRMA LOGOSU</label>
              <input className="input" type="file" style={{ padding: 8, background: "#fff" }} />
            </div>
          </div>

          {/* Fatura Sabit Bilgileri */}
          <div className="section-title">Fatura Sabit Bilgileri</div>
          <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 2 }}>
              <label className="form-label">SABİT FATURA AÇIKLAMASI</label>
              <input className="input" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">ÖN TANIMLI KARGO FİRMASI*</label>
              <select className="input"><option>Kargo Şirketi Seç</option></select>
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label className="form-label">PAZARYERLERİNDEN GELEN ARA FARK AÇIKLAMASI</label>
            <input className="input" />
          </div>

          {/* Ek Ayarlar */}
          <div className="section-title">Ek Ayarlar</div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 8, fontWeight: 500, color: '#2d3a3a', fontSize: 15 }}>
            E-fatura/E-Arşiv faturalarınızda kargo kampanya kodu barkod olarak eklensin mi ?
            </div>
            <div className='w-2/4'>
            {kampanyaKodu ? (
              <div
                className="flex items-center justify-center w-full px-2 py-2.5 rounded-md font-semibold transition-colors duration-200"
                style={{ background: "#23db8b", color: "#fff", height: 42, cursor: "pointer" }}
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
                className="flex items-center justify-center w-full rounded-md transition-colors duration-200"
                style={{ background: "#f3f7f9", color: "#76838f", height: 42, cursor: "pointer" }}
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
          <div className='w-2/4'>
            <label className="block text-xs text-black-200 mb-1">Entegrasyon Durumu</label>
            {entegrasyonDurumu ? (
              <div
                className="flex items-center justify-center w-full px-2 py-2.5 rounded-md font-semibold transition-colors duration-200"
                style={{ background: "#23db8b", color: "#fff", height: 42, cursor: "pointer" }}
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
                className="flex items-center justify-center w-full rounded-md transition-colors duration-200"
                style={{ background: "#f3f7f9", color: "#76838f", height: 42, cursor: "pointer" }}
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

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" style={{ background: "#007aff", color: "#fff", border: 0, borderRadius: 6, padding: "14px 44px", fontWeight: 600, fontSize: 17, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,122,255,0.08)" }}>
              KAYDET
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          color: #222;
        }
        .form-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px;
          background: #f9fafb;
          margin-bottom: 0;
        }
        input[type="file"] {
          background: #fff;
          padding: 0;
        }
        .section-title {
          font-weight: 600;
          font-size: 16px;
          margin: 32px 0 12px 0;
          color: #222;
        }
      `}</style>
    </div>
  );
}
