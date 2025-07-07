import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../index';
import { 
  setEticaretConfig, 
  setEticaretField, 
  resetEticaretConfig, 
  setEticaretIntegrationStatus,
  setShopConfig,
  setShopField,
  resetShopConfig,
  setShopIntegrationStatus
} from '../slices/index';
import { GenericConfig } from '../slices/ecommerce/eticaretSlice';
import { ShopConfig } from '../slices/ecommerce/shopSlice';

// Hook for eticaret slice
export const useEticaret = () => {
  const dispatch = useDispatch();
  const eticaret = useSelector((state: RootState) => state.eticaret);

  return {
    // State
    config: eticaret,
    
    // Actions
    setConfig: useCallback((config: Partial<GenericConfig>) => dispatch(setEticaretConfig(config)), [dispatch]),
    setField: useCallback((key: string, value: string | number) => dispatch(setEticaretField({ key, value })), [dispatch]),
    resetConfig: useCallback(() => dispatch(resetEticaretConfig()), [dispatch]),
    setIntegrationStatus: useCallback((status: string) => dispatch(setEticaretIntegrationStatus(status)), [dispatch]),
    
    // Convenience methods
    setApiKey: useCallback((apiKey: string) => dispatch(setEticaretField({ key: 'apiKey', value: apiKey })), [dispatch]),
    setStoreUrl: useCallback((storeUrl: string) => dispatch(setEticaretField({ key: 'storeUrl', value: storeUrl })), [dispatch]),
    setApiBaseUrl: useCallback((apiBaseUrl: string) => dispatch(setEticaretField({ key: 'apiBaseUrl', value: apiBaseUrl })), [dispatch]),
    setApiSecret: useCallback((apiSecret: string) => dispatch(setEticaretField({ key: 'apiSecret', value: apiSecret })), [dispatch]),
    setAccessToken: useCallback((accessToken: string) => dispatch(setEticaretField({ key: 'accessToken', value: accessToken })), [dispatch]),
    setUsername: useCallback((username: string) => dispatch(setEticaretField({ key: 'username', value: username })), [dispatch]),
    setPassword: useCallback((password: string) => dispatch(setEticaretField({ key: 'password', value: password })), [dispatch]),
    setShopDomain: useCallback((shopDomain: string) => dispatch(setEticaretField({ key: 'shopDomain', value: shopDomain })), [dispatch]),
    setApiPassword: useCallback((apiPassword: string) => dispatch(setEticaretField({ key: 'apiPassword', value: apiPassword })), [dispatch]),
    setApiVersion: useCallback((apiVersion: string) => dispatch(setEticaretField({ key: 'apiVersion', value: apiVersion })), [dispatch]),
    setLanguageCode: useCallback((languageCode: string) => dispatch(setEticaretField({ key: 'languageCode', value: languageCode })), [dispatch]),
    setConsumerKey: useCallback((consumerKey: string) => dispatch(setEticaretField({ key: 'consumerKey', value: consumerKey })), [dispatch]),
    setConsumerSecret: useCallback((consumerSecret: string) => dispatch(setEticaretField({ key: 'consumerSecret', value: consumerSecret })), [dispatch]),
    setXApiKey: useCallback((xApiKey: string) => dispatch(setEticaretField({ key: 'xApiKey', value: xApiKey })), [dispatch]),
    setApiUser: useCallback((apiUser: string) => dispatch(setEticaretField({ key: 'apiUser', value: apiUser })), [dispatch]),
    setSecretKey: useCallback((secretKey: string) => dispatch(setEticaretField({ key: 'secretKey', value: secretKey })), [dispatch]),
  };
};

// Hook for shop slice
export const useShop = () => {
  const dispatch = useDispatch();
  const shop = useSelector((state: RootState) => state.shop);

  return {
    // State
    config: shop,
    
    // Actions
    setConfig: useCallback((config: Partial<ShopConfig>) => dispatch(setShopConfig(config)), [dispatch]),
    setField: useCallback((key: string, value: string | number) => dispatch(setShopField({ key, value })), [dispatch]),
    resetConfig: useCallback(() => dispatch(resetShopConfig()), [dispatch]),
    setIntegrationStatus: useCallback((status: string) => dispatch(setShopIntegrationStatus(status)), [dispatch]),
    
    // Convenience methods
    setApiKey: useCallback((apiKey: string) => dispatch(setShopField({ key: 'apiKey', value: apiKey })), [dispatch]),
    setStoreUrl: useCallback((storeUrl: string) => dispatch(setShopField({ key: 'storeUrl', value: storeUrl })), [dispatch]),
    setApiBaseUrl: useCallback((apiBaseUrl: string) => dispatch(setShopField({ key: 'apiBaseUrl', value: apiBaseUrl })), [dispatch]),
    setShopDomain: useCallback((shopDomain: string) => dispatch(setShopField({ key: 'shopDomain', value: shopDomain })), [dispatch]),
    setShopName: useCallback((shopName: string) => dispatch(setShopField({ key: 'shopName', value: shopName })), [dispatch]),
    setShopId: useCallback((shopId: string) => dispatch(setShopField({ key: 'shopId', value: shopId })), [dispatch]),
    setApiSecret: useCallback((apiSecret: string) => dispatch(setShopField({ key: 'apiSecret', value: apiSecret })), [dispatch]),
    setAccessToken: useCallback((accessToken: string) => dispatch(setShopField({ key: 'accessToken', value: accessToken })), [dispatch]),
    setUsername: useCallback((username: string) => dispatch(setShopField({ key: 'username', value: username })), [dispatch]),
    setPassword: useCallback((password: string) => dispatch(setShopField({ key: 'password', value: password })), [dispatch]),
  };
}; 