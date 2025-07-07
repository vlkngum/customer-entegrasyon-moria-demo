"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInvoice } from "@/store/hooks/useInvoice";
import { integrationService } from "@/utils/requests/integrationService";
import GenericInvoiceSettingsClient from "./GenericInvoiceSettingsClient";

interface PlatformTemplate {
  id: number;
  name: string;
  type: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
  logo?: string;
  bg?: string;
}

interface IntegrationData {
  integration_id?: number;
  [key: string]: unknown;
}

interface DefaultConfig {
  integrationStatus: string;
  [key: string]: string;
}

export default function EinvoiceSettingsPage() {
  const params = useParams();
  const platformName = decodeURIComponent(params.name as string);
  const { config: einvoiceConfig, setConfig, resetConfig } = useInvoice();
  
  const [platformTemplate, setPlatformTemplate] = useState<PlatformTemplate | null>(null);
  const [integrationData, setIntegrationData] = useState<IntegrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlatformData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        // Load platform template
        const templateResponse = await integrationService.getPlatformTemplate(token, platformName);
        console.log('Einvoice platform template response:', templateResponse);

        if (templateResponse.code === 200 && templateResponse.data) {
          setPlatformTemplate(templateResponse.data as PlatformTemplate);
          
          // Load existing integration data
          const integrationResponse = await integrationService.getIntegration(token, platformName);
          console.log('Einvoice integration data response:', integrationResponse);

          if (integrationResponse.code === 200 && integrationResponse.data) {
            setIntegrationData(integrationResponse.data as IntegrationData);
            // Convert unknown values to string/number for InvoiceConfig
            const configData = Object.entries(integrationResponse.data as Record<string, unknown>).reduce((acc, [key, value]) => {
              acc[key] = typeof value === 'string' || typeof value === 'number' ? value : String(value);
              return acc;
            }, {} as Record<string, string | number | undefined>);
            setConfig(configData);
          } else {
            // No existing integration, use template defaults
            const defaultConfig: DefaultConfig = { integrationStatus: 'false' };
            (templateResponse.data as PlatformTemplate).fields.forEach((field: PlatformTemplate['fields'][0]) => {
              defaultConfig[field.name] = '';
            });
            setConfig(defaultConfig);
          }
        } else {
          setError('Platform template not found');
        }
      } catch (error) {
        console.error('Error loading einvoice platform data:', error);
        setError('Failed to load platform data');
      } finally {
        setLoading(false);
      }
    };

    if (platformName) {
      loadPlatformData();
    }

    // Cleanup on unmount
    return () => {
      resetConfig();
    };
  }, [platformName, setConfig, resetConfig]);

  if (loading) {
    return (
      <div className="bg-[#f3f8fe] min-h-screen p-0">
        <div className="pt-5 pl-8">
          <div className="font-semibold text-2xl">Yükleniyor...</div>
          <div className="text-xs mt-0.5">
            <span>Entekas</span> / <span className="text-gray-600">Ayarlar</span> / <span className="text-gray-400">E-Fatura Ayarları</span>
          </div>
        </div>
        <div className="mt-8 mx-6 panel max-w-[1200px]">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f3f8fe] min-h-screen p-0">
        <div className="pt-5 pl-8">
          <div className="font-semibold text-2xl text-red-600">Hata</div>
          <div className="text-xs mt-0.5">
            <span>Entekas</span> / <span className="text-gray-600">Ayarlar</span> / <span className="text-gray-400">E-Fatura Ayarları</span>
          </div>
        </div>
        <div className="mt-8 mx-6 panel max-w-[1200px]">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!platformTemplate) {
    return (
      <div className="bg-[#f3f8fe] min-h-screen p-0">
        <div className="pt-5 pl-8">
          <div className="font-semibold text-2xl text-red-600">Platform Bulunamadı</div>
          <div className="text-xs mt-0.5">
            <span>Entekas</span> / <span className="text-gray-600">Ayarlar</span> / <span className="text-gray-400">E-Fatura Ayarları</span>
          </div>
        </div>
        <div className="mt-8 mx-6 panel max-w-[1200px]">
          <div className="text-red-600">&quot;{platformName}&quot; platformu bulunamadı.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f8fe] min-h-screen p-0">
      <div className="pt-5 pl-8">
        <div className="font-semibold text-2xl">{platformTemplate.name} Ayarları</div>
        <div className="text-xs mt-0.5">
          <span>Entekas</span> / <span className="text-gray-600">Ayarlar</span> / <span className="text-gray-400">E-Fatura Ayarları</span> / <span className="text-gray-400">{platformTemplate.name}</span>
        </div>
      </div>
      
      <GenericInvoiceSettingsClient
        platformTemplate={platformTemplate}
        integrationData={integrationData}
        einvoiceConfig={einvoiceConfig as Record<string, string>}
      />
    </div>
  );
} 