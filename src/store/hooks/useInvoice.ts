import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../index';
import { 
  setInvoiceConfig, 
  setInvoiceField, 
  resetInvoiceConfig, 
  setInvoiceIntegrationStatus 
} from '../slices/index';

export const useInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const invoice = useSelector((state: RootState) => state.invoice);

  // Generic configuration for all invoice platforms
  const setConfig = useCallback((config: Partial<typeof invoice>) => dispatch(setInvoiceConfig(config)), [dispatch]);
  const setField = useCallback((key: string, value: string | number) => dispatch(setInvoiceField({ key, value })), [dispatch]);
  const resetConfig = useCallback(() => dispatch(resetInvoiceConfig()), [dispatch]);
  const setIntegrationStatus = useCallback((status: string) => dispatch(setInvoiceIntegrationStatus(status)), [dispatch]);

  // Platform-specific convenience methods
  const setApiBaseUrl = useCallback((apiBaseUrl: string) => setField('apiBaseUrl', apiBaseUrl), [setField]);
  const setApiKey = useCallback((apiKey: string) => setField('apiKey', apiKey), [setField]);
  const setApiSecret = useCallback((apiSecret: string) => setField('apiSecret', apiSecret), [setField]);
  const setAccessToken = useCallback((accessToken: string) => setField('accessToken', accessToken), [setField]);
  const setRefreshToken = useCallback((refreshToken: string) => setField('refreshToken', refreshToken), [setField]);
  const setUsername = useCallback((username: string) => setField('username', username), [setField]);
  const setPassword = useCallback((password: string) => setField('password', password), [setField]);
  
  // Invoice-specific methods
  const setTaxNumber = useCallback((taxNumber: string) => setField('taxNumber', taxNumber), [setField]);
  const setTaxOffice = useCallback((taxOffice: string) => setField('taxOffice', taxOffice), [setField]);
  const setCompanyName = useCallback((companyName: string) => setField('companyName', companyName), [setField]);
  const setAddress = useCallback((address: string) => setField('address', address), [setField]);
  const setPhone = useCallback((phone: string) => setField('phone', phone), [setField]);
  const setEmail = useCallback((email: string) => setField('email', email), [setField]);
  const setInvoiceType = useCallback((invoiceType: string) => setField('invoiceType', invoiceType), [setField]);
  const setCurrency = useCallback((currency: string) => setField('currency', currency), [setField]);
  
  // Platform-specific fields
  const setClientId = useCallback((clientId: string) => setField('clientId', clientId), [setField]);
  const setClientSecret = useCallback((clientSecret: string) => setField('clientSecret', clientSecret), [setField]);
  const setAppKey = useCallback((appKey: string) => setField('appKey', appKey), [setField]);
  const setAppSecret = useCallback((appSecret: string) => setField('appSecret', appSecret), [setField]);
  const setSupplierId = useCallback((supplierId: string) => setField('supplierId', supplierId), [setField]);
  const setApiSecretKey = useCallback((apiSecretKey: string) => setField('apiSecretKey', apiSecretKey), [setField]);
  const setUserAgent = useCallback((userAgent: string) => setField('userAgent', userAgent), [setField]);

  // Check if platform is configured (has any non-empty required fields)
  const isConfigured = useCallback(() => {
    const requiredFields = ['apiKey', 'apiBaseUrl'];
    return requiredFields.some(field => {
      const value = invoice[field];
      return value && typeof value === 'string' && value.trim() !== '';
    });
  }, [invoice]);

  return {
    // State
    config: invoice,
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
    
    // Invoice-specific methods
    setTaxNumber,
    setTaxOffice,
    setCompanyName,
    setAddress,
    setPhone,
    setEmail,
    setInvoiceType,
    setCurrency,
    
    // Platform-specific methods
    setClientId,
    setClientSecret,
    setAppKey,
    setAppSecret,
    setSupplierId,
    setApiSecretKey,
    setUserAgent,
    
    // Invoice-specific methods (aliases for consistency)
    invoiceConfig: invoice,
    setInvoiceApiBaseUrl: setApiBaseUrl,
    setInvoiceApiKey: setApiKey,
    setInvoiceApiSecret: setApiSecret,
    setInvoiceAccessToken: setAccessToken,
    setInvoiceRefreshToken: setRefreshToken,
    setInvoiceUsername: setUsername,
    setInvoicePassword: setPassword,
    setInvoiceTaxNumber: setTaxNumber,
    setInvoiceTaxOffice: setTaxOffice,
    setInvoiceCompanyName: setCompanyName,
    setInvoiceAddress: setAddress,
    setInvoicePhone: setPhone,
    setInvoiceEmail: setEmail,
    setInvoiceCurrency: setCurrency,
    setInvoiceClientId: setClientId,
    setInvoiceClientSecret: setClientSecret,
    setInvoiceAppKey: setAppKey,
    setInvoiceAppSecret: setAppSecret,
    setInvoiceSupplierId: setSupplierId,
    setInvoiceApiSecretKey: setApiSecretKey,
    setInvoiceUserAgent: setUserAgent,
    setInvoiceIntegrationStatus: setIntegrationStatus,
    setInvoiceConfig: setConfig,
    resetInvoiceConfig: resetConfig,
  };
}; 