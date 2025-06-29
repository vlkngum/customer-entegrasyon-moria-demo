import React from "react";

const announcements = [
  {
    title: "XML kullanıcıları için PAZARYERİ BAZLI FİYAT KURALI ayarlarında İdefix fiyat hesaplama özelliği yayına alınmıştır.",
    date: "17 Nisan 2025 - 16:00",
  },
  {
    title: "N11 Seçenek ve Değer Eşitleme özelliği yayına alınmıştır. N11'e ürün gönderimi yapmadan önce seçenekli ürünleriniz için eşleştirme sağlayarak gönderim yapmanız gerekmektedir.",
    date: "06 Mart 2025 - 14:26",
  },
  {
    title: "Kargo Etiket Tasarlama Aracı yayına alınmıştır. Artık istediğiniz boyutta ve tasarımda kendi kargo fişi şablonunuzu tasarlayabilirsiniz. İncelemek için tıklayınız..",
    date: "21 Şubat 2025 - 16:39",
  },
  {
    title: "İdefix Entegrasyonumuz yayına alınmıştır. Kurulum için tıklayınız.",
    date: "10 Ocak 2025 - 10:12",
  },
  {
    title: "Trendyol'a ürün gönderimi yaparken, 1 Ocak 2025 itibarıyla ...",
    date: "01 Ocak 2025 - 09:00",
  },
];

export function AnnouncementsCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Duyurular ve Yenilikler</h2>
      <div className="space-y-4">
        {announcements.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
            <div className="flex-shrink-0 mt-1">
              <span className="bg-green-500 rounded-full p-2 inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.75L15.75 8.25M8.25 8.25h7.5v7.5" />
                </svg>
              </span>
            </div>
            <div className="flex-1">
              <div className="text-gray-700 text-sm mb-1">{item.title}</div>
              <div className="text-xs text-gray-400">Yayınlanma Zamanı : {item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LatestVideoCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Son Eklenen Video</h2>
      <div className="rounded-lg overflow-hidden mb-3">
      <iframe width="100%" height="140" src="https://www.youtube.com/embed/K4TOrB7at0Y?si=y8ci2XQtogoXBR02" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <div className="mb-2">
        <span className="text-sm text-gray-900 font-medium cursor-pointer hover:underline hover:text-blue-600">› YENİ - Toplu Fiyat & Stok Güncelleme</span>
      </div>
      <button
        className="w-full mt-2 py-2 rounded-full border border-gray-200 text-gray-400 font-semibold hover:bg-gray-100 cursor-pointer text-base">
        Tüm Videoları İncele
      </button>
    </div>
  );
} 