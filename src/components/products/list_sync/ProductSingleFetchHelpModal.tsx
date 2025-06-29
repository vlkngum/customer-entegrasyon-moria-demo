import { MdClose } from "react-icons/md";
import Image from "next/image";

const helpContent: Record<string, { title: string; description: string; image?: string }> = {
  "Çiçeksepeti": {
    title: "Çiçeksepeti",
    description:
      "Çiçeksepeti panelinizden Ürün Listesi sayfasına gelerek Entekas'ya çekilecek ürünü bulup yanındaki düzenle tuşuna tıklayıp fotoğraftaki gibi Tedarikçi Varyant Kodunu alabilirsiniz.",
    image: "ciceksepetiSinglePrice.png", // örnek, gerçek görsel yolu eklenmeli
  },
  "İdefix": {
    title: "İdefix",
    description:
      "İdefix ürün detayında barkod bilgisini bulabilirsiniz. Ürün sayfasında ilgili alanı kontrol edin.",
    image: "/idefix.png", // örnek, gerçek görsel yolu eklenmeli
  },
};

export default function ProductSingleFetchHelpModal({ open, onClose, platform }: { open: boolean; onClose: () => void; platform: string }) {
  if (!open) return null;
  const content = helpContent[platform];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto p-8 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <MdClose className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-4">{content?.title || platform}</h2>
        <div className="mb-4 text-gray-700">{content?.description}</div>
        {content?.image && (
          <Image src={content.image} alt={platform + " yardım görseli"} className="rounded border max-h-96 mx-auto" />
        )}
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
} 