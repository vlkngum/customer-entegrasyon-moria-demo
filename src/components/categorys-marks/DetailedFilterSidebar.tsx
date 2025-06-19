import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DetailedFilterSidebar: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 480,
        height: "100vh",
        background: "#fff",
        boxShadow: "-2px 0 16px #0001",
        zIndex: 1000,
        transition: "transform 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 32, borderBottom: "1px solid #e3eafc", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 26, color: "#333" }}>FİLTRELER</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#168cff",
            fontWeight: 700,
          }}
          aria-label="Kapat"
        >
          ×
        </button>
      </div>
      <div style={{ flex: 1, padding: 32 }}>
        <div style={{ marginBottom: 24, fontWeight: 600, fontSize: 18, color: "#222", display: 'flex', alignItems: 'center' }}>
          <span style={{ background: '#eaf4ff', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            <MdKeyboardArrowRight style={{ color: '#168cff', width: 16, height: 16 }} />
          </span>
          Kategori Eşitleme Durumu
        </div>
        <div style={{ marginBottom: 24, fontWeight: 600, fontSize: 18, color: "#222", display: 'flex', alignItems: 'center' }}>
          <span style={{ background: '#eaf4ff', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            <MdKeyboardArrowRight style={{ color: '#168cff', width: 16, height: 16 }} />
          </span>
          Seçenek Eşitleme Durumu
        </div>
        <div style={{ marginBottom: 24, fontWeight: 600, fontSize: 18, color: "#222", display: 'flex', alignItems: 'center' }}>
          <span style={{ background: '#eaf4ff', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            <MdKeyboardArrowRight style={{ color: '#168cff', width: 16, height: 16 }} />
          </span>
          Diğer Filtreler
        </div>
      </div>
      <div style={{ padding: 32, borderTop: "1px solid #e3eafc" }}>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            background: "#f5f9ff",
            color: "#168cff",
            border: "2px solid #168cff",
            borderRadius: 12,
            padding: "14px 0",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          VAZGEÇ
        </button>
      </div>
    </div>
  );
};

export default DetailedFilterSidebar; 