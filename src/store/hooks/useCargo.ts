import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../index';
import { 
  setCargoConfig, 
  setCargoField, 
  resetCargoConfig, 
  setCargoIntegrationStatus 
} from '../slices/index';

export const useCargo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cargo = useSelector((state: RootState) => state.cargo);

  // Generic configuration for all cargo platforms
  const setConfig = (config: Partial<typeof cargo>) => dispatch(setCargoConfig(config));
  const setField = (key: string, value: string | number) => dispatch(setCargoField({ key, value }));
  const resetConfig = () => dispatch(resetCargoConfig());
  const setIntegrationStatus = (status: string) => dispatch(setCargoIntegrationStatus(status));

  // Platform-specific convenience methods
  const setApiBaseUrl = (apiBaseUrl: string) => setField('apiBaseUrl', apiBaseUrl);
  const setApiKey = (apiKey: string) => setField('apiKey', apiKey);
  const setApiSecret = (apiSecret: string) => setField('apiSecret', apiSecret);
  const setAccessToken = (accessToken: string) => setField('accessToken', accessToken);
  const setRefreshToken = (refreshToken: string) => setField('refreshToken', refreshToken);
  const setUsername = (username: string) => setField('username', username);
  const setPassword = (password: string) => setField('password', password);
  
  // Cargo-specific methods
  const setCustomerNumber = (customerNumber: string) => setField('customerNumber', customerNumber);
  const setCustomerCode = (customerCode: string) => setField('customerCode', customerCode);
  const setSenderCode = (senderCode: string) => setField('senderCode', senderCode);
  const setReceiverCode = (receiverCode: string) => setField('receiverCode', receiverCode);
  const setWarehouseCode = (warehouseCode: string) => setField('warehouseCode', warehouseCode);
  const setServiceType = (serviceType: string) => setField('serviceType', serviceType);
  const setDeliveryType = (deliveryType: string) => setField('deliveryType', deliveryType);
  
  // Platform-specific fields
  const setClientId = (clientId: string) => setField('clientId', clientId);
  const setClientSecret = (clientSecret: string) => setField('clientSecret', clientSecret);
  const setAppKey = (appKey: string) => setField('appKey', appKey);
  const setAppSecret = (appSecret: string) => setField('appSecret', appSecret);
  const setSupplierId = (supplierId: string) => setField('supplierId', supplierId);
  const setApiSecretKey = (apiSecretKey: string) => setField('apiSecretKey', apiSecretKey);
  const setUserAgent = (userAgent: string) => setField('userAgent', userAgent);

  // Check if platform is configured (has any non-empty required fields)
  const isConfigured = () => {
    const requiredFields = ['apiKey', 'apiBaseUrl'];
    return requiredFields.some(field => {
      const value = cargo[field];
      return value && typeof value === 'string' && value.trim() !== '';
    });
  };

  return {
    // State
    config: cargo,
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
    
    // Cargo-specific methods
    setCustomerNumber,
    setCustomerCode,
    setSenderCode,
    setReceiverCode,
    setWarehouseCode,
    setServiceType,
    setDeliveryType,
    
    // Platform-specific methods
    setClientId,
    setClientSecret,
    setAppKey,
    setAppSecret,
    setSupplierId,
    setApiSecretKey,
    setUserAgent,
    
    // Cargo-specific methods (aliases for consistency)
    cargoConfig: cargo,
    setCargoApiBaseUrl: setApiBaseUrl,
    setCargoApiKey: setApiKey,
    setCargoApiSecret: setApiSecret,
    setCargoAccessToken: setAccessToken,
    setCargoRefreshToken: setRefreshToken,
    setCargoUsername: setUsername,
    setCargoPassword: setPassword,
    setCargoCustomerNumber: setCustomerNumber,
    setCargoCustomerCode: setCustomerCode,
    setCargoSenderCode: setSenderCode,
    setCargoReceiverCode: setReceiverCode,
    setCargoWarehouseCode: setWarehouseCode,
    setCargoServiceType: setServiceType,
    setCargoDeliveryType: setDeliveryType,
    setCargoClientId: setClientId,
    setCargoClientSecret: setClientSecret,
    setCargoAppKey: setAppKey,
    setCargoAppSecret: setAppSecret,
    setCargoSupplierId: setSupplierId,
    setCargoApiSecretKey: setApiSecretKey,
    setCargoUserAgent: setUserAgent,
    setCargoIntegrationStatus: setIntegrationStatus,
    setCargoConfig: setConfig,
    resetCargoConfig: resetConfig,
  };
}; 