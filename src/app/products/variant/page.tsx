import { MdAddChart,MdCancelPresentation } from "react-icons/md";

export default function Variant() { 
  const groups = [
    {
      id: 1,
      name: "Renk Seçenekleri",
      options: ["Kırmızı", "Mavi", "Yeşil"],
    },
    {
      id: 2,
      name: "Beden Seçenekleri",
      options: ["S", "M", "L", "XL"],
    },
    {
      id: 3,
      name: "rfp03rr",
      options: [],
    },
  ];

  return ( 
    <>
    <div className=" text-gray-500 text-sm p-2 flex flex-row justify-between">
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Ürün Seçenek Grupları</h1>Sopyo &gt; Ürünler &gt; Ürün Seçenek Grupları</div> 

            </div>
        <div className="flex justify-end gap-2 mb-4">
            <button className="border_button">
                <MdAddChart className="w-6 h-6" />
                <span style={{ fontSize:10 }}>YENİ KATEGORİ EKLE</span>
            </button>
            <button className="border_button" >
                <MdCancelPresentation className="w-6 h-6" />
                <span style={{ fontSize:10 }}>VAZGEÇ</span>
            </button>
        </div>

      <div className="panel"> 
        <div className=" p-4">
          <div className="flex font-semibold text-gray-600 border-b border-gray-200 pb-2 mb-2">
            <div className="w-1/2">SEÇENEK GRUBU ADI</div>
            <div className="w-1/2">SEÇENEKLER</div>
          </div>
          {groups.map((group) => (
            <div key={group.id} className="flex items-center bg-white rounded shadow-sm mb-2">
              <div className="w-1/2 px-4 py-2">{group.name}</div>
              <div className="w-1/2 px-4 py-2">
                {group.options.length > 0 ? group.options.join(", ") : "-"}
              </div>
              <div className="flex gap-2 px-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  <span className="sr-only">Düzenle</span>✏️
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  <span className="sr-only">Sil</span>🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> 
    </>
      
  );
}