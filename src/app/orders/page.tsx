"use client";

import OrderFiltersAll from '@/components/orders/OrderFiltersAll';
import OrderListHeader from '@/components/orders/OrderListHeader'; 

export default function AllUnprocessedOrdersPage() {
  return (
    <div className='flex flex-col justify-between w-full h-full'> 
        <OrderFiltersAll />
        <OrderListHeader />  
    </div>
  );
}