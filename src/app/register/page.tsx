"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useUser } from '@/store/hooks/useUser';
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
    desc2: "Kağıt faturaya son! Entekas ile e-fatura süreçlerinizi zahmetsizce yönetin.",
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
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    company: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  }); 
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kayıt işlemleri burada yapılacak
  };


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
 

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sol: Form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-14 py-10 bg-white">
        <div className="max-w-7xl w-full mx-auto">
          
        <div className="flex justify-between items-center w-1/2 absolute top-0 left-0 py-6 px-8 md:px-24 z-10 border-b border-gray-300">
          <Image src="/entekas-logo.png" alt="Entekas Logo" width={190} height={60} />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600 mr-1">
                <FiArrowLeft size={18} />
              </span>
              <span className="text-gray-800 font-medium">Hesabınız var mı?</span>
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Giriş Yap.
              </Link>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hesabınızı Oluşturun</h1>
          <p className="text-gray-500 mb-6 ">Entekas&apos;ın tüm özellikleriyle 7 gün ücretsiz deneyebilirsiniz.</p>
          <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">FİRMA ADINIZ</label>
            <input
              name="company"
              type="text"
              className="w-full border border-gray-200 rounded px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">YETKİLİ AD SOYAD</label>
            <input
              name="fullname"
              type="text"
              className="w-full border border-gray-200 rounded px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-600">E-POSTA ADRESİ</label>
              <input
                name="email"
                type="email"
                className="w-full border border-gray-200 rounded px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-600">
                TELEFON NO <span className="text-orange-500 text-xs font-normal">*</span>
                <span className="text-xs font-normal text-gray-400 ml-1">SMS Doğrulaması Gerekmektedir!</span>
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full border border-gray-200 rounded px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">ENTEKAS GİRİŞ PAROLANIZ</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-200 rounded px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 pr-10"
                  value={form.password}
                  onChange={handleChange}
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
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">ENTEKAS GİRİŞ PAROLANIZI DOĞRULAMA</label>
              <div className="relative">
                <input
                  name="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  className="w-full border border-gray-200 rounded px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 pr-10"
                  value={form.passwordConfirm}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                  onClick={() => setShowPasswordConfirm((v) => !v)}
                  aria-label={showPasswordConfirm ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPasswordConfirm ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <button
              type="submit"
              className="max-w-md mt-6 bg-[#1890ff] text-white font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition text-lg"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-blue-600 mr-1">
                <FiArrowRight size={20} />
              </span>
              ÜCRETSİZ HESAP OLUŞTUR
            </button>
            <div className="text-center mt-6 text-base text-gray-700 w-full  ">
              <span className="text-red-500">*</span> Kayıt Olarak{" "}
              <Link href="#" className="text-blue-600  underline">Kullanıcı Sözleşmemizi</Link> &amp;{" "}
              <Link href="#" className="text-blue-600  underline">Gizlilik Politikamızı</Link> kabul etmiş olursunuz.
            </div>
            <div className="text-center text-base text-gray-700 mt-2 w-full">
              <span className="text-red-500">*</span> Kredi kartı bilgisi <span className="text-blue-600 underline">gerektirmez.</span>
            </div>
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