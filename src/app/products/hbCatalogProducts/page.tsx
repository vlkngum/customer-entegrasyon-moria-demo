import { FiSearch } from 'react-icons/fi';
import ProductTable, { ProductTableColumn } from '@/components/ProductTable';

const sampleProducts = [
  {
    stockCode: 'HB-001',
    name: 'Pamuklu Tişört',
    status: 'Beklemede',
    message: 'Onay bekliyor',
  },
  {
    stockCode: 'HB-002',
    name: 'Kot Pantolon',
    status: 'Onaylandı',
    message: 'Kataloğa eklendi',
  },
  {
    stockCode: 'HB-003',
    name: 'Spor Ayakkabı',
    status: 'Reddedildi',
    message: 'Eksik bilgi',
  },
];

const columns: ProductTableColumn[] = [
  { key: 'stockCode', title: 'STOK KODU' },
  { key: 'name', title: 'ÜRÜN ADI' },
  { key: 'status', title: 'DURUMU' },
  { key: 'message', title: 'MESAJ' },
];

export default function HbCatalogProducts() {
  return (
    <div className="">
      <div className="panel bg-white/90 shadow-md rounded-xl px-8 py-6 mb-4">
        <div className="flex flex-wrap gap-6 items-end">
          <div className="flex flex-col w-1/5 ">
            <label className="text-xs font-semibold text-gray-600 mb-1">HEPSİBURADA KATALOG DURUMU</label>
            <select className="input">
              <option>Katalog durumunu filtrele</option>
              <option>Beklemede</option>
              <option>Onaylandı</option>
              <option>Reddedildi</option>
            </select>
          </div>
          <div className="flex flex-col w-1/5  ">
            <label className="text-xs font-semibold text-gray-600 mb-1">ÜRÜN ARAMA</label>
            <input type="text" className="input" placeholder="Stok Kodu, Ürün Adı veya Barkod ile ara..." />
          </div>
          <div className="flex flex-col w-1/5 ">
            <label className="text-xs font-semibold text-gray-600 mb-1">ÜRÜN KATEGORİSİ</label>
            <select className="input">
              <option>Ürün Kategorisi</option>
              <option>Tişört</option>
              <option>Pantolon</option>
              <option>Ayakkabı</option>
            </select>
          </div>
          <div className="flex flex-col w-1/5 ">
            <label className="text-xs font-semibold text-gray-600 mb-1">ÜRÜN MARKASI</label>
            <select className="input">
              <option>Ürün Markası</option>
              <option>Marka A</option>
              <option>Marka B</option>
            </select>
          </div>
          <div className="flex flex-col w-1/8 ">
            <button className="text-blue-600 text-sm hover:underline">Filtreyi Temizle</button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-2 rounded-lg font-semibold text-sm shadow hover:from-blue-600 hover:to-blue-800 transition">
              <FiSearch className="w-4 h-4" />
              FİLTRELE
            </button>
          </div>
        </div>
      </div>
      <ProductTable columns={columns} data={sampleProducts} />
    </div>
  );
}