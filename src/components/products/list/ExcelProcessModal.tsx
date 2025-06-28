import React, { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { FaRegFileExcel } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { FiUpload } from 'react-icons/fi';

interface ExcelProcessModalProps {
  showModal: boolean;
  onClose: () => void;
}

const excelOptions = [
  'Excel Stok Güncelleme',
  'Excel Fiyat Güncelleme',
  'Excel Ürün Güncelleme',
  'Excel Ürün Ekleme',
  'Excel Etiket Güncelleme',
];

const ExcelProcessModal: React.FC<ExcelProcessModalProps> = ({ showModal, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);
  const [selectedUploadType, setSelectedUploadType] = useState(excelOptions[1]); // Varsayılan: Excel Fiyat Güncelleme

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleAllProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowCustomize((prev) => !prev);
  };

  const handleUploadTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUploadType(e.target.value);
  };

  if (!showModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl shadow-lg w-1/2 max-w-full relative p-0">
        {/* Kapatma Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-2xl"
          aria-label="Kapat"
        >
          <AiOutlineClose />
        </button>
        {/* Başlık ve üst bar */}
        <div className="flex items-center justify-between px-8 py-4">
          <h2 className="text-xl font-semibold">Excel İşlemleri</h2>
        </div>
        {/* İçerik */}
        <div className="flex border-t border-gray-300 divide-x min-h-[500px]">
          {/* Sol Alan */}
          <div className="w-1/2 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-200 rounded-full p-4 mr-4">
                <FiDownload className="text-green-600 w-8 h-8" />
              </div>
              <div>
                <div className="text-gray-500 text-sm font-semibold">Adım 1</div>
                <div className="text-lg font-bold text-gray-700">Excel Şablonunu İndir</div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div>
                  <FiDownload className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">Excel Stok Güncelleme <a href='/products' className="bg-blue-100 text-blue-600 text-xs font-semibold rounded px-2 py-0.5">Tüm Ürünler</a></div>
                  <div className="text-gray-600 text-sm">Entekas üzerinde bulunan ürünlerinizi Excel e aktararak stok güncellemelerini yaptıktan sonra satış kanallarınıza aktarılmasını sağlayabilirsiniz.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <FiDownload className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">Excel Fiyat Güncelleme <a href='/products' className="bg-blue-100 text-blue-600 text-xs font-semibold rounded px-2 py-0.5">Tüm Ürünler</a></div>
                  <div className="text-gray-600 text-sm">Entekas üzerinde bulunan ürünlerinizi Excel e aktararak fiyat güncellemelerini yaptıktan sonra dilediğiniz satış kanalına aktarılmasını sağlayabilirsiniz. Her satış kanalına özel fiyat belirleyebilirsiniz.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <FiDownload className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">Excel Ürün Güncelleme <a  className="bg-blue-100 text-blue-600 text-xs font-semibold rounded px-2 py-0.5" onClick={handleAllProductsClick} href="#">Tüm Ürünler</a></div>
                  <div className="text-gray-600 text-sm">Entekas üzerinde bulunan ürünlerinizi Excel e aktararak ürünlerinizin güncellemelerini sağlayabilirsiniz.</div>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${showCustomize ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
                  >
                    <div className="p-1 rounded">
                      <div className="font-semibold mb-2 text-sm text-gray-700">Excel Ürün Güncelleme Çıktısını Özelleştir</div>
                      <div className="text-xs text-gray-500 mb-2">Excel dosyanız içerisinde bulunmasını istediğiniz özellikleri seçiniz.</div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Ürün Adı', 'Açıklama', 'Barkod', 'Marka', 'Kategori', 'Resimler', 'KDV', 'Alış Fiyatı', 'Desi',
                          'Etiket', 'N11 Katalog No(Pims Id)', 'GTIN', 'Hepsiburada SKU', 'Raf', 'Ürün Durumu', 'Hazırlık Süresi(Gün)',
                          'Garanti Süresi(Ay)', 'T. Stok Kodu', 'Ürünün E-Ticaret URL\'i', 'Ürün Fatura Başlığı'
                        ].map((label, i) => (
                          <label key={i} className="flex items-center gap-1 text-xs border border-gray-400 px-2 py-1 rounded cursor-pointer ">
                            <input type="checkbox" className="accent-blue-600" defaultChecked={i === 0} />
                            {label}
                          </label>
                        ))}
                      </div>
                      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold">
                        Dosyayı İndir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div>
                  <FiDownload className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-800 flex items-center gap-2">Excel Ürün Ekleme</div>
                  <div className="text-gray-600 text-sm">Excel formatı alarak ürün ekleyebilirsiniz.</div>
                </div>
              </div>
            </div>
            {/* Vazgeç butonu sol altta */}
            <div className="flex justify-start mt-8">
              <button
                onClick={onClose}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-gray-100"
              >
                <IoIosArrowBack /> VAZGEÇ
              </button>
            </div>
          </div>
          {/* Sağ Alan */}
          <div className="w-1/2 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-200 rounded-full p-4 mr-4">
                <FiUpload className="text-blue-600 text-3xl" />
              </div>
              <div>
                <div className="text-gray-500 text-sm font-semibold">Adım 2</div>
                <div className="text-lg font-bold text-gray-700">Hazırladığın Excel i Yükle</div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Yükleme Tipi Seçiniz</label>
              <select className="input" value={selectedUploadType} onChange={handleUploadTypeChange}>
                {excelOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            {/* Fiyat Aktarım İşlemini Özelleştir sadece Excel Fiyat Güncelleme ise göster */}
            {selectedUploadType === 'Excel Fiyat Güncelleme' && (
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Fiyat Aktarım İşlemini Özelleştir</label>
                <div className="text-gray-500 text-xs mb-2">Seçilen satış kanallarına göre fiyat güncellemesi yapabilirsiniz.</div>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-blue-600 w-4 h-4" /> Tümü
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-blue-600 w-4 h-4" /> Trendyol
                  </label>
                </div>
              </div>
            )}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Dosya Seçiniz</label>
              <div className="flex items-center gap-2">
                <input type="text" className="input" placeholder="" value={fileName} readOnly />
                <button type="button" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded" onClick={handleFileButtonClick}>
                  <FaRegFileExcel className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelProcessModal; 