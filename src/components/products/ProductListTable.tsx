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
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">FİLTRELE</button>
        <div className="flex-1 flex justify-end gap-2">
          <button className="border px-3 py-1 rounded text-gray-700">Toplu İşlemler</button>
          <button className="border px-3 py-1 rounded text-gray-700">Detaylı Filtrele</button>
        </div>
      </div>
       
    </div>
  );
}