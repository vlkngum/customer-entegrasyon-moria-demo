"use client";
import React from 'react';
import { FiX, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Stat = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="text-center">
    <div className="text-gray-500 text-sm font-medium">{label}</div>
    <div className={`text-3xl font-bold mt-2 ${color}`}>{value}</div>
  </div>
);

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Toplu Gönderim Ön İnceleme Raporu</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <FiX className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3 mb-6">
            <FiAlertTriangle className="w-6 h-6" />
            <p className="text-sm font-medium">
              <span className="font-bold">Hata:</span> Toplu gönderim isteğinde bulunmuş olduğunuz ürünlerde bazı hatalar/eksiklikler bulunmaktadır. Detaylı inceleyebilmek için <span className="font-bold">Raporu Görüntüle</span> butonunu kullanabilirsiniz.
            </p>
          </div>

          <div className="flex justify-around items-center mb-6">
            <Stat label="KONTROL EDİLEN" value="1" color="text-gray-700" />
            <Stat label="GÖNDERİLEBİLECEK" value="0" color="text-green-500" />
            <Stat label="HATALI" value="1" color="text-red-500" />
          </div>

          <div className="bg-orange-50 text-orange-700 p-4 rounded-lg text-center">
            <p className="text-sm font-medium">
              <span className="font-bold">Uyarı:</span> Kısıtlı kullanıma sahipsiniz. Deneme yapmak için seçimlerinizden <span className="font-bold">başarılı ilk 100 adet</span> platforma gönderilecektir.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 bg-gray-50 rounded-b-xl">
          <button 
            onClick={onConfirm}
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            HATA RAPORUNU GÖRÜNTÜLE
            <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal; 