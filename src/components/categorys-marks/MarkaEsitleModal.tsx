"use client";

import React from "react";

interface MarkaEsitleModalProps {
  open: boolean;
  onClose: () => void;
  markName?: string;
}

const MarkaEsitleModal: React.FC<MarkaEsitleModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          width: 600,
          maxWidth: "90%",
        }}
      >
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e3eafc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#2a3547" }}>
            Trendyol Markasını Trendyol'daki Marka ile Eşitle
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
        <div style={{ padding: 24 }}>
          <div
            style={{
              background: "#eaf4ff",
              color: "#168cff",
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            Seçmiş olduğunuz markayı Trendyol markası ile eşitlemek için
            aşağıdaki <strong>Trendyol Marka Adı</strong> menüsünü
            kullanabilirsiniz.
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="trendyol-mark"
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 500,
                color: "#5a6a85",
              }}
            >
              Trendyol Marka Adı
            </label>
            <select
              id="trendyol-mark"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #e3eafc",
                backgroundColor: "white",
              }}
            >
              <option value="">Lütfen marka seçiniz</option>
              {/* Dummy options for demonstration */}
              <option value="marka1">Marka 1</option>
              <option value="marka2">Marka 2</option>
            </select>
          </div>
        </div>
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e3eafc",
            display: "flex",
            justifyContent: "flex-end",
            gap: 16,
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              color: "#5a6a85",
              border: "1px solid #e3eafc",
              borderRadius: 8,
              padding: "10px 20px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            VAZGEÇ
          </button>
          <button
            style={{
              background: "#168cff",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 20px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            KAYDET
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkaEsitleModal; 