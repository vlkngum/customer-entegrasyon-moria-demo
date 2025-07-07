import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, PaginatedOrderResponse, OrderFilter } from '@/types/Order';
import { orderService } from '@/utils/requests/orderService';

interface OrderState {
  orders: Order[];
  pagination: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  } | null;
  filters: OrderFilter | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  successMessage: string | null;
  currentOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  pagination: null,
  filters: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  successMessage: null,
  currentOrder: null,
};

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (
    { bearer, filters }: { bearer: string; filters?: OrderFilter },
    { rejectWithValue }
  ) => {
    try {
      const res = await orderService.getOrders(bearer, filters);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Siparişler alınamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (
    { bearer, data }: { bearer: string; data: Partial<Order> },
    { rejectWithValue }
  ) => {
    try {
      const res = await orderService.createOrder(bearer, data);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Sipariş oluşturulamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (
    { bearer, id, data }: { bearer: string; id: string; data: Partial<Order> },
    { rejectWithValue }
  ) => {
    try {
      const res = await orderService.updateOrder(bearer, id, data);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Sipariş güncellenemedi';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (
    { bearer, id }: { bearer: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      await orderService.deleteOrder(bearer, id);
      return id;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Sipariş silinemedi';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (
    { bearer, id }: { bearer: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await orderService.getOrderById(bearer, id);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Sipariş bulunamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<OrderFilter>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = null;
    },
    setCurrentOrder(state, action: PayloadAction<Order>) {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    clearAllData(state) {
      state.orders = [];
      state.currentOrder = null;
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
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<PaginatedOrderResponse>) => {
        state.isLoading = false;
        state.orders = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
          last_page: action.payload.last_page,
        };
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrder.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isCreating = false;
        state.orders.unshift(action.payload);
        state.successMessage = 'Sipariş başarıyla oluşturuldu';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isUpdating = false;
        const idx = state.orders.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.orders[idx] = action.payload;
        state.successMessage = 'Sipariş başarıyla güncellendi';
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.isDeleting = false;
        state.orders = state.orders.filter((o) => String(o.id) !== action.payload);
        state.successMessage = 'Sipariş başarıyla silindi';
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentOrder,
  clearCurrentOrder,
  clearError,
  clearSuccessMessage,
  clearAllData,
} = orderSlice.actions;

export default orderSlice.reducer; 