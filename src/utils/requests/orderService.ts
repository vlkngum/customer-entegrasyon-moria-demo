import { Order, PaginatedOrderResponse, OrderFilter } from '@/types/Order';
import { IResponse } from '@/types/IResponse';
import useRequest from './useRequest';

export const orderService = {
  // GET customer/orders
  getOrders: async (bearer: string, filters?: OrderFilter): Promise<IResponse<PaginatedOrderResponse>> => {
    const queryParams = new URLSearchParams();
    if (filters) {
      if (filters.integration_id !== undefined) queryParams.append('integration_id', String(filters.integration_id));
      if (filters.order_number) queryParams.append('order_number', filters.order_number);
      if (filters.start_date) queryParams.append('start_date', filters.start_date);
      if (filters.end_date) queryParams.append('end_date', filters.end_date);
      if (filters.per_page !== undefined) queryParams.append('per_page', String(filters.per_page));
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.customer_email) queryParams.append('customer_email', filters.customer_email);
      if (filters.customer_id !== undefined) queryParams.append('customer_id', String(filters.customer_id));
      if (filters.cargo_tracking_number) queryParams.append('cargo_tracking_number', filters.cargo_tracking_number);
    }
    const url = queryParams.toString() ? `customer/orders?${queryParams.toString()}` : 'customer/orders';
    return await useRequest.requests.getHeader<IResponse<PaginatedOrderResponse>>(url, bearer);
  },

  // GET customer/orders/{id}
  getOrderById: async (bearer: string, id: string): Promise<IResponse<Order>> => {
    return await useRequest.requests.getHeader<IResponse<Order>>(`customer/orders/${id}`, bearer);
  },

  // POST customer/orders
  createOrder: async (bearer: string, data: Partial<Order>): Promise<IResponse<Order>> => {
    return await useRequest.requests.postHeader<IResponse<Order>>(`customer/orders`, data, bearer);
  },

  // PUT customer/orders/{id}
  updateOrder: async (bearer: string, id: string, data: Partial<Order>): Promise<IResponse<Order>> => {
    return await useRequest.requests.putHeader<IResponse<Order>>(`customer/orders/${id}`, data, bearer);
  },

  // DELETE customer/orders/{id}
  deleteOrder: async (bearer: string, id: string): Promise<IResponse<void>> => {
    return await useRequest.requests.delHeader<IResponse<void>>(`customer/orders/${id}`, bearer);
  },
}; 