"use client";

import { useEffect } from 'react';
import { usePagination } from '@/context/PaginationContext';

interface ReduxPagination {
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
}

interface UsePagePaginationProps {
  reduxPagination: ReduxPagination | null;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const usePagePagination = ({
  reduxPagination,
  onPageChange,
  onPerPageChange
}: UsePagePaginationProps) => {
  const { setPagination, setPageHandler, setPerPageHandler } = usePagination();

  // Sync Redux pagination with global pagination context
  useEffect(() => {
    if (reduxPagination) {
      setPagination({
        currentPage: reduxPagination.current_page,
        totalPages: reduxPagination.last_page,
        perPage: reduxPagination.per_page,
        total: reduxPagination.total,
      });
    } else {
      setPagination(null);
    }
  }, [reduxPagination, setPagination]);

  // Set the page-specific handlers in the context
  useEffect(() => {
    setPageHandler(onPageChange);
    setPerPageHandler(onPerPageChange);
  }, [onPageChange, onPerPageChange, setPageHandler, setPerPageHandler]);

  return {
    handlePageChange: onPageChange,
    handlePerPageChange: onPerPageChange,
  };
}; 