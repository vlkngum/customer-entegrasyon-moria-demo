import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  createdAt: number;
}

export interface ToastState {
  toasts: Toast[];
}

// Initial state
const initialState: ToastState = {
  toasts: [],
};

// Helper function to generate unique ID
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Toast slice
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, 'id' | 'createdAt'>>) => {
      const toast: Toast = {
        ...action.payload,
        id: generateId(),
        createdAt: Date.now(),
        duration: action.payload.duration || 5000, // Default 5 seconds
      };
      state.toasts.push(toast);
    },
    
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    
    clearToasts: (state) => {
      state.toasts = [];
    },
    
    // Convenience methods for different toast types
    showSuccess: (state, action: PayloadAction<{ title: string; message?: string; duration?: number }>) => {
      const toast: Toast = {
        id: generateId(),
        type: 'success',
        title: action.payload.title,
        message: action.payload.message,
        duration: action.payload.duration || 5000,
        createdAt: Date.now(),
      };
      state.toasts.push(toast);
    },
    
    showError: (state, action: PayloadAction<{ title: string; message?: string; duration?: number }>) => {
      const toast: Toast = {
        id: generateId(),
        type: 'error',
        title: action.payload.title,
        message: action.payload.message,
        duration: action.payload.duration || 7000, // Longer duration for errors
        createdAt: Date.now(),
      };
      state.toasts.push(toast);
    },
    
    showWarning: (state, action: PayloadAction<{ title: string; message?: string; duration?: number }>) => {
      const toast: Toast = {
        id: generateId(),
        type: 'warning',
        title: action.payload.title,
        message: action.payload.message,
        duration: action.payload.duration || 6000,
        createdAt: Date.now(),
      };
      state.toasts.push(toast);
    },
    
    showInfo: (state, action: PayloadAction<{ title: string; message?: string; duration?: number }>) => {
      const toast: Toast = {
        id: generateId(),
        type: 'info',
        title: action.payload.title,
        message: action.payload.message,
        duration: action.payload.duration || 5000,
        createdAt: Date.now(),
      };
      state.toasts.push(toast);
    },
  },
});

export const {
  addToast,
  removeToast,
  clearToasts,
  showSuccess,
  showError,
  showWarning,
  showInfo,
} = toastSlice.actions;

export default toastSlice.reducer; 