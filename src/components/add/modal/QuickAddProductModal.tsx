import { useState, useRef } from "react"
import { MdClose } from "react-icons/md";
import { platforms } from "@/data/platformsSelect";

export default function QuickAddProductModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const [link, setLink] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    // Dışarı tıklama kontrolü
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 w-full h-full"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 z-50 relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Hızlı Ürün Ekle</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <MdClose className="w-6 h-6" />
                    </button>
                </div>
                <div className="px-6 py-6">
                    <div className="text-gray-700 mb-2 text-sm">Ürünün çekileceği pazar yerini seçiniz.</div>
                    <div className="mb-5">
                        <label className="block text-xs font-bold mb-1 text-gray-700">PAZARYERLERİ</label>
                        <select
                            id="platform-status"
                            className="input"
                            value={selectedPlatform}
                            onChange={e => setSelectedPlatform(e.target.value)}
                        >
                            <option value="">Seçiniz</option>
                            {platforms.map((platform) => (
                                <option key={platform} value={platform}>
                                    {platform}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-gray-700 mb-2 text-sm">Ürün linkini aşağıdaki alana yapıştırınız.</div>
                    <div className="mb-6">
                        <label className="block text-xs font-bold mb-1 text-gray-700">TARAMA YAPILACAK SAYFA LİNKİ</label>
                        <input
                            className="input"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            placeholder=""
                        />
                    </div>
                    <div className="flex justify-end">
                        <a
                            href={link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-8 py-2 rounded font-semibold text-lg hover:bg-green-600 transition"
                        >
                            ÜRÜNÜ GETİR
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}