"use client";

import OrderFiltersAll from '@/components/orders/OrderFiltersAll';
import InvoiceListHeader from '@/components/orders/invoice/InvoiceListHeader'; 

export default function AllUnprocessedOrdersPage() {
  return (
    <div className='flex flex-col justify-between w-full h-full'> 
        <OrderFiltersAll />
        <InvoiceListHeader />  
    </div>
  );
}