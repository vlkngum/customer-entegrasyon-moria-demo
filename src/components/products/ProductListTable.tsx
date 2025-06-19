import { FaSearch } from "react-icons/fa";

export default function ProductListTable() {
  const products = [
    {
      id: 1,
      etiket: "#",
      urunAdi: "Stok Kodu: DWDW4555212503\nDWDW",
      fiyati: "0,00 ₺",
      stok: 999,
      platformDurum: "",
      durum: "Satışa Açık",
      kaynak: "Sopyo",
    },
  ];

  return (
    <div className="panel">
      <div className="mb-4 flex flex-row items-center gap-2 w-1/2">
        <input
          type="text"
          className="input"
          placeholder="Stok Kodu, Ürün Adı veya Barkod ile ara..."
        />
        <button className="bg-blue-600 text-white px-12 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-200 ">
                        <FaSearch className="w-4 h-4" />
                        <span>FİLTRELE</span>
                    </button>
        <div className="flex-1 flex justify-end gap-2">
          <button className="border px-3 py-1 rounded text-gray-700">Toplu İşlemler</button>
          <button className="border px-3 py-1 rounded text-gray-700">Detaylı Filtrele</button>
        </div>
      </div>
       
    </div>
  );
}