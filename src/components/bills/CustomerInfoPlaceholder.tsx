import React from "react";
import Image from "next/image";

export default function CustomerInfoPlaceholder() {
  return (
    <div className="bg-white rounded shadow p-4 min-h-[180px] flex flex-col">
      <div className="flex items-center mb-2">
        <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
          <Image src="/iconUser.svg" alt="logo" width={20} height={20} />
        </span>
        <span className="font-semibold text-gray-700 text-base">MÜŞTERİ BİLGİLERİ</span>
      </div>
      <div className="text-gray-500 text-sm mb-4">Lütfen üst menüden müşteri seçiniz...</div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center space-x-2 animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.5s',
              animationIterationCount: 'infinite'
            }}
          >
            <div className="w-6 h-6 bg-gray-200 rounded" />
            <div className="flex-1 h-3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 0.5;
            transform: translateY(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse {
          animation: fadeInUp 1.5s ease-out infinite;
        }
      `}</style>
    </div>
  );
} 