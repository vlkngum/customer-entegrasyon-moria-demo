import { FiX } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Re-using the Product type, but we mainly need id, sku, name, and stock
type Product = {
  id: number;
  sku: string;
  name: string;
  stock: number;
};

// Define the props for the stock update modal component
interface QuickStockUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function QuickStockUpdateModal({ isOpen, onClose, product }: QuickStockUpdateModalProps) {
  // Don't render if the modal is not open or has no product data
  if (!isOpen || !product) {
    return null;
  }

  return (
    // Modal overlay with a subtle background
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      {/* Modal content with animation */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        
        {/* Close button in the top right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full p-1 transition-colors"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">Hızlı Stok Güncelleme</h2>
        
        {/* Informational alert about the product being edited */}
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 mb-6 rounded-md text-sm">
          <p>Adı <span className="font-semibold">{product.name}</span> ve stok kodu <span className="font-semibold">{product.sku}</span> olan ürünün stoğunu güncelliyorsunuz.</p>
        </div>

        {/* Stock input field */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="stock-quantity" className="block text-xs font-medium text-gray-500 mb-1">STOK ADEDİ *</label>
            <input 
              type="number" 
              id="stock-quantity"
              defaultValue={product.stock}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
        </div>

        {/* Action buttons at the bottom */}
        <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-8">
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

      {/* Animation styles */}
      <style jsx>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 