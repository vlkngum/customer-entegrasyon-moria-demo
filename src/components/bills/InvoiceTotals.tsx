import React from "react";

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
  return (
    <div className="panel">
      <h3 className="font-semibold mb-2 text-xl">Genel Toplamlar</h3>
      <div className="flex justify-between text-base mb-1">
        <span>Ara Toplam</span>
        <span>{araToplam.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</span>
      </div>
      <div className="flex justify-between text-base mb-1">
        <span>Toplam KDV</span>
        <span>{toplamKdv.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</span>
      </div>
      <div className="flex justify-between text-base font-bold">
        <span>Toplam</span>
        <span>{toplam.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}</span>
      </div>
    </div>
  );
};

export default InvoiceTotals; 