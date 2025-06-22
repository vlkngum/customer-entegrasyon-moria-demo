"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const chartData = [
  {
    name: "Haziran 2025",
    AnkaEticaret: 0.0,
    Akakce: 0.0,
    Amazon: 0.0,
    N11: 0.0,
    Hepsiburada: 0.0,
    Trendyol: 0.0,
    Ciceksepeti: 0.0,
    PttAVM: 0.0,
    Pazarama: 0.0,
    Idefix: 0.0,
  },
];

const platforms = [
  { dataKey: "AnkaEticaret", name: "AnkaEticaret", color: "#6f42c1" },
  { dataKey: "Akakce", name: "Akakçe", color: "#2874f0" },
  { dataKey: "Amazon", name: "Amazon", color: "#82ca9d" },
  { dataKey: "N11", name: "N11", color: "#e53e3e" },
  { dataKey: "Hepsiburada", name: "Hepsiburada", color: "#f59e0b" },
  { dataKey: "Trendyol", name: "Trendyol", color: "#1a202c" },
  { dataKey: "Ciceksepeti", name: "Çiçeksepeti", color: "#48bb78" },
  { dataKey: "PttAVM", name: "PttAVM", color: "#00b2b2" },
  { dataKey: "Pazarama", name: "Pazarama", color: "#0033cc" },
  { dataKey: "Idefix", name: "İdefix", color: "#ec4899" },
];

const tableData = [
  {
    tarih: "01.06.2025",
    ankaEticaret: "100.00 TL",
    akakce: "150.00 TL",
    amazon: "200.00 TL",
    n11: "250.00 TL",
    hepsiburada: "300.00 TL",
    trendyol: "350.00 TL",
    ciceksepeti: "400.00 TL",
    pttavm: "450.00 TL",
    pazarama: "500.00 TL",
    toplam: "2700.00 TL",
  },
];

const tableHeaders = [
  "Tarih",
  "AnkaEticaret",
  "Akakçe",
  "Amazon",
  "N11",
  "Hepsiburada",
  "Trendyol",
  "Çiçeksepeti",
  "PttAVM",
  "Pazarama",
  "Toplam",
];

const SalesChart = () => {
  const [viewType, setViewType] = useState("Grafiksel");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="font-semibold text-gray-700">Bu ay ki</span>
        <select className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
          <option>Aylık</option>
        </select>
        <span className="font-semibold text-gray-700">Bazda Ciro</span>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
        >
          <option value="Grafiksel">Grafiksel</option>
          <option value="Sayısal">Sayısal</option>
        </select>
        <span className="font-semibold text-gray-700">istatistiği</span>
      </div>

      {viewType === "Grafiksel" ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[-1.0, 1.0]} />
            <Tooltip />
            <Legend />
            {platforms.map((platform) => (
              <Line
                key={platform.dataKey}
                type="monotone"
                dataKey={platform.dataKey}
                name={platform.name}
                stroke={platform.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100 border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.tarih}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.ankaEticaret}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.akakce}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.amazon}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.n11}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.hepsiburada}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.trendyol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.ciceksepeti}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.pttavm}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.pazarama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {row.toplam}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesChart; 