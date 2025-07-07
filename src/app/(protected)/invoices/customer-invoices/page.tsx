"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useCustomer } from '@/store';
import { useSession } from 'next-auth/react';
import { FaSearch } from "react-icons/fa";
import ProductTable, { ProductTableColumn } from '@/components/ProductTable';
import { MdKeyboardArrowRight } from "react-icons/md";
import CustomerForm, { CustomerFormValues } from '@/components/bills/CustomerForm';
import { usePagePagination } from '@/hooks/usePagePagination';
import Image from "next/image";

interface ExtendedSession {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
  };
}

export default function Invoices() {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const { 
    customers, 
    pagination,
    getCustomers, 
    updateCustomer, 
    deleteCustomer,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    successMessage,
    clearErrorAction,
    clearSuccess,
    removeFromList
  } = useCustomer();
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Partial<CustomerFormValues> & { id?: string; integration_id?: number } | undefined>(undefined);
  const [searchField, setSearchField] = useState('name');
  const [search, setSearch] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(25);

  // Sync local state with backend pagination after fetch
  useEffect(() => {
    if (pagination) {
      if (pagination.per_page !== currentPerPage) {
        setCurrentPerPage(pagination.per_page);
      }
      if (pagination.current_page !== currentPage) {
        setCurrentPage(pagination.current_page);
      }
    }
    // eslint-disable-next-line
  }, [pagination]);

  // Debug: Log customers array changes
  useEffect(() => {
    console.log('Customers array updated:', customers.length, 'customers');
  }, [customers]);

  useEffect(() => {
    if (session?.accessToken) {
      getCustomers(session.accessToken, {
        page: currentPage,
        per_page: currentPerPage,
        [searchField]: search || undefined,
      });
    }
    // eslint-disable-next-line
  }, [session?.accessToken]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (session?.accessToken) {
      getCustomers(session.accessToken, {
        page,
        per_page: currentPerPage,
        [searchField]: search || undefined,
      });
    }
  };

  // Handle per page change
  const handlePerPageChange = (perPage: number) => {
    setCurrentPerPage(perPage);
    setCurrentPage(1); // Reset to first page
    if (session?.accessToken) {
      getCustomers(session.accessToken, {
        page: 1,
        per_page: perPage,
        [searchField]: search || undefined,
      });
    }
  };

  // Connect to global pagination context
  usePagePagination({
    reduxPagination: pagination,
    onPageChange: handlePageChange,
    onPerPageChange: handlePerPageChange
  });

  // Transform customers for display (no client-side filtering since we're using backend pagination)
  const transformedCustomers = customers.map(customer => {
    const fullName = customer.name || `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'N/A';
    return {
      id: customer.id,
      integration_id: customer.integration_id,
      customer_type: customer.customer_type,
      name: fullName,
      email: customer.email || 'N/A',
      customer_no: customer.customer_no,
      status: customer.status,
      phone: customer.phone || 'N/A',
      company_name: customer.company_name || '',
      city: customer.city || '',
      district: customer.district || '',
      neighborhood: customer.neighborhood || '',
      street: customer.street || '',
      full_address: customer.full_address || '',
      tax_or_identity_no: customer.tax_or_identity_no || '',
      tax_office: customer.tax_office || '',
    };
  });

  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
  const handleEdit = useCallback((customer: any) => {
    // Convert back to CustomerFormValues format
    const formValues: Partial<CustomerFormValues> & { id?: string; integration_id?: number; type?: string } = {
      id: customer.id,
      integration_id: customer.integration_id,
      name: customer.name || `${customer.first_name || ''} ${customer.last_name || ''}`.trim(),
      email: customer.email,
      phone: customer.phone,
      type: customer.customer_type === 'individual' ? 'gercek' : 'tuzel',
      tax_or_identity_no: customer.tax_or_identity_no || '',
      taxOrId: customer.tax_or_identity_no || '',
      city: customer.city || '',
      district: customer.district || '',
      neighborhood: customer.neighborhood || '',
      street: customer.street || '',
      address: customer.full_address || '',
      taxOffice: customer.tax_office || '',
    };
    setSelectedCustomer(formValues);
    setEditModalOpen(true);
  }, []);
  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedCustomer(undefined);
  };

  const handleCustomerSubmit = async (formData: CustomerFormValues) => {
    if (!session?.accessToken) return;
    
    try {
      if (selectedCustomer?.id) {
        // Update existing customer - map to backend's expected fields
        const updateData = {
          id: selectedCustomer.id, // For TypeScript, will be ignored by backend
          integration_id: selectedCustomer.integration_id, // Use value from backend/customer
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          district: formData.district,
          neighborhood: formData.neighborhood,
          street: formData.street,
          full_address: formData.address,
          customer_type: (formData.type === 'gercek' ? 'individual' : 'corporate') as 'individual' | 'corporate',
          tax_or_identity_no: formData.tax_or_identity_no || formData.taxOrId,
          tax_office: formData.taxOffice,
        };

        await updateCustomer(session.accessToken, selectedCustomer.id, updateData);
      }
      await getCustomers(session.accessToken, {
        page: currentPage,
        per_page: currentPerPage,
        [searchField]: search || undefined,
      });
      setEditModalOpen(false);
      setSelectedCustomer(undefined);
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleDeleteCustomer = useCallback(async (customerId: string) => {
    if (!session?.accessToken) return;
    
    try {
      console.log('Component: Starting delete for customer:', customerId);
      await deleteCustomer(session.accessToken, customerId);
      console.log('Component: Delete operation completed for customer:', customerId);
      
      // Force a refresh of the component state if needed
      setTimeout(() => {
        const customerStillExists = customers.find(c => c.id === customerId);
        if (customerStillExists) {
          console.log('Component: Customer still in list, manually removing...');
          removeFromList(customerId);
        } else {
          console.log('Component: Customer successfully removed from list');
        }
      }, 200);
      
    } catch (error) {
      console.error('Component: Error deleting customer:', error);
      // Show error message to user
      alert('Müşteri silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }, [session?.accessToken, deleteCustomer, customers, removeFromList]);

  const handleFilter = () => {
    setIsFiltering(true);
    setCurrentPage(1);
    if (session?.accessToken) {
      getCustomers(session.accessToken, {
        page: 1,
        per_page: currentPerPage,
        [searchField]: search || undefined,
      });
    }
    setTimeout(() => setIsFiltering(false), 100);
  };

  const handleClearSearch = () => {
    setSearch('');
    setIsFiltering(false);
    setCurrentPage(1);
    if (session?.accessToken) {
      getCustomers(session.accessToken, {
        page: 1,
        per_page: currentPerPage,
      });
    }
  };

  const columns = useMemo<ProductTableColumn[]>(() => [
    {
      key: 'arrow',
      title: '',
      render: () => (
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-100">
          <MdKeyboardArrowRight className="text-blue-400 w-4 h-4" />
        </span>
      ),
      className: 'w-8',
    },
    { key: 'name', title: 'MÜŞTERİ ADI', className: 'text-left pl-0 justify-start' },
    { key: 'email', title: 'MÜŞTERİ MAİL', className: 'text-left pl-0 justify-start' },

    {
      key: 'actions',
      title: <div className="text-right">İŞLEMLER</div>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, row: any) => (
        <div className="flex justify-end gap-2">
          <button
            className="flex items-center gap-1 bg-blue-100 text-[#0f82ff] px-3 py-1 rounded-md text-xs font-semibold shadow hover:bg-blue-200 transition"
            onClick={() => handleEdit(row)}
            disabled={isUpdating || isCreating}
          >
            <Image src={'/entekasProductedit.svg'} width={0} height={0} alt='edit' className='w-3 h-3' />
            {isUpdating ? 'GÜNCELLENİYOR...' : 'DÜZENLE'}
          </button>
          <button 
            className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-semibold shadow hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleDeleteCustomer(row.id)}
            disabled={isDeleting}
            type="button"
          >
            <Image src={'/mini-delete.svg'} width={0} height={0} alt='delete' className='w-4 h-4' />
            {isDeleting ? 'SİLİNİYOR...' : 'SİL'}
          </button>
        </div>
      ),
      className: 'text-right',
    },
  ], [handleEdit, handleDeleteCustomer, isUpdating, isCreating, isDeleting]);

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto flex flex-col gap-2">
        {/* Search and Filter Panel */}
        <div className="panel">
          <div className="flex flex-row justify-start items-center space-x-4 w-full p-6">
            <div className="flex flex-col w-1/3">
              <label className=" text-xs font-semibold text-gray-600 mb-1">MÜŞTERİ ARAMA</label>
              <div className="flex flex-row gap-2">
                <select
                  className="input w-1/3"
                  value={searchField}
                  onChange={e => setSearchField(e.target.value)}
                >
                  <option value="name">Ad</option>
                  <option value="phone">Telefon</option>
                  <option value="city">Şehir</option>
                  <option value="district">İlçe</option>
                  <option value="customer_type">Müşteri Türü</option>
                </select>
                <input
                  type="text"
                  placeholder="Arama..."
                  className="input w-2/3"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 self-end">
              <button 
                className="bg-[#0f82ff] text-white px-4 py-2.5 rounded-lg font-mono flex items-center space-x-2 cursor-pointer hover:bg-[#0068ff] transition-colors duration-200"
                onClick={handleFilter}
                disabled={isFiltering}
              >
                <FaSearch className="w-4 h-4" />
                <span className="text-sm">{isFiltering ? 'FİLTRELENİYOR...' : 'FİLTRELE'}</span>
              </button>
              {search && (
                <button 
                  className="bg-gray-500 text-white px-4 py-2.5 rounded-lg font-mono flex items-center space-x-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  onClick={handleClearSearch}
                >
                  <span className="text-sm">TEMİZLE</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="">
          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <div>
                <strong>Hata:</strong> {error}
              </div>
              <button 
                onClick={() => clearErrorAction()}
                className="text-red-700 hover:text-red-900 font-bold"
              >
                ×
              </button>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
              <div>
                <strong>Başarılı:</strong> {successMessage}
              </div>
              <button 
                onClick={() => clearSuccess()}
                className="text-green-700 hover:text-green-900 font-bold"
              >
                ×
              </button>
            </div>
          )}
          
          <ProductTable columns={columns} data={transformedCustomers} />
          {editModalOpen && selectedCustomer && (
            <CustomerForm
              initialValues={selectedCustomer}
              onSubmit={handleCustomerSubmit}
              onCancel={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
