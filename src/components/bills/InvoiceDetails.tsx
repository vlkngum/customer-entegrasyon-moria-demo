import React from "react";

interface InvoiceDetailsProps {
  satisTipi: "internetten" | "normal";
  setSatisTipi: (type: "internetten" | "normal") => void;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  satisTipi,
  setSatisTipi,
}) => {
  return (
    <div className="panel">
      <label className="block text-xs font-semibold mb-1 text-[#707376]">FATURA DÜZENLEME TARİHİ <span className="text-red-500">*</span></label>
      <input type="datetime-local" className="input mb-4 text-[#76838f]" defaultValue="2025-06-28T17:00" />

      <label className="block text-xs font-semibold mb-1 text-[#707376]">SİPARİŞ NO <span className="text-red-500">*</span></label>
      <input type="text" className="input mb-4 text-[#76838f]" defaultValue="454171UWUOCIZUL0J45417" />

      <div className="flex items-center space-x-8 mt-2 mb-4">
        <label className="font-extrabold text-base tracking-wide flex items-center">
          <input
            type="radio"
            name="satisTipi"
            checked={satisTipi === "internetten"}
            onChange={() => setSatisTipi("internetten")}
            className="mr-2 accent-blue-600 "
          />
          <span className="select-none text-sm text-[#616468]">İNTERNETTEN SATIŞ</span>
        </label>
        <label className="font-extrabold text-base tracking-wide flex items-center">
          <input
            type="radio"
            name="satisTipi"
            checked={satisTipi === "normal"}
            onChange={() => setSatisTipi("normal")}
            className="mr-2 accent-blue-600"
          />
          <span className="select-none text-sm text-[#616468]">NORMAL SATIŞ</span>
        </label>
      </div>

      {satisTipi === "internetten" && (
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1 text-[#686b6f]">KARGO ŞİRKETİ <span className="text-red-500">*</span></label>
            <select className="input" style={{ color: '#76838f' }}>
              <option>Kargo Şirketi Seç</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1 text-[#686b6f]">KARGO KAMPANYA KODU</label>
            <input type="text" className="input" style={{ color: '#76838f' }} />
          </div>
        </div>
      )}

      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1 text-[#616468]">FATURA KAYNAĞI</label>
          <select className="input" style={{ color: '#76838f' }}>
            <option>Entekas</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1 text-[#616468]">ÖDEME YÖNTEMİ</label>
          <select className="input" style={{ color: '#76838f' }}>
            <option>Kredi Kartı</option>
          </select>
        </div>
      </div>

      <label className="block text-xs font-semibold mb-1 text-[#616468]">FATURA AÇIKLAMASI</label>
      <textarea className="input" style={{ color: '#76838f' }} rows={3} placeholder="Fatura açıklaması giriniz." />
    </div>
  );
};

export default InvoiceDetails;