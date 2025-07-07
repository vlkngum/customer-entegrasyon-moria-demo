"use client";
import { createContext, useContext, useState } from "react";

const LogoutContext = createContext({
  isLoggingOut: false,
  startLogout: () => {},
  resetLogout: () => {},
});

export function LogoutProvider({ children }: { children: React.ReactNode }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const startLogout = () => setIsLoggingOut(true);
  
  const resetLogout = () => setIsLoggingOut(false);

  return (
    <LogoutContext.Provider value={{ isLoggingOut, startLogout, resetLogout }}>
      {children}
    </LogoutContext.Provider>
  );
}

export function useLogout() {
  return useContext(LogoutContext);
}
