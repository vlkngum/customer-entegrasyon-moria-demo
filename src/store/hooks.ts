import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export generic ecommerce hooks
export { useEticaret, useShop } from './hooks/useGenericEcommerce';

// Export sales invoice hook
export { useSalesInvoice } from './hooks/useSalesInvoice';

// Export customer hook
export { useCustomer } from './hooks/useCustomer'; 