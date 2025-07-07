"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
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

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuthority?: string[];
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requiredAuthority = [], 
  fallback 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggingOut } = useLogout();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Cast session to ExtendedSession type
  const extendedSession = session as ExtendedSession | null;

  useEffect(() => {
    // If logging out, don't check authorization
    if (isLoggingOut) {
      return;
    }

    // Check if user is authenticated
    if (status === "loading") {
      return; // Still loading, wait
    }

    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    // Check authority if required
    if (requiredAuthority.length > 0 && extendedSession?.user?.authority) {
      const hasAuthority = requiredAuthority.includes(extendedSession.user.authority);
      setIsAuthorized(hasAuthority);
      
      if (!hasAuthority) {
        router.replace("/dashboard");
        return;
      }
    } else if (requiredAuthority.length === 0) {
      // No authority required, just need to be authenticated
      setIsAuthorized(true);
    }
  }, [status, extendedSession, requiredAuthority, router, pathname, isLoggingOut]);

  // Show loading while checking authentication
  if (status === "loading" || isLoggingOut) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Show fallback or unauthorized message
  if (!isAuthorized) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="text-red-600 text-xl font-semibold mb-2">Yetkisiz Erişim</div>
          <p className="text-gray-600">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
        </div>
      </div>
    );
  }

  // User is authenticated and authorized
  return <>{children}</>;
} 