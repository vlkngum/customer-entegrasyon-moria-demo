import { IResponse } from "./IResponse";

// Product interface
export interface Product {
  id: string;
  user_id: string;
  category_id: string | null;
  barcode: string;
  title: string;
  product_main_id: string;
  quantity: number;
  stock_code: string;
  dimensional_weight: string;
  description: string;
  currency_type: string;
  list_price: string;
  sale_price: string;
  cargo_company_id: number;
  delivery_duration: string | null;
  delivery_option: string | null;
  vat_rate: number;
  shipment_address_id: string | null;
  returning_address_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  attributes: unknown[];
  brand_id: string | null;
  images: { id: string; product_id: string; image_url: string; created_at: string; updated_at: string }[];
  integrations: { id: number; name: string; logo_url: string }[];
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
  brand_id?: number;
  status?: 'pending' | 'approved' | 'rejected' | string;
  integration_id?: number;
  category_id?: string;
  min_price?: number;
  max_price?: number;
  min_quantity?: number;
  max_quantity?: number;
  per_page?: number;
}

// Request interfaces for creating and updating products
export interface CreateProductRequest {
  sku: string;
  name: string;
  price: string;
  img?: string;
  stock: number;
  platform_id: number;
  status?: string;
  source?: string;
  description?: string;
  category_id?: number;
  brand_id?: number;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  tags?: string[];
  images?: string[];
  variants?: ProductVariant[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

export interface ProductVariant {
  id?: number;
  sku: string;
  name: string;
  price: string;
  stock: number;
  attributes?: Record<string, string>;
}

export interface ProductSyncRequest {
  product_ids: number[];
  platform_ids: number[];
}

export interface ProductBulkActionRequest {
  product_ids: number[];
  action: 'activate' | 'deactivate' | 'delete' | 'sync' | 'export';
  platform_ids?: number[];
}

// Category and Brand interfaces
export interface Category {
  id: number;
  name: string;
  parent_id?: number;
  description?: string;
  image_url?: string;
  is_active?: boolean;
}

export interface Brand {
  id: number;
  name: string;
  logo_url?: string;
  description?: string;
  website?: string;
  is_active?: boolean;
}

// API Response types
export type ProductResponse = IResponse<Product>;
export type PaginatedProductResponseType = IResponse<PaginatedProductResponse>;
export type CategoriesResponse = IResponse<Category[]>;
export type BrandsResponse = IResponse<Brand[]>;
export type ProductSyncResponse = IResponse<{ success: boolean; message: string }>;
export type ProductBulkActionResponse = IResponse<{ success: boolean; message: string }>;
export type ProductImageUploadResponse = IResponse<{ url: string; filename: string }>;
export type ProductExportResponse = IResponse<{ download_url: string }>;
export type ProductImportResponse = IResponse<{ success: boolean; imported_count: number; errors: string[] }>; 