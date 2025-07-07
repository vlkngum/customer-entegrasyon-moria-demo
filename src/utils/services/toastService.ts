// Toast service for showing notifications
// This service can be used independently without creating circular dependencies

import type { Store } from '@reduxjs/toolkit';
import type { RootState } from '@/store/index';

export const showToast = async (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
  // Dispatch toast action if store is available
  if (typeof window !== 'undefined' && window.__REDUX_STORE__) {
    const store = window.__REDUX_STORE__ as Store<RootState>;
    const { showSuccess, showError, showWarning, showInfo } = await import('@/store/slices/toastSlice');
    
    switch (type) {
      case 'success':
        store.dispatch(showSuccess({ title, message }));
        break;
      case 'error':
        store.dispatch(showError({ title, message }));
        break;
      case 'warning':
        store.dispatch(showWarning({ title, message }));
        break;
      case 'info':
        store.dispatch(showInfo({ title, message }));
        break;
    }
  }
};

// Extend Window interface to include Redux store
declare global {
  interface Window {
    __REDUX_STORE__?: Store<RootState>;
  }
}

// Default export for backward compatibility
const toastService = {
  showToast
};

export default toastService; 