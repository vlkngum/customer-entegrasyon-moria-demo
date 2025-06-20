export default function ProductListTable() { 
  const products = [
    {
      id: 1,
      etiket: "#",
      urunAdi: "Stok Kodu: DWDW4555212503\nDWDW",
      fiyati: "150,00 ₺",
      stok: 800,
      platformDurum: "Yüklendi",
      durum: "Satışa Açık",
      kaynak: "Cm Apps",
    },
  ];

  return (
    <div className="panel">
       
      <table className="min-w-full text-sm border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-left">ETİKET</th>
            <th className="px-2 py-2 text-left">ÜRÜN ADI</th>
            <th className="px-2 py-2 text-left">FIYATI</th>
            <th className="px-2 py-2 text-left">STOK</th>
            <th className="px-2 py-2 text-left">PLATFORM YÜKLENME DURUMU</th>
            <th className="px-2 py-2 text-left">DURUMU</th>
            <th className="px-2 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b last:border-b-0">
              <td className="px-2 py-2">{product.etiket}</td>
              <td className="px-2 py-2 whitespace-pre-line">{product.urunAdi}</td>
              <td className="px-2 py-2">{product.fiyati}</td>
              <td className="px-2 py-2">{product.stok}</td>
              <td className="px-2 py-2">{product.platformDurum}</td>
              <td className="px-2 py-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Satışa Açık</span>
                <span className="ml-2 text-xs text-gray-500">Kaynak: {product.kaynak}</span>
              </td>
              <td className="px-2 py-2">
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded font-semibold">DÜZENLE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>Toplam 1 sayfada</span>
        <span>Her sayfada 20 kayıt göster.</span>
      </div>
    </div>
  );
} 