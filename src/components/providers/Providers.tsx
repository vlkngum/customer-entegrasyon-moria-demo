'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { ReactNode, useEffect } from 'react';
import { LogoutProvider } from '@/context/LogoutContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Expose store to window for toast service
    if (typeof window !== 'undefined') {
      window.__REDUX_STORE__ = store;
    }
  }, []);
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <LogoutProvider>
          {children}
        </LogoutProvider>
      </ReduxProvider>
    </SessionProvider>
  );
} 