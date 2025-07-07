import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../index';
import { 
  setErpConfig, 
  setErpField, 
  resetErpConfig, 
  setErpIntegrationStatus 
} from '../slices/index';

export const useErp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const erp = useSelector((state: RootState) => state.erp);

  // Generic configuration for all ERP platforms
  const setConfig = useCallback((config: Partial<typeof erp>) => dispatch(setErpConfig(config)), [dispatch]);
  const setField = useCallback((key: string, value: string | number) => dispatch(setErpField({ key, value })), [dispatch]);
  const resetConfig = useCallback(() => dispatch(resetErpConfig()), [dispatch]);
  const setIntegrationStatus = useCallback((status: string) => dispatch(setErpIntegrationStatus(status)), [dispatch]);

  // Platform-specific convenience methods
  const setApiBaseUrl = useCallback((apiBaseUrl: string) => setField('apiBaseUrl', apiBaseUrl), [setField]);
  const setApiKey = useCallback((apiKey: string) => setField('apiKey', apiKey), [setField]);
  const setApiSecret = useCallback((apiSecret: string) => setField('apiSecret', apiSecret), [setField]);
  const setAccessToken = useCallback((accessToken: string) => setField('accessToken', accessToken), [setField]);
  const setRefreshToken = useCallback((refreshToken: string) => setField('refreshToken', refreshToken), [setField]);
  const setUsername = useCallback((username: string) => setField('username', username), [setField]);
  const setPassword = useCallback((password: string) => setField('password', password), [setField]);
  
  // ERP-specific methods
  const setCompanyId = useCallback((companyId: string) => setField('companyId', companyId), [setField]);
  const setDatabaseName = useCallback((databaseName: string) => setField('databaseName', databaseName), [setField]);
  const setServerUrl = useCallback((serverUrl: string) => setField('serverUrl', serverUrl), [setField]);
  const setPort = useCallback((port: string) => setField('port', port), [setField]);
  const setClientId = useCallback((clientId: string) => setField('clientId', clientId), [setField]);
  const setClientSecret = useCallback((clientSecret: string) => setField('clientSecret', clientSecret), [setField]);
  const setTenantId = useCallback((tenantId: string) => setField('tenantId', tenantId), [setField]);
  const setSubscriptionId = useCallback((subscriptionId: string) => setField('subscriptionId', subscriptionId), [setField]);
  
  // Platform-specific fields
  const setAppKey = useCallback((appKey: string) => setField('appKey', appKey), [setField]);
  const setAppSecret = useCallback((appSecret: string) => setField('appSecret', appSecret), [setField]);
  const setSupplierId = useCallback((supplierId: string) => setField('supplierId', supplierId), [setField]);
  const setApiSecretKey = useCallback((apiSecretKey: string) => setField('apiSecretKey', apiSecretKey), [setField]);
  const setUserAgent = useCallback((userAgent: string) => setField('userAgent', userAgent), [setField]);

  // Check if platform is configured (has any non-empty required fields)
  const isConfigured = useCallback(() => {
    const requiredFields = ['apiKey', 'apiBaseUrl'];
    return requiredFields.some(field => {
      const value = erp[field];
      return value && typeof value === 'string' && value.trim() !== '';
    });
  }, [erp]);

  return {
    // State
    config: erp,
    isConfigured: isConfigured(),
    
    // Actions
    setConfig,
    setField,
    resetConfig,
    setIntegrationStatus,
    
    // Convenience methods for common fields
    setApiBaseUrl,
    setApiKey,
    setApiSecret,
    setAccessToken,
    setRefreshToken,
    setUsername,
    setPassword,
    
    // ERP-specific methods
    setCompanyId,
    setDatabaseName,
    setServerUrl,
    setPort,
    setClientId,
    setClientSecret,
    setTenantId,
    setSubscriptionId,
    
    // Platform-specific methods
    setAppKey,
    setAppSecret,
    setSupplierId,
    setApiSecretKey,
    setUserAgent,
    
    // ERP-specific methods (aliases for consistency)
    erpConfig: erp,
    setErpApiBaseUrl: setApiBaseUrl,
    setErpApiKey: setApiKey,
    setErpApiSecret: setApiSecret,
    setErpAccessToken: setAccessToken,
    setErpRefreshToken: setRefreshToken,
    setErpUsername: setUsername,
    setErpPassword: setPassword,
    setErpCompanyId: setCompanyId,
    setErpDatabaseName: setDatabaseName,
    setErpServerUrl: setServerUrl,
    setErpPort: setPort,
    setErpClientId: setClientId,
    setErpClientSecret: setClientSecret,
    setErpTenantId: setTenantId,
    setErpSubscriptionId: setSubscriptionId,
    setErpAppKey: setAppKey,
    setErpAppSecret: setAppSecret,
    setErpSupplierId: setSupplierId,
    setErpApiSecretKey: setApiSecretKey,
    setErpUserAgent: setUserAgent,
    setErpIntegrationStatus: setIntegrationStatus,
    setErpConfig: setConfig,
    resetErpConfig: resetConfig,
  };
}; 