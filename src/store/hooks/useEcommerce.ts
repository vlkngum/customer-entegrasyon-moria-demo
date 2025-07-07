import { useEticaret } from './useGenericEcommerce';

export const useEcommerce = () => {
  const eticaret = useEticaret();

  // Check if platform is configured (has any non-empty required fields)
  const isConfigured = () => {
    const requiredFields = ['apiKey', 'storeUrl', 'apiBaseUrl'];
    return requiredFields.some(field => {
      const value = eticaret.config[field];
      return value && typeof value === 'string' && value.trim() !== '';
    });
  };

  return {
    // State
    config: eticaret.config,
    isConfigured: isConfigured(),
    
    // Actions
    setConfig: eticaret.setConfig,
    setField: eticaret.setField,
    resetConfig: eticaret.resetConfig,
    setIntegrationStatus: eticaret.setIntegrationStatus,
    
    // Convenience methods for common fields
    setApiKey: eticaret.setApiKey,
    setStoreUrl: eticaret.setStoreUrl,
    setApiBaseUrl: eticaret.setApiBaseUrl,
    setApiSecret: eticaret.setApiSecret,
    setAccessToken: eticaret.setAccessToken,
    setUsername: eticaret.setUsername,
    setPassword: eticaret.setPassword,
    setShopDomain: eticaret.setShopDomain,
    setApiPassword: eticaret.setApiPassword,
    setApiVersion: eticaret.setApiVersion,
    setLanguageCode: eticaret.setLanguageCode,
    setConsumerKey: eticaret.setConsumerKey,
    setConsumerSecret: eticaret.setConsumerSecret,
    setXApiKey: eticaret.setXApiKey,
    setApiUser: eticaret.setApiUser,
    setSecretKey: eticaret.setSecretKey,
    
    // Legacy platform-specific methods (for backward compatibility)
    ikas: {
      config: eticaret.config,
      isConfigured: isConfigured(),
      setConfig: eticaret.setConfig,
      reset: eticaret.resetConfig,
    },
    ideasoft: {
      config: eticaret.config,
      isConfigured: isConfigured(),
      setConfig: eticaret.setConfig,
      reset: eticaret.resetConfig,
    },
    ticimax: {
      config: eticaret.config,
      isConfigured: isConfigured(),
      setConfig: eticaret.setConfig,
      reset: eticaret.resetConfig,
    },
    shopify: {
      config: eticaret.config,
      isConfigured: isConfigured(),
      setConfig: eticaret.setConfig,
      reset: eticaret.resetConfig,
    },
    woocommerce: {
      config: eticaret.config,
      isConfigured: isConfigured(),
      setConfig: eticaret.setConfig,
      setApiBaseUrl: eticaret.setApiBaseUrl,
      setConsumerKey: eticaret.setConsumerKey,
      setConsumerSecret: eticaret.setConsumerSecret,
      setStoreUrl: eticaret.setStoreUrl,
      reset: eticaret.resetConfig,
    },
    opencart: {
      config: eticaret.config,
      isConfigured: isConfigured(),
      setConfig: eticaret.setConfig,
      reset: eticaret.resetConfig,
    },
    eticaretSoft: {
      config: eticaret.config,
      isConfigured: isConfigured(),
      setConfig: eticaret.setConfig,
      reset: eticaret.resetConfig,
    },
  };
}; 