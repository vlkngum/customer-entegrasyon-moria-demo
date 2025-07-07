export interface CustomerAddress {
  id: string;
  customer_id: string;
  address_type: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerContact {
  id: string;
  customer_id: string;
  contact_type: string;
  contact_value: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  user_id: string;
  customer_service_id: string;
  external_id?: string;
  customer_no: string;
  first_name: string;
  last_name: string;
  name?: string; // Added name field for API response
  integration_id?: number;
  customer_type?: string;
  company_name?: string;
  tax_number?: string;
  tax_office?: string;
  email?: string;
  phone?: string;
  website?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'pending';
  credit_limit?: number;
  current_balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
  addresses?: CustomerAddress[];
  contacts?: CustomerContact[];
  service?: CustomerService;
  city?: string;
  district?: string;
  neighborhood?: string;
  street?: string;
  full_address?: string;
  tax_or_identity_no?: string;
}

export interface CustomerService {
  id: string;
  name: string;
  code: string;
  logo_url: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedCustomerResponse {
  current_page: number;
  data: Customer[];
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

export interface CreateCustomerRequest {
  customer_service_id: string;
  external_id?: string;
  customer_no: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  tax_number?: string;
  tax_office?: string;
  email?: string;
  phone?: string;
  website?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'pending';
  customer_type: 'individual' | 'corporate';
  credit_limit?: number;
  currency: string;
  addresses?: Omit<CustomerAddress, 'id' | 'customer_id' | 'created_at' | 'updated_at'>[];
  contacts?: Omit<CustomerContact, 'id' | 'customer_id' | 'created_at' | 'updated_at'>[];
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {
  id: string;
}

export interface CustomerFilter {
  search?: string;
  status?: string;
  customer_type?: string;
  service_id?: string;
  page?: number;
  per_page?: number;
  [key: string]: unknown;
} 