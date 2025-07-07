import { IResponse } from "@/types/IResponse";
import type { Product, PaginatedProductResponse } from "@/store/slices/productSlice";
import { 
  ProductFilter,
  CreateProductRequest,
  UpdateProductRequest,
  ProductSyncRequest,
  ProductBulkActionRequest,
  Category,
  Brand
} from "@/types/Product";
import useRequest from './useRequest';

export const productService = {
    // GET customer/product/list
    getProducts: async (bearer: string, filters?: ProductFilter): Promise<IResponse<PaginatedProductResponse>> => {
        const queryParams = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, value.toString());
                }
            });
        }
        const url = filters ? `products?${queryParams.toString()}` : 'products';
        return await useRequest.requests.getHeader<IResponse<PaginatedProductResponse>>(url, bearer);
    },

    // POST customer/product/list
    createProduct: async (bearer: string, data: CreateProductRequest): Promise<IResponse<Product>> => {
        return await useRequest.requests.postHeader<IResponse<Product>>(`products`, data, bearer);
    },

    // GET customer/product/list/{id}
    getProductById: async (bearer: string, id: string): Promise<IResponse<Product>> => {
        return await useRequest.requests.getHeader<IResponse<Product>>(`products/${id}`, bearer);
    },

    // PUT customer/product/list/{id}
    updateProduct: async (bearer: string, id: string, data: UpdateProductRequest): Promise<IResponse<Product>> => {
        return await useRequest.requests.putHeader<IResponse<Product>>(`products/${id}`, data, bearer);
    },

    // DELETE customer/product/list/{id}
    deleteProduct: async (bearer: string, id: string): Promise<IResponse<void>> => {
        return await useRequest.requests.delHeader<IResponse<void>>(`products/${id}`, bearer);
    },

    // POST customer/product/sync
    syncProducts: async (bearer: string, data: ProductSyncRequest): Promise<IResponse<{ success: boolean; message: string }>> => {
        return await useRequest.requests.postHeader<IResponse<{ success: boolean; message: string }>>(`customer/product/sync`, data, bearer);
    },

    // POST customer/product/bulk-action
    bulkAction: async (bearer: string, data: ProductBulkActionRequest): Promise<IResponse<{ success: boolean; message: string }>> => {
        return await useRequest.requests.postHeader<IResponse<{ success: boolean; message: string }>>(`customer/product/bulk-action`, data, bearer);
    },

    // GET customer/product/categories
    getCategories: async (bearer: string): Promise<IResponse<Category[]>> => {
        return await useRequest.requests.getHeader<IResponse<Category[]>>(`customer/product/categories`, bearer);
    },

    // GET customer/product/brands
    getBrands: async (bearer: string): Promise<IResponse<Brand[]>> => {
        return await useRequest.requests.getHeader<IResponse<Brand[]>>(`customer/product/brands`, bearer);
    },

    // POST customer/product/upload-image
    uploadImage: async (bearer: string, file: File): Promise<IResponse<{ url: string; filename: string }>> => {
        const formData = new FormData();
        formData.append('image', file);
        return await useRequest.requests.postHeader<IResponse<{ url: string; filename: string }>>(`customer/product/upload-image`, formData, bearer);
    },

    // GET customer/product/export
    exportProducts: async (bearer: string, filters?: ProductFilter, format: 'csv' | 'excel' = 'csv'): Promise<IResponse<{ download_url: string }>> => {
        const queryParams = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, value.toString());
                }
            });
        }
        queryParams.append('format', format);
        const url = `customer/product/export?${queryParams.toString()}`;
        return await useRequest.requests.getHeader<IResponse<{ download_url: string }>>(url, bearer);
    },

    // POST customer/product/import
    importProducts: async (bearer: string, file: File): Promise<IResponse<{ success: boolean; imported_count: number; errors: string[] }>> => {
        const formData = new FormData();
        formData.append('file', file);
        return await useRequest.requests.postHeader<IResponse<{ success: boolean; imported_count: number; errors: string[] }>>(`customer/product/import`, formData, bearer);
    },
}; 