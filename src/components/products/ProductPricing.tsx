import React from 'react';

export default function ProductPricing() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Channel icons */}
      <div className="flex gap-2 mb-4">
        {/* Placeholder icons */}
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">A</div>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">H</div>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">T</div>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">G</div>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">N</div>
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">P</div>
      </div>
      <div className="text-xs text-gray-500 mb-4">Ürünü satışa çıkarmak için ilk olarak ÜRÜNÜ KAYDEDİN.</div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block text-xs text-gray-500 mb-1">KDV ORANI</label>
          <select className="w-full border rounded px-3 py-2 text-sm bg-gray-50">
            <option>% 20</option>
            <option>% 18</option>
            <option>% 10</option>
            <option>% 8</option>
            <option>% 1</option>
            <option>% 0</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">ALIŞ FİYATI</label>
          <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">PİYASA(LİSTE) FİYATI</label>
          <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">SATIŞ FİYATI *</label>
          <input className="w-full border rounded px-3 py-2 text-sm" placeholder="" />
        </div>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" className="mr-2" id="channelPricing" />
        <label htmlFor="channelPricing" className="text-xs text-gray-500">KANAL BAZLI FİYATLANDIRMA</label>
      </div>
    </div>
  );
} 