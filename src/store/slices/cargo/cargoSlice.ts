import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Generic configuration interface for cargo platforms
export interface CargoConfig {
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
  
  // Cargo-specific fields
  customerNumber?: string;
  customerCode?: string;
  senderCode?: string;
  receiverCode?: string;
  warehouseCode?: string;
  serviceType?: string;
  deliveryType?: string;
  
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

const initialState: CargoConfig = {
  integrationStatus: 'false',
};

const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<CargoConfig>>) {
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

export const { setConfig, setField, resetConfig, setIntegrationStatus } = cargoSlice.actions;
export default cargoSlice.reducer; 