"use client";

import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const platforms = [
  { name: "N11 KATEGORİSİ SEÇ", value: "n11" },
  { name: "TRENDYOL KATEGORİSİ", value: "trendyol" },
  { name: "PTTAVM KATEGORİSİ", value: "pttavm" },
  { name: "HEPSİBURADA KATEGORİSİ SEÇ", value: "hepsiburada" },
  { name: "ÇİÇEKSEPETİ KATEGORİSİ", value: "ciceksepeti" },
  { name: "İDEFİX KATEGORİSİ", value: "idefix" },
  { name: "PAZARAMA KATEGORİSİ", value: "pazarama" },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategorySyncTable = ({ categoryName, onClose }: { categoryName: string, onClose: () => void }) => {
  return (
    <div style={{ borderRadius: 10, margin: "12px 0", overflow: "hidden", boxShadow: "0 1px 4px #e3eafc33" }}>
      <div style={{ background: "#eaf4ff", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ color: "#168cff", fontWeight: 700, fontSize: 16, margin: 0 }}>KATEGORİ EŞİTLEME TABLOSU</h3>
        <button onClick={onClose} style={{ background: "#ffeaea", color: "#ff3b3b", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "bold" }}>
          X
        </button>
      </div>
      <div style={{ background: "#fff", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid #e3eafc" }}>
        {platforms.map((platform, index) => (
          <div key={platform.value} style={{ padding: '24px', borderRight: (index + 1) % 3 !== 0 ? '1px solid #e3eafc' : 'none', borderBottom: index < platforms.length - 3 ? '1px solid #e3eafc' : 'none' }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: "#5a6a85", fontWeight: 600, fontSize: 13 }}>
              <span style={{
                background: '#ff3b3b',
                color: '#fff',
                borderRadius: '50%',
                width: 16,
                height: 16,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                lineHeight: '1',
              }}>-</span>
              <span style={{flex: 1}}>{platform.name}</span>
              <MdKeyboardArrowRight style={{ color: '#168cff' }} />
            </label>
            <select style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #e3eafc", background: '#fff' }}>
              <option>Lütfen kategori seçiniz</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySyncTable; 