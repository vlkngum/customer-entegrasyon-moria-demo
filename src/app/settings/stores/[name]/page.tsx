"use client"

import { GiShop } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';
import Image from "next/image";

export default function StoreDetailPage() {

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8">
      {/* Üst Başlık ve Sekme */}
      <div className="w-full flex flex-col items-center bg-white shadow-sm">
        <div className="w-full max-w-7xl flex items-center gap-3 py-6 px-4">
          <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
            <span className="text-2xl text-blue-600"><GiShop /></span>
          </div>
          <span className="text-2xl font-semibold text-gray-800">Akakce Ayarları</span>
        </div>
        {/* Sekme Barı */}
        <div className="w-full max-w-7xl flex border-b border-gray-200 px-4">
          <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">API Tanımlama</button>
          {/* Diğer sekmeler eklenebilir */}
        </div>
      </div>
      {/* Breadcrumb */}
      <div className="w-full max-w-7xl mb-6 px-4 mt-4">
        
      </div>
      {/* İçerik Kutuları */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl flex flex-col md:flex-row overflow-hidden relative mx-4 md:mx-12 xl:mx-32 gap-8">
        {/* Sol: API Bilgileri Formu */}
        <div className="w-full bg-white p-8 flex flex-col gap-6 border-r border-gray-100 min-w-[350px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Image src="/akakce.svg" alt="logo" width={0} height={0} className="w-10 h-10 object-contain" />
            </div>
            <div className="text-xl font-semibold text-gray-700">API Bilgilerini Tanımlama</div>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">API NAME <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="API Name" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">API KEY <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="API Key" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">API EXPORT LINK (AKAKÇEYE GÖNDERİLEN ÜRÜNLERİN LİNKİ) <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-2 text-gray-500 bg-gray-50" value="https://entekas.com" readOnly />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">API EXPORT LINK (AKAKÇEYE GÖNDERİLEN ÜRÜNLERİN İSİMLERİNİN BAŞINA MARKA EKLİ ŞEKİLDE GÖZÜKEN LİNK) <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border rounded px-3 py-2 text-gray-500 bg-gray-50" value="https://entekas.com" readOnly />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">ENTEGRASYON DURUMU</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" className="accent-blue-600" />
                  <span>Entegrasyon Açık</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" className="accent-blue-600" defaultChecked />
                  <span>Entegrasyon Kapalı</span>
                </label>
              </div>
            </div>
            <button type="submit" className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition">AYARLARI KAYDET</button>
          </form>
        </div>
        {/* Sağ: Kurulum Rehberi */}
        <div className="w-full bg-[#F8FAFC] p-8 flex flex-col gap-4 min-w-[350px]">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold text-gray-700">Kurulum Rehberi</div>
            <button className="bg-red-100 text-red-600 font-semibold px-4 py-1 rounded hover:bg-red-200 text-sm">VİDEOLU ANLATIM</button>
          </div>
          <div className="overflow-y-auto max-h-[340px] pr-2 text-gray-700 text-sm leading-relaxed">
            <b>1– API Bilgilerinizi Tanımlayın</b><br/>
            Akakçe entegrasyonunu gerçekleştirebilmek için ilk olarak API Bilgisi almanız gerekmektedir. Bu bilgiye Akakçe yönetim panelinizden ulaşabilirsiniz.<br/><br/>
            *API bilgisini nasıl alacağınızı öğrenmek için ilgili destek yazımızı inceleyebilirsiniz.<br/><br/>
            API bilgisini aldıktan sonra Akakçe API Ayarları sayfasının API Bilgileri Tanımlama kısmında bulunan API Name alanına API Kullanıcı Adını, API KEY kısmına da Şifre bilgilerini yazmalısınız.<br/><br/>
            <b>2– Ürünlerinizi Aktarın</b><br/>
            Ürünlerinizi Entekasa aktarmadan önce Kargo ve Süreç Seçimlerinizi ve Sabit Ürün Açıklaması alanları ile ilgili ayarlamaları yapabilirsiniz.<br/><br/>
            İlgili ayarlamaları tamamladıktan sonra sayfanın sol üst kısmında bulunan Ürünleri Ve Fiyatları Aktar butonuna tıklayın. Açılan sayfada ürün aktarımı ile ilgili aktarım kurallarını özelleştirip İşlemi Onayla butonuna tıklayarak aktarım işlemini başlatabilirsiniz.<br/><br/>
            <b>3– Aktarım Detaylarını İnceleyin</b><br/>
            Aktarım işlemi tamamlandıktan sonra aktarım raporunu inceleyebilirsiniz.<br/><br/>
            <hr className="border-t border-gray-200 my-2" />
          </div>
          <div className="flex flex-col items-center justify-center mt-6 mb-2">
            <span className="text-orange-600 font-semibold text-base text-center">Devamını Okumak İçin Kaydırın</span>
            <FiChevronDown className="text-orange-500 text-xl mt-1" />
          </div>
          <div className="flex justify-center mb-2">
            <button className="border-2 border-blue-200 text-blue-600 font-bold text-lg px-8 py-3 rounded-lg bg-white hover:bg-blue-50 transition-all shadow-sm">DETAYLI KURULUM REHBERİNİ İNCELE</button>
          </div>
        </div>
      </div>
    </div>
  );
} 