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
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <label className="block text-sm font-medium">Fatura Düzenleme Tarihi</label>
      <input type="datetime-local" className="w-full border rounded px-2 py-1" />

      <label className="block text-sm font-medium">Sipariş No</label>
      <input type="text" className="w-full border rounded px-2 py-1" />

      <div className="flex items-center space-x-4 mt-2">
        <label className="font-semibold">
          <input
            type="radio"
            name="satisTipi"
            checked={satisTipi === "internetten"}
            onChange={() => setSatisTipi("internetten")}
            className="mr-1"
          />
          İNTERNETTEN SATIŞ
        </label>
        <label className="font-semibold">
          <input
            type="radio"
            name="satisTipi"
            checked={satisTipi === "normal"}
            onChange={() => setSatisTipi("normal")}
            className="mr-1"
          />
          NORMAL SATIŞ
        </label>
      </div>

      {satisTipi === "internetten" && (
        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Kargo Şirketi</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Kargo Şirketi Seç</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Kargo Kampanya Kodu</label>
            <input type="text" className="w-full border rounded px-2 py-1" />
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-sm font-medium">Fatura Kaynağı</label>
          <select className="w-full border rounded px-2 py-1">
            <option>CMApps</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Ödeme Yöntemi</label>
          <select className="w-full border rounded px-2 py-1">
            <option>Kredi Kartı</option>
          </select>
        </div>
      </div>

      <label className="block text-sm font-medium">Fatura Açıklaması</label>
      <textarea className="w-full border rounded px-2 py-1" rows={3} placeholder="Fatura açıklaması giriniz." />
    </div>
  );
};

export default InvoiceDetails; 