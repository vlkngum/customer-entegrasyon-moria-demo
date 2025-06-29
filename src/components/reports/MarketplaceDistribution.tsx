"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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

const exampleData = [
  { name: "Amazon", value: 400 },
  { name: "N11", value: 300 },
  { name: "Hepsiburada", value: 300 },
  { name: "AnkaEticaret", value: 200 },
  { name: "Akakçe", value: 278 },
  { name: "Trendyol", value: 189 },
  { name: "Çiçeksepeti", value: 239 },
  { name: "PttAVM", value: 100 },
  { name: "Pazarama", value: 80 },
  { name: "İdefix", value: 50 },
];

const COLORS = [
  "#2874f0", // Akakçe
  "#e53e3e", // N11
  "#f59e0b", // Hepsiburada
  "#6f42c1", // AnkaEticaret
  "#48bb78", // Çiçeksepeti
  "#1a202c", // Trendyol
  "#00b2b2", // PttAVM
  "#0033cc", // Pazarama
  "#ec4899", // İdefix
  "#82ca9d", // Amazon
];

const MarketplaceDistribution = () => {
  const [activeMarkets, setActiveMarkets] = useState<string[]>(exampleData.map(m => m.name));

  // Sadece aktif olanları filtrele
  const filteredData = exampleData.filter(m => activeMarkets.includes(m.name));
  const total = filteredData.reduce((sum, m) => sum + m.value, 0);

  // Legend tıklama
  const handleLegendClick = (name: string) => {
    setActiveMarkets(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm w-full h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Haziran Ayı Pazaryeri Satış Dağılımı</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={({ name, value }) => {
              if (!total) return '';
              const percent = (value / total) * 100;
              return `${name} ${percent.toFixed(0)}%`;
            }}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[exampleData.findIndex(m => m.name === entry.name) % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} satış`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-6">
        {exampleData.map((market, idx) => {
          const isActive = activeMarkets.includes(market.name);
          return (
            <button
              key={market.name}
              type="button"
              onClick={() => handleLegendClick(market.name)}
              className="flex items-center space-x-2 group focus:outline-none"
            >
              <span
                className="w-4 h-4 rounded-full"
                style={{ background: COLORS[idx % COLORS.length], opacity: isActive ? 1 : 0.3 }}
              ></span>
              <span
                className={`text-sm ${isActive ? "text-gray-600" : "text-gray-400 line-through"}`}
              >
                {market.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MarketplaceDistribution; 