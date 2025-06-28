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
      <label className="block text-sm font-medium">Fatura Düzenleme Tarihi</label>
      <input type="datetime-local" className="input" />

      <label className="block text-sm font-medium">Sipariş No</label>
      <input type="text" className="input" />

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
            <select className="input">
              <option>Kargo Şirketi Seç</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Kargo Kampanya Kodu</label>
            <input type="text" className="input" />
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-sm font-medium">Fatura Kaynağı</label>
          <select className="input">
            <option>Entekas</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Ödeme Yöntemi</label>
          <select className="input">
            <option>Kredi Kartı</option>
          </select>
        </div>
      </div>

      <label className="block text-sm font-medium">Fatura Açıklaması</label>
      <textarea className="input" rows={3} placeholder="Fatura açıklaması giriniz." />
    </div>
  );
};

export default InvoiceDetails;