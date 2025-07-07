"use client";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  fetchSalesInvoices,
  createSalesInvoice,
  fetchSalesInvoiceById,
  updateSalesInvoice,
  deleteSalesInvoice,
  clearCurrentInvoice,
  clearError,
  clearSuccessMessage,
  setCurrentInvoice,
  updateInvoiceInList,
  removeInvoiceFromList,
  clearAllData,
  selectSalesInvoices,
  selectCurrentInvoice,
  selectPagination,
  selectIsLoading,
  selectIsCreating,
  selectIsUpdating,
  selectIsDeleting,
  selectError,
  selectSuccessMessage,
} from '../slices/salesInvoiceSlice';
import { CreateInvoiceRequest, UpdateInvoiceRequest, SalesInvoice } from '@/types/Invoice';
import { useCallback } from 'react';

export const useSalesInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const salesInvoices = useSelector(selectSalesInvoices);
  const currentInvoice = useSelector(selectCurrentInvoice);
  const pagination = useSelector(selectPagination);
  const isLoading = useSelector(selectIsLoading);
  const isCreating = useSelector(selectIsCreating);
  const isUpdating = useSelector(selectIsUpdating);
  const isDeleting = useSelector(selectIsDeleting);
  const error = useSelector(selectError);
  const successMessage = useSelector(selectSuccessMessage);

  // Actions
  const getSalesInvoices = useCallback((bearer: string, filters?: Record<string, string | number>) => {
    dispatch(fetchSalesInvoices({ bearer, filters }));
  }, [dispatch]);

  const createInvoice = useCallback((bearer: string, data: CreateInvoiceRequest) => {
    dispatch(createSalesInvoice({ bearer, data }));
  }, [dispatch]);

  const getSalesInvoiceById = useCallback((bearer: string, id: string) => {
    dispatch(fetchSalesInvoiceById({ bearer, id }));
  }, [dispatch]);

  const updateInvoice = useCallback((bearer: string, id: string, data: UpdateInvoiceRequest) => {
    dispatch(updateSalesInvoice({ bearer, id, data }));
  }, [dispatch]);

  const deleteInvoice = useCallback((bearer: string, id: string) => {
    dispatch(deleteSalesInvoice({ bearer, id }));
  }, [dispatch]);

  const clearCurrent = useCallback(() => {
    dispatch(clearCurrentInvoice());
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const setCurrent = useCallback((invoice: SalesInvoice) => {
    dispatch(setCurrentInvoice(invoice));
  }, [dispatch]);

  const updateInList = useCallback((invoice: SalesInvoice) => {
    dispatch(updateInvoiceInList(invoice));
  }, [dispatch]);

  const removeFromList = useCallback((id: string) => {
    dispatch(removeInvoiceFromList(id));
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch(clearAllData());
  }, [dispatch]);

  // Helper function to get invoice by ID - removed due to React Hook rules
  // const getInvoiceById = useCallback((id: string) => {
  //   return useSelector((state: RootState) => selectInvoiceById(id)(state));
  // }, []);

  return {
    // State
    salesInvoices,
    currentInvoice,
    pagination,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    successMessage,

    // Actions
    getSalesInvoices,
    createInvoice,
    getSalesInvoiceById,
    updateInvoice,
    deleteInvoice,
    clearCurrent,
    clearErrorAction,
    clearSuccess,
    setCurrent,
    updateInList,
    removeFromList,
    clearAll,
  };
}; 