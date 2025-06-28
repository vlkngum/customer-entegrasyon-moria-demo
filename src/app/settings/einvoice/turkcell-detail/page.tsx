"use client";
import Image from "next/image";
import { GiShop } from "react-icons/gi";

export default function TurkcellEFaturaAyar() {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8">
      {/* Başlık ve Breadcrumb */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl text-[#1e90ff]">
          <span className="text-2xl text-blue-600"><GiShop /></span>
          </span>
          <h1 className="text-2xl font-semibold text-[#222]">Turkcell E-Fatura Ayarları</h1>
        </div>
        <div className="text-[#1e90ff] text-sm font-medium mb-6 border-b border-blue-100 pb-2">
          <span className="border-b-2 border-[#1e90ff] pb-1">Turkcell E-Fatura Ayarları</span>
        </div>
        {/* İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol: Form Kartı */}
          <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-6 w-full">
            {/* Logo ve başlık */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-[#ffe14d] flex items-center justify-center">
                <Image src="/logo-dark.svg" alt="Turkcell Logo" width={48} height={48} className="object-contain" />
              </div>
              <span className="text-xl font-semibold text-[#222]">Turkcell E-Fatura Ayarları</span>
            </div>
            {/* Form */}
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API KEY <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  FATURA TİPİ <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Temel Fatura</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ÖN TANIMLI KARGO FİRMASI<span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Kargo Şirketi Seç</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KDV İSTİSNA KODU</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="-------------------" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-FATURA/E-ARŞİV FATURALARINIZDA KARGO KAMPANYA KODU EKLENSİN Mİ ?</label>
                <div className="flex items-center gap-6 bg-[#f8fafc] rounded-md px-3 py-2 border border-gray-200">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="kargoKampanya" className="form-radio text-blue-600" value="evet" />
                    <span className="text-gray-500">Evet</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="kargoKampanya" className="form-radio text-blue-600" value="hayir" />
                    <span className="text-gray-700 font-semibold">Hayır</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ENTEGRASYON DURUMU</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="entegrasyon" className="form-radio text-blue-600" value="acik" />
                    <span className="text-gray-700">Entegrasyon Açık</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="entegrasyon" className="form-radio text-blue-600" value="kapali" defaultChecked />
                    <span className="text-gray-700">Entegrasyon Kapalı</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button type="button" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded px-6 py-2 transition">TEST ET</button>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded px-6 py-2 ml-auto transition flex items-center gap-2">
                  AYARLARI KAYDET
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M13.293 17.293a1 1 0 0 1 1.414 0l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 1 1.414-1.414l5.707 5.707a1 1 0 0 1 0 1.414l-5.707 5.707a1 1 0 0 1-1.414-1.414Z"></path><path fill="#fff" d="M19 12a1 1 0 0 1-1 1H5a1 1 0 1 1 0-2h13a1 1 0 0 1 1 1Z"></path></svg>
                </button>
              </div>
            </form>
          </div>
          {/* Sağ: Kurulum Rehberi */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 h-fit w-full">
            <h2 className="text-lg font-semibold text-[#222] mb-2">Kurulum Rehberi</h2>
            <div className="text-gray-700 text-sm leading-relaxed max-h-72 overflow-y-auto pr-2">
              Turkcell E-Fatura API bilgisi almak için Turkcell E-Şirket portalına giriş yapıyoruz. Açılan sayfadan kullanıcı adı ve şifrenizi yazarak üye girişi yapıyoruz. Sonrasında cep telefonunuza tek kullanımlık şifre gönderilecek, bu şifreyi ilgili alana yazıp Onayla butonuna tıklıyoruz.<br/><br/>
              Turkcell E-Şirket hesabınıza giriş yaptıktan sonra sayfanın sağ üst kısmından e-posta adresinizin yazdığı alan / Profilim menüsüne tıklıyoruz.<br/><br/>
              Açılan sayfada sol menüden API Yönetimi sekmesine tıklıyoruz.<br/><br/>
              API Yönetimi sayfasında sağ üst kısımda bulunan Yeni API Anahtarı butonuna tıklıyoruz.<br/><br/>
              Açılan pencereden Lütfen oluşturulacak API anahtarı için bir isim belirleyin alanına Entekas yazıyoruz ve Oluştur butonuna tıklıyoruz.<br/><br/>
              Oluşturulan API anahtarını seçip <b>Anahtarı Kopyala</b> butonuna tıklıyoruz. Kopyaladığınız API anahtarını entegrasyon için Turkcell E-Fatura Ayarları sayfasındaki ilgili alana yapıştırıyoruz.<br/><br/>
              Turkcell E-Fatura Entegrasyonunun nasıl yapılacağını <a href="https://www.notion.so/c4dc75644b049dab3e557409346a9fb?psv=21" target="_blank" className="text-blue-600 underline">[Turkcell E-Fatura Entegrasyonu]</a> kısmından öğrenebilirsiniz.
            </div>
            <button className="mt-2 border border-blue-500 text-blue-600 font-semibold rounded px-4 py-2 hover:bg-blue-50 transition self-end">
              DETAYLI KURULUM REHBERİNİ İNCELE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
