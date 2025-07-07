import { IResponse } from "@/types/IResponse";
import { 
  Customer, 
  CreateCustomerRequest, 
  UpdateCustomerRequest,
  PaginatedCustomerResponse
} from "@/types/Customer";
import useRequest from './useRequest';

export const customerService = {
    // GET customer/customer-lists
    getCustomers: async (bearer: string, params?: Record<string, unknown>): Promise<IResponse<PaginatedCustomerResponse>> => {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, value.toString());
                }
            });
        }
        const url = params ? `customer/customer-lists?${queryParams.toString()}` : 'customer/customer-lists';
        return await useRequest.requests.getHeader<IResponse<PaginatedCustomerResponse>>(url, bearer);
    },

    // POST customer/customer-lists
    createCustomer: async (bearer: string, data: CreateCustomerRequest): Promise<IResponse<Customer>> => {
        return await useRequest.requests.postHeader<IResponse<Customer>>(`customer/customer-lists`, data, bearer);
    },

    // GET customer/customer-lists/{id}
    getCustomerById: async (bearer: string, id: string): Promise<IResponse<Customer>> => {
        return await useRequest.requests.getHeader<IResponse<Customer>>(`customer/customer-lists/${id}`, bearer);
    },

    // PUT customer/customer-lists/{id}
    updateCustomer: async (bearer: string, id: string, data: UpdateCustomerRequest): Promise<IResponse<Customer>> => {
        return await useRequest.requests.putHeader<IResponse<Customer>>(`customer/customer-lists/${id}`, data, bearer);
    },

    // DELETE customer/customer-lists/{id}
    deleteCustomer: async (bearer: string, id: string): Promise<IResponse<void>> => {
        return await useRequest.requests.delHeader<IResponse<void>>(`customer/customer-lists/${id}`, bearer);
    },
}; 