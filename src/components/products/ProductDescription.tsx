import React from 'react';

export default function ProductDescription() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <label className="block text-xs text-gray-500 mb-2">ÜRÜN AÇIKLAMASI</label>
      <textarea 
        className="w-full border rounded min-h-[180px] p-2 text-sm" 
        placeholder="Ürün açıklamasını buraya giriniz..."
      />
    </div>
  );
} 