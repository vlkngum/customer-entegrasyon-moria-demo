"use client";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../index';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  clearCurrentProduct,
  clearError,
  clearSuccessMessage,
  setCurrentProduct,
  setFilters,
  clearFilters,
  clearAllData,
} from '../slices/productSlice';
import type { Product } from '../slices/productSlice';
import { ProductFilter, CreateProductRequest, UpdateProductRequest } from '@/types/Product';
import { useCallback } from 'react';

export const useProduct = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Direct state selection
  const products = useSelector((state: RootState) => state.product.products);
  const currentProduct = useSelector((state: RootState) => state.product.currentProduct);
  const pagination = useSelector((state: RootState) => state.product.pagination);
  const filters = useSelector((state: RootState) => state.product.filters);
  const isLoading = useSelector((state: RootState) => state.product.isLoading);
  const isCreating = useSelector((state: RootState) => state.product.isCreating);
  const isUpdating = useSelector((state: RootState) => state.product.isUpdating);
  const isDeleting = useSelector((state: RootState) => state.product.isDeleting);
  const error = useSelector((state: RootState) => state.product.error);
  const successMessage = useSelector((state: RootState) => state.product.successMessage);

  // Actions
  const getProducts = useCallback((bearer: string, filters?: ProductFilter) => {
    dispatch(fetchProducts({ bearer, filters }));
  }, [dispatch]);

  const create = useCallback((bearer: string, data: CreateProductRequest) => {
    dispatch(createProduct({ bearer, data }));
  }, [dispatch]);

  const update = useCallback((bearer: string, id: string, data: UpdateProductRequest) => {
    dispatch(updateProduct({ bearer, id, data }));
  }, [dispatch]);

  const remove = useCallback((bearer: string, id: string) => {
    dispatch(deleteProduct({ bearer, id }));
  }, [dispatch]);

  const fetchById = useCallback((bearer: string, id: string) => {
    dispatch(getProductById({ bearer, id }));
  }, [dispatch]);

  const clearCurrent = useCallback(() => {
    dispatch(clearCurrentProduct());
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearSuccessMessage());
  }, [dispatch]);

  const setCurrent = useCallback((product: Product) => {
    dispatch(setCurrentProduct(product));
  }, [dispatch]);

  const setFiltersAction = useCallback((filters: ProductFilter) => {
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
    products,
    currentProduct,
    pagination,
    filters,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    successMessage,

    // Actions
    getProducts,
    create,
    update,
    remove,
    fetchById,
    clearCurrent,
    clearErrorAction,
    clearSuccess,
    setCurrent,
    setFilters: setFiltersAction,
    clearFilters: clearFiltersAction,
    clearAll,
  };
}; 