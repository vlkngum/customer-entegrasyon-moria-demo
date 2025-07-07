import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Generic configuration interface for e-commerce platforms
export interface GenericConfig {
  // Integration metadata
  integration_id?: number;
  
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
  [key: string]: string | number | undefined;
}

const initialState: GenericConfig = {
  integrationStatus: 'false',
};

const eticaretSlice = createSlice({
  name: 'eticaret',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<GenericConfig>>) {
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
    // New action to initialize with SSR data
    initializeWithSSRData(state, action: PayloadAction<{ config: Record<string, unknown>; integration_id?: number }>) {
      const { config, integration_id } = action.payload;
      
      // Clear existing state
      Object.keys(state).forEach(key => {
        delete state[key];
      });
      
      // Set integration_id
      if (integration_id) {
        state.integration_id = integration_id;
      }
      
      // Set all config values
      Object.entries(config).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          state[key] = String(value);
        }
      });
      
      // Ensure integrationStatus is set
      if (!state.integrationStatus) {
        state.integrationStatus = 'false';
      }
    },
  },
});

export const { setConfig, setField, resetConfig, setIntegrationStatus, initializeWithSSRData } = eticaretSlice.actions;
export default eticaretSlice.reducer; 