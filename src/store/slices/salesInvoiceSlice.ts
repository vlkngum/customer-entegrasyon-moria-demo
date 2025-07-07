import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { invoiceService } from '@/utils/requests/invoiceService';
import { 
  SalesInvoice, 
  CreateInvoiceRequest, 
  UpdateInvoiceRequest 
} from '@/types/Invoice';

// Async thunks for API operations
export const fetchSalesInvoices = createAsyncThunk(
  'salesInvoice/fetchSalesInvoices',
  async ({ bearer, filters }: { bearer: string; filters?: Record<string, string | number> }) => {
    const response = await invoiceService.getSalesInvoices(bearer, filters);
    return response.data;
  }
);

export const createSalesInvoice = createAsyncThunk(
  'salesInvoice/createSalesInvoice',
  async ({ bearer, data }: { bearer: string; data: CreateInvoiceRequest }) => {
    const response = await invoiceService.createSalesInvoice(bearer, data);
    return response.data;
  }
);

export const fetchSalesInvoiceById = createAsyncThunk(
  'salesInvoice/fetchSalesInvoiceById',
  async ({ bearer, id }: { bearer: string; id: string }) => {
    const response = await invoiceService.getSalesInvoiceById(bearer, id);
    return response.data;
  }
);

export const updateSalesInvoice = createAsyncThunk(
  'salesInvoice/updateSalesInvoice',
  async ({ bearer, id, data }: { bearer: string; id: string; data: UpdateInvoiceRequest }) => {
    const response = await invoiceService.updateSalesInvoice(bearer, id, data);
    return response.data;
  }
);

export const deleteSalesInvoice = createAsyncThunk(
  'salesInvoice/deleteSalesInvoice',
  async ({ bearer, id }: { bearer: string; id: string }) => {
    await invoiceService.deleteSalesInvoice(bearer, id);
    return id;
  }
);

// State interface
interface SalesInvoiceState {
  invoices: SalesInvoice[];
  currentInvoice: SalesInvoice | null;
  pagination: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  } | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  successMessage: string | null;
}

// Initial state
const initialState: SalesInvoiceState = {
  invoices: [],
  currentInvoice: null,
  pagination: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  successMessage: null,
};

// Create the slice
const salesInvoiceSlice = createSlice({
  name: 'salesInvoice',
  initialState,
  reducers: {
    // Clear current invoice
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear success message
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    // Set current invoice
    setCurrentInvoice: (state, action: PayloadAction<SalesInvoice>) => {
      state.currentInvoice = action.payload;
    },

    // Update invoice in list
    updateInvoiceInList: (state, action: PayloadAction<SalesInvoice>) => {
      const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },

    // Remove invoice from list
    removeInvoiceFromList: (state, action: PayloadAction<string>) => {
      state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
    },

    // Clear all data
    clearAllData: (state) => {
      state.invoices = [];
      state.currentInvoice = null;
      state.pagination = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sales invoices
      .addCase(fetchSalesInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesInvoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invoices = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
          last_page: action.payload.last_page,
        };
      })
      .addCase(fetchSalesInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch sales invoices';
      })

      // Create sales invoice
      .addCase(createSalesInvoice.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createSalesInvoice.fulfilled, (state, action) => {
        state.isCreating = false;
        state.invoices.unshift(action.payload);
        state.successMessage = 'Sales invoice created successfully';
        // Update pagination if needed
        if (state.pagination) {
          state.pagination.total += 1;
        }
      })
      .addCase(createSalesInvoice.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message || 'Failed to create sales invoice';
      })

      // Fetch sales invoice by ID
      .addCase(fetchSalesInvoiceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesInvoiceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentInvoice = action.payload;
      })
      .addCase(fetchSalesInvoiceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch sales invoice';
      })

      // Update sales invoice
      .addCase(updateSalesInvoice.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateSalesInvoice.fulfilled, (state, action) => {
        state.isUpdating = false;
        // Update in list
        const index = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
        // Update current invoice if it's the same
        if (state.currentInvoice && state.currentInvoice.id === action.payload.id) {
          state.currentInvoice = action.payload;
        }
        state.successMessage = 'Sales invoice updated successfully';
      })
      .addCase(updateSalesInvoice.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message || 'Failed to update sales invoice';
      })

      // Delete sales invoice
      .addCase(deleteSalesInvoice.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteSalesInvoice.fulfilled, (state, action) => {
        state.isDeleting = false;
        // Remove from list
        state.invoices = state.invoices.filter(invoice => invoice.id !== action.payload);
        // Clear current invoice if it's the deleted one
        if (state.currentInvoice && state.currentInvoice.id === action.payload) {
          state.currentInvoice = null;
        }
        state.successMessage = 'Sales invoice deleted successfully';
        // Update pagination if needed
        if (state.pagination) {
          state.pagination.total -= 1;
        }
      })
      .addCase(deleteSalesInvoice.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.error.message || 'Failed to delete sales invoice';
      });
  },
});

// Export actions
export const {
  clearCurrentInvoice,
  clearError,
  clearSuccessMessage,
  setCurrentInvoice,
  updateInvoiceInList,
  removeInvoiceFromList,
  clearAllData,
} = salesInvoiceSlice.actions;

// Export selectors
export const selectSalesInvoices = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.invoices;

export const selectCurrentInvoice = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.currentInvoice;

export const selectPagination = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.pagination;

export const selectIsLoading = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.isLoading;

export const selectIsCreating = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.isCreating;

export const selectIsUpdating = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.isUpdating;

export const selectIsDeleting = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.isDeleting;

export const selectError = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.error;

export const selectSuccessMessage = (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.successMessage;

export const selectInvoiceById = (id: string) => (state: { salesInvoice: SalesInvoiceState }) => 
  state.salesInvoice.invoices.find(invoice => invoice.id === id);

// Export reducer
export default salesInvoiceSlice.reducer; 