import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addToast,
  removeToast,
  clearToasts,
  showSuccess,
  showError,
  showWarning,
  showInfo,
} from '../slices/toastSlice';
import {
  selectToasts,
  selectActiveToasts,
  selectToastCount,
  selectActiveToastCount,
} from '../selectors/toastSelectors';
import { ToastType } from '../slices/toastSlice';

export const useToast = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const toasts = useAppSelector(selectToasts);
  const activeToasts = useAppSelector(selectActiveToasts);
  const toastCount = useAppSelector(selectToastCount);
  const activeToastCount = useAppSelector(selectActiveToastCount);

  // Actions
  const addToastAction = useCallback((toast: {
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
  }) => {
    dispatch(addToast(toast));
  }, [dispatch]);

  const removeToastAction = useCallback((id: string) => {
    dispatch(removeToast(id));
  }, [dispatch]);

  const clearToastsAction = useCallback(() => {
    dispatch(clearToasts());
  }, [dispatch]);

  const showSuccessAction = useCallback((data: { title: string; message?: string; duration?: number }) => {
    dispatch(showSuccess(data));
  }, [dispatch]);

  const showErrorAction = useCallback((data: { title: string; message?: string; duration?: number }) => {
    dispatch(showError(data));
  }, [dispatch]);

  const showWarningAction = useCallback((data: { title: string; message?: string; duration?: number }) => {
    dispatch(showWarning(data));
  }, [dispatch]);

  const showInfoAction = useCallback((data: { title: string; message?: string; duration?: number }) => {
    dispatch(showInfo(data));
  }, [dispatch]);

  // Convenience methods
  const showToast = useCallback((type: ToastType, title: string, message?: string, duration?: number) => {
    switch (type) {
      case 'success':
        showSuccessAction({ title, message, duration });
        break;
      case 'error':
        showErrorAction({ title, message, duration });
        break;
      case 'warning':
        showWarningAction({ title, message, duration });
        break;
      case 'info':
        showInfoAction({ title, message, duration });
        break;
      default:
        addToastAction({ type, title, message, duration });
    }
  }, [showSuccessAction, showErrorAction, showWarningAction, showInfoAction, addToastAction]);

  return {
    // State
    toasts,
    activeToasts,
    toastCount,
    activeToastCount,
    
    // Actions
    addToast: addToastAction,
    removeToast: removeToastAction,
    clearToasts: clearToastsAction,
    showSuccess: showSuccessAction,
    showError: showErrorAction,
    showWarning: showWarningAction,
    showInfo: showInfoAction,
    showToast,
  };
}; 