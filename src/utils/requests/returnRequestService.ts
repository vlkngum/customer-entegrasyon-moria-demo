import { ReturnRequest, PaginatedReturnRequestResponse, ReturnRequestFilter } from '@/types/ReturnRequest';
import { IResponse } from '@/types/IResponse';
import useRequest from './useRequest';

export const returnRequestService = {
  // GET customer/return-requests
  getReturnRequests: async (bearer: string, filters?: ReturnRequestFilter): Promise<IResponse<PaginatedReturnRequestResponse>> => {
    const queryParams = new URLSearchParams();
    if (filters) {
      if (filters.order_number) queryParams.append('order_number', filters.order_number);
      if (filters.return_code) queryParams.append('return_code', filters.return_code);
    }
    const url = queryParams.toString() ? `customer/return-requests?${queryParams.toString()}` : 'customer/return-requests';
    return await useRequest.requests.getHeader<IResponse<PaginatedReturnRequestResponse>>(url, bearer);
  },

  // GET customer/return-requests/{id}
  getReturnRequestById: async (bearer: string, id: string): Promise<IResponse<ReturnRequest>> => {
    return await useRequest.requests.getHeader<IResponse<ReturnRequest>>(`customer/return-requests/${id}`, bearer);
  },

  // POST customer/return-requests
  createReturnRequest: async (bearer: string, data: Partial<ReturnRequest>): Promise<IResponse<ReturnRequest>> => {
    return await useRequest.requests.postHeader<IResponse<ReturnRequest>>(`customer/return-requests`, data, bearer);
  },

  // PUT customer/return-requests/{id}
  updateReturnRequest: async (bearer: string, id: string, data: Partial<ReturnRequest>): Promise<IResponse<ReturnRequest>> => {
    return await useRequest.requests.putHeader<IResponse<ReturnRequest>>(`customer/return-requests/${id}`, data, bearer);
  },

  // DELETE customer/return-requests/{id}
  deleteReturnRequest: async (bearer: string, id: string): Promise<IResponse<void>> => {
    return await useRequest.requests.delHeader<IResponse<void>>(`customer/return-requests/${id}`, bearer);
  },
}; 