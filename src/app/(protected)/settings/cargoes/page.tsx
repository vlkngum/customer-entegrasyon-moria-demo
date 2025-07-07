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

// Background colors for different cargo platforms
const getCargoPlatformBg = (platformName: string): string => {
  const bgColors: Record<string, string> = {
    'Aras Kargo': 'bg-[#eb727a]',
    'Yurtiçi Kargo': 'bg-[#223A6A]',
    'DHL Kargo': 'bg-[#3B7C99]',
    'UPS Kargo': 'bg-[#FF6F5B]',
    'Sürat Kargo': 'bg-[#2B5C54]',
    'Oplog': 'bg-[#D13B3B]',
    'Hepsijet': 'bg-[#D13B3B]',
    'Sendeo': 'bg-[#B6E07B]',
  };
  return bgColors[platformName] || 'bg-[#eb727a]';
};

export default function CargoSettingsPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const { fetchIntegrations } = useIntegrations();
  
  // Redux selectors
  const allTemplates = useSelector(selectServiceTemplates);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // State for integrations
  const [integrations, setIntegrations] = useState<IntegrationData[]>([]);
  const [integrationsLoading, setIntegrationsLoading] = useState(false);

  const loadIntegrations = useCallback(async () => {
    if (!session?.accessToken) return;
    
    setIntegrationsLoading(true);
    try {
      const integrationsData = await fetchIntegrations(session.accessToken);
      setIntegrations(integrationsData || []);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setIntegrationsLoading(false);
    }
  }, [session?.accessToken, fetchIntegrations]);

  // Fetch service templates and integrations on component mount
  useEffect(() => {
    if (session && session.accessToken) {
      dispatch(clearTemplates()); // Clear old data
      dispatch(fetchServiceTemplates(session.accessToken));
      
      // Fetch integrations
      loadIntegrations();
    }
  }, [dispatch, session?.accessToken, session, loadIntegrations]);

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
    router.push(`/settings/cargoes/${routeName}`);
  };

  // Helper function to check if a platform is connected
  const isPlatformConnected = (template: ServiceTemplate) => {
    // Find integration by integration_id from service template
    const integration = integrations.find(integration => 
      integration.integration_id === template.integration_id
    );
    
    return integration && integration.config?.integrationStatus === "true";
  };

  // For now, show all templates since cargo type is not supported yet
  // TODO: Update when backend supports cargo type
  const cargoTemplates = allTemplates.filter((template: ServiceTemplate) => 
    template.type === 'cargo' // Temporarily use marketplace type
  );

  return (
    <div className="px-6 py-8">
      {/* Başlık */}
      <h1 className="text-3xl font-semibold text-[#444] mb-1">Kargo Ayarları</h1>
      {/* Breadcrumb */}
      <div className="text-base flex items-center gap-1 mb-6">
        <Link href="/" className="font-semibold text-[#222] hover:underline">Entekas</Link>
        <span className="mx-1 text-gray-400">/</span>
        <Link href="/settings" className="text-[#444] hover:underline">Ayarlar</Link>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-400">Kargo Ayarları</span>
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
        {cargoTemplates.map((template: ServiceTemplate) => {
          const isConnected = isPlatformConnected(template);
          const bgColor = getCargoPlatformBg(template.name);
          
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
        })}
      </div>
    </div>
  );
}
