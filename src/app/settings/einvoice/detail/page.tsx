"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DigitalPlanetSettings() {
  const [kampanyaKodu, setKampanyaKodu] = useState("EVET");
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState("PASİF");

  return (
    <div style={{ background: "#f5f9ff", minHeight: "100vh", padding: 32 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>DigitalPlanet Ayarları</h2>
          <div style={{ color: "#7b7b7b", fontSize: 14 }}>
            <Link href="/" style={{ color: "#222", fontWeight: 600, textDecoration: "none" }}>Entekas</Link> / <Link href="/settings" style={{ color: "#7b7b7b", fontWeight: 500, textDecoration: "none" }}>Ayarlar</Link> / <span style={{ color: "#7b7b7b" }}>DigitalPlanet Ayarları</span>
          </div>
        </div>
        <form>
          {/* DigitalPlanet Bilgileri */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <label className="form-label">DIGITALPLANET ŞİRKET KODU*</label>
              <input className="form-input" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <label className="form-label">DIGITALPLANET KULLANICI ADI*</label>
              <input className="form-input" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <label className="form-label">DIGITALPLANET KULLANICI ŞİFRESİ*</label>
              <input className="form-input" type="password" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <label className="form-label">FATURA TİPİ*</label>
              <select className="form-input">
                <option>Temel Fatura</option>
              </select>
            </div>
          </div>

          {/* Vergi Bilgileri */}
          <div style={{ fontWeight: 600, fontSize: 18, margin: "32px 0 12px 0" }}>Vergi Bilgileri</div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">VERGİ NUMARASI*</label>
              <input className="form-input" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">VERGİ DAİRESİ*</label>
              <input className="form-input" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">MERSİS NUMARASI*</label>
              <input className="form-input" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">SİCİL NUMARASI*</label>
              <input className="form-input" placeholder="" />
            </div>
          </div>

          {/* Fatura Bilgileri */}
          <div style={{ fontWeight: 600, fontSize: 18, margin: "32px 0 12px 0" }}>Fatura Bilgileri</div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">GÖNDERİCİ POSTA ADRESİ*</label>
              <input className="form-input" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">E-FATURA NUMARA EKİ*</label>
              <input className="form-input" placeholder="Üç harf, örneğin Sopyo şrl" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">E-ARSİV NUMARA EKİ</label>
              <input className="form-input" placeholder="Üç harf, örneğin Sopyo şrl" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">SON KESİLEN FATURA NO</label>
              <input className="form-input" placeholder="0" />
            </div>
          </div>
          <div style={{ color: "#7b7b7b", fontSize: 13, marginBottom: 16 }}>
            (Fatura ön ekleri hakkında *)Fatura seri numaraları oluşturulurken numaraların başına size özel 3 harf eklenmektedir. Kendi ön ekinizi 3 büyük harften oluşacak şekilde belirtmeniz gerekmektedir. 1. ön ek e-Fatura sisteminde, 2. ön ek e-Arşiv sisteminde gönderilen faturalar için kullanılacak. Entegratör değiştiriyorsanız, fatura numaranızın çakışmaması için yeni ön ekler belirleyiniz.
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">TELEFON*</label>
              <input className="form-input" placeholder="Faturada yazacak olan telefon numara" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">E-POSTA*</label>
              <input className="form-input" placeholder="Faturada yazacak olan E-posta adresi" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">WEB SİTESİ</label>
              <input className="form-input" placeholder="" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">FATURA İMZASI</label>
              <input className="form-input" type="file" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">FİRMA LOGOSU</label>
              <input className="form-input" type="file" />
            </div>
          </div>

          {/* Fatura Sabit Bilgileri */}
          <div style={{ fontWeight: 600, fontSize: 18, margin: "32px 0 12px 0" }}>Fatura Sabit Bilgileri</div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{ flex: 2, minWidth: 200 }}>
              <label className="form-label">SABİT FATURA AÇIKLAMASI</label>
              <input className="form-input" placeholder="" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">ÖN TANIMLI KARGO FİRMASI*</label>
              <select className="form-input">
                <option>Kargo Şirketi Seç</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label className="form-label">PAZARYERLERİNDEN GELEN ARA FARK AÇIKLAMASI</label>
            <input className="form-input" placeholder="" />
          </div>

          {/* Ek Ayarlar */}
          <div style={{ fontWeight: 600, fontSize: 18, margin: "32px 0 12px 0" }}>Ek Ayarlar</div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 8, fontWeight: 500, color: '#2d3a3a' }}>
              E-fatura/E-Arşiv faturalarınızda kargo kampanya kodu barkod olarak eklensin mi ?
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              <button
                type="button"
                onClick={() => setKampanyaKodu("EVET")}
                style={{
                  flex: 1,
                  background: kampanyaKodu === "EVET" ? "#2ecc71" : "#f5f7fa",
                  color: kampanyaKodu === "EVET" ? "#fff" : "#7b7b7b",
                  border: "none",
                  borderRadius: kampanyaKodu === "EVET" ? "8px 0 0 8px" : "8px 0 0 8px",
                  padding: "18px 0",
                  fontSize: 22,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                EVET
              </button>
              <button
                type="button"
                onClick={() => setKampanyaKodu("HAYIR")}
                style={{
                  flex: 1,
                  background: kampanyaKodu === "HAYIR" ? "#ff4d4f" : "#f5f7fa",
                  color: kampanyaKodu === "HAYIR" ? "#fff" : "#7b7b7b",
                  border: "none",
                  borderRadius: kampanyaKodu === "HAYIR" ? "0 8px 8px 0" : "0 8px 8px 0",
                  padding: "18px 0",
                  fontSize: 22,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                HAYIR
              </button>
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ marginBottom: 8, fontWeight: 500, color: '#2d3a3a' }}>Entegrasyon Durumu</div>
            <div style={{ display: "flex", gap: 0 }}>
              <button
                type="button"
                onClick={() => setEntegrasyonDurumu("AKTİF")}
                style={{
                  flex: 1,
                  background: entegrasyonDurumu === "AKTİF" ? "#589ffc" : "#f5f7fa",
                  color: entegrasyonDurumu === "AKTİF" ? "#fff" : "#7b7b7b",
                  border: "none",
                  borderRadius: entegrasyonDurumu === "AKTİF" ? "8px 0 0 8px" : "8px 0 0 8px",
                  padding: "18px 0",
                  fontSize: 22,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                AKTİF
              </button>
              <button
                type="button"
                onClick={() => setEntegrasyonDurumu("PASİF")}
                style={{
                  flex: 1,
                  background: entegrasyonDurumu === "PASİF" ? "#589ffc" : "#f5f7fa",
                  color: entegrasyonDurumu === "PASİF" ? "#fff" : "#7b7b7b",
                  border: "none",
                  borderRadius: entegrasyonDurumu === "PASİF" ? "0 8px 8px 0" : "0 8px 8px 0",
                  padding: "18px 0",
                  fontSize: 22,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                PASİF
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" style={{ background: "#007aff", color: "#fff", border: 0, borderRadius: 6, padding: "12px 32px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
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
      `}</style>
    </div>
  );
}
