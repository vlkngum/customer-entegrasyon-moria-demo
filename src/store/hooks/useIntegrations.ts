import { useState, useCallback } from 'react';
import { integrationService, IntegrationData } from '@/utils/requests/integrationService';
import { useEticaret } from './useGenericEcommerce';
import { useStores } from './useStores';

export const useIntegrations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Destructure only the needed functions and config for stable dependencies
  const { setStoreConfig, setStoreIntegrationStatus, config: storeConfig } = useStores();
  const { setConfig, setIntegrationStatus, config: eticaretConfig } = useEticaret();

  // Get all integrations from API
  const fetchIntegrations = useCallback(async (bearer: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await integrationService.getIntegrations(bearer);
      
      if (response.code === 200 && response.data?.data) {
        // The API returns PaginatedResponse<ServiceTemplate>, so we need to access response.data.data
        const serviceTemplates = response.data.data;
        
        // Convert ServiceTemplate[] to IntegrationData[] format for compatibility
        const integrations: IntegrationData[] = serviceTemplates
          .filter(template => template.user_integration) // Only include templates with user integrations
          .map(template => {
            // Convert ConfigField objects to simple key-value pairs
            const config: Record<string, unknown> = {};
            
            // Check if config exists and is an object
            if (template.user_integration!.config && typeof template.user_integration!.config === 'object') {
              Object.entries(template.user_integration!.config).forEach(([key, configField]) => {
                // Handle null/undefined values safely
                if (configField && typeof configField === 'object' && 'value' in configField) {
                  config[key] = configField.value;
                } else {
                  config[key] = null;
                }
              });
            }
            
            return {
              id: template.user_integration!.id,
              user_id: '', // This might need to be filled from session or other source
              integration_id: template.integration_id || 0,
              config: config,
              created_at: template.user_integration!.created_at,
              updated_at: template.user_integration!.updated_at,
              integration: {
                id: template.integration_id || 0,
                name: template.name,
                created_at: template.created_at,
                updated_at: template.updated_at,
                logo_url: template.logo_url,
              }
            };
          });
        
        return integrations;
      } else {
        throw new Error(response.message || 'Failed to fetch integrations');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync integrations to Redux state
  const syncIntegrationsToRedux = useCallback((integrations: IntegrationData[]) => {
    integrations.forEach(integration => {
      const mappedConfig = integrationService.mapIntegrationToConfig(integration);
      
      if (mappedConfig) {
        const { platformKey, config, isActive } = mappedConfig;
        
        // Add integration_id to the config
        const configWithId = {
          ...config,
          integration_id: integration.integration_id
        };
        
        // Update the corresponding Redux slice based on platform type
        if (platformKey === 'amazon') {
          setStoreConfig(configWithId);
          setStoreIntegrationStatus(isActive ? 'true' : 'false');
        } else if (platformKey === 'n11') {
          setStoreConfig(configWithId);
          setStoreIntegrationStatus(isActive ? 'true' : 'false');
        } else if (platformKey === 'ciceksepeti') {
          setStoreConfig(configWithId);
          setStoreIntegrationStatus(isActive ? 'true' : 'false');
        } else if (platformKey === 'trendyol') {
          setStoreConfig(configWithId);
          setStoreIntegrationStatus(isActive ? 'true' : 'false');
        } else if (platformKey === 'modanisa') {
          setStoreConfig(configWithId);
          setStoreIntegrationStatus(isActive ? 'true' : 'false');
        } else if (platformKey === 'pazarama') {
          setStoreConfig(configWithId);
          setStoreIntegrationStatus(isActive ? 'true' : 'false');
        } else {
          // All e-commerce platforms now use the generic eticaret slice
          // The config will be stored in the generic slice and can be retrieved by platform
          setConfig(configWithId);
          setIntegrationStatus(isActive ? 'true' : 'false');
        }
      }
    });
  }, [setStoreConfig, setStoreIntegrationStatus, setConfig, setIntegrationStatus]);

  // Create or update an integration
  const createOrUpdateIntegration = async (bearer: string, data: object) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await integrationService.postIntegration(bearer, data);
      
      if (response.code === 200 || response.code === 201) {
        // Refresh integrations after successful update
        try {
          const integrations = await fetchIntegrations(bearer);
          syncIntegrationsToRedux(integrations);
        }catch(err){
          const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
          setError(errorMessage);
        }
        return response;
      } else {
        throw new Error(response.message || 'Failed to update integration');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get active integrations
  const getActiveIntegrations = useCallback(() => {
    const integrations: Array<{ platform: string; config: unknown }> = [];
    
    // Check store integrations using generic slice
    if (storeConfig.integrationStatus === 'true') {
      integrations.push({ platform: 'stores', config: storeConfig });
    }
    
    // Check ecommerce integrations using generic slice
    if (eticaretConfig.integrationStatus === 'true') {
      integrations.push({ platform: 'ecommerce', config: eticaretConfig });
    }
    
    return integrations;
  }, [storeConfig, eticaretConfig]);

  // Get integration status for a specific platform
  const getIntegrationStatus = useCallback((platformKey: string) => {
    const platformMap: Record<string, unknown> = {
      // All store platforms now use the generic stores slice
      amazon: storeConfig,
      n11: storeConfig,
      ciceksepeti: storeConfig,
      trendyol: storeConfig,
      modanisa: storeConfig,
      pazarama: storeConfig,
      // All e-commerce platforms now use the generic eticaret slice
      woocommerce: eticaretConfig,
      opencart: eticaretConfig,
      ikas: eticaretConfig,
      shopify: eticaretConfig,
      ideasoft: eticaretConfig,
      ticimax: eticaretConfig,
      tsoft: eticaretConfig,
      prestashop: eticaretConfig,
      magento: eticaretConfig,
      ethica: eticaretConfig,
      platinMarket: eticaretConfig,
      shopphp: eticaretConfig,
    };
    
    return platformMap[platformKey] || null;
  }, [storeConfig, eticaretConfig]);

  return {
    // State
    isLoading,
    error,
    
    // Actions
    fetchIntegrations,
    syncIntegrationsToRedux,
    createOrUpdateIntegration,
    getActiveIntegrations,
    getIntegrationStatus,
    
    // Platform hooks
    stores: { setStoreConfig, setStoreIntegrationStatus, config: storeConfig },
    eticaret: { setConfig, setIntegrationStatus, config: eticaretConfig },
  };
}; 