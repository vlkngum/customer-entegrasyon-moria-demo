import Image from "next/image";

export default function ClaimList () {

    return(
        <div className="bg-white rounded-lg shadow-md p-6 min-h-40"> 
          <main className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="bg-white rounded-xl shadow-md px-10 py-20 mt-10 flex flex-col items-center w-full max-w-5xl">
          
          <h2 className="text-lg font-bold text-center text-gray-700 mb-2">PAKETİNİZDE GELİŞMİŞ İPTAL & İADE YÖNETİM MODÜLÜ BULUNMUYOR!</h2>
          <p className="text-gray-500 text-center mb-6">Gelişmiş İptal & İade Yönetim özelliğimizi kullanabilmeniz için Gelişmiş paket kullanmanız gerekmektedir.</p>
          <Image
            src="/exportError.webp"
            alt="Toplu Ürün Gönderimi Görseli"
            width={600}
            height={400}
            className="mb-6 w-full max-w-xl mx-auto"
          /> 

<button className="bg-blue-600 text-white mt-10 px-6 py-3 rounded font-semibold hover:bg-blue-700 transition">PAKET YÜKSELT</button>
       
           </div>
      </main>
        </div>  
    );
}

