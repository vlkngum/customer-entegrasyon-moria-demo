import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { customerService } from '@/utils/requests/customerService';
import { 
  Customer, 
  CreateCustomerRequest, 
  UpdateCustomerRequest,
  CustomerFilter
} from '@/types/Customer';

// Async thunks for API operations
export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async ({ bearer, filters }: { bearer: string; filters?: CustomerFilter }) => {
    const response = await customerService.getCustomers(bearer, filters);
    return response.data;
  }
);

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async ({ bearer, data }: { bearer: string; data: CreateCustomerRequest }) => {
    const response = await customerService.createCustomer(bearer, data);
    return response.data;
  }
);

export const fetchCustomerById = createAsyncThunk(
  'customer/fetchCustomerById',
  async ({ bearer, id }: { bearer: string; id: string }) => {
    const response = await customerService.getCustomerById(bearer, id);
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({ bearer, id, data }: { bearer: string; id: string; data: UpdateCustomerRequest }) => {
    const response = await customerService.updateCustomer(bearer, id, data);
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async ({ bearer, id }: { bearer: string; id: string }, { rejectWithValue }) => {
    try {
      console.log('Redux: Starting delete customer operation for ID:', id);
      await customerService.deleteCustomer(bearer, id);
      console.log('Redux: Customer deleted successfully from API, returning ID:', id);
      return id;
    } catch (error: unknown) {
      console.error('Redux: Error deleting customer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete customer';
      return rejectWithValue(errorMessage);
    }
  }
);

// State interface
interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | null;
  pagination: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  } | null;
  filters: CustomerFilter | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  successMessage: string | null;
}

// Initial state
const initialState: CustomerState = {
  customers: [],
  currentCustomer: null,
  pagination: null,
  filters: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  successMessage: null,
};

// Create the slice
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Clear current customer
    clearCurrentCustomer: (state) => {
      state.currentCustomer = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear success message
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    // Set current customer
    setCurrentCustomer: (state, action: PayloadAction<Customer>) => {
      state.currentCustomer = action.payload;
    },

    // Update customer in list
    updateCustomerInList: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(customer => customer.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },

    // Remove customer from list
    removeCustomerFromList: (state, action: PayloadAction<string>) => {
      const customerId = action.payload;
      const initialLength = state.customers.length;
      state.customers = state.customers.filter(customer => customer.id !== customerId);
      const finalLength = state.customers.length;
      
      console.log(`Manual remove customer ${customerId}: ${initialLength} -> ${finalLength} customers`);
      
      // Update pagination if needed
      if (state.pagination && initialLength !== finalLength) {
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      }
    },

    // Set filters
    setFilters: (state, action: PayloadAction<CustomerFilter>) => {
      state.filters = action.payload;
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = null;
    },

    // Clear all data
    clearAllData: (state) => {
      state.customers = [];
      state.currentCustomer = null;
      state.pagination = null;
      state.filters = null;
      state.error = null;
      state.successMessage = null;
    },

    // Force refresh customers list
    forceRefreshCustomers: (state) => {
      // This will trigger a re-render by marking the state as changed
      state.customers = [...state.customers];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
          last_page: action.payload.last_page,
        };
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch customers';
      })

      // Create customer
      .addCase(createCustomer.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isCreating = false;
        state.customers.unshift(action.payload);
        state.successMessage = 'Customer created successfully';
        // Update pagination if needed
        if (state.pagination) {
          state.pagination.total += 1;
        }
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message || 'Failed to create customer';
      })

      // Fetch customer by ID
      .addCase(fetchCustomerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCustomer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch customer';
      })

      // Update customer
      .addCase(updateCustomer.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isUpdating = false;
        // Update in list
        const index = state.customers.findIndex(customer => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
        // Update current customer if it's the same
        if (state.currentCustomer && state.currentCustomer.id === action.payload.id) {
          state.currentCustomer = action.payload;
        }
        state.successMessage = 'Customer updated successfully';
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.error.message || 'Failed to update customer';
      })

      // Delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isDeleting = false;
        const customerId = action.payload;
        
        // Remove from list with better error handling
        const initialLength = state.customers.length;
        state.customers = state.customers.filter(customer => customer.id !== customerId);
        const finalLength = state.customers.length;
        
        // Log for debugging
        console.log(`Delete customer ${customerId}: ${initialLength} -> ${finalLength} customers`);
        
        // Clear current customer if it's the deleted one
        if (state.currentCustomer && state.currentCustomer.id === customerId) {
          state.currentCustomer = null;
        }
        
        state.successMessage = 'Customer deleted successfully';
        
        // Update pagination if needed
        if (state.pagination && initialLength !== finalLength) {
          state.pagination.total = Math.max(0, state.pagination.total - 1);
        }
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.error.message || 'Failed to delete customer';
        state.successMessage = null;
      });
  },
});

// Export actions
export const {
  clearCurrentCustomer,
  clearError,
  clearSuccessMessage,
  setCurrentCustomer,
  updateCustomerInList,
  removeCustomerFromList,
  setFilters,
  clearFilters,
  clearAllData,
  forceRefreshCustomers,
} = customerSlice.actions;

// Export selectors
export const selectCustomers = (state: { customer: CustomerState }) => 
  state.customer.customers;

export const selectCurrentCustomer = (state: { customer: CustomerState }) => 
  state.customer.currentCustomer;

export const selectPagination = (state: { customer: CustomerState }) => 
  state.customer.pagination;

export const selectFilters = (state: { customer: CustomerState }) => 
  state.customer.filters;

export const selectIsLoading = (state: { customer: CustomerState }) => 
  state.customer.isLoading;

export const selectIsCreating = (state: { customer: CustomerState }) => 
  state.customer.isCreating;

export const selectIsUpdating = (state: { customer: CustomerState }) => 
  state.customer.isUpdating;

export const selectIsDeleting = (state: { customer: CustomerState }) => 
  state.customer.isDeleting;

export const selectError = (state: { customer: CustomerState }) => 
  state.customer.error;

export const selectSuccessMessage = (state: { customer: CustomerState }) => 
  state.customer.successMessage;

export const selectCustomerById = (id: string) => (state: { customer: CustomerState }) => 
  state.customer.customers.find(customer => customer.id === id);

// Export reducer
export default customerSlice.reducer; 