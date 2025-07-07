"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useEticaret } from "@/store/hooks/useGenericEcommerce";
import { useIntegrations } from "@/store/hooks/useIntegrations";
import { useSession } from "next-auth/react";
import { IntegrationData } from "@/utils/requests/integrationService";

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

interface BackendFieldConfig {
  value: string | null;
  description: string;
  read_only?: boolean;
}

interface GenericEcommerceSettingsClientProps {
  platformName: string;
  initialData: IntegrationData | null;
  defaultConfig?: Record<string, BackendFieldConfig>;
  showIntegrationStatus: boolean;
}

// Infer field type from backend key or description
function inferFieldType(key: string, description: string): string {
  if (key.toLowerCase().includes('password') || key.toLowerCase().includes('sifre')) return 'password';
  if (key.toLowerCase().includes('key') && !key.toLowerCase().includes('api')) return 'password';
  if (key.toLowerCase().includes('description') || key.toLowerCase().includes('aciklama')) return 'textarea';
  if (description.toLowerCase().includes('açıklama') || description.toLowerCase().includes('description')) return 'textarea';
  return 'text';
}

export default function GenericEcommerceSettingsClient({ platformName, initialData, defaultConfig, showIntegrationStatus }: GenericEcommerceSettingsClientProps) {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const eticaret = useEticaret();
  const { createOrUpdateIntegration, isLoading } = useIntegrations();

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [entegrasyonDurumu, setEntegrasyonDurumu] = useState(initialData?.config?.integrationStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Check if all required fields are filled
      const requiredFields = fieldsToRender.filter(field => field.name !== 'sabitAciklamaOn' && field.name !== 'sabitAciklamaSon');
      const missingFields = requiredFields.filter(field => !formData[field.name]);
      
      if (missingFields.length > 0) {
        throw new Error("Lütfen tüm zorunlu alanları doldurun.");
      }

      const configData = {
        ...formData,
        integrationStatus: entegrasyonDurumu === "acik" ? "true" : "false"
      };

      // Update Redux state with new config
      eticaret.setConfig({
        ...configData,
        integration_id: initialData?.integration_id
      });


      const integrationData = {
        integration_id: initialData?.integration_id,
        config: configData
      };

      await createOrUpdateIntegration(session?.accessToken as string, integrationData);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Bir hata oluştu. Lütfen tekrar deneyin.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    eticaret.resetConfig();
    const resetFormData: Record<string, string> = {};
    fieldsToRender.forEach(field => {
      resetFormData[field.name] = "";
    });
    setFormData(resetFormData);
    setEntegrasyonDurumu("kapali");
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  // Special handling for Shopier (no form fields, just integration status)
  if (fieldsToRender.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8 bg-[#f2f8ff]">
        <div className="w-full flex flex-col items-start bg-white px-2 md:px-4 lg:px-6">
          <div className="w-full flex items-center gap-3 py-6 px-0">
            <Image src="/production.svg" alt="shopier" width={32} height={26} />
            <span className="text-2xl font-semibold text-gray-800">{platformName} Ayarları</span>
          </div>
          <div className="w-full flex px-0">
            <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">API Tanımlama</button>
          </div>
        </div>
        {submitError && (
          <div className="w-full px-2 md:px-4 lg:px-6 mt-4">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {submitError}
            </div>
          </div>
        )}
        {submitSuccess && (
          <div className="w-full px-2 md:px-4 lg:px-6 mt-4">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Ayarlar başarıyla kaydedildi!
            </div>
          </div>
        )}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-4 lg:px-6 mt-8 items-stretch">
          <div className="bg-white p-8 flex flex-col gap-6 rounded-xl shadow-sm min-w-[320px] h-full max-h-[450px] self-stretch">
            <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-200 pb-4">
              <div className="text-xl font-semibold text-[#37474f]">{platformName} Entegrasyon Ayarları</div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[#5d6e76] font-black mb-1">
                  {platformName.toUpperCase()} UYGULAMASI <span className="text-red-500">*</span>
                </label>
                <a
                  href="#"
                  className="flex items-center gap-2 bg-[#19c2d1] hover:bg-[#13aab7] text-white font-semibold px-6 py-3 rounded-md text-base transition-colors w-1/2 justify-center mt-2 mb-2"
                >
                  <svg className="text-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Eklentiyi indirmek için tıklayınız
                </a>
              </div>
              <div>
                <label className="block text-[#5d6e76] font-black mb-1">ENTEGRASYON DURUMU</label>
                <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 mt-2 border-b-2 border-gray-200 pb-4">
                  <label
                    htmlFor="entegrasyon_acik"
                    className={`flex-1 flex items-center gap-3 px-6 py-4 min-w-[160px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'acik' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        id="entegrasyon_acik"
                        name="entegrasyon_durumu"
                        checked={entegrasyonDurumu === 'acik'}
                        onChange={() => setEntegrasyonDurumu('acik')}
                        disabled={isSubmitting}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                      />
                      <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${entegrasyonDurumu === 'acik' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                      {entegrasyonDurumu === 'acik' && (
                        <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <span className={`font-bold ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
                  </label>
                  <label
                    htmlFor="entegrasyon_kapali"
                    className={`flex-1 flex items-center gap-3 px-6 py-4 min-w-[160px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'kapali' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        id="entegrasyon_kapali"
                        name="entegrasyon_durumu"
                        checked={entegrasyonDurumu === 'kapali'}
                        onChange={() => setEntegrasyonDurumu('kapali')}
                        disabled={isSubmitting}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                      />
                      <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${entegrasyonDurumu === 'kapali' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                      {entegrasyonDurumu === 'kapali' && (
                        <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <span className={`font-bold ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-base flex items-center gap-2 disabled:opacity-50"
                >
                  SIFIRLA
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-bold py-3 px-10 rounded-lg text-base flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      KAYDEDİLİYOR...
                    </>
                  ) : (
                    <>
                      AYARLARI KAYDET
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          {/* Sağ: Kurulum Rehberi */}
          <div className="bg-white p-8 flex flex-col gap-4 rounded-xl border border-[#e5e7eb] shadow-sm min-w-[320px] h-full self-stretch max-h-[450px]">
            <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-4">
              <div className="text-xl text-[#37474f] font-semibold">Kurulum Rehberi</div>
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
            <div className="bg-white text-gray-800 text-base leading-relaxed border-b border-gray-200 pb-4 max-h-[300px] overflow-y-auto pr-2">
              <div className="font-semibold">1- {platformName} Bağlantısı Kurun</div>
              <div className="mt-2 font-light">
                {platformName} entegrasyonunu gerçekleştirebilmek için ilk olarak sol tarafta yer alan &quot;{platformName}&apos;a bağlanmak için tıklayın&quot; butonuna tıklayın. Açılan sayfa sizi {platformName}&apos;a yönlendirecek. Mağaza bilgileriniz ile giriş sağlayın. Giriş sağladıktan sonra {platformName} sizden Entekas ile entegrasyon için onay vermenizi isteyecek, açılan modalı onaylayın.
              </div>
            </div>
            <div className="flex justify-center">
              <button className="border-2 border-[#eff6ff] text-blue-600 font-bold text-lg px-8 py-3 rounded-lg bg-white hover:bg-[#eff6ff] transition-all shadow-sm">
                DETAYLI KURULUM REHBERİNİ İNCELE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard layout for most platforms
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center py-0 mb-8 bg-[#f2f8ff]">
      <div className="w-full flex flex-col items-start bg-white px-2 md:px-4 lg:px-6">
        <div className="w-full flex items-center gap-3 py-6 px-0">
          <Image src="/production.svg" alt={platformName.toLowerCase()} width={32} height={26} />
          <span className="text-2xl font-semibold text-gray-800">{platformName} Ayarları</span>
        </div>
        <div className="w-full flex px-0">
          <button className="px-4 py-2 text-blue-600 font-semibold border-b-2 border-blue-600 bg-white focus:outline-none">API Tanımlama</button>
        </div>
      </div>
      {submitError && (
        <div className="w-full px-2 md:px-4 lg:px-6 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {submitError}
          </div>
        </div>
      )}
      {submitSuccess && (
        <div className="w-full px-2 md:px-4 lg:px-6 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Ayarlar başarıyla kaydedildi!
          </div>
        </div>
      )}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-4 lg:px-6 mt-8 items-stretch">
        {/* Left: API Form Card */}
        <div className="bg-white p-10 flex flex-col gap-8 rounded-2xl shadow-lg border border-[#e5e7eb] min-w-[400px] max-w-[700px] w-full self-stretch h-full min-h-[650px]">
          <div className="flex items-center gap-3 mb-4 border-b-2 border-gray-200 pb-4">
            <div className="text-xl font-semibold text-[#37474f]">API Bilgilerini Tanımlama</div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {fieldsToRender.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label className="block text-[#5d6e76] font-black mb-1">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="input w-full min-h-[120px] resize-y border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    disabled={isSubmitting || field.readOnly}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="input border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    disabled={isSubmitting || field.readOnly}
                  />
                )}
              </div>
            ))}
            {showIntegrationStatus && (
              <div>
                <label className="block text-[#5d6e76] font-black mb-1">ENTEGRASYON DURUMU</label>
                <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 mt-2 border-b-2 border-gray-200 pb-4">
                  <label
                    htmlFor="entegrasyon_acik"
                    className={`flex-1 flex items-center gap-3 px-6 py-4 min-w-[160px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'acik' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        id="entegrasyon_acik"
                        name="entegrasyon_durumu"
                        checked={entegrasyonDurumu === 'acik'}
                        onChange={() => setEntegrasyonDurumu('acik')}
                        disabled={isSubmitting}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                      />
                      <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${entegrasyonDurumu === 'acik' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                      {entegrasyonDurumu === 'acik' && (
                        <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <span className={`font-bold ${entegrasyonDurumu === 'acik' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON AÇIK</span>
                  </label>
                  <label
                    htmlFor="entegrasyon_kapali"
                    className={`flex-1 flex items-center gap-3 px-6 py-4 min-w-[160px] rounded-lg border transition-all cursor-pointer ${entegrasyonDurumu === 'kapali' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="relative flex items-center">
                      <input
                        type="radio"
                        id="entegrasyon_kapali"
                        name="entegrasyon_durumu"
                        checked={entegrasyonDurumu === 'kapali'}
                        onChange={() => setEntegrasyonDurumu('kapali')}
                        disabled={isSubmitting}
                        className="peer appearance-none w-5 h-5 rounded-full border-2 border-blue-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition-all"
                      />
                      <span className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${entegrasyonDurumu === 'kapali' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'}`}></span>
                      {entegrasyonDurumu === 'kapali' && (
                        <span className="absolute left-1 top-1 w-3 h-3 rounded-full bg-blue-600"></span>
                      )}
                    </span>
                    <span className={`font-bold ${entegrasyonDurumu === 'kapali' ? 'text-gray-700' : 'text-gray-400'}`}>ENTEGASYON KAPALI</span>
                  </label>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-5 gap-4">
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-base flex items-center gap-2 disabled:opacity-50"
              >
                SIFIRLA
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-[#11c26d] hover:bg-[#1ed57d] text-white font-bold py-3 px-10 rounded-lg text-base flex items-center gap-2 disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    KAYDEDİLİYOR...
                  </>
                ) : (
                  <>
                    AYARLARI KAYDET
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        {/* Right: Kurulum Rehberi Card */}
        <div className="bg-white p-10 flex flex-col gap-8 rounded-2xl shadow-lg border border-[#e5e7eb] min-w-[400px] max-w-[700px] w-full self-stretch h-full min-h-[650px]">
          <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-4">
            <div className="text-xl text-[#37474f] font-semibold">Kurulum Rehberi</div>
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
          <div className="bg-white text-gray-800 text-base leading-relaxed border-b border-gray-200 pb-4 max-h-[300px] overflow-y-auto pr-2">
            <div className="font-semibold">1- API Bilgilerinizi Tanımlayın</div>
            <div className="mt-1 font-light">
              {platformName} entegrasyonunu gerçekleştirebilmek için ilk olarak API Bilgisi almanız gerekmektedir. Bu bilgiye {platformName} yönetim panelinizden ulaşabilirsiniz.<br /><br />
              *API bilgisini nasıl alacağınızı öğrenmek için ilgili destek yazımızı inceleyebilirsiniz.<br /><br />
              API bilgisini aldıktan sonra {platformName} API Ayarları sayfasının API Bilgilerini Tanımlama kısmında bulunan gerekli alanları doldurmalısınız.
            </div>
          </div>
          <div className="flex justify-center">
            <button className="border-2 border-[#eff6ff] text-blue-600 font-bold text-lg px-8 py-3 mt-8 rounded-lg bg-white hover:bg-[#eff6ff] transition-all shadow-sm">
              DETAYLI KURULUM REHBERİNİ İNCELE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 