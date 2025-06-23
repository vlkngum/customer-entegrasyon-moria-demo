import React from 'react';

export default function FixedPaginationBar() {
  return (
    <div className="h-12">
      <div className="flex justify-around items-center px-8 text-sm   bg-gray-800 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          <div>Toplam 1 sayfada</div>
            <select className="border rounded px-2 py-1">
              <option className='text-black'>1</option>
              <option className='text-black'>2</option>
              <option className='text-black'>3</option>
              <option className='text-black'>4</option>
              <option className='text-black'>5</option>
              <option className='text-black'>6</option>
            </select>
            <span>sayfadasınız</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Her sayfada</span>
          <select className="border rounded px-2 py-1">
            <option className='text-black'>20</option>
            <option className='text-black'>50</option>
            <option className='text-black'>100</option>
          </select>
          <span>kayıt göster.</span>
        </div>
      </div>
    </div>
  );
} 