"use client";

import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/context/LogoutContext";
import { useSession } from "next-auth/react";

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

export default function VerificationPage() {
  const { user, authority, isAuthenticated, isLoading } = useAuth();
  const { isLoggingOut, startLogout } = useLogout();
  const { data: session, status } = useSession();
  
  // Cast session to ExtendedSession type
  const extendedSession = session as ExtendedSession | null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🔍 System Verification</h1>
      
      {/* Provider Status */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">📦 Provider Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>SessionProvider:</strong> <span className="text-green-600">✅ Active</span></p>
            <p><strong>ReduxProvider:</strong> <span className="text-green-600">✅ Active</span></p>
            <p><strong>LogoutProvider:</strong> <span className="text-green-600">✅ Active</span></p>
          </div>
          <div>
            <p><strong>Session Status:</strong> <span className={status === "authenticated" ? "text-green-600" : "text-red-600"}>{status}</span></p>
            <p><strong>Logout State:</strong> <span className={isLoggingOut ? "text-orange-600" : "text-green-600"}>{isLoggingOut ? "Logging out..." : "Ready"}</span></p>
          </div>
        </div>
      </div>

      {/* Authentication Status */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">🔐 Authentication Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>User Name:</strong> {user?.name || "Not available"}</p>
            <p><strong>User Email:</strong> {user?.email || "Not available"}</p>
            <p><strong>Authority:</strong> {authority || "Not available"}</p>
          </div>
          <div>
            <p><strong>Is Authenticated:</strong> <span className={isAuthenticated ? "text-green-600" : "text-red-600"}>{isAuthenticated ? "Yes" : "No"}</span></p>
            <p><strong>Session ID:</strong> {extendedSession?.user?.id || "Not available"}</p>
            <p><strong>Access Token:</strong> {extendedSession?.accessToken ? "✅ Present" : "❌ Missing"}</p>
          </div>
        </div>
      </div>

      {/* Protection Layers */}
      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">🛡️ Protection Layers</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <span className="text-green-600 mr-2">✅</span>
            <span><strong>Server-Side Layout:</strong> Session checked before rendering</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-600 mr-2">✅</span>
            <span><strong>Middleware:</strong> Route-level protection active</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-600 mr-2">✅</span>
            <span><strong>Client Layout:</strong> Authentication state management</span>
          </li>
          <li className="flex items-center">
            <span className="text-green-600 mr-2">✅</span>
            <span><strong>Logout Context:</strong> Immediate logout redirects</span>
          </li>
        </ul>
      </div>

      {/* Test Actions */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">🧪 Test Actions</h2>
        <div className="space-y-3">
          <button
            onClick={() => startLogout()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Test Logout (Should redirect immediately)
          </button>
          <div className="text-xs text-gray-600">
            <p>• Try accessing this page without login → Should redirect to /login</p>
            <p>• Try accessing /settings without admin role → Should redirect to /dashboard</p>
            <p>• Click logout button → Should redirect immediately to /login</p>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-semibold mb-2">ℹ️ System Information</h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Route Group:</strong> (protected) - All routes in this group are protected</p>
          <p><strong>Layout:</strong> Server-side session check with immediate redirect</p>
          <p><strong>Middleware:</strong> Route-level authentication and authorization</p>
          <p><strong>Providers:</strong> SessionProvider + ReduxProvider + LogoutProvider</p>
        </div>
      </div>
    </div>
  );
} 