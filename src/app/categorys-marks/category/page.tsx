"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowRight, MdSync } from "react-icons/md";
import DetailedFilterSidebar from "../../../components/categorys-marks/DetailedFilterSidebar";

const categories = [
  {
    id: 1,
    name: "Deneme 2",
    source: "CMApps",
  },
  {
    id: 2,
    name: "Deneme Kategorisi",
    source: "CMApps",
  },
];

export default function CategoryPage() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div style={{ background: '#f5f9ff', minHeight: '100vh', padding: 20 }}>
      {/* Filtreleme ve arama alanı */}
      <div style={{ background: '#fff', borderRadius: 10, padding: 34, marginBottom: 24 }}>
        <div style={{ marginBottom: 8, fontWeight: 700, fontSize: 15, color: '#5a6a85', letterSpacing: 0.5 }}>
          KATEGORİ ARAMA
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            type="text"
            placeholder="Kategori adı ile ara..."
            style={{ width: 350, maxWidth: '100%', padding: 12, borderRadius: 8, border: '1px solid #e3eafc' }}
          />
          <button style={{ background: '#168cff', color: '#fff', padding: '12px 32px', borderRadius: 8, border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaSearch /> FİLTRELE
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 24 }}>
            <button style={{ background: 'none', border: 'none', color: '#222', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ background: '#eaf4ff', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MdKeyboardArrowRight style={{ color: '#168cff', width: 16, height: 16 }} />
              </span>
              Toplu İşlemler
            </button>
            <button style={{ background: 'none', border: 'none', color: '#222', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => setFilterOpen(true)}>
              <span style={{ background: '#eaf4ff', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MdKeyboardArrowRight style={{ color: '#168cff', width: 16, height: 16 }} />
              </span>
              Detaylı Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* Tablo başlıkları */}
      <div style={{ display: 'flex', alignItems: 'center', background: '#f5f9ff', padding: '8px 16px', fontWeight: 600, color: '#5a6a85' }}>
        <input type="checkbox" style={{ marginRight: 16 }} />
        <div style={{ flex: 2 }}>KATEGORİ ADI</div>
        <div style={{ flex: 2 }}>EŞİTLEME DURUMLARI</div>
        <div style={{ flex: 1, textAlign: 'right' }}>İŞLEMLER</div>
      </div>

      {/* Kategori listesi */}
      {categories.map((cat) => (
        <div key={cat.id} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 10, margin: '12px 0', padding: '16px 16px', boxShadow: '0 1px 4px #e3eafc33', position: 'relative' }}>
          <input type="checkbox" style={{ marginRight: 16 }} />
          <div style={{ flex: 2 }}>
            <span style={{ background: '#eaf4ff', borderRadius: '50%', padding: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
              <MdKeyboardArrowRight style={{ color: '#168cff', width: 16, height: 16 }} />
            </span>
            <span style={{ fontWeight: 700, fontSize: 18 }}>{cat.name}</span>
            <div style={{ fontSize: 13, color: '#5a6a85', marginTop: 4 }}>
              Kaynak: <span style={{ fontWeight: 700 }}>{cat.source}</span>
            </div>
          </div>
          <div style={{ flex: 2, display: 'flex', gap: 12 }}>
            <button style={{ background: '#fff4f0', color: '#ff6a3a', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ background: '#ff6a3a', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MdSync style={{ color: '#fff', width: 15, height: 15 }} />
              </span>
              KATEGORİ EŞİTLE
            </button>
            <button style={{ background: '#fff4f0', color: '#ff6a3a', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ background: '#ff6a3a', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MdSync style={{ color: '#fff', width: 15, height: 15 }} />
              </span>
              SEÇENEK EŞİTLE
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button style={{ background: '#ffeaea', color: '#ff3b3b', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ background: '#e60023', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/delete-icon.png" alt="Sil" style={{ width: 15, height: 15, display: 'block' }} />
              </span>
              SİL
            </button>
            <button
              style={{ background: '#f5f9ff', border: 'none', borderRadius: 8, padding: '8px 12px', fontWeight: 600, color: '#5a6a85', position: 'relative', cursor: 'pointer' }}
              onClick={() => setOpenDropdown(openDropdown === cat.id ? null : cat.id)}
            >
              <span role="img" aria-label="more">⋯</span>
            </button>
            {openDropdown === cat.id && (
              <div
                style={{
                  position: 'absolute',
                  top: 56,
                  right: 0,
                  background: '#168cff',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px #168cff33',
                  minWidth: 160,
                  zIndex: 10,
                  padding: '8px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    textAlign: 'left',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                  onMouseDown={e => e.preventDefault()}
                >
                  Düzenle
                </button>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 16px' }} />
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    textAlign: 'left',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                  onMouseDown={e => e.preventDefault()}
                >
                  Pasife Al
                </button>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 16px' }} />
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    textAlign: 'left',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                  onMouseDown={e => e.preventDefault()}
                >
                  Kopyala
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <DetailedFilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
