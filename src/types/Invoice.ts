export interface InvoiceService {
  id: string;
  name: string;
  code: string;
  logo_url: string;
}

export interface InvoiceRawPayload {
  data: {
    id: string;
    type: string;
    attributes: {
      archived: boolean;
      invoice_no: string;
      net_total: number;
      gross_total: number;
      withholding: number;
      total_excise_duty: number;
      total_communications_tax: number;
      total_vat: number;
      total_vat_withholding: number;
      total_discount: number;
      total_invoice_discount: number;
      before_taxes_total: number;
      remaining: number;
      remaining_in_trl: number;
      payment_status: string;
      created_at: string;
      updated_at: string;
      item_type: string;
      description: string;
      issue_date: string;
      due_date: string;
      invoice_series: string;
      invoice_id: number;
      currency: string;
      exchange_rate: number;
      withholding_rate: number;
      invoice_discount_type: string;
      invoice_discount: number;
      billing_address: string;
      billing_postal_code: string;
      billing_phone: string;
      billing_fax: string;
      tax_office: string;
      tax_number: string;
      country: string;
      city: string;
      district: string;
      is_abroad: boolean;
      order_no: string;
      order_date: string;
      shipment_addres: string;
      shipment_included: boolean;
      cash_sale: boolean;
      payer_tax_numbers: string[];
      invoice_note: string;
      append_contact_balance: boolean;
      e_document_accounts: unknown[];
    };
    relationships: {
      category: {
        data: {
          id: string;
          type: string;
        };
      };
      contact: {
        data: {
          id: string;
          type: string;
        };
      };
      details: {
        data: Array<{
          id: string;
          type: string;
        }>;
      };
      payments: {
        data: Array<{
          id: string;
          type: string;
        }>;
      };
      tags: {
        data: Array<{
          id: string;
          type: string;
        }>;
      };
      sales_offer: {
        data: {
          id: string;
          type: string;
        };
      };
      sharings: {
        data: Array<{
          id: string;
          type: string;
        }>;
      };
      recurrence_plan: {
        data: {
          id: string;
          type: string;
        };
      };
      active_e_document: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  };
  included: Array<{
    id: string;
    type: string;
    attributes: unknown[];
    relationships: unknown[];
  }>;
}

export interface SalesInvoice {
  id: string;
  user_id: string;
  invoice_service_id: string;
  external_id: string | null;
  invoice_no: string;
  issue_date: string;
  due_date: string;
  net_total: number;
  gross_total: number;
  vat_total: number;
  payment_status: string;
  currency: string;
  exchange_rate: number;
  is_abroad: boolean;
  invoice_type: string;
  raw_payload: InvoiceRawPayload;
  created_at: string;
  updated_at: string;
  service: InvoiceService;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedInvoiceResponse {
  current_page: number;
  data: SalesInvoice[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface CreateInvoiceRequest {
  invoice_service_id: string;
  external_id?: string;
  invoice_no: string;
  issue_date: string;
  due_date: string;
  net_total: number;
  gross_total: number;
  vat_total: number;
  payment_status: string;
  currency: string;
  exchange_rate: number;
  is_abroad: boolean;
  invoice_type: string;
  raw_payload: InvoiceRawPayload;
}

export interface UpdateInvoiceRequest extends Partial<CreateInvoiceRequest> {
  id: string;
} 