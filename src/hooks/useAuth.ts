"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogout } from "@/context/LogoutContext";

interface ExtendedSession {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
  };
}

interface UseAuthOptions {
  requiredAuthority?: string[];
  redirectTo?: string;
  redirectIfUnauthorized?: boolean;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { 
    requiredAuthority = [], 
    redirectTo = "/login", 
    redirectIfUnauthorized = true 
  } = options;
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoggingOut } = useLogout();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Cast session to ExtendedSession type
  const extendedSession = session as ExtendedSession | null;

  useEffect(() => {
    // If logging out, don't check authorization
    if (isLoggingOut) {
      setIsLoading(false);
      return;
    }

    // Check if user is authenticated
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (status === "unauthenticated") {
      setIsLoading(false);
      setIsAuthorized(false);
      if (redirectIfUnauthorized) {
        router.replace(redirectTo);
      }
      return;
    }

    // Check authority if required
    if (requiredAuthority.length > 0 && extendedSession?.user?.authority) {
      const hasAuthority = requiredAuthority.includes(extendedSession.user.authority);
      setIsAuthorized(hasAuthority);
      setIsLoading(false);
      
      if (!hasAuthority && redirectIfUnauthorized) {
        router.replace("/dashboard");
      }
    } else if (requiredAuthority.length === 0) {
      // No authority required, just need to be authenticated
      setIsAuthorized(true);
      setIsLoading(false);
    }
  }, [status, extendedSession, requiredAuthority, router, redirectTo, redirectIfUnauthorized, isLoggingOut]);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isAuthorized,
    isLoading,
    user: extendedSession?.user,
    authority: extendedSession?.user?.authority,
  };
} 