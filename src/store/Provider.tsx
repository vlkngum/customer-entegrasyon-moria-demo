'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './index';
import { useEffect } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  useEffect(() => {
    // Expose store to window for toast service
    if (typeof window !== 'undefined') {
      (window as unknown as { __REDUX_STORE__: typeof store }).__REDUX_STORE__ = store;
    }
  }, []);

  return <ReduxProvider store={store}>{children}</ReduxProvider>;
} 