import { FiX } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Define a type for the product data that the modal will receive
// We can expand this later if more product data is needed.
type Product = {
  id: number;
  sku: string;
  name: string;
  price: string;
};

// Define the props for the modal component
interface QuickPriceUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function QuickPriceUpdateModal({ isOpen, onClose, product }: QuickPriceUpdateModalProps) {
  // Don't render the modal if it's not open or if there's no product data
  if (!isOpen || !product) {
    return null;
  }

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full p-1 transition-colors"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">Hızlı Fiyat Güncelleme</h2>
        
        {/* Information alert */}
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-6 rounded-md text-sm">
          <p>Adı <span className="font-semibold">{product.name}</span> ve stok kodu <span className="font-semibold">{product.sku}</span> olan ürünün fiyatını güncelliyorsunuz.</p>
        </div>

        {/* Price inputs */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="list-price" className="block text-xs font-medium text-gray-500 mb-1">PİYASA (LİSTE) FİYATI</label>
            <input 
              type="text" 
              id="list-price"
              defaultValue="0,00"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
          <div>
            <label htmlFor="sale-price" className="block text-xs font-medium text-gray-500 mb-1">SATIŞ FİYATI *</label>
            <input 
              type="text" 
              id="sale-price"
              defaultValue={product.price}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
        </div>

        {/* Channel pricing checkbox */}
        <div className="mb-8">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="ml-2 text-sm text-gray-700">KANAL BAZLI FİYATLANDIRMA</span>
          </label>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaArrowLeft />
            GERİ
          </button>
          <button
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            KAYDET
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Basic animation styles */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 