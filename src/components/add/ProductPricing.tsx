import React, { useState } from 'react';
import ChannelPricing from './ChannelPricing';
import Image from 'next/image';

const platforms = [
  { name: 'Amazon', logo: '/gg-ico.png' },
  { name: 'Hepsiburada', logo: '/hb-ico.png' },
  { name: 'Uğur Böceği', logo: '/n11-ico.png' }, // Placeholder for the ladybug icon
  { name: 'Trendyol', logo: '/trendyol-ico.png' },
  { name: 'Akakçe', logo: '/akakce-ico.png' }, // Placeholder for 'a' tag icon
  { name: 'Çiçeksepeti', logo: '/cs-ico.png' }, // Placeholder for flower icon
  { name: 'Göz', logo: '/ptt-ico.png' }, // Placeholder for eye icon
  { name: 'Pazarama', logo: '/pzrm-ico.png' },
];

const ProductPricing: React.FC = () => {
  const [showChannelPricing, setShowChannelPricing] = useState(false);

  return (
    <div className="panel">
      {/* Channel icons */}
      <div className="flex justify-center items-center flex-wrap gap-4 mb-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center grayscale overflow-hidden">
              <Image src={platform.logo} alt={platform.name} width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-800" />
          </div>
        ))}
      </div>
      <div className="text-xs text-center text-gray-500 mb-4">Ürünü satışa çıkarmak için ilk olarak ÜRÜNÜ KAYDEDİN.</div>
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
        <input 
          type="checkbox" 
          className="mr-2" 
          id="channelPricing" 
          checked={showChannelPricing}
          onChange={(e) => setShowChannelPricing(e.target.checked)}
        />
        <label htmlFor="channelPricing" className="text-xs text-gray-500">KANAL BAZLI FİYATLANDIRMA</label>
      </div>

      {showChannelPricing && <ChannelPricing />}
    </div>
  );
};

export default ProductPricing; 