"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { GiShop } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';

export default function ErpDetailPage() {
  const params = useParams();
  const erpName = params?.name || '';

  if (erpName === 'Trendyol E-faturam (Sovos)') {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8">
        <div className="w-full flex flex-col items-center bg-white shadow-sm">
          <div className="w-full max-w-7xl flex items-center gap-3 py-6 px-4">
            <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
              <span className="text-2xl text-blue-600"><GiShop /></span>
            </div>
            <span className="text-2xl font-semibold text-gray-800">DigitalPlanet Ayarları</span>
          </div>
          <div className="w-full max-w-7xl flex border-b border-gray-200 px-4">
            <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">Ayarlar</button>
          </div>
        </div>
        <div className="w-full max-w-7xl mb-6 px-4 mt-4">
          <div className="text-base flex items-center gap-1 mb-2">
            <Link href="/" className="font-semibold text-[#222] hover:underline">Sopyo</Link>
            <span className="mx-1 text-gray-400">/</span>
            <Link href="/settings" className="text-[#444] hover:underline">Ayarlar</Link>
            <span className="mx-1 text-gray-400">/</span>
            <span className="text-gray-400">DigitalPlanet Ayarları</span>
          </div>
        </div>
        <form className="w-full max-w-7xl bg-white rounded-lg shadow-md p-8 flex flex-col gap-8">
          {/* DigitalPlanet Bilgileri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">DIGITALPLANET ŞİRKET KODU*</label>
              <input className="w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold mb-1">DIGITALPLANET KULLANICI ADI*</label>
              <input className="w-full border rounded px-3 py-2" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold mb-1">DIGITALPLANET KULLANICI ŞİFRESİ*</label>
              <input className="w-full border rounded px-3 py-2" type="password" placeholder="" />
            </div>
            <div>
              <label className="block font-semibold mb-1">FATURA TİPİ*</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Temel Fatura</option>
                <option>Ticari Fatura</option>
              </select>
            </div>
          </div>
          {/* Vergi Bilgileri */}
          <div>
            <div className="font-semibold mb-2">Vergi Bilgileri</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block mb-1">Vergi Numarası*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Vergi Dairesi*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">MERSİS Numarası*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Sicil Numarası*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
            </div>
          </div>
          {/* Fatura Bilgileri */}
          <div>
            <div className="font-semibold mb-2">Fatura Bilgileri</div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <label className="block mb-1">Gönderici Posta Adresi*</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">E-Fatura Numara Eki*</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Üç harf, örneğin Sopyo şrl" />
              </div>
              <div>
                <label className="block mb-1">E-Arşiv Numara Eki</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Üç harf, örneğin Sopyo şrl" />
              </div>
              <div>
                <label className="block mb-1">Son Kesilen Fatura No</label>
                <input className="w-full border rounded px-3 py-2" defaultValue={0} />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              (Fatura ön ekleri hakkında *)Fatura seri numaraları oluşturulurken numaraların başına size özel 3 harf eklenmektedir. Kendi ön ekinizi 3 büyük harften oluşacak şekilde belirtmeniz gerekmektedir. 1. ön ek e-Fatura sisteminde, 2. ön ek e-Arşiv sistemine gönderilen faturalar için kullanılacak. Entegratör değiştiriyorsanız, fatura numaranızın çakışmaması için yeni ön ekler belirleyiniz.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div>
                <label className="block mb-1">Telefon*</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Faturada yazacak olan telefon numarası" />
              </div>
              <div>
                <label className="block mb-1">E-Posta*</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Faturada yazacak olan E-posta adresi" />
              </div>
              <div>
                <label className="block mb-1">Web Sitesi</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block mb-1">Fatura İmzası</label>
                <input type="file" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Firma Logosu</label>
                <input type="file" className="w-full border rounded px-3 py-2" />
              </div>
            </div>
          </div>
          {/* Fatura Sabit Bilgileri */}
          <div>
            <div className="font-semibold mb-2">Fatura Sabit Bilgileri</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1">Sabit Fatura Açıklaması</label>
                <input className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block mb-1">Ön Tanımlı Kargo Firması*</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Kargo Şirketi Seç</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-1">Pazaryerlerinden Gelen Ara Fark Açıklaması</label>
              <input className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          {/* Ek Ayarlar */}
          <div>
            <div className="font-semibold mb-2">Ek Ayarlar</div>
            <div className="mb-4">
              <label className="block mb-1">E-fatura/E-Arşiv faturalarınızda kargo kampanya kodu barkod olarak eklensin mi?</label>
              <div className="flex gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="barkod" id="barkod_hayir" className="accent-blue-600" defaultChecked />
                  <label htmlFor="barkod_hayir">HAYIR</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="barkod" id="barkod_evet" className="accent-blue-600" />
                  <label htmlFor="barkod_evet">EVET</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Entegrasyon Durumu</label>
              <div className="flex gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <input type="radio" name="entegrasyon" id="entegrasyon_pasif" className="accent-blue-600" defaultChecked />
                  <label htmlFor="entegrasyon_pasif">PASİF</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="entegrasyon" id="entegrasyon_aktif" className="accent-blue-600" />
                  <label htmlFor="entegrasyon_aktif">AKTİF</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg text-lg">KAYDET</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8">
      {/* Üst Başlık ve Sekme */}
      <div className="w-full flex flex-col items-center bg-white shadow-sm">
        <div className="w-full max-w-7xl flex items-center gap-3 py-6 px-4">
          <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
            <span className="text-2xl text-blue-600"><GiShop /></span>
          </div>
          <span className="text-2xl font-semibold text-gray-800">{erpName} Ayarları</span>
        </div>
        {/* Sekme Barı */}
        <div className="w-full max-w-7xl flex border-b border-gray-200 px-4">
          <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">API Tanımlama</button>
        </div>
      </div>
      {/* Breadcrumb */}
      <div className="w-full max-w-7xl mb-6 px-4 mt-4">
        {/* Breadcrumb can be added here if needed */}
      </div>
      {/* İçerik Kutuları */}
      <div className="w-full max-w-7xl flex gap-8 px-4">
        {/* Sol: API Bilgileri Formu */}
        <div className="w-full bg-white p-8 flex flex-col gap-6 border-r border-gray-100 min-w-[350px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <GiShop className="w-10 h-10 object-contain text-blue-600" />
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
            ERP entegrasyonunu gerçekleştirebilmek için ilk olarak API Bilgisi almanız gerekmektedir. Bu bilgiye yönetim panelinizden ulaşabilirsiniz.<br/><br/>
            *API bilgisini nasıl alacağınızı öğrenmek için ilgili destek yazımızı inceleyebilirsiniz.<br/><br/>
            API bilgisini aldıktan sonra ERP API Ayarları sayfasının API Bilgileri Tanımlama kısmında bulunan API Name alanına API Kullanıcı Adını, API KEY kısmına da Şifre bilgilerini yazmalısınız.<br/><br/>
            <b>2– Ürünlerinizi Aktarın</b><br/>
            Ürünlerinizi aktarmadan önce Kargo ve Süreç Seçimlerinizi ve Sabit Ürün Açıklaması alanları ile ilgili ayarlamaları yapabilirsiniz.<br/><br/>
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