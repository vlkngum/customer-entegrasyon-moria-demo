import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CreateProductRequest, UpdateProductRequest } from '@/types/Product';
import { productService } from '@/utils/requests/productService';

// Product interface
export interface Product {
  id: number;
  sku: string;
  name: string;
  price: string;
  img: string;
  stock: number;
  platform: {
    name: string;
    icon: string;
    synced: boolean;
  };
  status: string;
  source: string;
}

// Paginated response interface
export interface PaginatedProductResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Filter interface
export interface ProductFilter {
  search?: string;
  status?: string;
  platform?: string;
  page?: number;
  per_page?: number;
}

interface ProductState {
  products: Product[];
  pagination: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  } | null;
  filters: ProductFilter | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  successMessage: string | null;
  currentProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  pagination: null,
  filters: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  successMessage: null,
  currentProduct: null,
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (
    { bearer, filters }: { bearer: string; filters?: ProductFilter },
    { rejectWithValue }
  ) => {
    try {
      const res = await productService.getProducts(bearer, filters);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ürünler alınamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (
    { bearer, data }: { bearer: string; data: CreateProductRequest },
    { rejectWithValue }
  ) => {
    try {
      const res = await productService.createProduct(bearer, data);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ürün oluşturulamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (
    { bearer, id, data }: { bearer: string; id: string; data: UpdateProductRequest },
    { rejectWithValue }
  ) => {
    try {
      const res = await productService.updateProduct(bearer, id, data);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ürün güncellenemedi';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (
    { bearer, id }: { bearer: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      await productService.deleteProduct(bearer, id);
      return id;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ürün silinemedi';
      return rejectWithValue(errorMessage);
    }
  }
);

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (
    { bearer, id }: { bearer: string; id: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await productService.getProductById(bearer, id);
      return res.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ürün bulunamadı';
      return rejectWithValue(errorMessage);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<ProductFilter>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = null;
    },
    setCurrentProduct(state, action: PayloadAction<Product>) {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct(state) {
      state.currentProduct = null;
    },
    clearError(state) {
      state.error = null;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
    clearAllData(state) {
      state.products = [];
      state.currentProduct = null;
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
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<PaginatedProductResponse>) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
          last_page: action.payload.last_page,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isCreating = false;
        state.products.unshift(action.payload);
        state.successMessage = 'Ürün başarıyla oluşturuldu';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isUpdating = false;
        const idx = state.products.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.products[idx] = action.payload;
        state.successMessage = 'Ürün başarıyla güncellendi';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.isDeleting = false;
        state.products = state.products.filter((p) => String(p.id) !== action.payload);
        state.successMessage = 'Ürün başarıyla silindi';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setCurrentProduct,
  clearCurrentProduct,
  clearError,
  clearSuccessMessage,
  clearAllData,
} = productSlice.actions;

export default productSlice.reducer; 