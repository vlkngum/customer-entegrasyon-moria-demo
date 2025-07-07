"use client";

import { useAuth } from "@/hooks/useAuth";

export default function TestProtectionPage() {
  const { user, authority, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛡️ Protection Test Page</h1>
      
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">✅ Access Granted!</h2>
        <p className="text-green-600">This page is protected and you have successfully accessed it.</p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Current User Info</h2>
        <p><strong>Name:</strong> {user?.name || "Not available"}</p>
        <p><strong>Email:</strong> {user?.email || "Not available"}</p>
        <p><strong>Authority:</strong> {authority || "Not available"}</p>
        <p><strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="font-semibold mb-2">🔒 Protection Layers Active:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
          <li>✅ Server-side session check in layout.tsx</li>
          <li>✅ Middleware protection for all routes</li>
          <li>✅ Client-side authentication state management</li>
          <li>✅ Immediate redirects for unauthorized access</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold mb-2">🧪 Test Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          <li>Try accessing this page without logging in → Should redirect to /login</li>
          <li>Try accessing /settings without admin role → Should redirect to /dashboard</li>
          <li>Log out and try accessing any protected route → Should redirect to /login</li>
        </ol>
      </div>
    </div>
  );
} 