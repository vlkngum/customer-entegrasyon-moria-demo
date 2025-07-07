"use client";

import { ComponentType } from "react";
import ProtectedRoute from "./ProtectedRoute";

interface WithAuthOptions {
  requiredAuthority?: string[];
  fallback?: React.ReactNode;
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { requiredAuthority = [], fallback } = options;

  function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute requiredAuthority={requiredAuthority} fallback={fallback}>
        <Component {...props} />
      </ProtectedRoute>
    );
  }

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return AuthenticatedComponent;
} 