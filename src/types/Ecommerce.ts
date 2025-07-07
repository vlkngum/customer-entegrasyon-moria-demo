// Generic types for ecommerce integrations
export interface ConfigField {
  value: string | null;
  description: string;
  read_only?: boolean;
  input_type?: string;
}

export interface DefaultConfig {
  prod: Record<string, ConfigField>;
}

export interface UserIntegration {
  id: string;
  config: Record<string, ConfigField>;
  created_at: string;
  updated_at: string;
}

export interface ServiceTemplate {
  id: string;
  type: 'ecommerce' | 'marketplace' | 'invoices' | 'cargo' | 'erp';
  name: string; 
  default_config: DefaultConfig;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  logo_url: string;
  integration_id: number | null;
  user_integration: UserIntegration | null;
}
// Specific ecommerce platform types
export interface IkasConfig {
  apiBaseUrl: string;
  apiKey: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface EthicaConfig {
  apiBaseUrl: string;
  apiKey: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface MagentoConfig {
  apiBaseUrl: string;
  accessToken: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface ShopPHPConfig {
  apiBaseUrl: string;
  apiKey: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface PlatinMarketConfig {
  apiBaseUrl: string;
  apiKey: string;
  apiSecret: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface IdeasoftConfig {
  apiBaseUrl: string;
  apiKey: string;
  apiSecret: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface TicimaxConfig {
  apiBaseUrl: string;
  apiUser: string;
  apiPassword: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface TSoftConfig {
  apiBaseUrl: string;
  apiKey: string;
  secretKey: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface PrestaShopConfig {
  apiBaseUrl: string;
  apiKey: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface ShopifyConfig {
  shopDomain: string;
  apiKey: string;
  apiPassword: string;
  apiVersion: string;
  accessToken: string;
  languageCode: string;
  integrationStatus?: string;
}

export interface WooCommerceConfig {
  apiBaseUrl: string;
  consumerKey: string;
  consumerSecret: string;
  storeUrl: string;
  integrationStatus?: string;
}

export interface OpenCartConfig {
  apiBaseUrl: string;
  xApiKey: string;
  integrationStatus?: string;
}

// Marketplace types
export interface AmazonConfig {
  apiBaseUrl: string;
  lwaClientId: string;
  lwaClientSecret: string;
  awsAccessKey: string;
  awsSecretKey: string;
  refreshToken: string;
  integrationStatus?: string;
}

export interface ModanisaConfig {
  apiBaseUrl: string;
  username: string;
  password: string;
  userAgent: string;
}

export interface PazaramaConfig {
  apiBaseUrl: string;
  clientId: string;
  clientSecret: string;
  integrationStatus?: string;
}

export interface N11Config {
  apiBaseUrl: string;
  appKey: string;
  appSecret: string;
  integrationStatus?: string;
}

export interface CiceksepetiConfig {
  apiBaseUrl: string;
  apiKey: string;
  integrationStatus?: string;
}

export interface TrendyolConfig {
  apiBaseUrl: string;
  supplierId: string;
  apiKey: string;
  apiSecretKey: string;
  integrationStatus?: string;
}

// Invoice types
export interface TrendyolInvoiceConfig {
  apiBaseUrl: string;
  email: string;
  password: string;
  taxId: string;
}

export interface DIAConfig {
  apiBaseUrl: string;
  username: string;
  password: string;
  disconnect_same_user: string;
  apikey: string;
}

export interface ParasutConfig {
  apiBaseUrl: string;
  client_id: string;
  client_secret: string;
}

export interface BizimHesapConfig {
  apiBaseUrl: string;
  token: string;
}

// Union types for all configs
export type EcommerceConfig = 
  | IkasConfig
  | EthicaConfig
  | MagentoConfig
  | ShopPHPConfig
  | PlatinMarketConfig
  | IdeasoftConfig
  | TicimaxConfig
  | TSoftConfig
  | PrestaShopConfig
  | ShopifyConfig
  | WooCommerceConfig
  | OpenCartConfig;

export type MarketplaceConfig = 
  | AmazonConfig
  | ModanisaConfig
  | PazaramaConfig
  | N11Config
  | CiceksepetiConfig
  | TrendyolConfig;

export type InvoiceConfig = 
  | TrendyolInvoiceConfig
  | DIAConfig
  | ParasutConfig
  | BizimHesapConfig;

export type IntegrationConfig = EcommerceConfig | MarketplaceConfig | InvoiceConfig;

// Helper types for integration status
export interface IntegrationStatus {
  isConnected: boolean;
  lastSync?: string;
  error?: string;
}

// Generic integration state type
export interface IntegrationState<T extends IntegrationConfig = IntegrationConfig> {
  config: T | null;
  status: IntegrationStatus;
  isLoading: boolean;
  error: string | null;
}

// Redux state types
export interface EcommerceState {
  ikas: IntegrationState<IkasConfig>;
  ethica: IntegrationState<EthicaConfig>;
  magento: IntegrationState<MagentoConfig>;
  shopPHP: IntegrationState<ShopPHPConfig>;
  platinMarket: IntegrationState<PlatinMarketConfig>;
  ideasoft: IntegrationState<IdeasoftConfig>;
  ticimax: IntegrationState<TicimaxConfig>;
  tSoft: IntegrationState<TSoftConfig>;
  prestaShop: IntegrationState<PrestaShopConfig>;
  shopify: IntegrationState<ShopifyConfig>;
  wooCommerce: IntegrationState<WooCommerceConfig>;
  openCart: IntegrationState<OpenCartConfig>;
}

export interface MarketplaceState {
  amazon: IntegrationState<AmazonConfig>;
  modanisa: IntegrationState<ModanisaConfig>;
  pazarama: IntegrationState<PazaramaConfig>;
  n11: IntegrationState<N11Config>;
  ciceksepeti: IntegrationState<CiceksepetiConfig>;
  trendyol: IntegrationState<TrendyolConfig>;
}

export interface InvoiceState {
  trendyolInvoice: IntegrationState<TrendyolInvoiceConfig>;
  dia: IntegrationState<DIAConfig>;
  parasut: IntegrationState<ParasutConfig>;
  bizimHesap: IntegrationState<BizimHesapConfig>;
}

// Root state type
export interface RootState {
  ecommerce: EcommerceState;
  marketplace: MarketplaceState;
  invoices: InvoiceState;
}

// Action types for Redux
export interface SetConfigAction<T extends IntegrationConfig> {
  type: string;
  payload: T;
}

export interface SetStatusAction {
  type: string;
  payload: IntegrationStatus;
}

export interface SetLoadingAction {
  type: string;
  payload: boolean;
}

export interface SetErrorAction {
  type: string;
  payload: string | null;
}

export interface ResetAction {
  type: string;
}

// Utility types
export type PlatformName = 
  | 'ikas' | 'ethica' | 'magento' | 'shopPHP' | 'platinMarket' | 'ideasoft'
  | 'ticimax' | 'tSoft' | 'prestaShop' | 'shopify' | 'wooCommerce' | 'openCart'
  | 'amazon' | 'modanisa' | 'pazarama' | 'n11' | 'ciceksepeti' | 'trendyol'
  | 'trendyolInvoice' | 'dia' | 'parasut' | 'bizimHesap';

export type IntegrationType = 'ecommerce' | 'marketplace' | 'invoices';

// API response types
export interface ApiResponse<T> {
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
  data: T;
}

// Pagination types
export interface PaginationMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
} 