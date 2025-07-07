import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntegrationData } from '@/utils/requests/integrationService';

const initialState: IntegrationData[] = [];

const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    setIntegrations(state, action: PayloadAction<IntegrationData[]>) {
      return action.payload;
    },
    clearIntegrations() {
      return [];
    },
  },
});

export const { setIntegrations, clearIntegrations } = integrationsSlice.actions;
export default integrationsSlice.reducer; 