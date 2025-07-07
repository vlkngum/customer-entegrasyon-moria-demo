import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Generic configuration interface for shop platforms
export interface ShopConfig {
  // Common fields
  apiBaseUrl?: string;
  storeUrl?: string;
  integrationStatus: string;
  integration_id?: number;
  
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
  [key: string]: string | number | undefined;
}

const initialState: ShopConfig = {
  integrationStatus: 'false',
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<ShopConfig>>) {
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

export const { setConfig, setField, resetConfig, setIntegrationStatus } = shopSlice.actions;
export default shopSlice.reducer; 