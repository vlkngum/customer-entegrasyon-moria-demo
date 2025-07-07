"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../index";
import {
  fetchOrders,
  clearCurrentOrder,
  clearError,
  clearSuccessMessage,
  setCurrentOrder,
  setFilters,
  clearFilters,
  clearAllData,
} from "../slices/orderSlice";
import { Order, OrderFilter } from "@/types/Order";
import { useCallback } from "react";

export const useOrder = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const orders = useSelector((state: RootState) => state.order.orders);
  const currentOrder = useSelector((state: RootState) => state.order.currentOrder);
  const pagination = useSelector((state: RootState) => state.order.pagination);
  const filters = useSelector((state: RootState) => state.order.filters);
  const isLoading = useSelector((state: RootState) => state.order.isLoading);
  const isCreating = useSelector((state: RootState) => state.order.isCreating);
  const isUpdating = useSelector((state: RootState) => state.order.isUpdating);
  const isDeleting = useSelector((state: RootState) => state.order.isDeleting);
  const error = useSelector((state: RootState) => state.order.error);
  const successMessage = useSelector((state: RootState) => state.order.successMessage);

  // Actions
  const fetchOrdersAction = useCallback((bearer: string, filters?: OrderFilter) => {
    dispatch(fetchOrders({ bearer, filters }));
  }, [dispatch]);

  const clearCurrent = useCallback(() => {
    dispatch(clearCurrentOrder());
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const setCurrent = useCallback((order: Order) => {
    dispatch(setCurrentOrder(order));
  }, [dispatch]);

  const setFiltersAction = useCallback((filters: OrderFilter) => {
    dispatch(setFilters(filters));
  }, [dispatch]);

  const clearFiltersAction = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch(clearAllData());
  }, [dispatch]);

  return {
    // State
    orders,
    currentOrder,
    pagination,
    filters,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    successMessage,

    // Actions
    fetchOrders: fetchOrdersAction,
    clearCurrent,
    clearErrorAction,
    clearSuccess,
    setCurrent,
    setFilters: setFiltersAction,
    clearFilters: clearFiltersAction,
    clearAll,
  };
}; 