import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { settingsService } from '@/utils/requests/settingsService';
import { ServiceTemplate, IntegrationState, IntegrationStatus, IntegrationConfig } from '@/types/Ecommerce';

// Async thunk to fetch service templates
export const fetchServiceTemplates = createAsyncThunk(
  'ecommerce/fetchServiceTemplates',
  async (bearer: string) => {
    const response = await settingsService.getServiceTemplates(bearer);
    return response.data;
  }
);

// Initial state for each integration
const createInitialState = (): IntegrationState<IntegrationConfig> => ({
  config: null,
  status: {
    isConnected: false,
  },
  isLoading: false,
  error: null,
});

// Interface for the ecommerce state
interface EcommerceState {
  serviceTemplates: ServiceTemplate[];
  isLoading: boolean;
  error: string | null;
  integrations: {
    [key: string]: IntegrationState<IntegrationConfig>;
  };
}

// Initial state
const initialState: EcommerceState = {
  serviceTemplates: [],
  isLoading: false,
  error: null,
  integrations: {},
};

// Create the slice
const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    // Set integration config
    setIntegrationConfig: (
      state,
      action: PayloadAction<{ platform: string; config: unknown }>
    ) => {
      const { platform, config } = action.payload;
      if (!state.integrations[platform]) {
        state.integrations[platform] = createInitialState();
      }
      state.integrations[platform].config = config as IntegrationConfig;
    },

    // Set integration status
    setIntegrationStatus: (
      state,
      action: PayloadAction<{ platform: string; status: IntegrationStatus }>
    ) => {
      const { platform, status } = action.payload;
      if (!state.integrations[platform]) {
        state.integrations[platform] = createInitialState();
      }
      state.integrations[platform].status = status;
    },

    // Set integration loading
    setIntegrationLoading: (
      state,
      action: PayloadAction<{ platform: string; isLoading: boolean }>
    ) => {
      const { platform, isLoading } = action.payload;
      if (!state.integrations[platform]) {
        state.integrations[platform] = createInitialState();
      }
      state.integrations[platform].isLoading = isLoading;
    },

    // Set integration error
    setIntegrationError: (
      state,
      action: PayloadAction<{ platform: string; error: string | null }>
    ) => {
      const { platform, error } = action.payload;
      if (!state.integrations[platform]) {
        state.integrations[platform] = createInitialState();
      }
      state.integrations[platform].error = error;
    },

    // Reset integration
    resetIntegration: (state, action: PayloadAction<string>) => {
      const platform = action.payload;
      state.integrations[platform] = createInitialState();
    },

    // Clear all integrations
    clearIntegrations: (state) => {
      state.integrations = {};
    },

    // Clear templates
    clearTemplates: (state) => {
      state.serviceTemplates = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch service templates
      .addCase(fetchServiceTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.serviceTemplates = action.payload.data;
        
        // Initialize integrations for each service template
        action.payload.data.forEach((template: ServiceTemplate) => {
          if (template.type === 'ecommerce') {
            const platformKey = template.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (!state.integrations[platformKey]) {
              state.integrations[platformKey] = createInitialState();
            }
            
            // Set initial config if user has integration
            if (template.user_integration) {
              state.integrations[platformKey].config = template.user_integration.config as unknown as IntegrationConfig;
              state.integrations[platformKey].status = {
                isConnected: true,
                lastSync: template.user_integration.updated_at,
              };
            }
          }
        });
      })
      .addCase(fetchServiceTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch service templates';
      });
  },
});

// Export actions
export const {
  setIntegrationConfig,
  setIntegrationStatus,
  setIntegrationLoading,
  setIntegrationError,
  resetIntegration,
  clearIntegrations,
  clearTemplates,
} = ecommerceSlice.actions;

// Export selectors
export const selectServiceTemplates = (state: { ecommerce: EcommerceState }) => 
  state.ecommerce.serviceTemplates;

export const selectEcommerceTemplates = (state: { ecommerce: EcommerceState }) => 
  state.ecommerce.serviceTemplates.filter(template => template.type === 'ecommerce');

export const selectIsLoading = (state: { ecommerce: EcommerceState }) => 
  state.ecommerce.isLoading;

export const selectError = (state: { ecommerce: EcommerceState }) => 
  state.ecommerce.error;

export const selectIntegration = (platform: string) => (state: { ecommerce: EcommerceState }) => 
  state.ecommerce.integrations[platform] || createInitialState();

export const selectAllIntegrations = (state: { ecommerce: EcommerceState }) => 
  state.ecommerce.integrations;

// Export reducer
export default ecommerceSlice.reducer;
