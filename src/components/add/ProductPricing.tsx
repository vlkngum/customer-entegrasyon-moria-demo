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
      <div className="flex justify-center items-center flex-wrap gap-4 mb-4 border-b border-gray-200 pb-4">
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
      <div className="grid grid-cols-2 gap-4 mb-2 border-b border-gray-200 py-4">
        <div>
          <label className="block text-xs text-[#6a7286] mb-1">KDV ORANI</label>
          <select className="input" style={{ 
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%230f82ff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}>
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
          <input className="input" placeholder="" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">PİYASA(LİSTE) FİYATI</label>
          <input className="input" placeholder="" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">SATIŞ FİYATI *</label>
          <input className="input" placeholder="" />
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