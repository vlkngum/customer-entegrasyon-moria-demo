import React from 'react';

interface FixedPaginationBarProps {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
}

export default function FixedPaginationBar({
  currentPage,
  lastPage,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = [25, 50, 100],
}: FixedPaginationBarProps) {
  return (
    <div className="h-12">
      <div className="flex justify-around items-center px-8 text-sm   bg-gray-800 py-3 shadow-lg">
        <div className="flex items-center gap-2 text-white">
          <div>Toplam {lastPage} sayfada</div>
            <select className="border rounded px-2 py-1" value={currentPage} onChange={e => onPageChange(Number(e.target.value))}>
              {Array.from({ length: lastPage }, (_, i) => (
                <option className='text-black' key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span>sayfadasınız</span>
        </div>
        
        <div className="flex items-center gap-2 text-white">
          <span>Her sayfada</span>
          <select className="border rounded px-2 py-1" value={perPage} onChange={e => onPerPageChange(Number(e.target.value))}>
            {perPageOptions.map(size => (
              <option className='text-black' key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>kayıt göster.</span>
        </div>
      </div>
    </div>
  );
} 