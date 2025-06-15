"use client";

import InvoiceSearchAndFilter from '@/components/orders/invoice/InvoiceSearchAndFilter';
import InvoiceListHeader from '@/components/orders/invoice/InvoiceListHeader';
import OrderPagination from '@/components/orders/OrderPagination';

export default function AllUnprocessedOrdersPage() {
  return (
    <div className='flex flex-col justify-between w-full h-full'> 
        <InvoiceSearchAndFilter />
        <InvoiceListHeader /> 
        <OrderPagination /> 
    </div>
  );
}