"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const slides = [
  { 
    title: "Kargo Entegrasyonları",
    desc: "Kargo süreçlerini otomatik hale getirin.",
    img: "/login/login1.png",  
  },
  { 
    title: "Sipariş Yönetimi",
    desc: "Siparişlerinizi tek panelden yönetin.",
    img: "/login/login2.png",  
  },
  { 
    title: "Faturalandırma Kolaylığı",
    desc: "Faturalarınızı hızlıca oluşturun.",
    img: "/login/login3.png",  
  },
]; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [slide, setSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setError("Geçersiz e-posta veya parola");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sol: Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-24 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
          <Image src="/entekas-logo.svg" alt="Sopyo Logo" width={120} height={40} className="mb-8" />
          <div className="flex items-center justify-end mb-8">
            <span className="text-sm text-gray-500 mr-2">Hesabınız yok mu?</span>
            <a href="#" className="text-blue-600 font-semibold hover:underline">Hesap oluştur.</a>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Giriş Yapın</h1>
          <p className="text-gray-500 mb-6">Sopyo'ya hoş geldiniz, e-posta ve parolanız ile güvenli giriş yapabilirsiniz.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">E-POSTA ADRESİNİZ</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">PAROLANIZ</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <span className="text-lg">→</span> HESABINIZA GİRİŞ YAPIN
            </button>
            <div className="text-center text-gray-400 my-2">YA DA</div>
            <button
              type="button"
              className="w-full border-2 border-red-400 text-red-600 font-bold py-3 rounded-lg hover:bg-red-50 transition"
            >
              PAROLANIZI MI UNUTTUNUZ?
            </button>
          </form>
        </div>
      </div>
      {/* Sağ: Tanıtım/Slider */}
      <div className="hidden md:flex w-1/2 bg-[#188fff] flex-col justify-center items-center relative overflow-hidden">
        {/* Arka plan görseli kaldırıldı, sadece mavi arka plan sabit */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-12">
          <h2 className="text-white text-2xl font-bold mb-4 mt-12">{slides[slide].title}</h2>
          <p className="text-white text-lg mb-8">{slides[slide].desc}</p>
          <div className="bg-white rounded-xl shadow-lg p-6 flex gap-4 items-center mb-8">
            <Image src={slides[slide].img} alt="Slider" width={320} height={120} />
          </div>
          <p className="text-white text-center text-sm max-w-md">
            Hem pazaryerleri hem de e-ticaret sitenizden gelen siparişlerin kargo süreçlerini otomatikleştirin.
          </p>
          {/* Slider noktaları */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${i === slide ? "bg-white" : "bg-white opacity-60"}`}
                style={{ transition: 'all 0.3s' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}