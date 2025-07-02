import React from "react";
import Image from "next/image";

interface InvoiceTotalsProps {
  araToplam: number;
  toplamKdv: number;
  toplam: number;
}

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({
  araToplam,
  toplamKdv,
  toplam,
}) => {
  // Helper to render a row
  const renderRow = (label: string, value: number, bold = false) => (
    <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 last:border-b-0 ${bold ? "font-medium text-lg" : "text-sm text-gray-500"}`}>
      <span className={bold ? "uppercase tracking-wide text-gray-500" : "uppercase tracking-wide text-gray-500 font-medium"}>{label}</span>
      <span className="flex items-center gap-1 text-gray-500">
        <Image src="/iconTl.svg" alt="TL" width={18} height={18} className="inline-block" />
        <span className={bold ? "text-[#23272e] font-medium text-xl" : "text-[#23272e] font-medium text-lg"}>
          {value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow border-2 border-gray-200 p-0 overflow-hidden w-full max-w-md min-w-[300px]">
      <div className="px-4 py-6 ">
        <h3 className="font-meidum text-[#23272e]">GENEL TOPLAMALAR</h3>
      </div>
      <div className="border-t-2 border-gray-200" />
      {renderRow("ARA TOPLAM", araToplam)}
      {renderRow("TOPLAM KDV", toplamKdv)}
      {renderRow("TOPLAM", toplam, true)}
    </div>
  );
};

export default InvoiceTotals; 