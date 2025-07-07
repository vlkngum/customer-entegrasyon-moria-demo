// Generic configuration types for e-commerce platforms
export interface GenericConfig {
  // Common fields
  apiBaseUrl?: string;
  storeUrl?: string;
  integrationStatus: string;
  
  // Authentication fields
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  username?: string;
  password?: string;
  
  // Platform-specific fields
  shopDomain?: string;
  apiPassword?: string;
  apiVersion?: string;
  languageCode?: string;
  consumerKey?: string;
  consumerSecret?: string;
  xApiKey?: string;
  apiUser?: string;
  secretKey?: string;
  
  // Additional custom fields
  [key: string]: string | undefined;
}

export interface ShopConfig {
  // Common fields
  apiBaseUrl?: string;
  storeUrl?: string;
  integrationStatus: string;
  
  // Authentication fields
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  username?: string;
  password?: string;
  
  // Shop-specific fields
  shopDomain?: string;
  shopName?: string;
  shopId?: string;
  apiPassword?: string;
  apiVersion?: string;
  languageCode?: string;
  consumerKey?: string;
  consumerSecret?: string;
  xApiKey?: string;
  apiUser?: string;
  secretKey?: string;
  
  // Additional custom fields
  [key: string]: string | undefined;
}

// Utility types for form handling
export interface GenericConfigFormData {
  [key: string]: string;
}

export interface ShopConfigFormData {
  [key: string]: string;
}

// API response types for generic configurations
export interface GenericConfigResponse {
  success: boolean;
  data?: GenericConfig;
  message?: string;
}

export interface ShopConfigResponse {
  success: boolean;
  data?: ShopConfig;
  message?: string;
} 