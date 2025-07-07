"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useStores } from "@/store/hooks/useStores";
import { useIntegrations } from "@/store/hooks/useIntegrations";
import { useSession } from "next-auth/react";

interface ExtendedSession {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
  };
}

// Define the expected data structure for the client
interface IntegrationData {
  id: string;
  user_id: string;
  integration_id: number;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  integration: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    logo_url: string;
  };
}

interface BackendFieldConfig {
  value: string | null;
  description: string;
  read_only?: boolean;
}

interface GenericStoreSettingsClientProps {
  platformName: string;
  initialData: IntegrationData | null;
  defaultConfig?: Record<string, BackendFieldConfig>;
  showIntegrationStatus: boolean;
  platformType: string;
}

// Infer field type from backend key or description
function inferFieldType(key: string, description: string): string {
  if (key.toLowerCase().includes('password') || key.toLowerCase().includes('sifre')) return 'password';
  if (key.toLowerCase().includes('key') && !key.toLowerCase().includes('api')) return 'password';
  if (key.toLowerCase().includes('secret')) return 'password';
  if (key.toLowerCase().includes('description') || key.toLowerCase().includes('aciklama')) return 'textarea';
  if (description.toLowerCase().includes('açıklama') || description.toLowerCase().includes('description')) return 'textarea';
  return 'text';
}

export default function GenericStoreSettingsClient({ platformName, initialData, defaultConfig, showIntegrationStatus }: GenericStoreSettingsClientProps) {
  const { data: session } = useSession();
  const stores = useStores();
  const { createOrUpdateIntegration, isLoading } = useIntegrations();
  
  // Cast session to ExtendedSession type
  const extendedSession = session as ExtendedSession | null;


  const [formData, setFormData] = useState<Record<string, string>>({});
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState(initialData?.config?.integrationStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const rehberRef = useRef<HTMLDivElement>(null);

  // Dynamic fields from backend defaultConfig - memoized to prevent unnecessary re-renders
  const fieldsToRender = useMemo(() => {
    if (!defaultConfig) return [];
    return Object.entries(defaultConfig).map(([key, val]) => ({
      name: key,
      label: val.description,
      type: inferFieldType(key, val.description),
      placeholder: val.description,
      readOnly: !!val.read_only,
    }));
  }, [defaultConfig]);

  // Initialize form data when component mounts or when dependencies change
  useEffect(() => {
    const newFormData: Record<string, string> = {};

    fieldsToRender.forEach(field => {
      if (initialData?.config && initialData.config[field.name]) {
        const configValue = initialData.config[field.name];
        if (typeof configValue === 'object' && configValue !== null && 'value' in configValue) {
          newFormData[field.name] = (configValue as BackendFieldConfig).value || '';
        } else if (typeof configValue === 'string') {
          newFormData[field.name] = configValue;
        } else {
          newFormData[field.name] = '';
        }
      } else if (defaultConfig && defaultConfig[field.name]) {
        newFormData[field.name] = defaultConfig[field.name].value || '';
      } else {
        newFormData[field.name] = '';
      }
    });

    // Set integration status
    if (initialData?.config?.integrationStatus === "true") {
      setEntegrasyonDurumu("acik");
    } else {
      setEntegrasyonDurumu("kapali");
    }

    setFormData(newFormData);
  }, [fieldsToRender, initialData, defaultConfig, showIntegrationStatus]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScroll = () => {
    if (rehberRef.current) {
      if (rehberRef.current.scrollTop > 10) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Check if all required fields are filled
      const requiredFields = fieldsToRender.filter(field => !field.readOnly);
      const missingFields = requiredFields.filter(field => !formData[field.name]);
      
      if (missingFields.length > 0) {
        throw new Error("Lütfen tüm zorunlu alanları doldurun.");
      }

      const configData = {
        ...formData,
        integrationStatus: entegrasyonDurumu === "acik" ? "true" : "false"
      };

      // Update Redux state with new config
      stores.setStoreConfig({
        ...configData,
        integration_id: initialData?.integration_id
      });


      const integrationData = {
        integration_id: initialData?.integration_id,
        config: configData
      };

      await createOrUpdateIntegration(extendedSession?.accessToken as string, integrationData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    stores.resetStoreConfig();
    const resetFormData: Record<string, string> = {};
    fieldsToRender.forEach(field => {
      resetFormData[field.name] = "";
    });
    setFormData(resetFormData);
    setEntegrasyonDurumu("kapali");
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col i py-0 mb-8 w-full justify-start">
      <div className="w-full flex flex-col items-start">
        {/* Üst Başlık ve Sekme */}
        <div className="w-full flex flex-col items-start bg-white ">
          <div className="w-full flex items-center gap-3 py-1 px-0 ml-10">
            <div className="p-2 flex items-center justify-center">
              <Image src="/production.svg" alt="production" width={32} height={26} />
            </div>
            <span className="text-[20px] font-semibold text-gray-800">{platformName} Ayarları</span>
          </div>
          {/* Sekme Barı */}
          <div className="w-full flex border-b border-gray-200 px-0 ml-10">
            <button className="px-0 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none text-[15px] h-[38px] min-w-[140px]">API Tanımlama</button>
          </div>
        </div>
        {/* İçerik Kutuları */}
        <div className="w-full flex flex-row gap-6 mt-8 items-stretch ml-10 mr-10 justify-center">
          {/* Sol: API Bilgileri Formu ve Kargo ve Süreç Seçimleri aynı column parent'ta */}
          <div className="w-1/2 flex flex-col">
            <div className="bg-white p-4 flex flex-col gap-5 rounded-2xl border border-[#e5e7eb] shadow-md min-h-[640px] max-h-[640px] h-[640px] overflow-y-auto">
              <div className="flex items-center gap-3 mb-0 border-b border-gray-200 pb-1">
                <div className="p-0">
                  <Image src={initialData?.integration?.logo_url || '/default-logo.png'} alt="logo" width={96} height={96} className="w-20 h-20 object-contain" />
                </div>
                <div className="text-lg font-semibold text-gray-700 ">API Bilgilerini Tanımlama</div>
              </div>
              
              {/* Success/Error Messages */}
              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <strong>Başarılı!</strong> Ayarlar başarıyla kaydedildi.
                </div>
              )}
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <strong>Hata:</strong> {submitError}
                </div>
              )}

              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                {fieldsToRender.map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">
                      {field.label} {!field.readOnly && <span className="text-red-500">*</span>}
                    </label>
                    <input 
                      type={field.type}
                      className="input w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-[15px]"
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => !field.readOnly && handleInputChange(field.name, e.target.value)}
                      readOnly={field.readOnly}
                      required={!field.readOnly}
                    />
                  </div>
                ))}
                
                {showIntegrationStatus && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">ENTEGRASYON DURUMU</label>
                    <div className="flex gap-10 mt-2 justify-center border-b border-gray-200 pb-4">
                      <label
                        htmlFor="entegrasyon_acik"
                        className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'acik' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                      >
                        <span className="relative flex items-center">
                          <input
                            type="radio"
                            id="entegrasyon_acik"
                            name="entegrasyon_durumu"
                            checked={entegrasyonDurumu === 'acik'}
                            onChange={() => setEntegrasyonDurumu('acik')}
                            className="peer appearance-none w-4 h-4 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                          />
                          <span className={`absolute left-0 top-0 w-4 h-4 rounded-full border-2 ${entegrasyonDurumu === 'acik' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                          {entegrasyonDurumu === 'acik' && (
                            <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-blue-600"></span>
                          )}
                        </span>
                        <span className={`font-bold text-[14px] ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGRASYON AÇIK</span>
                      </label>
                      <label
                        htmlFor="entegrasyon_kapali"
                        className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'kapali' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                      >
                        <span className="relative flex items-center">
                          <input
                            type="radio"
                            id="entegrasyon_kapali"
                            name="entegrasyon_durumu"
                            checked={entegrasyonDurumu === 'kapali'}
                            onChange={() => setEntegrasyonDurumu('kapali')}
                            className="peer appearance-none w-4 h-4 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                          />
                          <span className={`absolute left-0 top-0 w-4 h-4 rounded-full border-2 ${entegrasyonDurumu === 'kapali' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                          {entegrasyonDurumu === 'kapali' && (
                            <span className="absolute left-1 top-1 w-2 h-2 rounded-full bg-blue-600"></span>
                          )}
                        </span>
                        <span className={`font-bold text-[14px] ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGRASYON KAPALI</span>
                      </label>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end mt-4 gap-3">
                  <button 
                    type="button" 
                    onClick={handleReset}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-7 rounded-lg text-[15px] flex items-center gap-2 min-w-[160px] h-[44px]"
                  >
                    SIFIRLA
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting || isLoading}
                    className="bg-[#11c26d] hover:bg-[#1ed57d] disabled:bg-gray-400 text-white font-bold py-2 px-7 rounded-lg text-[15px] flex items-center gap-2 min-w-[160px] h-[44px]"
                  >
                    {isSubmitting ? 'KAYDEDİLİYOR...' : 'AYARLARI KAYDET'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-white p-8 flex flex-col gap-4 rounded-2xl shadow-md border border-[#E5E7EB] mt-4">
              <div className="text-lg font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-4">Kargo ve Süreç Seçimleri</div>
              <form className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ucretsiz_kargo" className="w-4 h-4 rounded border-gray-300" />
                  <label htmlFor="ucretsiz_kargo" className="text-[14px] text-gray-700">{platformName}&#39;e gönderilecek ürünlerde ücretsiz kargo uygulansın mı?</label>
                </div>
                <div className="flex gap-4 border-b border-gray-200 pb-4">
                  <div className="flex flex-col flex-1">
                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Kargoya Veriliş Zamanı</label>
                    <select className="input">
                      <option>Aynı Gün</option>
                      <option>Ertesi Gün</option>
                    </select>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="block text-gray-700 font-medium mb-1 text-[14px]">Kargoya Veriliş Saati</label>
                    <select className="input">
                      {Array.from({ length: 24 }, (_, i) => (
                        <option key={i}>{i.toString().padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-bold py-2 px-7 rounded-lg text-[15px] flex items-center gap-2 min-w-[160px] h-[44px]">
                    AYARLARI KAYDET
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Sağ: Kurulum Rehberi */}
          <div className="flex-1 min-w-0 bg-white p-8 flex flex-col gap-3 rounded-2xl mr-15 border border-[#e5e7eb] shadow-md w-1/2 mx-0 min-h-[640px] max-h-[640px] h-[640px] overflow-y-auto">
            <div className="flex items-center justify-between mb-2 border-b border-gray-200 pb-3">
              <div className="text-lg font-semibold">Kurulum Rehberi</div>
              <button className="group flex items-center gap-2 bg-[#fedfdf] text-[#d00527] font-semibold px-4 py-2 rounded-full hover:bg-[#d0021b] hover:text-white text-sm shadow-none focus:outline-none transition-colors">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#d00527] group-hover:bg-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polygon 
                    points="6,4.5 12,8 6,11.5" 
                    className="fill-white group-hover:fill-[#d00527] transition-colors"
                  />
                </svg>
              </span>
              VİDEOLU ANLATIM
            </button>
            </div>
            
            <div
              ref={rehberRef}
              onScroll={handleScroll}
              className="bg-white text-gray-800 text-[15px] leading-relaxed border-b border-gray-200 pb-3 overflow-y-auto flex-1 pr-2"
              style={{ transition: 'box-shadow 0.2s', boxShadow: showScrollHint ? '0 2px 8px 0 rgba(239,68,68,0.04)' : 'none' }}
            >
              <div className="font-semibold">1- API Bilgilerinizi Tanımlayın</div>
              <div className="mt-1 font-light">
                {platformName} entegrasyonunu gerçekleştirebilmek için ilk olarak API Bilgisi alanı gerekmektedir. Bu bilgilere {platformName} yönetim panelinizden ulaşabilirsiniz.<br />
                *API bilgisini nasıl alacağınız öğrenmek için ilgili destek yazımıza inceleyebilirsiniz.<br />
                API bilgisini aldıktan sonra {platformName} API Ayarları sayfasının API Bilgilerini Tanımlama kısmında bulunan gerekli alanları doldurmalısınız.<br />
              </div>
              <div className="font-semibold mt-2">2- Ürünlerinizi Aktarın</div>
              <div className="mt-1 font-light">
              Ürünlerinizi Entekas&#39;a aktarmadan önce Kargo ve Süreç Seçimlerinizi ve Sabit Ürün Açıklaması alanları ile ilgili ayarlamaları yapabilirsiniz.

İlgili ayarlamaları tamamladıktan sonra sayfanın sol üst kısmında bulunan Ürünleri Ve Fiyatları Aktar butonuna tıklayın. Açılan sayfada ürün aktarımı ile ilgili aktarım kurallarını özelleştirip İşlemi Onayla butonuna tıklayarak aktarma işlemini başlatabilirsiniz.
              </div>
              <div className="font-semibold mt-2">3- Aktarım Detaylarını İnceleyin</div>
              <div className="mt-1 font-light">
              Aktarım işlemi tamamlandıktan sonra sayfanın sağ üst kısmında bulunan Aktarım Detayları alanında aktarım işlemi ile ilgili detaylı bilgiye ulaşabilirsiniz.

Mavi alanda aktarılan toplam ürün adedi bilgisi yer alır.

Yeşil alanda aktarılan ürünler ile eşleşen ürünlerin(Entekas&#39;da olan ürünlerle) toplam adet bilgisi yer alır.

Turuncu alanda ise aktarılan ürünler ile eşleşmeyen ürünlerin(Entekas&#39;da olan ürünlerle) toplam adet bilgisi yer alır.
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <button className="border-2 border-[#eff6ff] text-blue-600 font-bold text-[15px] px-6 py-2 rounded-lg bg-white hover:bg-[#eff6ff] transition-all shadow-sm min-w-[260px] h-[44px]">DETAYLI KURULUM REHBERİNİ İNCELE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 