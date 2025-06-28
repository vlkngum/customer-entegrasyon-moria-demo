import { useState } from "react"
import { MdClose } from "react-icons/md";
import { platforms } from "@/data/platformsSelect";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function QuickAddProductModal({ open, onClose }: { open: boolean, onClose: () => void }) {
 
    const [link, setLink] = useState(''); 

    return (
        <div onClick={onClose} className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm w-full h-full">
           
            <div className="panel w-1/4 z-50">

            <div className="flex items-center justify-between px-3 py-5 ">
                <h2 className="text-lg font-semibold">Hızlı Ürün Ekle</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <MdClose className="w-6 h-6" />
                </button>
            </div>
             

            <div className="flex flex-col justify- h-full">
                <div className="px-4 text-gray-700 mb-4">Ürünün çekileceği pazar yerini seçiniz.</div>
                <div className="mb-4 p-4">
                    <label className="block text-xs font-semibold mb-1">PAZARYERLERİ</label>
                    <select id="platform-status" className="block w-full px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {platforms.map((platform) => (
                            <option key={platform} value={platform}>
                        {platform}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-2 text-gray-700 px-4">Ürün linkini aşağıdaki alana yapıştırınız.</div>
                    <div className="mb-4 p-4">
                        <label className="block text-xs font-semibold mb-1">TARAMA YAPILACAK SAYFA LİNKİ</label>
                        <input
                            className="block w-full px-2 py-3 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            placeholder=""
                        />
                </div>
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
      );
}