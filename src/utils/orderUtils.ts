import { Order, OrderLineItem } from '@/types/Order';

/**
 * Get the customer's full name from an order
 */
export const getCustomerFullName = (order: Order): string => {
  if (order.invoice_fullname) {
    return order.invoice_fullname;
  }
  
  if (order.order_data?.customerFirstName || order.order_data?.customerLastName) {
    return `${order.order_data.customerFirstName || ''} ${order.order_data.customerLastName || ''}`.trim();
  }
  
  return 'Unknown Customer';
};

/**
 * Get the customer's email from an order
 */
export const getCustomerEmail = (order: Order): string => {
  return order.order_data?.customerEmail || 'No email provided';
};

/**
 * Get the order total amount with currency
 */
export const getOrderTotal = (order: Order): string => {
  if (order.order_data?.totalPrice) {
    const currency = order.order_data.currencyCode || 'TRY';
    return `${order.order_data.totalPrice} ${currency}`;
  }
  return 'N/A';
};

/**
 * Get the order total as a number
 */
export const getOrderTotalAmount = (order: Order): number => {
  return order.order_data?.totalPrice || 0;
};

/**
 * Get the platform/marketplace name
 */
export const getPlatformName = (order: Order): string => {
  return order.integration?.name || 'Unknown Platform';
};

/**
 * Get the order status with proper formatting
 */
export const getOrderStatus = (order: Order): string => {
  return order.status || 'Unknown';
};

/**
 * Get the order date in a readable format
 */
export const getOrderDate = (order: Order): string => {
  if (order.order_data?.orderDate) {
    return new Date(order.order_data.orderDate).toLocaleDateString('tr-TR');
  }
  return new Date(order.created_at).toLocaleDateString('tr-TR');
};

/**
 * Get the shipping address as a formatted string
 */
export const getShippingAddress = (order: Order): string => {
  if (order.shipping_address) {
    return order.shipping_address;
  }
  
  if (order.order_data?.shipmentAddress) {
    const addr = order.order_data.shipmentAddress;
    return addr.fullAddress || `${addr.address1}, ${addr.district} ${addr.city}`;
  }
  
  return 'No shipping address';
};

/**
 * Get the invoice address as a formatted string
 */
export const getInvoiceAddress = (order: Order): string => {
  if (order.invoice_address) {
    return order.invoice_address;
  }
  
  if (order.order_data?.invoiceAddress) {
    const addr = order.order_data.invoiceAddress;
    return addr.fullAddress || `${addr.address1}, ${addr.district} ${addr.city}`;
  }
  
  return 'No invoice address';
};

/**
 * Get the cargo tracking number
 */
export const getCargoTrackingNumber = (order: Order): string => {
  return order.order_data?.cargoTrackingNumber?.toString() || 'No tracking number';
};

/**
 * Get the cargo provider name
 */
export const getCargoProvider = (order: Order): string => {
  return order.order_data?.cargoProviderName || 'Unknown carrier';
};

/**
 * Get all line items from an order
 */
export const getOrderLineItems = (order: Order): OrderLineItem[] => {
  return order.order_data?.lines || [];
};

/**
 * Get the total number of items in an order
 */
export const getTotalItemCount = (order: Order): number => {
  const items = getOrderLineItems(order);
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Check if an order has fast delivery
 */
export const hasFastDelivery = (order: Order): boolean => {
  return order.order_data?.fastDelivery || false;
};

/**
 * Get estimated delivery dates
 */
export const getEstimatedDeliveryDates = (order: Order): { start: string; end: string } | null => {
  const data = order.order_data;
  if (data?.estimatedDeliveryStartDate && data?.estimatedDeliveryEndDate) {
    return {
      start: new Date(data.estimatedDeliveryStartDate).toLocaleDateString('tr-TR'),
      end: new Date(data.estimatedDeliveryEndDate).toLocaleDateString('tr-TR')
    };
  }
  return null;
};

/**
 * Format order data for display in tables
 */
export const formatOrderForTable = (order: Order) => {
  return {
    id: order.id,
    order_number: order.order_number,
    platform: getPlatformName(order),
    customer_name: getCustomerFullName(order),
    customer_email: getCustomerEmail(order),
    total_amount: getOrderTotal(order),
    total_amount_number: getOrderTotalAmount(order),
    status: getOrderStatus(order),
    order_date: getOrderDate(order),
    shipping_address: getShippingAddress(order),
    invoice_address: getInvoiceAddress(order),
    cargo_tracking: getCargoTrackingNumber(order),
    cargo_provider: getCargoProvider(order),
    item_count: getTotalItemCount(order),
    fast_delivery: hasFastDelivery(order),
    estimated_delivery: getEstimatedDeliveryDates(order),
    created_at: order.created_at,
    updated_at: order.updated_at
  };
};

/**
 * Filter orders by various criteria
 */
export const filterOrders = (orders: Order[], filters: {
  platform?: string;
  status?: string;
  customerName?: string;
  orderNumber?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
}) => {
  return orders.filter(order => {
    // Platform filter
    if (filters.platform && getPlatformName(order) !== filters.platform) {
      return false;
    }
    
    // Status filter
    if (filters.status && getOrderStatus(order) !== filters.status) {
      return false;
    }
    
    // Customer name filter
    if (filters.customerName && !getCustomerFullName(order).toLowerCase().includes(filters.customerName.toLowerCase())) {
      return false;
    }
    
    // Order number filter
    if (filters.orderNumber && !order.order_number.toLowerCase().includes(filters.orderNumber.toLowerCase())) {
      return false;
    }
    
    // Amount range filter
    const amount = getOrderTotalAmount(order);
    if (filters.minAmount && amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount && amount > filters.maxAmount) {
      return false;
    }
    
    // Date range filter
    if (filters.startDate || filters.endDate) {
      const orderDate = new Date(order.created_at);
      if (filters.startDate && orderDate < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && orderDate > new Date(filters.endDate)) {
        return false;
      }
    }
    
    return true;
  });
}; 