import React from 'react';

const ProductDescription: React.FC = () => {
  return (
    <div className="panel">
      <label className="block text-xs text-gray-500 mb-2">ÜRÜN AÇIKLAMASI</label>
      <textarea 
        className="input min-h-[180px]  " 
        placeholder="Ürün açıklamasını buraya giriniz..."
      />
    </div>
  );
};

export default ProductDescription; 