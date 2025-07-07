import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slices/toastSlice';
import userReducer from './slices/userSlice';

// Ecommerce slice
import ecommerceReducer from './slices/ecommerceSlice';

// Generic slices
import eticaretReducer from './slices/ecommerce/eticaretSlice';
import shopReducer from './slices/ecommerce/shopSlice';
import cargoReducer from './slices/cargo/cargoSlice';
import invoiceReducer from './slices/invoice/invoiceSlice';
import erpReducer from './slices/erp/erpSlice';
import integrationsReducer from './slices/integrationsSlice';

// Sales Invoice slice
import salesInvoiceReducer from './slices/salesInvoiceSlice';

// Customer slice
import customerReducer from './slices/customerSlice';

// Product slice
import productReducer from './slices/productSlice';
import returnRequestReducer from './slices/returnRequestSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
    
    // Main ecommerce reducer
    ecommerce: ecommerceReducer,
    
    // Generic platform reducers
    eticaret: eticaretReducer,
    shop: shopReducer,
    cargo: cargoReducer,
    invoice: invoiceReducer,
    erp: erpReducer,
    integrations: integrationsReducer,
    
    // Sales Invoice reducer
    salesInvoice: salesInvoiceReducer,
    
    // Customer reducer
    customer: customerReducer,
    
    // Product reducer
    product: productReducer,
    // Return Request reducer
    returnRequest: returnRequestReducer,
    // Order reducer
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks
export * from './hooks';
export * from './hooks/useToast';
export * from './hooks/useUser';
export * from './hooks/useEcommerce';
export * from './hooks/useStores';
export * from './hooks/useCargo';
export * from './hooks/useInvoice';
export * from './hooks/useErp';
export * from './hooks/useIntegrations';
export * from './hooks/useGenericEcommerce';
export * from './hooks/useSalesInvoice';
export * from './hooks/useCustomer';
export * from './hooks/useProduct';
export * from './hooks/useReturnRequest';
export * from './hooks/useOrder';

// Export selectors
export * from './selectors/userSelectors';

// Export types
export * from './types';

// Export Provider
export { Provider } from './Provider'; 