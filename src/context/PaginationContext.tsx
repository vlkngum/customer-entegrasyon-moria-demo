"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  perPage: number;
  total: number;
}

interface PaginationContextType {
  pagination: PaginationState | null;
  setPagination: (pagination: PaginationState | null | ((prev: PaginationState | null) => PaginationState | null)) => void;
  handlePageChange: (page: number) => void;
  handlePerPageChange: (perPage: number) => void;
  resetPagination: () => void;
  setPageHandler: (handler: (page: number) => void) => void;
  setPerPageHandler: (handler: (perPage: number) => void) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

interface PaginationProviderProps {
  children: ReactNode;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ 
  children, 
  onPageChange, 
  onPerPageChange 
}) => {
  const [pagination, setPaginationState] = useState<PaginationState | null>(null);
  
  // Use refs to store dynamic handlers
  const pageHandlerRef = useRef<(page: number) => void>(() => {});
  const perPageHandlerRef = useRef<(perPage: number) => void>(() => {});

  // Memoized setter that only updates if value actually changes
  const setPagination = useCallback((newPagination: PaginationState | null | ((prev: PaginationState | null) => PaginationState | null)) => {
    setPaginationState(prev => {
      let next: PaginationState | null;
      if (typeof newPagination === 'function') {
        next = (newPagination as (prev: PaginationState | null) => PaginationState | null)(prev);
      } else {
        next = newPagination;
      }
      // Only update if different
      if (
        (!prev && !next) ||
        (prev && next &&
          prev.currentPage === next.currentPage &&
          prev.totalPages === next.totalPages &&
          prev.perPage === next.perPage &&
          prev.total === next.total)
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    // Use dynamic handler if set, otherwise use default
    if (pageHandlerRef.current) {
      pageHandlerRef.current(page);
    } else if (onPageChange) {
      onPageChange(page);
    }
  }, [onPageChange]);

  const handlePerPageChange = useCallback((perPage: number) => {
    // Use dynamic handler if set, otherwise use default
    if (perPageHandlerRef.current) {
      perPageHandlerRef.current(perPage);
    } else if (onPerPageChange) {
      onPerPageChange(perPage);
    }
  }, [onPerPageChange]);

  const setPageHandler = useCallback((handler: (page: number) => void) => {
    pageHandlerRef.current = handler;
  }, []);

  const setPerPageHandler = useCallback((handler: (perPage: number) => void) => {
    perPageHandlerRef.current = handler;
  }, []);

  const resetPagination = useCallback(() => {
    setPaginationState(null);
  }, []);

  const value: PaginationContextType = {
    pagination,
    setPagination,
    handlePageChange,
    handlePerPageChange,
    resetPagination,
    setPageHandler,
    setPerPageHandler,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}; 