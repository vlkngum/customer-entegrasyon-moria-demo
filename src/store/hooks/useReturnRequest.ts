"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../index";
import {
  fetchReturnRequests,
  clearCurrentReturnRequest,
  clearError,
  clearSuccessMessage,
  setCurrentReturnRequest,
  setFilters,
  clearFilters,
  clearAllData,
} from "../slices/returnRequestSlice";
import { ReturnRequest, ReturnRequestFilter } from "@/types/ReturnRequest";
import { useCallback } from "react";

export const useReturnRequest = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const returnRequests = useSelector((state: RootState) => state.returnRequest.returnRequests);
  const currentReturnRequest = useSelector((state: RootState) => state.returnRequest.currentReturnRequest);
  const pagination = useSelector((state: RootState) => state.returnRequest.pagination);
  const filters = useSelector((state: RootState) => state.returnRequest.filters);
  const isLoading = useSelector((state: RootState) => state.returnRequest.isLoading);
  const isCreating = useSelector((state: RootState) => state.returnRequest.isCreating);
  const isUpdating = useSelector((state: RootState) => state.returnRequest.isUpdating);
  const isDeleting = useSelector((state: RootState) => state.returnRequest.isDeleting);
  const error = useSelector((state: RootState) => state.returnRequest.error);
  const successMessage = useSelector((state: RootState) => state.returnRequest.successMessage);

  // Actions
  const fetchReturnRequestsAction = useCallback((bearer: string, filters?: ReturnRequestFilter) => {
    dispatch(fetchReturnRequests({ bearer, filters }));
  }, [dispatch]);

  const clearCurrent = useCallback(() => {
    dispatch(clearCurrentReturnRequest());
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const setCurrent = useCallback((claim: ReturnRequest) => {
    dispatch(setCurrentReturnRequest(claim));
  }, [dispatch]);

  const setFiltersAction = useCallback((filters: ReturnRequestFilter) => {
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
    returnRequests,
    currentReturnRequest,
    pagination,
    filters,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    successMessage,

    // Actions
    fetchReturnRequests: fetchReturnRequestsAction,
    clearCurrent,
    clearErrorAction,
    clearSuccess,
    setCurrent,
    setFilters: setFiltersAction,
    clearFilters: clearFiltersAction,
    clearAll,
  };
};
