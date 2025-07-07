"use client";

import { useEffect, useState } from 'react';
import { useSalesInvoice } from '@/store';
import { useSession } from 'next-auth/react';
import InvoiceSearchAndFilter from '@/components/orders/invoice/InvoiceSearchAndFilter';
import InvoiceListHeader from '@/components/orders/invoice/InvoiceListHeader';

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

export default function AllUnprocessedOrdersPage() {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const { salesInvoices, isLoading, getSalesInvoices } = useSalesInvoice();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (session?.accessToken) {
      getSalesInvoices(session.accessToken);
    }
  }, [session?.accessToken, getSalesInvoices]);

  const handleSearch = () => {
    if (session?.accessToken) {
      // You can implement search functionality here
      getSalesInvoices(session.accessToken);
    }
  };

  return (
    <div className='flex flex-col justify-between w-full h-full'> 
        <InvoiceSearchAndFilter 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />
        <InvoiceListHeader invoices={salesInvoices} isLoading={isLoading} /> 
    </div>
  );
}