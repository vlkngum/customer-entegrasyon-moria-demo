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
    <div className={`flex items-center justify-between px-4 py-3 border-b last:border-b-0 ${bold ? "font-semibold text-lg" : "text-sm text-[#5d6e76]"}`}>
      <span className={bold ? "uppercase tracking-wide text-[#5d6e76]" : "uppercase tracking-wide text-[#5d6e76] font-bold"}>{label}</span>
      <span className="flex items-center gap-1 text-[#5d6e76]">
        <Image src="/iconTl.svg" alt="TL" width={18} height={18} className="inline-block" />
        <span className={bold ? "text-[#23272e] font-semibold text-xl" : "text-[#23272e] font-medium text-lg"}>
          {value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow border border-[#e6edf5] p-0 overflow-hidden w-full max-w-xs min-w-[300px]">
      <div className="px-4 pt-4 pb-2">
        <h3 className="font-semibold text-lg text-[#23272e]">GENEL TOPLAMALAR</h3>
      </div>
      <div className="border-t border-[#e6edf5]" />
      {renderRow("ARA TOPLAM", araToplam)}
      {renderRow("TOPLAM KDV", toplamKdv)}
      {renderRow("TOPLAM", toplam, true)}
    </div>
  );
};

export default InvoiceTotals; 