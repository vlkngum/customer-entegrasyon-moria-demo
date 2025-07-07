import Image from 'next/image';
import Link from 'next/link';
import { FaArrowTrendUp } from "react-icons/fa6";


export default function ProductDifferenceControl() {
  return (
    <div className="min-h-screen bg-[#f2f7fe] flex flex-col">
      {/* Sayfa Başlığı */}
      <div className="w-full flex items-center gap-2 px-6 pt-6 pb-2">
        {/* Grafik ikon */}
        <FaArrowTrendUp className="text-2xl text-blue-600" />
        <h2 className="text-2xl font-bold text-[#222] mr-2">Ürün Farklılık Kontrolü</h2>
        {/* Bilgi ikon */}
        {/* <span className="ml-1 text-[#1976d2] text-lg cursor-pointer" title="Bu sayfa hakkında bilgi al.">❓</span> */}
      </div>
      {/* Uyarı Barı */}
      <div className="w-full bg-gradient-to-r from-[#ff4e4e] to-[#ffb347] py-3 px-4 flex items-center gap-2 text-white text-sm font-semibold">
        <span className="text-lg">❗</span>
        Paketinizde ilgili özellik <span className="font-bold">bulunmuyor.</span> Ürün Farklılık Kontrolü özelliğini satın alabilirsiniz. <span className="ml-2">🎉</span>
      </div>
      {/* İçerik */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="bg-white rounded-2xl shadow-md max-w-4xl w-full mx-auto mt-8 mb-8 py-10 px-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center mb-2 text-[#1a2e5c]">PAKETİNİZDE ÜRÜN FARKLILIK KONTROLÜ ÖZELLİĞİ BULUNMUYOR!</h1>
          <p className="text-gray-500 text-center mb-8 max-w-2xl">
            ÜRÜN FARKLILIK KONTROLÜ özelliğimizi kullanabilmeniz için satın alım yapmanız gerekmektedir.
          </p>
          <Image
            src="/exportError.webp"
            alt="Toplu Ürün Gönderimi Görseli"
            width={400}
            height={250}
            className="mb-6 w-full max-w-md mx-auto"
          />
          {/* Satın Al Butonu */}
          <Link href="#" className="mt-4 px-8 py-3 bg-[#1976d2] hover:bg-[#125ea2] text-white rounded-lg font-semibold text-lg shadow transition-all">
            SATIN AL <span className="ml-2">→</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
