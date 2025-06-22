"use client";

import React, { useState } from "react";

const marketplaces = [
  { name: "Amazon", color: "bg-blue-500" },
  { name: "N11", color: "bg-red-500" },
  { name: "Hepsiburada", color: "bg-yellow-500" },
  { name: "AnkaEticaret", color: "bg-purple-600" },
  { name: "Akakçe", color: "bg-blue-400" },
  { name: "Trendyol", color: "bg-black" },
  { name: "Çiçeksepeti", color: "bg-green-500" },
  { name: "PttAVM", color: "bg-cyan-500" },
  { name: "Pazarama", color: "bg-blue-700" },
  { name: "İdefix", color: "bg-pink-500" },
];

const LegendItem = ({ color, name }: { color: string; name: string }) => {
  const [isStriked, setIsStriked] = useState(false);

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => setIsStriked(!isStriked)}
    >
      <span className={`w-6 h-3 ${color}`}></span>
      <span
        className={`text-sm text-gray-600 ${isStriked ? "line-through" : ""}`}
      >
        {name}
      </span>
    </div>
  );
};

const DistributionCard = ({ title }: { title: string }) => (
  <div className="bg-white p-8 rounded-lg shadow-sm flex-1">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="grid grid-cols-5 gap-x-4 gap-y-2">
      {marketplaces.map((market) => (
        <LegendItem key={market.name} color={market.color} name={market.name} />
      ))}
    </div>
  </div>
);

const MarketplaceDistribution = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <DistributionCard title="Bu ay ki Pazaryeri Ciro Dağılımı" />
      <DistributionCard title="Bu ay ki Pazaryeri Sipariş Sayısı Dağılımı" />
    </div>
  );
};

export default MarketplaceDistribution; 