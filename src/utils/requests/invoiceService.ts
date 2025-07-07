import { IResponse } from "@/types/IResponse";
import { 
  SalesInvoice, 
  PaginatedInvoiceResponse, 
  CreateInvoiceRequest, 
  UpdateInvoiceRequest 
} from "@/types/Invoice";
import useRequest from './useRequest';

export const invoiceService = {
    // GET customer/sales-invoices
    getSalesInvoices: async (bearer: string, filters?: Record<string, string | number>): Promise<IResponse<PaginatedInvoiceResponse>> => {
        const queryParams = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, value.toString());
                }
            });
        }
        const url = filters ? `sales-invoices?${queryParams.toString()}` : 'sales-invoices';
        return await useRequest.requests.getHeader<IResponse<PaginatedInvoiceResponse>>(url, bearer);
    },

    // POST customer/sales-invoices
    createSalesInvoice: async (bearer: string, data: CreateInvoiceRequest): Promise<IResponse<SalesInvoice>> => {
        return await useRequest.requests.postHeader<IResponse<SalesInvoice>>(`customer/sales-invoices`, data, bearer);
    },

    // GET customer/sales-invoices/{id}
    getSalesInvoiceById: async (bearer: string, id: string): Promise<IResponse<SalesInvoice>> => {
        return await useRequest.requests.getHeader<IResponse<SalesInvoice>>(`customer/sales-invoices/${id}`, bearer);
    },

    // PUT customer/sales-invoices/{id}
    updateSalesInvoice: async (bearer: string, id: string, data: UpdateInvoiceRequest): Promise<IResponse<SalesInvoice>> => {
        return await useRequest.requests.putHeader<IResponse<SalesInvoice>>(`customer/sales-invoices/${id}`, data, bearer);
    },

    // DELETE customer/sales-invoices/{id}
    deleteSalesInvoice: async (bearer: string, id: string): Promise<IResponse<void>> => {
        return await useRequest.requests.delHeader<IResponse<void>>(`customer/sales-invoices/${id}`, bearer);
    },
};
