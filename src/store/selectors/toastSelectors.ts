import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Basic selectors
export const selectToast = (state: RootState) => state.toast;
export const selectToasts = (state: RootState) => state.toast.toasts;

// Derived selectors
export const selectActiveToasts = createSelector(
  [selectToasts],
  (toasts) => toasts.filter(toast => {
    const now = Date.now();
    const elapsed = now - toast.createdAt;
    return elapsed < (toast.duration || 5000);
  })
);

export const selectToastCount = createSelector(
  [selectToasts],
  (toasts) => toasts.length
);

export const selectActiveToastCount = createSelector(
  [selectActiveToasts],
  (toasts) => toasts.length
);

export const selectToastsByType = createSelector(
  [selectToasts, (_, type: string) => type],
  (toasts, type) => toasts.filter(toast => toast.type === type)
);

export const selectSuccessToasts = createSelector(
  [selectToasts],
  (toasts) => toasts.filter(toast => toast.type === 'success')
);

export const selectErrorToasts = createSelector(
  [selectToasts],
  (toasts) => toasts.filter(toast => toast.type === 'error')
);

export const selectWarningToasts = createSelector(
  [selectToasts],
  (toasts) => toasts.filter(toast => toast.type === 'warning')
);

export const selectInfoToasts = createSelector(
  [selectToasts],
  (toasts) => toasts.filter(toast => toast.type === 'info')
);

export const selectLatestToast = createSelector(
  [selectToasts],
  (toasts) => toasts.length > 0 ? toasts[toasts.length - 1] : null
);

export const selectOldestToast = createSelector(
  [selectToasts],
  (toasts) => toasts.length > 0 ? toasts[0] : null
); 