"use client";
import Image from 'next/image';
import { FiSettings } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { AppDispatch } from '@/store';
import { fetchServiceTemplates, selectServiceTemplates, selectIsLoading, selectError, clearTemplates } from '@/store/slices/ecommerceSlice';
import { useIntegrations } from '@/store/hooks/useIntegrations';
import { IntegrationData } from '@/utils/requests/integrationService';
import { ServiceTemplate } from '@/types/Ecommerce';

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

// Background colors for different store platforms
const getStorePlatformBg = (platformName: string): string => {
  const bgColors: Record<string, string> = {
    'Akakçe Yazılım': 'bg-[#17629e]',
    'Amazon': 'bg-[#223A6A]',
    'Hepsiburada': 'bg-[#3B7C99]',
    'Pazarama': 'bg-[#FF6F5B]',
    'N11': 'bg-[#2B5C54]',
    'Trendyol': 'bg-[#D13B3B]',
    'Çiçeksepeti': 'bg-[#D13B3B]',
    'PttAVM': 'bg-[#B6E07B]',
    'İdefix': 'bg-[#3B7C99]',
    'Modanisa': 'bg-[#4A90E2]',
    'Ciceksepeti': 'bg-[#D13B3B]',
  };
  return bgColors[platformName] || 'bg-[#223A6A]';
};

export default function StoresSettingsPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  
  // Add error handling for useIntegrations hook
  let fetchIntegrations: (bearer: string) => Promise<IntegrationData[]>;
  let syncIntegrationsToRedux: (integrations: IntegrationData[]) => void;
  try {
    const integrationsHook = useIntegrations();
    fetchIntegrations = integrationsHook.fetchIntegrations;
    syncIntegrationsToRedux = integrationsHook.syncIntegrationsToRedux;
  } catch (error) {
    console.error('Error initializing useIntegrations:', error);
    fetchIntegrations = async () => [];
    syncIntegrationsToRedux = () => {};
  }
  
  // Cast session to ExtendedSession type
  const extendedSession = session as ExtendedSession | null;
  
  // Redux selectors
  const allTemplates = useSelector(selectServiceTemplates);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // State for integrations
  const [integrations, setIntegrations] = useState<IntegrationData[]>([]);
  const [integrationsLoading, setIntegrationsLoading] = useState(false);

  const loadIntegrations = useCallback(async () => {
    if (!extendedSession?.accessToken) return;
    
    setIntegrationsLoading(true);
    try {
      const integrationsData = await fetchIntegrations(extendedSession.accessToken);
      setIntegrations(integrationsData || []);
      // Sync integrations to Redux state
      syncIntegrationsToRedux(integrationsData || []);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setIntegrationsLoading(false);
    }
  }, [extendedSession?.accessToken, syncIntegrationsToRedux]);

  // Fetch service templates and integrations on component mount
  useEffect(() => {
    if (extendedSession && extendedSession.accessToken) {
      dispatch(clearTemplates()); // Clear old data
      dispatch(fetchServiceTemplates(extendedSession.accessToken));
      
      // Fetch integrations
      loadIntegrations();
    }
  }, [dispatch, extendedSession?.accessToken]);

  const handleCardClick = (template: ServiceTemplate) => {
    // Platform adını route uyumlu hale getir
    const routeName = template.name
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ç/g, 'c')
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]+/g, '')
      .replace(/\s+/g, '');

    // Tüm platformlar için dinamik route kullan
    router.push(`/settings/stores/${routeName}`);
  };

  // Helper function to check if a platform is connected
  const isPlatformConnected = (template: ServiceTemplate) => {
    try {
      // Check if the template has a user_integration
      if (template.user_integration) {
        // Check if the user_integration has an integrationStatus field
        const config = template.user_integration.config;
        if (config && typeof config === 'object') {
          // Look for integrationStatus in the config
          const integrationStatusField = config.integrationStatus;
          if (integrationStatusField) {
            // Check if it's a ConfigField with a value property
            if (typeof integrationStatusField === 'object' && 'value' in integrationStatusField) {
              return integrationStatusField.value === "true";
            }
            // Check if it's a direct string value
            if (typeof integrationStatusField === 'string') {
              return integrationStatusField === "true";
            }
          }
        }
      }
      
      // Fallback: Check integrations array
      const integration = integrations.find(integration => 
        integration.integration_id === template.integration_id
      );
      
      if (integration && integration.config) {
        const status = integration.config.integrationStatus;
        return status === "true" || status === true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking platform connection status:', error);
      return false;
    }
  };

  // Filter templates to show only marketplace/store platforms
  const storeTemplates = allTemplates.filter((template: ServiceTemplate) => 
    template.type === 'marketplace'
  );
  


  return (
    <div className="px-6 py-8">
      {/* Başlık */}
      <h1 className="text-3xl font-semibold text-[#444] mb-1">Mağaza Ayarları
      </h1>
      {/* Breadcrumb */}
      <div className="text-base flex items-center gap-1 mb-6">
        <Link href="/" className="font-semibold text-[#222] hover:underline">Entekas</Link>
        <span className="mx-1 text-gray-400">/</span>
        <Link href="/settings" className="text-[#444] hover:underline">Ayarlar</Link>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-400">Mağaza Ayarları
        </span>
      </div>
      {/* Loading state */}
      {(isLoading || integrationsLoading) && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Hata:</strong> {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {storeTemplates.map((template: ServiceTemplate) => {
          try {
            const isConnected = isPlatformConnected(template);
            const bgColor = getStorePlatformBg(template.name);
            
            return (
              <div
                key={template.id}
                className={`relative rounded-md shadow-md flex flex-col h-[210px] pt-4 pb-0 ${bgColor} transition-transform hover:scale-[1.03] justify-between cursor-pointer`}
                onClick={() => handleCardClick(template)}
              >
                {/* Connection status */}
                {isConnected ? (
                  <span className="absolute right-3 top-3 bg-green-500/20 text-white text-[11px] px-2 py-0.5 rounded font-bold z-10">BAĞLI</span>
                ) : (
                  <span className="absolute left-3 top-3 bg-gray-400/20 text-white text-[11px] px-2 py-0.5 rounded font-bold z-10">PASİF</span>
                )}
                
                {/* Logo */}
                <div className="flex flex-1 w-full items-center justify-center h-[120px]">
                  <Image
                    src={template.logo_url}
                    alt={template.name}
                    width={140}
                    height={54}
                    className="object-contain max-h-[54px]"
                    unoptimized
                  />
                </div>
                
                {/* Alt başlık ve dişli */}
                <div className="bg-[#F8FAFC] flex items-center border-t border-gray-200 px-6 py-4 mt-auto w-full rounded-b-md">
                  <FiSettings className="text-gray-500 mr-2" size={20} />
                  <span className="text-base font-medium text-gray-700 whitespace-nowrap">{template.name} Ayarları</span>
                </div>
              </div>
            );
          } catch (error) {
            console.error('Error rendering template:', template.name, error);
            return null;
          }
        })}
      </div>
    </div>
  );
}
