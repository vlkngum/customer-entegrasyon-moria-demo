import React from "react";
import Image from "next/image";

interface ErrorProps {
  onClick: () => void;
}

const Error: React.FC<ErrorProps> = ({ onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 mt-10 flex flex-col items-center w-full max-w-2xl">
      <h2 className="text-lg font-bold text-center text-gray-700 mb-2">DAHA ÖNCE HİÇ TOPLU ÜRÜN GÖNDERİMİ YAPMAMIŞSINIZ</h2>
      <p className="text-gray-500 text-center mb-6">Toplu ürün gönderimi başlatmak için Yeni Toplu Ürün Gönderimi Başlat butonuna tıklayabilirsiniz.</p>
      <Image
        src="/bulk-products-illustration.webp"
        alt="Toplu Ürün Gönderimi Görseli"
        className="mb-6 w-full max-w-md mx-auto"
      />
      <button
        className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition"
        onClick={onClick}
      >
        YENİ TOPLU ÜRÜN GÖNDERİMİ BAŞLAT
      </button>
    </div>
  );
};

export default Error; 