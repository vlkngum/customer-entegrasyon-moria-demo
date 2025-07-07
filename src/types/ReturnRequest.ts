import { IResponse } from "./IResponse";

export interface ReturnRequest {
  id: number;
  order_number: string;
  return_code: string;
  status: string;
  created_at: string;
  updated_at: string;
  integration?: {
    name: string;
    logo_url: string;
  };
  return_data?: {
    requested_at?: string;
    reason?: string;
    status?: string;
    product?: {
      name: string;
      product_id: string;
      quantity: number;
      price: number;
    };
    customer_note?: string;
    tracking_number?: string;
  };
}

export interface PaginatedReturnRequestResponse {
  current_page: number;
  data: ReturnRequest[];
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

export interface ReturnRequestFilter {
  order_number?: string;
  return_code?: string;
}

export type ReturnRequestResponse = IResponse<ReturnRequest>;
export type PaginatedReturnRequestResponseType = IResponse<PaginatedReturnRequestResponse>; 