"use client";

import InvoiceSearchAndFilter from '@/components/orders/invoice/InvoiceSearchAndFilter';
import InvoiceListHeader from '@/components/orders/invoice/InvoiceListHeader'; 

export default function AllUnprocessedOrdersPage() {
  return (
    <div className='flex flex-col justify-between w-full h-full'> 
        <InvoiceSearchAndFilter />
        <InvoiceListHeader /> 
    </div>
  );
}