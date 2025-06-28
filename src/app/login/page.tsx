"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const slides = [
  { 
    title: "Toplu Ürün Yükleme",
    desc: "Pazaryerlerine ve E-ticaret sitenize toplu ürün yükleyin süreçlerinizi hızlandırın.",
    desc2: "Kategorilerinizi, seçeneklerinizi ve markalarınızı eşitleyin bir kaç adımda toplu ürün yüdemesi gerçekleştirin!",
    img: "/login/login1.png",  
  }, 
  { 
    title: "Stoksuz Satış / Dropshipping / XML Kaynak Yönetimi",
    desc: "Gelişmiş XML yönetimi ile rakiplerinize fark atın.",
    desc2: "İstediğiniz özelleştirmeleri yapın ve toplu olarak dilediğiniz pazaryerine yükleyin!",
    img: "/login/login2.png",  
  },
  { 
    title: "E-fatura Entegrasyonu",
    desc: "Pazaryeri, e-ticaret siteniz ve sosyal medyadan gelen siparişlerin e-fatura süreçlerini tek bir ekrandan yönetin.",
    desc2: "Kağıt faturaya son! Sopyo ile e-fatura süreçlerinizi zahmetsizce yönetin.",
    img: "/login/login4.png",  
  }, 
  { 
    title: "Kargo Entegrasyonları",
    desc: "Kargo süreçlerini otomatik hale getirin.",
    desc2: "Hem pazaryerleri hem de e-ticaret sitenizden gelen siparişlerin kargo süreçlerini otomatikleştirin.",
    img: "/login/login5.png",  
  }, 
  { 
    title: "Muhasebe/ERP Entegrasyonu",
    desc: "Siparişlerinizi muhasebe programınıza aktarın!",
    desc2: "Pazaryeri ve E-ticaret sitenizden gelen siparişlerinizi muhasebe programınıza aktarabilirsiniz",
    img: "/login/login6.png",  
  },  
  { 
    title: "E-ticaret Altyapı Entegrasyonu",
    desc: "Toplu ürün yükleyin, stok ve fiyat senkronizasyonu sağlayın.",
    desc2: "E-ticaret sitenizdeki tırn ürünlerin stok, fiyat ve kargo senkronizasyonunu sağlayabilirsiniz.",
    img: "/login/login7.png",  
  },
  { 
    title: "Pazaryerlerindeki Stok Sorununa Çözüm",
    desc: "E-ticaret pazaryeri satıcılarının stok ve finansman sorunlarına WorqCompany E-Ticaret Finansmanı ile çözüm sunuyoruz.",
    desc2: "Hemen Başvur",
    img: "/login/login8.png",  
  },
  
]; 

export default function LoginPage() { 
  const [slide, setSlide] = useState(0); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      // Başarılı girişte yönlendirme zaten useEffect ile olacak
    } else {
      setError('Geçersiz kullanıcı adı veya şifre');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sol: Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-24 py-12 bg-white">
        <div className="max-w-7xl w-full mx-auto">
          
          <div className="flex justify-between items-center w-1/2 mb-8 absolute top-8 left-0 px-8 md:px-24 z-10">
            <Image src="/entekas-logo.png" alt="Entekas Logo" width={190} height={60} />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600 mr-1">
                <FiArrowLeft size={18} />
              </span>
              <span className="text-sm text-gray-800 font-medium">Hesabınız yok mu?</span>
              <Link
                href="/register"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Hesap oluştur.
              </Link>
            </div>
          </div>

          <h1 className="text-3xl font-medium text-gray-800 mb-2">Giriş Yapın</h1>
          <p className="text-gray-500 mb-6">Sopyo'ya hoş geldiniz, e-posta ve parolanız ile güvenli giriş yapabilirsiniz.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">E-POSTA ADRESİNİZ</label>
              <input
                type="input"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-1 focus:ring-blue-500 outline-none text-gray-600"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">PAROLANIZ</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none pr-10 text-gray-600"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                </button>
              </div>
            </div>
            {error && (
              <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</div>
            )}

            <div className="max-w-xs w-full mx-auto">
              <button
                type="submit"
                className="w-full bg-[#1890ff] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-blue-600 mr-1">
                  <FiArrowRight size={17} />
                </span> HESABINIZA GİRİŞ YAPIN
              </button>
              <div className="text-center text-gray-400 my-2 font-light">YA DA</div>
              <button
                type="button"
                className="w-full border-2 border-red-400 text-red-600 font-medium py-3 rounded-lg hover:bg-red-100 transition"
              >
                PAROLANIZI MI UNUTTUNUZ?
              </button>
            </div>
            
          </form>
        </div>
      </div>
      {/* Sağ: Tanıtım/Slider */}
      <div className="hidden md:flex w-1/2 bg-[#188fff] flex-col justify-center items-center relative overflow-hidden">
        {/* Arka plan görseli kaldırıldı, sadece mavi arka plan sabit */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-12">
          <h2 className="text-white text-4xl font-semibold mb-4 mt-12 text-center" >{slides[slide].title}</h2>
          <p className="text-white text-xl mb-8 font-medium text-center">{slides[slide].desc}</p>
          <div className="rounded-xl  p-6 flex gap-4 items-center mb-8">
            <Image src={slides[slide].img} alt="Slider" width={1200} height={1200} className="w-full h-auto object-cover" />
          </div>
          <p className="text-white text-center text-sm max-w-md">
          {slides[slide].desc2}
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