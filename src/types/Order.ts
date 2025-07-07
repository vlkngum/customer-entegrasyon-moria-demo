import { IResponse } from "./IResponse";

// Address interface for both shipping and invoice addresses
export interface OrderAddress {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  cityCode: number;
  district: string;
  districtId: number;
  countyId: number;
  countyName: string;
  shortAddress: string;
  stateName: string;
  addressLines: {
    addressLine1: string;
    addressLine2: string;
  };
  postalCode: string;
  countryCode: string;
  neighborhoodId: number;
  neighborhood: string;
  phone: string | null;
  fullAddress: string;
  fullName: string;
}

// Order line item interface
export interface OrderLineItem {
  quantity: number;
  salesCampaignId: number;
  productSize: string;
  merchantSku: string;
  productName: string;
  productCode: number;
  productOrigin: string;
  merchantId: number;
  amount: number;
  discount: number;
  tyDiscount: number;
  discountDetails: Array<{
    lineItemPrice: number;
    lineItemDiscount: number;
    lineItemTyDiscount: number;
  }>;
  currencyCode: string;
  id: number;
  sku: string;
  vatBaseAmount: number;
  barcode: string;
  orderLineItemStatusName: string;
  price: number;
  fastDeliveryOptions: unknown[];
  productCategoryId: number;
}

// Package history interface
export interface PackageHistory {
  createdDate: number;
  status: string;
}

// Detailed order data interface
export interface OrderData {
  shipmentAddress: OrderAddress;
  orderNumber: string;
  grossAmount: number;
  totalDiscount: number;
  totalTyDiscount: number;
  taxNumber: string | null;
  invoiceAddress: OrderAddress;
  customerFirstName: string;
  customerEmail: string;
  customerId: number;
  customerLastName: string;
  id: number;
  cargoTrackingNumber: number;
  cargoProviderName: string;
  lines: OrderLineItem[];
  orderDate: number;
  identityNumber: string;
  currencyCode: string;
  packageHistories: PackageHistory[];
  shipmentPackageStatus: string;
  status: string;
  deliveryType: string;
  timeSlotId: number;
  estimatedDeliveryStartDate: number;
  estimatedDeliveryEndDate: number;
  totalPrice: number;
  deliveryAddressType: string;
  agreedDeliveryDate: number;
  fastDelivery: boolean;
  originShipmentDate: number;
  lastModifiedDate: number;
  commercial: boolean;
  fastDeliveryType: string;
  deliveredByService: boolean;
  agreedDeliveryDateExtendible: boolean;
  extendedAgreedDeliveryDate: number;
  agreedDeliveryExtensionEndDate: number;
  agreedDeliveryExtensionStartDate: number;
  warehouseId: number;
  groupDeal: boolean;
  invoiceLink: string;
  micro: boolean;
  giftBoxRequested: boolean;
  "3pByTrendyol": boolean;
  containsDangerousProduct: boolean;
  isCod: boolean;
  createdBy: string;
  originPackageIds: unknown[] | null;
}

// Integration interface
export interface Integration {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  logo_url: string;
}

// Main Order interface
export interface Order {
  id: string;
  user_id: string;
  integration_id: number;
  order_number: string;
  order_data: OrderData;
  ordered_at: string;
  created_at: string;
  updated_at: string;
  invoice_fullname: string;
  invoice_address: string;
  invoice_phone: string | null;
  shipping_fullname: string;
  shipping_address: string;
  shipping_phone: string | null;
  status: string;
  integration: Integration;
}

// Legacy Order interface for backward compatibility
export interface LegacyOrder {
  id: number;
  order_number: string;
  integration_id: number;
  status: string; // e.g. Created, Shipped, Cancelled
  created_at: string;
  updated_at: string;
  total_price?: number;
  customer_name?: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface PaginatedOrderResponse {
  current_page: number;
  data: Order[];
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

export interface OrderFilter {
  integration_id?: number;
  order_number?: string;
  start_date?: string; // YYYY-MM-DD
  end_date?: string;   // YYYY-MM-DD
  per_page?: number;
  status?: string; // Created, Shipped, Cancelled, etc.
  customer_email?: string;
  customer_id?: number;
  cargo_tracking_number?: string;
  page?: number; // Current page number
}

export type OrderResponse = IResponse<Order>;
export type PaginatedOrderResponseType = IResponse<PaginatedOrderResponse>; 