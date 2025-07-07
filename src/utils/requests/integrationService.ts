import { ecommerceService } from './ecommerceService';
import { IResponse } from '@/types/IResponse';
import { ServiceTemplate, PaginatedResponse } from '@/types/Ecommerce';

export interface IntegrationData {
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

export interface IntegrationsResponse {
  code: number;
  status: string;
  timestamp: string;
  request_id: string;
  path: string;
  method: string;
  environment: string;
  duration_ms: number;
  locale: string;
  user_agent: string;
  device: string;
  user_id: string;
  performance_tag: string;
  test_mode: boolean;
  ip: string;
  response_node: string;
  message: string;
  data: IntegrationData[];
}

export const integrationService = {
  // Get all user integrations
  getIntegrations: async (bearer: string): Promise<IResponse<PaginatedResponse<ServiceTemplate>>> => {
    return await ecommerceService.getEntegrations(bearer);
  },

  // Get platforms by type (cargo, invoice, etc.)
  getPlatforms: async (bearer: string, type: string): Promise<IResponse<PaginatedResponse<ServiceTemplate>>> => {
    try {
      const response = await ecommerceService.getEntegrations(bearer);
      
      if (response.code === 200 && response.data?.data) {
        // Filter integrations by type
        const filteredData = response.data.data.filter((integration: ServiceTemplate) => {
          // For now, we'll use a simple mapping based on platform names
          // This should be updated based on your backend structure
          const cargoPlatforms = ['Aras Kargo', 'Yurtiçi Kargo', 'DHL Kargo', 'Sürat Kargo', 'Oplog', 'Hepsijet', 'Sendeo'];
          const invoicePlatforms = ['Trendyol E-faturam (Sovos)', 'Turkcell E-Fatura', 'Logo E-Fatura', 'GİB E-Arşiv', 'QNB eFinans E-Fatura'];
          
          if (type === 'cargo') {
            return cargoPlatforms.includes(integration.name);
          } else if (type === 'invoice') {
            return invoicePlatforms.includes(integration.name);
          }
          
          return false;
        });
        
        return {
          ...response,
          data: {
            ...response.data,
            data: filteredData
          }
        };
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get platform template
  getPlatformTemplate: async (bearer: string, platformName: string): Promise<IResponse<unknown>> => {
    try {
      // For now, return a mock template based on platform name
      // This should be replaced with actual API call to get platform template
      const templates: Record<string, unknown> = {
        'Aras Kargo': {
          id: 1,
          name: 'Aras Kargo',
          type: 'cargo',
          fields: [
            { name: 'username', label: 'Kullanıcı Adı', type: 'text', required: true },
            { name: 'password', label: 'Şifre', type: 'password', required: true },
            { name: 'customerCode', label: 'Müşteri Kodu', type: 'text', required: false },
          ]
        },
        'Yurtiçi Kargo': {
          id: 2,
          name: 'Yurtiçi Kargo',
          type: 'cargo',
          fields: [
            { name: 'username', label: 'Kullanıcı Adı', type: 'text', required: true },
            { name: 'password', label: 'Şifre', type: 'password', required: true },
            { name: 'customerNumber', label: 'Müşteri Numarası', type: 'text', required: true },
          ]
        },
        'Trendyol E-faturam (Sovos)': {
          id: 3,
          name: 'Trendyol E-faturam (Sovos)',
          type: 'invoice',
          fields: [
            { name: 'apiKey', label: 'API Anahtarı', type: 'text', required: true },
            { name: 'apiSecret', label: 'API Gizli Anahtarı', type: 'password', required: true },
            { name: 'taxNumber', label: 'Vergi Numarası', type: 'text', required: true },
          ]
        },
        'Turkcell E-Fatura': {
          id: 4,
          name: 'Turkcell E-Fatura',
          type: 'invoice',
          fields: [
            { name: 'username', label: 'Kullanıcı Adı', type: 'text', required: true },
            { name: 'password', label: 'Şifre', type: 'password', required: true },
            { name: 'companyName', label: 'Firma Adı', type: 'text', required: true },
          ]
        }
      };
      
      const template = templates[platformName];
      if (template) {
        return {
          code: 200,
          status: 'success',
          message: 'Platform template found',
          data: template
        } as IResponse<unknown>;
      }
      
      return {
        code: 404,
        status: 'error',
        message: 'Platform template not found',
        data: null
      } as IResponse<unknown>;
    } catch (error) {
      throw error;
    }
  },

  // Get integration by platform name and type
  getIntegration: async (bearer: string, platformName: string): Promise<IResponse<unknown>> => {
    try {
      const response = await ecommerceService.getEntegrations(bearer);
      
      if (response.code === 200 && response.data?.data) {
        const integration = response.data.data.find((integration: ServiceTemplate) => 
          integration.name === platformName
        );
        
        if (integration) {
          return {
            code: 200,
            status: 'success',
            message: 'Integration found',
            data: {
              integration_id: integration.integration_id,
              ...integration.user_integration?.config
            }
          } as IResponse<unknown>;
        }
      }
      
      return {
        code: 404,
        status: 'error',
        message: 'Integration not found',
        data: null
      } as IResponse<unknown>;
    } catch (error) {
      throw error;
    }
  },

  // Create or update an integration
  postIntegration: async (bearer: string, data: object): Promise<IResponse<PaginatedResponse<ServiceTemplate>>> => {
    return await ecommerceService.postEntegration(bearer, data);
  },

  // Helper function to map integration data to platform configs
  mapIntegrationToConfig: (integration: IntegrationData) => {
    const { integration: platform, config } = integration;
    
    // Map platform names to their corresponding config keys
    const platformMap: Record<string, string> = {
      'Amazon Türkiye': 'amazon',
      'N11': 'n11',
      'ÇiçekSepeti': 'ciceksepeti',
      'Trendyol': 'trendyol',
      'Modanisa': 'modanisa',
      'Pazarama': 'pazarama',
      'Opencart': 'opencart',
      'WooCommerce': 'woocommerce',
      'İkas': 'ikas',
      'Shopify': 'shopify',
      'Ideasoft': 'ideasoft',
      'Ticimax': 'ticimax',
      'T-Soft': 'tsoft',
      'PrestaShop': 'prestashop',
      'Magento': 'magento',
      'Ethica': 'ethica',
      'Platin Market': 'platinMarket',
      'ShopPHP': 'shopphp',
    };

    const platformKey = platformMap[platform.name];
    
    if (!platformKey) {
      return null;
    }

    return {
      platformKey,
      platformName: platform.name,
      config,
      integrationId: integration.id,
      isActive: config.integrationStatus === 'true',
      lastUpdated: integration.updated_at,
      logoUrl: platform.logo_url,
    };
  },

  // Helper function to get all active integrations
  getActiveIntegrations: (integrations: IntegrationData[]) => {
    return integrations
      .map(integration => integrationService.mapIntegrationToConfig(integration))
      .filter(Boolean)
      .filter(integration => integration?.isActive);
  },

  // Helper function to get integrations by platform type
  getIntegrationsByType: (integrations: IntegrationData[], type: 'ecommerce' | 'marketplace') => {
    const platformTypeMap: Record<string, 'ecommerce' | 'marketplace'> = {
      // Ecommerce platforms
      'Opencart': 'ecommerce',
      'WooCommerce': 'ecommerce',
      'İkas': 'ecommerce',
      'Shopify': 'ecommerce',
      'Ideasoft': 'ecommerce',
      'Ticimax': 'ecommerce',
      'T-Soft': 'ecommerce',
      'PrestaShop': 'ecommerce',
      'Magento': 'ecommerce',
      'Ethica': 'ecommerce',
      'Platin Market': 'ecommerce',
      'ShopPHP': 'ecommerce',
      
      // Marketplace platforms
      'Amazon Türkiye': 'marketplace',
      'N11': 'marketplace',
      'ÇiçekSepeti': 'marketplace',
      'Trendyol': 'marketplace',
      'Modanisa': 'marketplace',
      'Pazarama': 'marketplace',
    };

    return integrations
      .filter(integration => platformTypeMap[integration.integration.name] === type)
      .map(integration => integrationService.mapIntegrationToConfig(integration))
      .filter(Boolean);
  },
}; 