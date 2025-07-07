import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ReturnRequest, PaginatedReturnRequestResponse, ReturnRequestFilter } from '@/types/ReturnRequest';
import { returnRequestService } from '@/utils/requests/returnRequestService';

interface ReturnRequestState {
  returnRequests: ReturnRequest[];
  pagination: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  } | null;
  filters: ReturnRequestFilter | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  successMessage: string | null;
  currentReturnRequest: ReturnRequest | null;
}

const initialState: ReturnRequestState = {
  returnRequests: [],
  pagination: null,
  filters: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  successMessage: null,
  currentReturnRequest: null,
};

export const fetchReturnRequests = createAsyncThunk(
  'returnRequest/fetchReturnRequests',
  async (
    { bearer, filters }: { bearer: string; filters?: ReturnRequestFilter },
    { rejectWithValue }
  ) => {
    try {
      const res = await returnRequestService.getReturnRequests(bearer, filters);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'İade talepleri alınamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createReturnRequest = createAsyncThunk(
  'returnRequest/createReturnRequest',
  async (
    { bearer, data }: { bearer: string; data: Partial<ReturnRequest> },
    { rejectWithValue }
  ) => {
    try {
      const res = await returnRequestService.createReturnRequest(bearer, data);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'İade talebi oluşturulamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateReturnRequest = createAsyncThunk(
  'returnRequest/updateReturnRequest',
  async (
    { bearer, id, data }: { bearer: string; id: string; data: Partial<ReturnRequest> },
    { rejectWithValue }
  ) => {
    try {
      const res = await returnRequestService.updateReturnRequest(bearer, id, data);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'İade talebi güncellenemedi';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteReturnRequest = createAsyncThunk(
  'returnRequest/deleteReturnRequest',
  async (
    { bearer, id }: { bearer: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      await returnRequestService.deleteReturnRequest(bearer, id);
      return id;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'İade talebi silinemedi';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getReturnRequestById = createAsyncThunk(
  'returnRequest/getReturnRequestById',
  async (
    { bearer, id }: { bearer: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await returnRequestService.getReturnRequestById(bearer, id);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'İade talebi bulunamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

const returnRequestSlice = createSlice({
  name: 'returnRequest',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<ReturnRequestFilter>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = null;
    },
    setCurrentReturnRequest(state, action: PayloadAction<ReturnRequest>) {
      state.currentReturnRequest = action.payload;
    },
    clearCurrentReturnRequest(state) {
      state.currentReturnRequest = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    clearAllData(state) {
      state.returnRequests = [];
      state.currentReturnRequest = null;
      state.pagination = null;
      state.filters = null;
      state.isLoading = false;
      state.isCreating = false;
      state.isUpdating = false;
      state.isDeleting = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReturnRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReturnRequests.fulfilled, (state, action: PayloadAction<PaginatedReturnRequestResponse>) => {
        state.isLoading = false;
        state.returnRequests = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
          last_page: action.payload.last_page,
        };
      })
      .addCase(fetchReturnRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createReturnRequest.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createReturnRequest.fulfilled, (state, action: PayloadAction<ReturnRequest>) => {
        state.isCreating = false;
        state.returnRequests.unshift(action.payload);
        state.successMessage = 'İade talebi başarıyla oluşturuldu';
      })
      .addCase(createReturnRequest.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      .addCase(updateReturnRequest.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateReturnRequest.fulfilled, (state, action: PayloadAction<ReturnRequest>) => {
        state.isUpdating = false;
        const idx = state.returnRequests.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.returnRequests[idx] = action.payload;
        state.successMessage = 'İade talebi başarıyla güncellendi';
      })
      .addCase(updateReturnRequest.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      .addCase(deleteReturnRequest.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteReturnRequest.fulfilled, (state, action: PayloadAction<string>) => {
        state.isDeleting = false;
        state.returnRequests = state.returnRequests.filter((r) => String(r.id) !== action.payload);
        state.successMessage = 'İade talebi başarıyla silindi';
      })
      .addCase(deleteReturnRequest.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })
      .addCase(getReturnRequestById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReturnRequestById.fulfilled, (state, action: PayloadAction<ReturnRequest>) => {
        state.isLoading = false;
        state.currentReturnRequest = action.payload;
      })
      .addCase(getReturnRequestById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentReturnRequest,
  clearCurrentReturnRequest,
  clearError,
  clearSuccessMessage,
  clearAllData,
} = returnRequestSlice.actions;

export default returnRequestSlice.reducer; 