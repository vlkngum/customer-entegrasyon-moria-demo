import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Generic configuration interface for invoice platforms
export interface InvoiceConfig {
  // Integration metadata
  integration_id?: number;
  
  // Common fields
  apiBaseUrl?: string;
  integrationStatus: string;
  
  // Authentication fields
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  username?: string;
  password?: string;
  
  // Invoice-specific fields
  taxNumber?: string;
  taxOffice?: string;
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  invoiceType?: string;
  currency?: string;
  
  // Platform-specific fields
  clientId?: string;
  clientSecret?: string;
  appKey?: string;
  appSecret?: string;
  supplierId?: string;
  apiSecretKey?: string;
  userAgent?: string;
  
  // Additional custom fields
  [key: string]: string | number | undefined;
}

const initialState: InvoiceConfig = {
  integrationStatus: 'false',
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<InvoiceConfig>>) {
      return { ...state, ...action.payload };
    },
    setField(state, action: PayloadAction<{ key: string; value: string | number }>) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetConfig(state) {
      // Reset all fields except integrationStatus
      Object.keys(state).forEach(key => {
        if (key !== 'integrationStatus') {
          state[key] = '';
        }
      });
      state.integrationStatus = 'false';
    },
    setIntegrationStatus(state, action: PayloadAction<string>) {
      state.integrationStatus = action.payload;
    },
  },
});

export const { setConfig, setField, resetConfig, setIntegrationStatus } = invoiceSlice.actions;
export default invoiceSlice.reducer; 