import React from 'react';

const platforms = [
  { name: 'AMAZON', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-blue-600' },
  { name: 'HEPSİBURADA', fields: ['SATIŞ FİYATI'], color: 'text-orange-500' },
  { name: 'N11', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-red-600' },
  { name: 'TRENDYOL', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-orange-500' },
  { name: 'SİTE', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-purple-600' },
  { name: 'AKAKÇE', fields: ['SATIŞ FİYATI'], color: 'text-blue-600' },
  { name: 'ÇİÇEK SEPETİ', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-green-600' },
  { name: 'PTTAVM', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-cyan-500' },
  { name: 'MORHIPO', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-gray-800' },
  { name: 'PAZARAMA', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-blue-600' },
  { name: 'İDEFİX', fields: ['PİYASA(LİSTE) FİYATI', 'SATIŞ FİYATI'], color: 'text-gray-800' },
];

const ChannelPricing: React.FC = () => {
  return (
    <div className="mt-4 space-y-4 border-t border-gray-200 ">
      {platforms.map((platform, index) => (
        <div key={platform.name} className={`${index !== 0 ? 'border-t border-gray-200' : ''} pt-4`}>
          <h3 className={`font-semibold ${platform.color}`}>{platform.name}</h3>
          <div className={`grid ${platform.fields.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mt-2`}>
            {platform.fields.map((field) => (
              <div key={field}>
                <label className="block text-xs text-gray-500 mb-1">{field}</label>
                <input className="input" placeholder="" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelPricing; 