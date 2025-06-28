'use client';

import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

export default function XmlAddPage() {
  const [step, setStep] = useState(1);

  const getStepPercentage = () => {
    switch (step) {
      case 1:
        return '25%';
      case 2:
        return '50%';
      case 3:
        return '75%';
      case 4:
        return '100%';
      default:
        return '0%';
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form className="flex flex-col gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">XML KAYNAK ADI <span className="text-red-500">*</span></label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">XML KAYNAK LİNKİ <span className="text-red-500">*</span></label>
              <input type="text" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">XML EKSTRA NOTLAR</label>
              <textarea className="input" placeholder="XML ile alakalı dikkat etmemiz gereken ekstra notları buraya girebilirsiniz." rows={3}></textarea>
            </div>
          </form>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">ÜRÜN KODU ÖN EKİ</label>
              <input type="text" className="input" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="barcode" className="w-4 h-4" />
              <label htmlFor="barcode">Ürün barkodları yeniden oluşturulsun</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="stockUpdate" className="w-4 h-4" />
              <label htmlFor="stockUpdate">Ürün stok güncellemesi yapılmasın</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="priceUpdate" className="w-4 h-4" />
              <label htmlFor="priceUpdate">Ürün fiyat güncellemesi yapılmasın</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="noProduct" className="w-4 h-4" />
              <label htmlFor="noProduct">Entekasda olmayan ürünler eklenmesin</label>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Kritik stok miktarı</label>
              <input type="number" className="input" defaultValue={3} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="autoSend" className="w-4 h-4" />
              <label htmlFor="autoSend">Otomatik ürün gönderimi yapılsın</label>
            </div>
          </div>
        );
        case 3:
          return (
            <form className="flex flex-col gap-6">
              <div className="font-semibold text-gray-700 mb-2">Fiyat Yuvarlama</div>
              <div className="flex gap-6 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="rounding" defaultChecked className="accent-blue-600 w-5 h-5" />
                  <span>Fiyat yuvarlama uygulanmasın</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="rounding" className="accent-blue-600 w-5 h-5" />
                  <span>Fiyat yuvarlama uygulansın</span>
                </label>
              </div>
              <div className="font-semibold text-gray-700 mb-2 mt-4">Fiyat Kuralı</div>
              <div className="flex gap-6 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="rule" defaultChecked className="accent-blue-600 w-5 h-5" />
                  <span>Fiyat kuralı uygulanmasın</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="rule" className="accent-blue-600 w-5 h-5" />
                  <span>Sabit fiyat kuralı uygulansın</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="rule" className="accent-blue-600 w-5 h-5" />
                  <span>Değişken fiyat kuralı uygulansın</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="rule" className="accent-blue-600 w-5 h-5" />
                  <span>Pazaryeri bazlı fiyat kuralı uygulansın</span>
                </label>
              </div>
            </form>
          );
      case 4:
        return (
          <div className="text-lg">
            <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-17 rounded-lg text-lg flex items-center gap-2 shadow">
              DEVAM ET 
            </button>
          </div>
        );
        
    }
  };

  return (
    <div className="p-6 flex flex-col justify-between">
      <div className=" mx-auto w-full">
        <div className="panel flex flex-row ">
          <div className="w-1/3 flex flex-col gap-8">
            <div>
              <div className="text-2xl font-bold text-gray-700 mb-2">{getStepPercentage()}</div>
              <div className="text-gray-500 text-sm mb-6">XML tanımlama süreci</div>
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((s) => (
                  <div className="flex items-center gap-2" key={s}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step === s ? 'bg-blue-600' : step > s ? 'bg-green-500' : 'bg-gray-300'}`}>{s}</div>
                    <span className={`font-semibold ${step === s ? 'text-blue-600' : step > s ? 'text-green-600' : 'text-gray-500'}`}>
                      {['TANIMLAMA BİLGİLERİ', 'ÜRÜN AYARLARI', 'FİYAT AYARLARI', 'ONAY'][s - 1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-100 rounded-lg p-4 mt-8 flex flex-col gap-2 border border-orange-200">
              <div className="flex items-center gap-2 text-orange-600 font-bold mb-1">
                <FaInfoCircle className="text-orange-500" />
                BİLGİLENDİRME
              </div>
              <div className="text-sm text-orange-700">Tedarikçinize aşağıda yer alan ip adresimizi iletebilirsiniz.</div>
              <div className="text-sm text-orange-700 font-semibold mt-1">IP Adresi: <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono select-all">77.92.152.100</span></div>
            </div>
          </div>
          <div className="w-2/3 flex flex-col gap-6">
            <div className="text-xl font-bold text-gray-700 mb-4">{['TANIMLAMA BİLGİLERİ', 'ÜRÜN AYARLARI', 'FİYAT AYARLARI', 'ONAY'][step - 1]}</div>
            {renderStepContent()}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full flex justify-between mt-8">

      <button onClick={prevStep} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-12 rounded-lg text-lg flex items-center gap-2 shadow">
         
          <GrFormPreviousLink className="text-2xl"></GrFormPreviousLink>
          GERİ
        </button>
        <button onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-12 rounded-lg text-lg flex items-center gap-2 shadow">
          DEVAM ET
          <GrFormNextLink className="text-2xl"></GrFormNextLink>
        </button>

        
      </div>
    </div>
  );
}
