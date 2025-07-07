# Protected Route System

This directory contains a comprehensive authentication and authorization system for protecting routes in your Next.js application.

## Components

### 1. ProtectedRoute Component

A React component that wraps content and protects it based on authentication and authorization requirements.

```tsx
import { ProtectedRoute } from "@/components/auth";

function MyPage() {
  return (
    <ProtectedRoute requiredAuthority={["admin"]}>
      <div>Admin only content</div>
    </ProtectedRoute>
  );
}
```

**Props:**
- `children`: React nodes to render if authorized
- `requiredAuthority`: Array of allowed authority levels (optional)
- `fallback`: Custom fallback component to show when unauthorized (optional)

### 2. withAuth HOC (Higher-Order Component)

A function that wraps components with authentication protection.

```tsx
import { withAuth } from "@/components/auth";

function SettingsPage() {
  return <div>Settings content</div>;
}

// Wrap with authentication
const ProtectedSettingsPage = withAuth(SettingsPage, {
  requiredAuthority: ["admin"],
  fallback: <div>Access denied</div>
});

export default ProtectedSettingsPage;
```

### 3. useAuth Hook

A custom hook for authentication and authorization checks.

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { 
    user, 
    authority, 
    isAuthenticated, 
    isAuthorized, 
    isLoading 
  } = useAuth({ 
    requiredAuthority: ["admin", "manager"] 
  });

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthorized) return <div>Access denied</div>;

  return <div>Welcome, {user?.name}!</div>;
}
```

**Options:**
- `requiredAuthority`: Array of allowed authority levels
- `redirectTo`: Where to redirect unauthorized users (default: "/login")
- `redirectIfUnauthorized`: Whether to redirect automatically (default: true)

## Authority Levels

The system supports different authority levels:

- `admin`: Full access to all features
- `manager`: Access to orders, invoices, claims, products
- `user`: Basic access to dashboard and general features

## Usage Examples

### Basic Authentication (No Authority Required)

```tsx
import { ProtectedRoute } from "@/components/auth";

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Dashboard content for all authenticated users</div>
    </ProtectedRoute>
  );
}
```

### Admin-Only Content

```tsx
import { ProtectedRoute } from "@/components/auth";

function AdminPanel() {
  return (
    <ProtectedRoute requiredAuthority={["admin"]}>
      <div>Admin only content</div>
    </ProtectedRoute>
  );
}
```

### Multiple Authority Levels

```tsx
import { ProtectedRoute } from "@/components/auth";

function ManagerContent() {
  return (
    <ProtectedRoute requiredAuthority={["admin", "manager"]}>
      <div>Content for admins and managers</div>
    </ProtectedRoute>
  );
}
```

### Custom Fallback

```tsx
import { ProtectedRoute } from "@/components/auth";

function SettingsPage() {
  return (
    <ProtectedRoute 
      requiredAuthority={["admin"]}
      fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2>Access Denied</h2>
          <p>You need admin privileges to access this page.</p>
        </div>
      }
    >
      <div>Settings content</div>
    </ProtectedRoute>
  );
}
```

### Using withAuth HOC

```tsx
import { withAuth } from "@/components/auth";

function ReportsPage() {
  return <div>Reports content</div>;
}

const ProtectedReportsPage = withAuth(ReportsPage, {
  requiredAuthority: ["admin", "manager"],
  fallback: <div>You don't have permission to view reports</div>
});

export default ProtectedReportsPage;
```

### Using useAuth Hook

```tsx
import { useAuth } from "@/hooks/useAuth";

function ConditionalContent() {
  const { user, authority, isAuthorized } = useAuth({
    requiredAuthority: ["admin"]
  });

  return (
    <div>
      {isAuthorized ? (
        <div>Admin content for {user?.name}</div>
      ) : (
        <div>You have {authority} authority, but need admin for this content</div>
      )}
    </div>
  );
}
```

## Middleware Protection

The system also includes server-side middleware protection in `middleware.ts`:

- **Public Routes**: `/login`, `/register`
- **Admin Routes**: `/settings`, `/reports`, `/batch-processing`, `/categorys-marks`
- **Manager Routes**: `/orders`, `/invoices`, `/claims`, `/products`

## Best Practices

1. **Use ProtectedRoute for page-level protection**
2. **Use useAuth hook for component-level conditional rendering**
3. **Use withAuth HOC for reusable protected components**
4. **Always provide meaningful fallback content**
5. **Test with different user authority levels**

## File Structure

```
src/
├── components/
│   └── auth/
│       ├── ProtectedRoute.tsx
│       ├── withAuth.tsx
│       └── index.ts
├── hooks/
│   └── useAuth.ts
└── middleware.ts
```

## Integration with Existing App

The protected route system integrates seamlessly with your existing NextAuth setup and LogoutContext. It respects the logout state and provides immediate redirects without delays. 