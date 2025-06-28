import React, { useState } from "react";
import Image from "next/image";

interface YeniKategoriEkleModalProps {
  open: boolean;
  onClose: () => void;
}

const modalBg = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(44, 62, 80, 0.4)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  background: '#fff',
  borderRadius: 10,
  width: 540,
  maxWidth: '95vw',
  boxShadow: '0 8px 32px #0002',
  padding: 0,
  position: 'relative' as const,
  overflow: 'hidden',
};

export default function YeniKategoriEkleModal({ open, onClose }: YeniKategoriEkleModalProps) {
  const [kategoriAdi, setKategoriAdi] = useState("");

  if (!open) return null;

  return (
    <div style={modalBg}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ width: '100%', position: 'relative', marginBottom: 24 }}>
          <Image src="/kategoriEkle.svg" alt="Kategori" style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 140, objectFit: 'contain' }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: 6,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 20,
              color: '#e60023',
              zIndex: 2,
              boxShadow: '0 2px 8px #0001',
            }}
            aria-label="Kapat"
          >
            ×
          </button>
        </div>
        {/* Form */}
        <form style={{ padding: '32px', paddingTop: 16 }}>
          <div style={{ fontWeight: 600, color: '#5a6a85', fontSize: 15, marginBottom: 8 }}>KATEGORİ ADI</div>
          <input
            type="text"
            placeholder="Kategori adı"
            value={kategoriAdi}
            onChange={e => setKategoriAdi(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 8,
              border: '1px solid #e3eafc',
              fontSize: 16,
              marginBottom: 32,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={!kategoriAdi.trim()}
              style={{
                background: kategoriAdi.trim() ? '#22c55e' : '#6ee7b7',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 8,
                padding: '12px 36px',
                cursor: kategoriAdi.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: kategoriAdi.trim() ? 1 : 0.7,
                transition: 'background 0.2s',
              }}
            >
              ✓ KAYDET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 