"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  sales: number;
  revenue: number;
}

interface SalesStatisticsChartProps {
  data: SalesData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 text-sm">
        <p className="font-semibold text-gray-900 mb-1">{`Tarih: ${label}`}</p>
        <p className="text-gray-700">{`Sipariş Sayısı: ${payload[0].value}`}</p>
        <p className="text-gray-700">{`Ciro : ${payload[1].value} ₺`}</p>
      </div>
    );
  }
  return null;
};

export default function SalesStatisticsChart({ data }: SalesStatisticsChartProps) {
  const [tooltipData, setTooltipData] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Satış İstatistikleri</h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: '#e0e0e0' }} />
            <YAxis tickLine={false} axisLine={{ stroke: '#e0e0e0' }} domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} dot={false} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{ r: 8 }} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 