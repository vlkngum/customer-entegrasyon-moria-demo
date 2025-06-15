"use client";

import OrderFilters from '@/components/orders/OrderFilters';
import OrderListHeader from '@/components/orders/OrderListHeader';
import OrderPagination from '@/components/orders/OrderPagination';

export default function CancelledOrdersPage() {
  return (
    <div className='flex flex-col justify-between w-full h-full'> 
        <OrderFilters />
        <OrderListHeader /> 
        <OrderPagination /> 
    </div>
  );
}