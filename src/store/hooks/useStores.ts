import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../index';
import { 
  setShopConfig, 
  setShopField, 
  resetShopConfig, 
  setShopIntegrationStatus 
} from '../slices/index';

export const useStores = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shop = useSelector((state: RootState) => state.shop);

  // Generic configuration for all store platforms
  const setConfig = useCallback((config: Partial<typeof shop>) => dispatch(setShopConfig(config)), [dispatch]);
  const setField = useCallback((key: string, value: string | number) => dispatch(setShopField({ key, value })), [dispatch]);
  const resetConfig = useCallback(() => dispatch(resetShopConfig()), [dispatch]);
  const setIntegrationStatus = useCallback((status: string) => dispatch(setShopIntegrationStatus(status)), [dispatch]);

  // Platform-specific convenience methods
  const setApiBaseUrl = useCallback((apiBaseUrl: string) => setField('apiBaseUrl', apiBaseUrl), [setField]);
  const setApiKey = useCallback((apiKey: string) => setField('apiKey', apiKey), [setField]);
  const setApiSecret = useCallback((apiSecret: string) => setField('apiSecret', apiSecret), [setField]);
  const setAccessToken = useCallback((accessToken: string) => setField('accessToken', accessToken), [setField]);
  const setRefreshToken = useCallback((refreshToken: string) => setField('refreshToken', refreshToken), [setField]);
  const setUsername = useCallback((username: string) => setField('username', username), [setField]);
  const setPassword = useCallback((password: string) => setField('password', password), [setField]);
  const setLwaClientId = useCallback((lwaClientId: string) => setField('lwaClientId', lwaClientId), [setField]);
  const setLwaClientSecret = useCallback((lwaClientSecret: string) => setField('lwaClientSecret', lwaClientSecret), [setField]);
  const setAwsAccessKey = useCallback((awsAccessKey: string) => setField('awsAccessKey', awsAccessKey), [setField]);
  const setAwsSecretKey = useCallback((awsSecretKey: string) => setField('awsSecretKey', awsSecretKey), [setField]);
  const setAppKey = useCallback((appKey: string) => setField('appKey', appKey), [setField]);
  const setAppSecret = useCallback((appSecret: string) => setField('appSecret', appSecret), [setField]);
  const setSupplierId = useCallback((supplierId: string) => setField('supplierId', supplierId), [setField]);
  const setApiSecretKey = useCallback((apiSecretKey: string) => setField('apiSecretKey', apiSecretKey), [setField]);
  const setUserAgent = useCallback((userAgent: string) => setField('userAgent', userAgent), [setField]);
  const setClientId = useCallback((clientId: string) => setField('clientId', clientId), [setField]);
  const setClientSecret = useCallback((clientSecret: string) => setField('clientSecret', clientSecret), [setField]);

  // Check if platform is configured (has any non-empty required fields)
  const isConfigured = useCallback(() => {
    const requiredFields = ['apiKey', 'apiBaseUrl'];
    return requiredFields.some(field => {
      const value = shop[field];
      return value && typeof value === 'string' && value.trim() !== '';
    });
  }, [shop]);

  return {
    // State
    config: shop,
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
    setLwaClientId,
    setLwaClientSecret,
    setAwsAccessKey,
    setAwsSecretKey,
    setAppKey,
    setAppSecret,
    setSupplierId,
    setApiSecretKey,
    setUserAgent,
    setClientId,
    setClientSecret,
    
    // Store-specific methods (using shop slice)
    storeConfig: shop,
    setStoreApiBaseUrl: setApiBaseUrl,
    setStoreApiKey: setApiKey,
    setStoreApiSecret: setApiSecret,
    setStoreAccessToken: setAccessToken,
    setStoreRefreshToken: setRefreshToken,
    setStoreUsername: setUsername,
    setStorePassword: setPassword,
    setStoreLwaClientId: setLwaClientId,
    setStoreLwaClientSecret: setLwaClientSecret,
    setStoreAwsAccessKey: setAwsAccessKey,
    setStoreAwsSecretKey: setAwsSecretKey,
    setStoreAppKey: setAppKey,
    setStoreAppSecret: setAppSecret,
    setStoreSupplierId: setSupplierId,
    setStoreApiSecretKey: setApiSecretKey,
    setStoreUserAgent: setUserAgent,
    setStoreClientId: setClientId,
    setStoreClientSecret: setClientSecret,
    setStoreIntegrationStatus: setIntegrationStatus,
    setStoreConfig: setConfig,
    resetStoreConfig: resetConfig,
  };
}; 