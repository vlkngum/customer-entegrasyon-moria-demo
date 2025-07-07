import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Generic configuration interface for ERP platforms
export interface ErpConfig {
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
  
  // ERP-specific fields
  companyId?: string;
  databaseName?: string;
  serverUrl?: string;
  port?: string;
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
  subscriptionId?: string;
  
  // Platform-specific fields
  appKey?: string;
  appSecret?: string;
  supplierId?: string;
  apiSecretKey?: string;
  userAgent?: string;
  
  // Additional custom fields
  [key: string]: string | number | undefined;
}

const initialState: ErpConfig = {
  integrationStatus: 'false',
};

const erpSlice = createSlice({
  name: 'erp',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<ErpConfig>>) {
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

export const { setConfig, setField, resetConfig, setIntegrationStatus } = erpSlice.actions;
export default erpSlice.reducer; 