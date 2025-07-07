'use client'

import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Image from "next/image";

export default function XmlPage() {
  const [open, setOpen] = useState({ first: true, second: false, third: false });

  return (
    <div className="min-h-screen p-6">
      <div className="w-full mx-auto">
        <div className="flex flex-row gap-8">
          <div className="panel flex flex-col gap-6 w-1/2 h-min">
            <div className='p-4'>
              <h2 className="text-lg font-bold text-blue-900 mb-2">XML Bilgilendirme</h2>
              <p className="text-gray-600 text-sm mb-4">
                Entekasın XML çalışma mantığı aşağıda belirtildiği şekildedir. Aşağıda belirtilen koşullar dışında ekstra hizmet verilmemektedir.
              </p>
              <div className="text-[#6c3fc5] font-bold mb-2">XML KURALLARIMIZ</div>
              <div className="border-t border-gray-200 mb-4" />
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>Maksimum 3 adet XML yükleme hakkınız bulunmaktadır.</li>
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>Tüm XMLler dahil ürün limiti <b>10000</b> adettir.</li>
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>XML dosyaları <b>12-24</b> saat arasında bir kere olacak şekilde güncellenmektedir.</li>
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>XML destek talepleri <b>24 ile 48</b> saat içerisinde cevaplanmaktadır.</li>
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>XML entegrasyonu sadece Profesyonel ve Gelişmiş paketlerde verilmektedir.</li>
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>Deneme yapmak için maksimum <b>1</b> adet XML tanımlaması yapılır.</li>
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>Deneme yapmak için ilk <b>100</b> adet ürününüz Entekasa aktarılır.</li>
                <li><span className="text-green-500 font-bold mr-2 bg-green-200/40 rounded-full p-1"><FaCheck className="inline" /></span>Profesyonel veya Gelişmiş paket satın alımında eğer ilgili kategori destekliyorsa toplu ürün gönderimi yapılabilmektedir.</li>
              </ul>
            </div>
            <a href='/xml/add'className="bg-blue-600 text-white px-12 py-3 rounded-lg font-semibold mt-2 hover:bg-blue-700 transition w-min text-nowrap self-center">YENİ XML ÜRÜN KAYNAĞI TANIMLA</a>
            <a href='/requests-for-support/open' className="text-blue-600 underline text-sm my-1 text-center">Destek talebi oluştur</a>
          </div> 

          <div className="panel flex flex-col gap-6 items-center justify-between w-1/2 h-min">
            <div className="w-full">
              <div className="border-b border-gray-300">
                <button onClick={() => setOpen(o => ({ ...o, first: !o.first }))} className="w-full flex justify-between items-center py-4 px-4 text-left text-xl font-semibold text-gray-700 hover:bg-blue-50 transition">
                Aktif XML Kaynaklarınız 
                  <span className="text-2xl">{open.first ? '-' : '+'}</span>
                </button>
                {open.first && (
                  <div className='w-full flex flex-col items-center px-6 py-4'>
                  <Image src="/noxml.jpg" alt="XML Kaynak" width={1000} height={500} className="w-full object-contain" />
                  <div className="text-center text-[#6c3fc5] font-bold mt-2">XML KAYNAĞINIZ BULUNMAMAKTADIR</div>
                </div>
                )}
              </div>

              <div className="border-b border-gray-300">
                <button onClick={() => setOpen(o => ({ ...o, second: !o.second }))} className="w-full flex justify-between items-center py-4 px-4 text-left text-xl font-semibold text-gray-700 hover:bg-blue-50 transition">
                  Bekleyen XML Entegrasyon Talepleriniz (0)
                  <span className="text-2xl">{open.second ? '-' : '+'}</span>
                </button>
                {open.second && (
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-3 gap-4 text-gray-500 text-sm font-semibold mb-2">
                      <div>XML ADI & LİNKİ</div>
                      <div className="text-center">EKLENME TARİHİ</div>
                      <div className="text-right">DURUMU</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-b border-gray-300">
                <button onClick={() => setOpen(o => ({ ...o, third: !o.third }))} className="w-full flex justify-between items-center py-4 px-4 text-left text-xl font-semibold text-gray-700 hover:bg-blue-50 transition">
                  Ürün Limitini Aşan XML Kaynaklarınız (0)
                  <span className="text-2xl">{open.third ? '-' : '+'}</span>
                </button>
                {open.third && (
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-3 gap-4 text-gray-500 text-sm font-semibold mb-2">
                        <div>XML ADI & LİNKİ</div>
                        <div className="text-center">EKLENME TARİHİ</div>
                        <div className="text-right">DURUMU</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
