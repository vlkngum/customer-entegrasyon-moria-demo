"use client";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  fetchCustomers,
  createCustomer,
  fetchCustomerById,
  updateCustomer,
  deleteCustomer,
  clearCurrentCustomer,
  clearError,
  clearSuccessMessage,
  setCurrentCustomer,
  updateCustomerInList,
  removeCustomerFromList,
  setFilters,
  clearFilters,
  clearAllData,
  forceRefreshCustomers,
  selectCustomers,
  selectCurrentCustomer,
  selectPagination,
  selectFilters,
  selectIsLoading,
  selectIsCreating,
  selectIsUpdating,
  selectIsDeleting,
  selectError,
  selectSuccessMessage,
} from '../slices/customerSlice';
import { CreateCustomerRequest, UpdateCustomerRequest, CustomerFilter, Customer } from '@/types/Customer';
import { useCallback } from 'react';

export const useCustomer = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const customers = useSelector(selectCustomers);
  const currentCustomer = useSelector(selectCurrentCustomer);
  const pagination = useSelector(selectPagination);
  const filters = useSelector(selectFilters);
  const isLoading = useSelector(selectIsLoading);
  const isCreating = useSelector(selectIsCreating);
  const isUpdating = useSelector(selectIsUpdating);
  const isDeleting = useSelector(selectIsDeleting);
  const error = useSelector(selectError);
  const successMessage = useSelector(selectSuccessMessage);

  // Actions
  const getCustomers = useCallback((bearer: string, filters?: CustomerFilter) => {
    dispatch(fetchCustomers({ bearer, filters }));
  }, [dispatch]);

  const createCustomerAction = useCallback((bearer: string, data: CreateCustomerRequest) => {
    dispatch(createCustomer({ bearer, data }));
  }, [dispatch]);

  const getCustomerById = useCallback((bearer: string, id: string) => {
    dispatch(fetchCustomerById({ bearer, id }));
  }, [dispatch]);

  const updateCustomerAction = useCallback((bearer: string, id: string, data: UpdateCustomerRequest) => {
    dispatch(updateCustomer({ bearer, id, data }));
  }, [dispatch]);

  const deleteCustomerAction = useCallback((bearer: string, id: string) => {
    dispatch(deleteCustomer({ bearer, id }));
  }, [dispatch]);

  const clearCurrent = useCallback(() => {
    dispatch(clearCurrentCustomer());
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const setCurrent = useCallback((customer: Customer) => {
    dispatch(setCurrentCustomer(customer));
  }, [dispatch]);

  const updateInList = useCallback((customer: Customer) => {
    dispatch(updateCustomerInList(customer));
  }, [dispatch]);

  const removeFromList = useCallback((id: string) => {
    dispatch(removeCustomerFromList(id));
  }, [dispatch]);

  const setFiltersAction = useCallback((filters: CustomerFilter) => {
    dispatch(setFilters(filters));
  }, [dispatch]);

  const clearFiltersAction = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch(clearAllData());
  }, [dispatch]);

  const forceRefresh = useCallback(() => {
    dispatch(forceRefreshCustomers());
  }, [dispatch]);

  // Helper function to get customer by ID - removed due to React Hook rules
  // const getCustomerByIdFromState = useCallback((id: string) => {
  //   return useSelector((state: RootState) => selectCustomerById(id)(state));
  // }, []);

  return {
    // State
    customers,
    currentCustomer,
    pagination,
    filters,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    successMessage,

    // Actions
    getCustomers,
    createCustomer: createCustomerAction,
    getCustomerById,
    updateCustomer: updateCustomerAction,
    deleteCustomer: deleteCustomerAction,
    clearCurrent,
    clearErrorAction,
    clearSuccess,
    setCurrent,
    updateInList,
    removeFromList,
    setFilters: setFiltersAction,
    clearFilters: clearFiltersAction,
    clearAll,
    forceRefresh,
  };
}; 