"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import SelectionErrorModal from './SelectionErrorModal';
import ShipmentDetailsForm from './ShipmentDetailsForm';

const platforms = [
  {
    name: 'TRENDYOL',
    logo: '/trendyolLogo.svg',
    bgColor: 'bg-orange-500',
  },
  // Gelecekte diğer platformlar buraya eklenebilir
];

const PlatformSelection = () => {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTogglePlatform = (platformName: string) => {
    setSelectedPlatform(selectedPlatform === platformName ? null : platformName);
  };

  const handleStartReview = () => {
    if (!selectedPlatform) {
      setIsModalOpen(true);
    } else {
      // Gerçek inceleme başlatma logiği buraya gelecek
      console.log(`Starting review for ${selectedPlatform}`);
    }
  };

  return (
    <>
      <SelectionErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="py-12 px-6 sm:px-12">
        <div className="flex justify-center">
            {platforms.map((platform) => {
                const isSelected = selectedPlatform === platform.name;
                return (
                    <button
                        key={platform.name}
                        onClick={() => handleTogglePlatform(platform.name)}
                        className={`
                            border rounded-lg p-6 w-full text-center cursor-pointer transition-all duration-300 relative
                            ${isSelected ? 'border-green-500 shadow-md ring-2 ring-green-200' : 'border-gray-300 hover:border-gray-400'}
                        `}
                    >
                        {isSelected && (
                            <FiCheckCircle className="absolute top-4 right-4 text-2xl text-green-500" />
                        )}
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4">
                                <Image src={platform.logo} alt={`${platform.name} logo`} width={64} height={64} objectFit="contain" />
                            </div>
                            <span className="font-semibold text-gray-600 tracking-widest">{platform.name}</span>
                        </div>
                    </button>
                )
            })}
        </div>

        {/* Seçim yapıldıysa detay formunu göster */}
        {selectedPlatform && <ShipmentDetailsForm />}

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft />
            VAZGEÇ
          </button>
          <button
            onClick={handleStartReview}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors shadow-lg"
          >
            İNCELEMEYİ BAŞLAT
            <FiArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default PlatformSelection; 