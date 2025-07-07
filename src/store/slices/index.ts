// Generic slices
export { default as eticaretSlice } from './ecommerce/eticaretSlice';
export { default as shopSlice } from './ecommerce/shopSlice';
export { default as cargoSlice } from './cargo/cargoSlice';
export { default as invoiceSlice } from './invoice/invoiceSlice';
export { default as erpSlice } from './erp/erpSlice';
export { setConfig as setEticaretConfig, setField as setEticaretField, resetConfig as resetEticaretConfig, setIntegrationStatus as setEticaretIntegrationStatus } from './ecommerce/eticaretSlice';
export { setConfig as setShopConfig, setField as setShopField, resetConfig as resetShopConfig, setIntegrationStatus as setShopIntegrationStatus } from './ecommerce/shopSlice';
export { setConfig as setCargoConfig, setField as setCargoField, resetConfig as resetCargoConfig, setIntegrationStatus as setCargoIntegrationStatus } from './cargo/cargoSlice';
export { setConfig as setInvoiceConfig, setField as setInvoiceField, resetConfig as resetInvoiceConfig, setIntegrationStatus as setInvoiceIntegrationStatus } from './invoice/invoiceSlice';
export { setConfig as setErpConfig, setField as setErpField, resetConfig as resetErpConfig, setIntegrationStatus as setErpIntegrationStatus } from './erp/erpSlice'; 