"use client";

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useOrder } from '@/store';
import OrderFiltersAll from '@/components/orders/OrderFiltersAll';
import OrderListHeader from '@/components/orders/OrderListHeader'; 
import { usePagePagination } from '@/hooks/usePagePagination';

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
  const { 
    orders, 
    pagination,
    fetchOrders, 
    isLoading
  } = useOrder();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerPage, setCurrentPerPage] = useState(20);

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

  // Initial data fetch
  useEffect(() => {
    if (session?.accessToken) {
      console.log('Fetching orders with pagination:', { page: currentPage, per_page: currentPerPage });
      fetchOrders(session.accessToken, {
        page: currentPage,
        per_page: currentPerPage,
      });
    }
    // eslint-disable-next-line
  }, [session?.accessToken]);

  // Handle page change
  const handlePageChange = (page: number) => {
    console.log('Page change requested:', page);
    setCurrentPage(page);
    if (session?.accessToken) {
      fetchOrders(session.accessToken, {
        page,
        per_page: currentPerPage,
      });
    }
  };

  // Handle per page change
  const handlePerPageChange = (perPage: number) => {
    console.log('Per page change requested:', perPage);
    setCurrentPerPage(perPage);
    setCurrentPage(1); // Reset to first page
    if (session?.accessToken) {
      fetchOrders(session.accessToken, {
        page: 1,
        per_page: perPage,
      });
    }
  };

  // Connect to global pagination context
  usePagePagination({
    reduxPagination: pagination,
    onPageChange: handlePageChange,
    onPerPageChange: handlePerPageChange
  });

  // Debug logging
  useEffect(() => {
    console.log('Orders page - Current pagination:', pagination);
    console.log('Orders page - Current orders count:', orders.length);
  }, [pagination, orders.length]);

  return (
    <div className='flex flex-col justify-between w-full h-full pb-12'> 
      <OrderFiltersAll />
      <OrderListHeader orders={orders} isLoading={isLoading} />
    </div>
  );
}