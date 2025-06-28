"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const integrations = [
  { name: "Hepsiburada", icon: "/hepsiburada.png" },
  { name: "N11", icon: "/n11-ico.png" },
  { name: "Amazon", icon: "/amazon.png" },
  { name: "Trendyol", icon: "/trendyol-ico.png" },
  { name: "Akakçe", icon: "/akakce-ico.png" },
  { name: "Çiçeksepeti", icon: "/ciceksepetiSinglePrice.png" },
  { name: "PttAVM", icon: "/ptt-ico.png" },
  { name: "Pazaryama", icon: "/pzrm-ico.png" },
  { name: "İdefix", icon: "/idefix.png" },
];

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f3f8fe]">
      {/* Üst Navbar */}
      <header className="w-full bg-white shadow-sm flex flex-col">
        
        <nav className="flex justify-center items-center gap-12 pt-10">
          <button className="text-[#1a6cff] font-semibold text-lg border-b-2 border-[#1a6cff] pb-1 px-2">Hesabım</button>
          <button
            className="text-gray-500 font-semibold text-lg hover:text-[#1a6cff] pb-1 px-2"
            onClick={() => router.push("/settings/account-edit")}
          >
            Şifre Değiştir
          </button>
          <button
            className="text-gray-500 font-semibold text-lg hover:text-[#1a6cff] pb-1 px-2"
            onClick={() => router.push("/settings")}
          >
            Genel Ayarlar
          </button>
        </nav>
      </header>

      {/* İçerik */}
      <div className="flex w-full bg-[#f3f8fe] min-h-[calc(100vh-90px)]">
        {/* Sol Profil Kartı */}
        <aside className="w-1/3 flex flex-col items-center pt-10">
          <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
          <div className="text-2xl font-bold mb-2">deneme</div>
          <div className="text-center text-gray-600 text-base max-w-xs px-2">
            Hesabım sayfasından şu an kullanmakta olduğunuz tüm hizmetleri görüntüleyebilir. <span className="font-bold">Satın alma</span> veya <span className="font-bold">Yenileme</span> işlemlerini gerçekleştirebilirsiniz.
          </div>
        </aside>

        {/* Sağ Kart */}
        <main className="flex-1 flex flex-col items-center pt-10">
          <section className="bg-white rounded-2xl shadow p-10 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Sol: Başlık ve ikonlar */}
              <div className="md:col-span-2 flex flex-col justify-start">
                <div className="text-gray-500 font-medium text-base mb-1">Mevcut Paketiniz</div>
                <div className="text-3xl font-extrabold mb-4">7 Günlük Ücretsiz Deneme</div>
                <div className="flex items-center gap-4 flex-wrap mb-6">
                  <Image src="/hepsiburada.png" alt="Hepsiburada" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/n11-ico.png" alt="N11" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/amazon.png" alt="Amazon" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/trendyol-ico.png" alt="Trendyol" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/akakce-ico.png" alt="Akakçe" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/ciceksepetiSinglePrice.png" alt="Çiçeksepeti" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/ptt-ico.png" alt="PttAVM" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/pzrm-ico.png" alt="Pazaryama" className="w-16 h-16 rounded-full bg-white" />
                  <Image src="/idefix.png" alt="İdefix" className="w-16 h-16 rounded-full bg-white" />
                </div>
                <div className="text-gray-700 text-base mt-2">
                  Ücretsiz deneme süreniz <span className="font-bold">27 Haziran 2025</span> tarihinde sonlanacaktır. Deneme süreniz bitmeden yaptığınız satın alımlarda, kalan süreniz paketlerinize eklenecektir.
                </div>
              </div>
              {/* Sağ: Butonlar */}
              <div className="flex flex-col gap-6 items-center md:items-end justify-center h-full w-full">
                <button className="flex items-center gap-2 bg-[#1a6cff] hover:bg-[#1870e8] text-white px-10 py-4 rounded-lg font-bold text-lg w-full md:w-60 justify-center" onClick={() => router.push('/subscriptions')}>
                  <FaArrowRight />
                  PAKET SATIN AL
                </button>
                <button className="flex items-center gap-2 bg-white border-2 border-red-500 text-red-500 px-10 py-4 rounded-lg font-bold text-lg w-full md:w-60 justify-center hover:bg-red-50">
                  <span className="bg-white bg-opacity-20 rounded-full p-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z" /></svg>
                  </span>
                  HESABI KAPAT
                </button>
              </div>
            </div>
          </section>

          {/* Alt Kartlar */}
          <div className="w-full flex flex-col gap-8 items-center mt-10">
            {/* Mevcut Entegrasyon Listeniz */}
            <section className="bg-white rounded-2xl shadow p-10 w-full max-w-4xl">
              <div className="text-gray-500 font-medium text-base mb-1">Hesabınıza tanımlı olan entegrasyonlar</div>
              <div className="text-2xl font-extrabold mb-8">Mevcut Entegrasyon Listeniz</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-sm">
                      <th className="py-2 px-4 font-semibold">ENTEGRASYON</th>
                      <th className="py-2 px-4 font-semibold">BİTİŞ TARİHİ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {integrations.map((item) => (
                      <tr key={item.name} className="border-none">
                        <td className="flex items-center gap-4 py-4 px-4 text-lg">
                          <Image src={item.icon} alt={item.name} className="w-12 h-12 rounded-full bg-white" />
                          <span>{item.name}</span>
                        </td>
                        <td className="py-4 px-4 text-lg">27 Haziran 2025</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ödeme Geçmişiniz */}
            <section className="bg-white rounded-2xl shadow p-10 w-full max-w-4xl">
              <div className="text-2xl font-extrabold mb-8">Ödeme Geçmişiniz</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-sm">
                      <th className="py-2 px-4 font-semibold">PAKET TÜRÜ</th>
                      <th className="py-2 px-4 font-semibold">ÖDEME TARİHİ</th>
                      <th className="py-2 px-4 font-semibold">MEBLAĞ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 px-4 text-gray-400" colSpan={3}>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
