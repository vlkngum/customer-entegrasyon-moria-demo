"use client";

import OrderFiltersAll from '@/components/orders/OrderFiltersAll';
import OrderListHeader from '@/components/orders/OrderListHeader';
import OrderPagination from '@/components/orders/OrderPagination';

export default function AllUnprocessedOrdersPage() {
  return (
    <div className='flex flex-col justify-between w-full h-full'> 
        <OrderFiltersAll />
        <OrderListHeader /> 
        <OrderPagination /> 
    </div>
  );
}