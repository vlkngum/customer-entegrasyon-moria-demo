import { useState } from "react";
import { MdClose } from "react-icons/md";
import ProductSingleFetchHelpModal from "../../products/list/ProductSingleFetchHelpModal";

const platforms = [
  "Trendyol",
  "Trendyol(Paket Numarası ile)",
  "Hepsiburada",
  "Hepsiburada(Paket Numarası ile)",
  "Çiçeksepeti",
  "N11",
  "PttAVM",
  "Pazaryama"
];

 

export default function ProductSingleFetchModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [barcode, setBarcode] = useState("");
  const [showHelp, setShowHelp] = useState(false);

 

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="panel w-1/4 animate-fadeIn min-h-1/2 justify-between flex flex-col fixed">
        <div>
          <div className="flex flex-row w-full justify-between items-center"> 
            <h2 className="text-lg font-medium mb-4">Hızlı Sipariş Ekle - Platform Seçimi</h2>
            <button
              onClick={onClose}
              className=" text-gray-500 hover:text-gray-700 items-center self-start"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>
          <div className="mb-4 p-4 bg-orange-100 text-orange-700 rounded text-sm">
            Ürününüzü (varyantlar dahil) sisteme getirmek için aşağıdaki seçim ekranını kullanabilirsiniz.
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">1- Ürününüzü hangi platformdan getirelim?</label>
            <select
              className="input"
              value={selectedPlatform}
              onChange={e => setSelectedPlatform(e.target.value)}
            >
              <option value="">Platform Seçiniz</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
            <>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">2-Sipariş Numarasını Giriniz.</label>
                <input
                  className="input"
                  value={barcode}
                  onChange={e => setBarcode(e.target.value)}
                  placeholder=""
                />
              </div>
            </>
        </div>
        <div className="flex justify-between mt-6 border-t border-gray-400 pt-4">
          <button
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Vazgeç
          </button>
          <button
            className="px-6 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-300 cursor-pointer"
            disabled={!selectedPlatform || !barcode}
          >
            
            Siparişi Getir
          </button>
        </div>
        <ProductSingleFetchHelpModal open={showHelp} onClose={() => setShowHelp(false)} platform={selectedPlatform} />
      </div>
    </div>
  );
} 